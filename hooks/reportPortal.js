// There is error from report portal which I cannot find the repository to make PR, so I copy the file and update to make it work from https://www.npmjs.com/package/codeceptjs-reportportal-client
const { event, recorder , output } = require('codeceptjs');
const rpClientClass = require('reportportal-client');

const defaultConfig = {
  token: "00000000-0000-0000-0000-000000000000",
  endpoint: "http://your-instance.com:8080/api/v1",
  launch: "LAUNCH_NAME",
  project: "PROJECT_NAME"
};

module.exports = function(config) {
  config = Object.assign(defaultConfig, config);
  const rpClient = new rpClientClass(config);

  let userConfig = JSON.parse(JSON.stringify(config));
  userConfig.project = '';
  const rpUserCheck = new rpClientClass(userConfig);
  
  let launchObj;
  recorder.startUnlessRunning();

  // START CodeceptJS
  recorder.add('start report portal', () => {
    return rpUserCheck.checkConnect().then((response) => {
      console.log('You have successfully connected to the server.');
      console.log(`You are using an account: ${response.full_name}`);

      launchObj = rpClient.startLaunch({
        name: config.launch
      });

      event.dispatcher.on(event.all.result, () => {
        if (!launchObj) return;
        recorder.add('RP finish all', () => rpClient.finishLaunch(launchObj.tempId).promise);
      });
      return launchObj.promise;
    }, (error) => {
        output.error('Error connecting to ReportPortal');
        output.error(JSON.stringify(error));
    });
  });

  let currentSuite;
  let currentTest;
  let currentStep;
  let currentMetaSteps = [];

  // START TEST SUITE
  event.dispatcher.on(event.suite.before, (suite) => {
    recorder.add('RP suite', () => {
      // console.log (' >>> RP suite startTestItem');
      if (!launchObj) return;
      currentSuite = rpClient.startTestItem({
        name: suite.fullTitle(),
        type: "SUITE"
      }, launchObj.tempId);
      // console.log('a', currentSuite);
      return currentSuite.promise;
    });
  });

  // END TEST SUITE
  event.dispatcher.on(event.suite.after, () => {
    if (!launchObj) return;
    recorder.add('RP suite', () => {
      // console.log (' >>> RP suite finishTestItem');
      return rpClient.finishTestItem(currentSuite.tempId, {}).promise;
    });
  });


  // START TEST CASE
  event.dispatcher.on(event.test.before, (test) => {
    if (!launchObj) return;
    recorder.add('RP test', () => {
      // console.log (' >>> RP test startTestItem');
      currentTest = rpClient.startTestItem({
        name: test.fullTitle(),
        type: "TEST"
      }, launchObj.tempId, currentSuite.tempId);
      return currentTest.promise;
    });
  });

  // END TEST CASE
  event.dispatcher.on(event.test.failed, () => {
    recorder.add('RP test finished', () => {
      // console.log (' >>> RP test finished failed');
      if (!launchObj) return;
      finishMetaSteps();
      return rpClient.finishTestItem(currentTest.tempId, { status: 'FAILED' }).promise;
    });
  });
  event.dispatcher.on(event.test.passed, () => {
    recorder.add('RP test finished', () => {
      // console.log (' >>> RP test finished passed');
      if (!launchObj) return;
      finishMetaSteps();
      return rpClient.finishTestItem(currentTest.tempId, { status: 'PASSED' }).promise;
    });
  });
  function finishMetaSteps() {
    currentMetaSteps.forEach((s) => rpClient.finishTestItem(s.tempId));
  }


  let flattenedMetaSteps = [];

  let flattenMetaSteps = (step) => {
    if (!step.metaStep) return;
    flattenedMetaSteps.unshift(step.metaStep);
    flattenMetaSteps(step.metaStep);
  }

  // START STEP
  event.dispatcher.on(event.step.before, (step) => {
    recorder.add('RP step started', async () => {
      // console.log (' >>> RP step started');
      flattenMetaSteps(step);
      if (!launchObj) return;

      let parent = currentMetaSteps.slice(-1)[0] || currentTest;

      let rpStep = rpClient.startTestItem({
        name: step.toString(),
        type: "STEP"
      }, launchObj.tempId, parent.tempId);

      currentStep = step;
      currentStep.tempId = rpStep.tempId;

      return rpStep.promise;
    });
  });

  // END STEP
  event.dispatcher.on(event.step.passed, () => {
    // console.log (' >>> RP step passed');
    // recorder.add('step finish', () => {
      if (!launchObj) return;
      rpClient.finishTestItem(currentStep.tempId, { status: 'PASSED' });
      currentStep = null;
    // })
  });
  event.dispatcher.on(event.step.failed, () => {
    // console.log (' >>> RP step failed');
    // recorder.add('step finish', () => {
      if (!launchObj) return;
      rpClient.finishTestItem(currentStep.tempId, { status: 'FAILED' });
      currentStep = null;
    // });
  });
}