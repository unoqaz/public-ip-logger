const getIP = require('external-ip')();
const fs = require('fs');
const beep = require('beepbeep');
const moment = require('moment');
const readLastLines = require('read-last-lines');
const config = require('./config.json');

var lastIP;
var filepath = config.filepath;
var interval = config.checkInterval || 50000;

function log(message) {
  console.log(moment().format("D/MM/YYYY,HH:mm:ss : ") + message);
}

function addToFile(string, path = "ips.csv") {
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

readLastLines.read(filepath, 1)
.then(function(line){
        lastIP = line.split(',')[0];
        log("Logger resume");
      })
.catch(function(err){
  log("Logger started");
});

const x = setInterval(() => {
  getIP((err, ip) => {
    if (err) {
        log(err)
    } else if (ip !== lastIP){
      lastIP = ip;
      addToFile(ip+","+moment().format("D/MM/YYYY,HH:mm:ss")+"\n", filepath);
    }
  });
}, interval);