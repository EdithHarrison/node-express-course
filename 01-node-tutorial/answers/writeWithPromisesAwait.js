const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    try {
        await writeFile(
            './temporary/temp.txt',
            `The itsy bitsy spider crawled up the water spout.\n` +
            `Down came the rain, and washed the spider out.\n` +
            `Out came the sun, and dried up all the rain, and the itsy bitsy spider went up the spout again.\n`,
            { flag: 'a' }
        );
        console.log("File 'tempt.txt' successful");
    } catch (error) {
        console.error(error);
    }
}

const reader = async () => {
    try {
        const ItsyBitsy = await readFile('./temporary/temp.txt', 'utf8');
        console.log(ItsyBitsy);
    } catch (error) {
        console.error(error);
    }
}

async function readWrite() {
    await writer();
    await reader();
}

readWrite();