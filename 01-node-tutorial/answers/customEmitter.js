const EventEmitter = require("events");

const customEmitter = new EventEmitter();

let ItsyBitsy = 0;
const songlines = [
  `The itsy bitsy spider crawled up the water spout.\n`,
  `Down came the rain, and washed the spider out.\n`,
  `Out came the sun, and dried up all the rain, and the itsy bitsy spider went up the spout again.\n`
];

const interval = setInterval(() => {
  ItsyBitsy++;
  if (ItsyBitsy <= 3) {
    customEmitter.emit("timer", songlines[ItsyBitsy - 1]);
  } else {
    clearInterval(interval); 
  }
}, 2000);

customEmitter.on("timer", (msg) => console.log(msg));
