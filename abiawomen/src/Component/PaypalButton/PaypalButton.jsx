import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // Amount to charge
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          alert(`Transaction completed by ${order.payer.name.given_name}`);
          // You can send order info to your backend here
        }}
        onError={(err) => {
          console.error(err);
          alert("Payment failed or was cancelled.");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
