exports.config = {
  name: 'codeceptjs-demo',
  // tests: ['../initCheck.js', '../tests/**/*.js'],
  // tests: '../*_test.js',
  tests: '../tests/**/*.js',
  output: '../reports',
  helpers: {
    "Puppeteer" : {
      "url": "http://localhost",
      "restart": false,
      "waitForNavigation": [ "domcontentloaded", "networkidle0" ],
      "waitForAction": 500
    }
  },
  include: {
    I: '../steps_file.js'
  },
  bootstrap: null,
  // bootstrap: null,
  mocha: {},
  "plugins": {
    "allure": {
      "enabled": true
    },
    "reportPortal": {
      "require": "../hooks/reportPortal.js",
      "token": "975a267c-bdfa-412c-9a54-553bc192c859",
      "endpoint": "http://localhost:8088/api/v1/",
      "launch": "CodeceptJS-DEMO-Pantry-For-Good",
      "project": "codeceptjs-demo"
    }
  }
}