import { defineConfig } from "cypress";
import cypressMochawesomeReporter from "cypress-mochawesome-reporter/plugin"; // <-- ESM import

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/", // our demo app
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1366,
    viewportHeight: 768,
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    video: true,
    retries: { runMode: 2, openMode: 0 }, // reduce CI flakes
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,

    setupNodeEvents(on, config) {
      // ESM-friendly call (no require)
      cypressMochawesomeReporter(on);
      return config;
    }
  },

  // JUnit output for Jenkins test trend
  reporter: "junit",
  reporterOptions: {
    mochaFile: "reports/junit/test-results-[hash].xml",
    toConsole: true
  },
});
