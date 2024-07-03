import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [startDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    switch (plan) {
      case "Basic":
        setAmount(499);
        setEndDate(new Date(new Date().setMonth(new Date().getMonth() + 1)));
        break;
      case "Premium":
        setAmount(4990);
        setEndDate(
          new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        );
        break;
      case "Free":
        setAmount(0);
        setEndDate(
          new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        );
        break;
      default:
        setAmount(0);
        setEndDate(null);
    }
  }, [plan]);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Check if there is an existing inactive subscription
      const existingSubscriptionResponse = await fetch(
        `http://localhost:8080/subscriptions/byUserId/${userId}`
      );

      if (!existingSubscriptionResponse.ok) {
        throw new Error("Failed to fetch existing subscription");
      }

      const existingSubscription = await existingSubscriptionResponse.json();
      let subscriptionId = existingSubscription?.subscriptionId;

      if (existingSubscription && existingSubscription.status === "INACTIVE") {
        // Use the existing inactive subscription
        subscriptionId = existingSubscription.subscriptionId;
      } else {
        // Create new subscription with status INACTIVE
        const subscriptionResponse = await fetch(
          "http://localhost:8080/subscriptions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              planDetails: plan.toUpperCase(),
              startDate: startDate,
              endDate: endDate,
              status: "INACTIVE",
              transactionDTOS: [], // Empty transactions list initially
            }),
          }
        );

        if (!subscriptionResponse.ok) {
          throw new Error("Failed to create subscription");
        }

        const subscriptionData = await subscriptionResponse.json();
        subscriptionId = subscriptionData.subscriptionId;
      }

      // Step 2: Create transaction linked to the subscription
      const paymentResponse = await fetch(
        "http://localhost:8080/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriptionId: subscriptionId,
            paymentDate: new Date(),
            amount: amount,
            paymentMethod: paymentMethod,
          }),
        }
      );

      if (!paymentResponse.ok) {
        throw new Error("Failed to process payment");
      }

      const paymentData = await paymentResponse.json();

      // Step 3: Update subscription status to ACTIVE
      const updateSubscriptionResponse = await fetch(
        `http://localhost:8080/subscriptions/${subscriptionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            planDetails: plan.toUpperCase(),
            startDate: startDate,
            endDate: endDate,
            status: "ACTIVE",
            transactionDTOS: [paymentData], // Include the transaction
          }),
        }
      );

      if (!updateSubscriptionResponse.ok) {
        throw new Error("Failed to update subscription status");
      }

      alert("Payment Successful");
      navigate("/userDashboard");
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed");
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white items-center justify-center">
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-96">
        <h2 className="text-lg font-semibold mb-4">Payment for {plan} Plan</h2>
        <div className="text-6xl font-bold mb-4">{amount}</div>
        <p className="text-lg mb-4">
          Per member, per {plan === "Premium" ? "Year" : "Month"}
        </p>
        <form onSubmit={handlePayment} className="space-y-4">
          <div className="flex flex-col mb-4">
            <label className="mb-2">Start Date:</label>
            <input
              type="text"
              value={startDate.toDateString()}
              readOnly
              className="p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">End Date:</label>
            <input
              type="text"
              value={endDate ? endDate.toDateString() : "Lifetime"}
              readOnly
              className="p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Payment Date:</label>
            <input
              type="text"
              value={new Date().toDateString()}
              readOnly
              className="p-2 bg-gray-700 rounded"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="p-2 bg-gray-700 rounded"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI</option>
              <option value="Internet Banking">Internet Banking</option>
              <option value="None">None</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-white text-black py-2 px-4 rounded-md font-semibold mb-2"
          >
            {plan === "Free" ? "Activate Plan" : "Make Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
