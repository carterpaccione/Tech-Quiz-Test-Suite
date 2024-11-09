import { defineConfig } from "cypress";

export default defineConfig({
  // e2e: {
  //     setupNodeEvents(on, config) {
  //     },
  //     baseUrl: "http://localhost:3000",
  // },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{ts,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
