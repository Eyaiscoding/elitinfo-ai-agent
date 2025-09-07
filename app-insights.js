import appInsights from "applicationinsights";

let client = null;

export function setupAppInsights() {
  if (process.env.APPINSIGHTS_CONNECTION_STRING) {
    appInsights.setup(process.env.APPINSIGHTS_CONNECTION_STRING)
      .setAutoCollectRequests(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectPerformance(true)
      .start();

    client = appInsights.defaultClient;
    console.log("Application Insights initialized");
  } else {
    console.warn("APPINSIGHTS_CONNECTION_STRING not set");
  }
}

export { client };
