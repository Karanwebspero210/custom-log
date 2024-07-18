const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('./logger');

const app = express();
const logger = new Logger();

// Middleware to log requests
app.use((req, res, next) => {
    next();
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Webhook route
app.post('/webhook', (req, res) => {
    const payload = req.body;
    logger.log(`Webhook received: ${JSON.stringify(payload)}`);
    res.status(200).send('Webhook received');
});

const PORT = 9001;
app.listen(PORT, () => {
    logger.log(`Server started on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});
