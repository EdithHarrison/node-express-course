const os = require("os");

const currentOs = {
    Name:os.platform(),
    TotalMemory:os.totalmem(),
    FreeMemory:os.freemem(),
}

console.log(currentOs);