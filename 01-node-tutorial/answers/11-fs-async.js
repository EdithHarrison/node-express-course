const { writeFile } = require("fs");
console.log("start");

writeFile("./temporary/fileB.txt", "The itsy bitsy spider crawled up the water spout.\n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    writeFile("./temporary/fileB.txt", "Down came the rain, and washed the spider out.\n", { flag: 'a' }, (err, result) => {
      console.log("at point 2");
      if (err) {
        console.log("This error happened: ", err);
      } else {
      writeFile("./temporary/fileB.txt", "Out came the sun, and dried up all the rain, and the itsy bitsy spider went up the spout again.\n", { flag: 'a' }, (err, result) => {
          console.log("at point 3");
          if (err) {
            console.log("This error happened: ", err);   
          } else {
            console.log("Done with this task.");
          }
        });
      }
    });
  }
});

console.log("end");