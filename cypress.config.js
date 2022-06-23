const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: { 
    //ignoreTestFiles: ['1-getting-started/', '2-advanced-examples/'], 
   // baseUrl:
    //  'http://localhost:3000/',
      // 'https://restaurants-clientversion.herokuapp.com/'),
     // "http://localhost:3000",
    // 'https://example.cypress.io/commands/actions',
    env: {
      navBarText: "cypress.io",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }, 
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
