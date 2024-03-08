const { writeFile, readFile } = require("fs").promises;

writeFile("./temporary/temp.txt", `The itsy bitsy spider crawled up the water spout.\n`)
    .then(() => {
        return writeFile("./temporary/temp.txt", `Down came the rain, and washed the spider out.\n`, { flag: 'a' });
    })
    .then(() => {
        return writeFile("./temporary/temp.txt", `Out came the sun, and dried up all the rain, and the itsy bitsy spider went up the spout again.\n`, { flag: 'a' });
    })
    .then(() => {
        return readFile("./temporary/temp.txt", "utf8");
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
