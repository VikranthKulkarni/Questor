import React from "react";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleStartPlan = (plan) => {
    navigate(`/payment/${plan}`);
  };

  const plans = [
    {
      name: "Basic",
      description: "Monthly Plan",
      price: "499",
      details: "Per member, per Month",
      benefits: ["Unlimited Courses"],
    },
    {
      name: "Premium",
      description: "Annual Plan",
      price: "4990",
      details: "Per member, per Year",
      benefits: ["Unlimited Courses"],
    },
    {
      name: "Free",
      description: "Free Plan",
      price: "0",
      details: "Lifetime",
      benefits: [],
    },
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="w-full p-8">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-lg p-8 text-center"
              >
                <h2 className="text-lg font-semibold mb-4">{plan.name}</h2>
                <p className="mb-4">{plan.description}</p>
                <div className="text-6xl font-bold mb-4">{plan.price}</div>
                <p className="text-lg mb-4">{plan.details}</p>
                <ul className="mb-8 space-y-2">
                  {plan.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-center space-x-2"
                    >
                      <svg
                        className="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleStartPlan(plan.name)}
                  className="bg-white text-black py-2 px-4 rounded-md font-semibold mb-2"
                >
                  Start Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
