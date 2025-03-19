const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    retries: 3,
    // baseUrl: 'http://localhost:1234',
  },
  reporter: 'reporters/custom.js',
})