const fs = require('fs');
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    fs.appendFile('log.txt', message + '\n', (err) => {
      if (!err) {
        this.emit('logged', message);
      }
    });
  }
}

const logger = new Logger();

logger.on('logged', (msg) => {
  console.log('New log entry:', msg);
});

logger.log('First log entry');
logger.log('Another log entry');
