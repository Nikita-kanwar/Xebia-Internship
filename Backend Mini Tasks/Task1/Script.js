const os = require('os');
const path = require('path');

console.log("OS Type:", os.type());
console.log("Free Memory:", os.freemem());
console.log("Total Memory:", os.totalmem());

console.log("Current Directory:", __dirname);
console.log("Current File:", __filename);
console.log("File Path Example:", path.join(__dirname, 'systemInfo.js'));

console.log("Process ID:", process.pid);
console.log("Node Version:", process.version);
