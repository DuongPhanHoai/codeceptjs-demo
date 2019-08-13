# codeceptjs-demo
Basic intro: https://docs.google.com/presentation/d/1CQrO_ks0Jhr17DDPxFDV1m2cqEeIyLTMLBwP9TYvG90/edit?usp=sharing

******** TEST SPECS ********
This is the fully demo automation framework based on CodeceptJS as followings:
1. Start test server as following step by hook of ...
1.1. Start with clone pantry-for-good
1.2. Install dependencies for pantry-for-good
1.3. Start pantry-for-good

2. using plugin to start browser and login before test case and close browser after test case

3. Organize Page Object model

4. Prepare by Module

5. Apply Beatiful report

******** SETUP ********
- First setup:
  npm install
- Webdriver setup:
  selenium-standalone install
- Protractor:
  webdriver-manager update
  webdriver-manager start
- Setup MongoDB: https://www.mongodb.com/download-center/community
- Setup ReportPortal: https://reportportal.io/ (get yml file from ./config/docker-compose.yml)

NOTE ON SETUP: 
- If your PC is behind the network proxy, need to set env as: 
  NIX -> export NODE_TLS_REJECT_UNAUTHORIZED=0
  WIN -> set NODE_TLS_REJECT_UNAUTHORIZED=0
- Issue with Windows Node ENV: npm install -g win-node-env
- Issue with nodemon: npm install -g win-node-env
- Issue with reportport installation: need to setup mongo with specific volumes (please google), remember to remove old mongo with option -v to remove volumes attached to containers

******** START DRIVER SERVERS ******
Some drivers need to start as following, please run it in the separate console of the test execution
- Webdriver:
  selenium-standalone start
- Protractor:
  webdriver-manager start

******** START REPORT PORTAL ******
- To start report portal at port 8088, use yml file ./config/docker-compose.yml
- Add Project 'codeceptjs-demo'
- Update token, endpoint for reportportal plugin in codeceptjs.conf.js

******** EXECUTE TEST ********
Start the test by driver as following:
 - Default WebDriver: npm run test
 - Puppeteer: npm run test-puppeteer
 - Protractor Driver: npm run test-protractor
 - Nightmare Driver: npm run test-nightmare
 - Init PFG server then execute test by WebDriver: npm run test-init-server
 - Multiple run npm run test-multiple
 - Run smoke test: npm run test-smoke
 - Run regression test: npm run test-regression

******** ALLURE REPORT ********
After complete test, run: allure serve reports

******** REPORT PORTAL ********
There is error from report portal which I cannot find the repository to make PR, so I copy the file and update to make it work from https://www.npmjs.com/package/codeceptjs-reportportal-client

******** DEMO based on MIT opensource https://github.com/freeCodeCamp/pantry-for-good ********
 - Clone the repo, install MongoBD
 - start pantry-for-good follow its README.md