const { error } = require('console');
const { createReadStream } = require('fs')

const stream = createReadStream('../content/big.txt', { highWaterMark: 200 })

let counter = 0;

stream.on('data', (result) => {
    counter++;
    console.log(result)
});

stream.on('end', () => {
    console.log(counter);
});

stream.on('error',(error) => {
    console.error(error)
});