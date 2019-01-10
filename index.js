const getIP = require('external-ip')();
const fs = require('fs');
const beep = require('beepbeep');
const moment = require('moment');
const readLastLines = require('read-last-lines');

var filepath;
var interval;
try {
  const config = require('./config.json');
  filepath = config.filepath;
  interval = config.checkInterval || 50000;
} catch (error) {
  filepath = "ips.csv";
  interval = 50000;
  log(error + " : default configuration will be used.")
}

function log(message) {
  console.log(moment().format("D/MM/YYYY,HH:mm:ss : ") + message);
}

function addToFile(string, path) {
  fs.appendFile(path, string, function (err) {
    if (err) {
      beep(3, 900);
      log("Exiting logger - " + err);
      process.exit(1);
    } else {
      log('Saved IP to ' + path);
      beep(2, 1000);
    }
  });
}

var lastIP;

readLastLines.read(filepath, 1)
.then(function(line){
        lastIP = line.split(',')[0];
        log("Logger resumed");
      })
.catch(function(err){
  log("Logger started");
});

const x = setInterval(() => {
  getIP((err, ip) => {
    if (err) {
        log("failed to get ip")
    } else if (ip !== lastIP){
      lastIP = ip;
      addToFile(ip+","+moment().format("D/MM/YYYY,HH:mm:ss")+"\n", filepath);
    }
  });
}, interval);