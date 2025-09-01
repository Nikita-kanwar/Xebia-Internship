const EventEmitter = require("events");
const fs = require("fs");

const emitter = new EventEmitter();

emitter.on("log", (message) => {
  fs.appendFile("log.txt", message + "\n", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      emitter.emit("logged", message); 
    }
  });
});

emitter.on("logged", (msg) => {
  console.log("Message written to file:", msg);
});

emitter.emit("log", "First loggedIn");
emitter.emit("log", "Second loggedIn");
