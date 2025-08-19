import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButton() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, 
        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          // Hardcoded order details
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", 
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          // Capture the funds from the transaction
          const details = await actions.order.capture();
          alert(`Transaction completed by ${details.payer.name.given_name}`);
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
