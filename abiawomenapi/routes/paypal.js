const express = require("express");
const paypal = require("@paypal/checkout-server-sdk");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// PayPal environment
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Create order
router.post("/create-order", async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      { amount: { currency_code: "USD", value: "10.00" } },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});

// Capture order
router.post("/capture-order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (err) {
    res.status(500).send("Error capturing order");
  }
});

module.exports = router;