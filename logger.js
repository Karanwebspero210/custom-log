const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logFile = path.join(__dirname, 'logs', 'app.log');
    }

    log(message) {
        const logMessage = `${new Date().toISOString()} - ${message}\n`;
        fs.appendFile(this.logFile, logMessage, (err) => {
            if (err) throw err;
        });
        console.log("WEBHOOK CALLED");
    }
}

module.exports = Logger;
