#!/usr/bin/env node
const { exec } = require('child_process')

const setupScript = exec('sh ./setup.sh')

setupScript.stdout.on('data', function(data){
  console.log(data); 
  // sendBackInfo();
});

setupScript.stderr.on('data', function(data){
  console.log(data);
  // triggerErrorStuff(); 
});