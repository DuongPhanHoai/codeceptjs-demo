const Git = require("nodegit");
const { spawn, exec  } = require('child_process');
let serverProcess = null;

// Callback chain
const initAllForServer = (done) => {
  cloneServer(done);
}
const cloneServer = (done) => {
  console.log('\n>>> pantry-for-good IS BEING CLONED\n');
  Git.Clone("https://github.com/freeCodeCamp/pantry-for-good", "./pantry-for-good").then(() => {
    console.log('\n>>> COMPLETE CLONING https://github.com/freeCodeCamp/pantry-for-good\n');
    installDependenciesServer(done);
  }).catch(function(){
    console.log('\n>>> pantry-for-good IS EXISTED\n');
    installDependenciesServer(done);
  });
}
const installDependenciesServer = (done) => {
  console.log('\n>>> START INSTALLING DEPENDENCIES FOR pantry-for-good\n');
  exec('npm install', {
    cwd: './pantry-for-good'
  }, function(error, stdout, stderr) {
    // work with result
    console.log (`installDependenciesServer exec stdout: ${stdout}`);
    if (error)
      console.error(`installDependenciesServer exec error: ${error}`);
    console.log('\n>>> COMPLETE INSTALLING DEPENDENCIES FOR pantry-for-good\n');
    startServer(done);
  });
}
const startServer = (done) => {
  serverProcess = exec('npm run dev', {
    cwd: './pantry-for-good'
  }, function(error, stdout, stderr) {
    // work with result
    console.log (`startServer exec stdout: ${stdout}`);
    if (error) {
      console.error(`startServer exec error: ${error}`);
      return;
    }
  });
  console.log('\n>>> pantry-for-good IS STARTING\n');
  done();
}

const stopServer = (done) => {
  if (serverProcess) {
    console.log (`\n>>> STOPPING pantry-for-good ${serverProcess.pid}\n`);
    serverProcess.kill();
    // kill by process id
    /*try {
      process.kill(serverProcess.pid);
    } catch(err) {}
    // Check if Windows and kill by taskkill
    try {
      spawn("taskkill", ["/pid", serverProcess.pid, '/f', '/t']);
      process.exit(0);
      done();
    }
    catch(err)
    {
      process.exit(0);
      done();
    }
    /*
    const process = require('process');
    process.kill(serverProcess.pid).catch(function(){
      // if need to do
      console.log('\n>>> process.kill error \n');
    });/**/
  }
  else {
    console.log ('\n>>> UNABLE TO FIND SERVER PROCESS TO STOP!\n');
  }
}


// Callback sample
module.exports = {
  bootstrap: function(done) {
    console.log ('>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT SERVERRRRRRRRRRRRRR >>> ', process.env.initServer);
    // if (process.env.initServer === 'true')
      initAllForServer(done);
  },
  teardown: function(done) {
    // if (process.env.initServer === 'true')
    stopServer(done);
  }
}