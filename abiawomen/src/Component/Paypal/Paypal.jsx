import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButton() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, // Vite uses import.meta.env, not process.env.REACT_APP_*
        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={async () => {
          const res = await fetch("/paypal/create-order", { method: "POST" });
          const data = await res.json();
          return data.id;
        }}
        onApprove={async (data) => {
          const res = await fetch(`/paypal/capture-order/${data.orderID}`, { method: "POST" });
          const details = await res.json();
          alert(`Transaction completed by ${details.payer.name.given_name}`);
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
