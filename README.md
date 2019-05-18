# public-ip-logger
Logs public IP address changes.

## Usage
1. Clone/download this repo.
2. Install dependencies (npm install / yarn)
3. Edit config.json.
    * checkInterval - set how often the script checks your public ID address in milliseconds.
    * filename - specify the path of the file to write IP address changes to. e.g.: "C:\\Users\\ips.csv"
4. run the script with `node index.js` or install as service.

## Install script as a windows service.
Doing this allows you to keep the script running in the background and to start the script at windows start up. 
1. Install [node-windows](https://github.com/coreybutler/node-windows)
>The recommended way to install node-windows is with npm, using the global flag:
>
>npm install -g node-windows
>
>Then, in your project root, run:
>
>npm link node-windows
2. Run `node install.js`

Uninstall windows service:
1. Run `node uninstall.js`

Console log would be saved at daemon/publiciplogger.out.log