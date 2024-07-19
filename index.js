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
    let customData = {
        "id": "WH-70J99027H47132217-1H0731098F174503D",
        "event_version": "1.0",
        "create_time": "2024-07-18T14:20:42.530Z",
        "resource_type": "checkout-order",
        "resource_version": "2.0",
        "event_type": "CHECKOUT.ORDER.APPROVED",
        "summary": "An order has been approved by buyer",
        "resource": {
            "create_time": "2024-07-18T14:20:22Z",
            "purchase_units": [
                {
                    "reference_id": "default",
                    "amount": {
                        "currency_code": "USD",
                        "value": "23.00"
                    },
                    "payee": {
                        "email_address": "sb-dph9p29049918@business.example.com",
                        "merchant_id": "LLCK5GYWKHPE2"
                    },
                    "custom_id": "841",
                    "shipping": {
                        "name": {
                            "full_name": "John Doe"
                        },
                        "address": {
                            "address_line_1": "1 Main St",
                            "admin_area_2": "San Jose",
                            "admin_area_1": "CA",
                            "postal_code": "95131",
                            "country_code": "US"
                        }
                    }
                }
            ],
            "links": [
                {
                    "href": "https://api.sandbox.paypal.com/v2/checkout/orders/8UB08260L82228933",
                    "rel": "self",
                    "method": "GET"
                },
                {
                    "href": "https://api.sandbox.paypal.com/v2/checkout/orders/8UB08260L82228933",
                    "rel": "update",
                    "method": "PATCH"
                },
                {
                    "href": "https://api.sandbox.paypal.com/v2/checkout/orders/8UB08260L82228933/capture",
                    "rel": "capture",
                    "method": "POST"
                }
            ],
            "id": "8UB08260L82228933",
            "payment_source": {
                "paypal": {
                    "email_address": "sb-43qgtn13785822@business.example.com",
                    "account_id": "TQH5FM4AL52FN",
                    "account_status": "VERIFIED",
                    "name": {
                        "given_name": "John",
                        "surname": "Doe"
                    },
                    "business_name": "Test Store",
                    "address": {
                        "country_code": "US"
                    }
                }
            },
            "intent": "CAPTURE",
            "payer": {
                "name": {
                    "given_name": "John",
                    "surname": "Doe"
                },
                "email_address": "sb-43qgtn13785822@business.example.com",
                "payer_id": "TQH5FM4AL52FN",
                "address": {
                    "country_code": "US"
                }
            },
            "status": "APPROVED"
        },
        "links": [
            {
                "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-70J99027H47132217-1H0731098F174503D",
                "rel": "self",
                "method": "GET"
            },
            {
                "href": "https://api.sandbox.paypal.com/v1/notifications/webhooks-events/WH-70J99027H47132217-1H0731098F174503D/resend",
                "rel": "resend",
                "method": "POST"
            }
        ]
    };
    console.log("req.body.length", req.body.length)
    const payload = req.body.length ? req.body : customData;
    let data = JSON.stringify(payload);
    await sendDataToServer(data);
    console.log("Webhook received:", data)
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
