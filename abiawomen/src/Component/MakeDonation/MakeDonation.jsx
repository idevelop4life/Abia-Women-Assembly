import React, { useState } from 'react';

export const MakeDonation = () => {
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    // You can add actual submission logic here
    alert(`Donating ${amount} ${currency}`);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 space-y-6">
      {/* Currency Dropdown */}
      <div>
        <label htmlFor="currency" className="block text-gray-700 mb-2 font-semibold">
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
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="NGN">NGN - Nigerian Naira</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
        </select>
      </div>

      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className="block text-gray-700 mb-2 font-semibold">
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

      <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="USD">Card</option>
          <option value="EUR">Ussd</option>
          <option value="NGN">Bank Transfer</option>
        </select>

      {/* Donate Button */}
      <button
        onClick={handleDonate}
        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition-colors"
      >
        Donate Now
      </button>
    </div>
  );
};
