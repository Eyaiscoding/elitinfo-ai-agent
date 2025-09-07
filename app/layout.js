import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

export const metadata = {
  title: "Elitinfo Agent",
  description: "AI-powered assistant for managing your database.",
  icons: {
    icon: "/bot.png", // favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
    <CopilotKit runtimeUrl="/api/copilotkit" publicApiKey={process.env.NEXT_PUBLIC_GROQ_CLOUD_API_KEY}>
      {children}
    </CopilotKit>
      </body>
    </html>
  )
}
