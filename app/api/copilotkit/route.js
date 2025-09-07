import {
  CopilotRuntime,
  GroqAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import Groq from "groq-sdk";
import { setupAppInsights, client } from "@/app-insights";

setupAppInsights(); // initialize App Insights

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_CLOUD_API_KEY });
const copilotKit = new CopilotRuntime();

const serviceAdapter = new GroqAdapter({
  groq,
  model: "llama-3.3-70b-versatile",
});

export const POST = async (req) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: copilotKit,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  try {
    const { body } = await req.json();
    const start = Date.now();
    const response = await handleRequest(req);
    const duration = Date.now() - start;

    // Minimal evaluation
    const evaluation = {
      length: response?.text?.length || 0,
      hasKeywords: body?.query?.includes("customers"),
      durationMs: duration,
    };

    if (client) {
      client.trackEvent({
        name: "LLMQuery",
        properties: {
          query: body?.query?.slice(0, 2000),
          response: response?.text?.slice(0, 2000),
          evaluation: JSON.stringify(evaluation),
        },
      });

      // Track custom metrics for monitoring
      client.trackMetric({ name: "ResponseLength", value: evaluation.length });
      client.trackMetric({ name: "QueryDurationMs", value: evaluation.durationMs });
    }

    return response;
  } catch (error) {
    if (client) client.trackException({ exception: error });
    throw error;
  }
};
