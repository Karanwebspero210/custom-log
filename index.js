const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('./logger');
const axios = require('axios');

const app = express();
// const logger = new Logger();

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
app.post('/webhook', async (req, res) => {
    const payload = req.body;
    let data = JSON.stringify(payload);
    console.log("Webhook received:", data)
    await sendDataToServer(data);
    res.status(200).send("Webhook received");
});

async function sendDataToServer(data){
    try {
        console.log("have data in fun",data)
        const response = await axios.post('https://postyngs-dev.websperotech.com/api/paypal/webhook', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Data sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending data:', error.message);
      }
}

const PORT = 9001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
