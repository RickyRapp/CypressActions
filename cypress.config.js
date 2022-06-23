const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: { 
    //ignoreTestFiles: ['1-getting-started/', '2-advanced-examples/'], 
   // baseUrl: 
   //   'https://all-restaurants.herokuapp.com/', 
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
