import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function MyDonation() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyTotals, setMonthlyTotals] = useState(new Array(12).fill(0));

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:9000/donations/me", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch donations");

        const data = await res.json();
        const currentYear = new Date().getFullYear();

        const filteredDonations = data.filter((donation) => {
          const createdYear = new Date(donation.created_at).getFullYear();
          return createdYear === currentYear;
        });

        // Sum donations per month
        const totals = new Array(12).fill(0);
        filteredDonations.forEach((donation) => {
          const month = new Date(donation.donation_date).getMonth(); // Jan = 0
          totals[month] += parseFloat(donation.amount_donated);
        });

        setDonations(filteredDonations);
        setMonthlyTotals(totals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Donation Amount (NGN)",
        data: monthlyTotals,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgba(0, 0, 0, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Donation Totals (Current Year)" },
    },
  };

  return (
    <div className="mx-10 my-10">
      <div className="flex flex-row justify-between my-2">
        <p className="font-bold">Donations History</p>
        <p className="font-bold">Back</p>
      </div>

      {/* 📊 Chart */}
      <div className="my-5">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="flex flex-row items-center justify-center my-5">
        <select
          name="Select Month"
          className="mx-5 py-5 px-10 border rounded-lg"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="All Time">All Time</option>
        </select>
        <button
          className="bg-green-800 py-5 px-10 rounded-lg text-white"
          onClick={() => navigate("/MakeDonation")}
        >
          Make a Donation
        </button>
      </div>

      <div>
        <div className="border-t-2 border-black"></div>

        {loading && <p>Loading donations...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && donations.length === 0 && (
          <p>No donations found.</p>
        )}

        {!loading &&
          !error &&
          donations.map((donation) => (
            <div
              key={donation.id}
              className="border-b-2 border-black flex flex-row justify-between my-2"
            >
              <h1>{new Date(donation.donation_date).toLocaleDateString()}</h1>
              <h1>{donation.category} Program</h1>
              <div>
                <h1>NGN {Number(donation.amount_donated).toLocaleString()}</h1>
                <p>Completed</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
