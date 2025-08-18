import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paypal from "../Paypal/Paypal";

export const MakeDonation = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    if (currency === "ngn") {
      alert("Please transfer to account number: 1234567890 (Access Bank)");
      navigate("/PaymentPage", { state: { amount: amount, currency: currency } });
    } else {
      alert(`Donating ${amount} via ${currency}`);
    }
    
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 space-y-6">
      <div>
        <label
          htmlFor="currency"
          className="block text-gray-700 mb-2 font-semibold"
        >
          Currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="" disabled>
            Select currency
          </option>
          <option value="paypal">PayPal</option>
          <option value="zelle">Zelle</option>
          <option value="ngn">Nigerian Naira (NGN)</option>
        </select>
      </div>

      {currency !== "ngn" && (
        <>
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 mb-2 font-semibold"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
      {currency === "paypal" && (
        <Paypal
          amount={amount}
          currency={currency}
          onSuccess={() => alert("Donation successful!")}
          onError={() => alert("Error processing donation. Please try again.")}
        />
      )}
          {/* 
          <div>
            <label htmlFor="method" className="block text-gray-700 mb-2 font-semibold">
              Payment Method
            </label>
            <select
              id="method"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="card">Card</option>
              <option value="ussd">USSD</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div> */}
        </>
      )}

      {currency === "ngn" && (
        <div className="bg-gray-100 p-4 rounded text-center">
          <p className="font-semibold text-gray-700">
            Please transfer your donation to:
          </p>
          <p className="text-lg font-bold mt-2">1234567890</p>
          <p className="text-sm text-gray-600">Access Bank</p>
        </div>
      )}

      <button
        onClick={handleDonate}
        disabled={
          !currency || (currency !== "ngn" && (!amount || parseFloat(amount) <= 0))
        }
        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition-colors"
      >
        Donate Now
      </button>
    </div>
  );
};
