exports.config = {
  name: 'codeceptjs-demo',
  // tests: ['./initCheck.js', './tests/**/*.js'],
  // tests: './*_test.js',
  tests: './tests/**/*.js',
  output: './reports',
  helpers: {
    WebDriver: {
      url: 'http://localhost',
      browser: 'chrome'
    }
  },
  multiple: {
    parallel: {
      chunks: 2,
      browsers: ["chrome", "firefox"]
    }
  }, /**/
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  "plugins": {
    "allure": {
      "enabled": true
    },
    "reportPortal": {
      "require": "./hooks/reportPortal.js",
      "token": "975a267c-bdfa-412c-9a54-553bc192c859",
      "endpoint": "http://localhost:8088/api/v1/",
      "launch": "CodeceptJS-DEMO-Pantry-For-Good",
      "project": "codeceptjs-demo"
    }
  }
}