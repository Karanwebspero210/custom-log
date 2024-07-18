const express = require('express');
const Logger = require('./logger');

const app = express();
const logger = new Logger();

app.use((req, res, next) => {
    logger.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const PORT = 9001;
app.listen(PORT, () => {
    logger.log(`Server started on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});
