"use client";

import { useState } from "react";
import {
  CreditCard,
  CheckCircle,
  CreditCard as CardIcon,
  Download,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function Billing() {
  const breadcrumb = [{ label: "Billing", href: "/" }];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "0",
      description: "Basic features for personal use",
      features: [
        "Up to 3 digital cards",
        "Basic analytics",
        "Standard templates",
        "Email support",
      ],
    },
    {
      id: "pro",
      name: "Professional",
      price: "12.99",
      description: "Everything you need for professional networking",
      features: [
        "Unlimited digital cards",
        "Advanced analytics",
        "Premium templates",
        "Priority support",
        "Custom domains",
        "Remove branding",
      ],
    },
    {
      id: "business",
      name: "Business",
      price: "29.99",
      description: "Enhanced features for teams and businesses",
      features: [
        "Everything in Professional",
        "Team management",
        "Multiple users (up to 5)",
        "Branded templates",
        "API access",
        "Dedicated account manager",
      ],
    },
  ];

  const invoices = [
    {
      id: "INV-2025-001",
      date: "Apr 01, 2025",
      amount: "$12.99",
      status: "Paid",
    },
    {
      id: "INV-2025-000",
      date: "Mar 01, 2025",
      amount: "$12.99",
      status: "Paid",
    },
    {
      id: "INV-2024-012",
      date: "Feb 01, 2025",
      amount: "$12.99",
      status: "Paid",
    },
    {
      id: "INV-2024-011",
      date: "Jan 01, 2025",
      amount: "$12.99",
      status: "Paid",
    },
  ];

  return (
    <div className="p-6 sm:ml-64 relative">
      <Breadcrumb breadcrumb={breadcrumb} title="Subscription" />
      <div className=""></div>
      {/* Main Content */}
      <div className="p-4 w-full">
        {/* Current Plan */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold">Current Plan</h2>
              <p className="text-gray-500">
                Your subscription renews on May 1, 2025
              </p>
            </div>
            <div className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-1" />
              Active
            </div>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-bold">Professional</span>
            <span className="ml-2 text-xl text-gray-500">$12.99/month</span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-red-500 mr-2" />
              <span>Unlimited digital cards</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-red-500 mr-2" />
              <span>Advanced analytics</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-red-500 mr-2" />
              <span>Premium templates</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-red-500 mr-2" />
              <span>Priority support</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-red-500 mr-2" />
              <span>Custom domains</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-red-500 mr-2" />
              <span>Remove branding</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-[#e44b37] text-white rounded-lg hover:bg-red-700 transition">
              Manage Subscription
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Cancel Plan
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

          <div className="flex items-center p-4 border rounded-lg">
            <div className="p-2 bg-gray-100 rounded-lg">
              <CreditCard className="w-8 h-8 text-gray-600" />
            </div>
            <div className="ml-4">
              <div className="font-medium">Visa ending in 4242</div>
              <div className="text-gray-500 text-sm">Expires 12/26</div>
            </div>
            <div className="ml-auto">
              <button className="text-[#e44b37] hover:text-red-800 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>

          <button className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Add Payment Method
          </button>
        </div>

        {/* Available Plans */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h2 className="text-lg font-semibold mb-6">Available Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-5 cursor-pointer transition ${
                  selectedPlan === plan.id
                    ? "border-[#e44b37] ring-2 ring-red-200"
                    : "hover:border-gray-300"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">{plan.name}</h3>
                  {selectedPlan === plan.id && (
                    <CheckCircle className="w-5 h-5 text-[#e44b37]" />
                  )}
                </div>

                <div className="flex items-baseline mb-3">
                  <span className="text-2xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>

                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>

                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full mt-4 py-2 rounded-lg transition ${
                    selectedPlan === plan.id
                      ? "bg-[#e44b37] text-white hover:bg-red-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedPlan === plan.id ? "Current Plan" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Billing History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Invoice
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {invoice.id}
                    </th>
                    <td className="px-6 py-4">{invoice.date}</td>
                    <td className="px-6 py-4">{invoice.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="font-medium text-[#e44b37] hover:underline flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
