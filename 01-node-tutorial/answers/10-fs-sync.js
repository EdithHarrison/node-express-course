const { readFileSync, writeFileSync } = require('fs')

writeFileSync(
    './temporary/fileA.txt',
    `The itsy bitsy spider crawled up the water spout.\n` +
    `Down came the rain, and washed the spider out.\n` +
    `Out came the sun, and dried up all the rain, and the itsy bitsy spider went up the spout again.\n`,
    { flag: 'a' }
);

const ItsyBitsy = readFileSync('./temporary/fileA.txt', 'utf8')
console.log(ItsyBitsy);