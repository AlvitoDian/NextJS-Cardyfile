"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Eye,
  Users,
  CreditCard,
  Share2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function Dashboard() {
  const breadcrumb = [{ label: "Dasboard", href: "/" }];

  const cardViewsData = [
    { name: "Jan", views: 400 },
    { name: "Feb", views: 300 },
    { name: "Mar", views: 600 },
    { name: "Apr", views: 800 },
    { name: "May", views: 1000 },
    { name: "Jun", views: 500 },
    { name: "Jul", views: 700 },
  ];

  const userCards = [
    {
      id: 1,
      name: "Professional Profile",
      views: 243,
      clicks: 86,
      lastViewed: "2 hours ago",
    },
    {
      id: 2,
      name: "Personal Card",
      views: 187,
      clicks: 45,
      lastViewed: "Yesterday",
    },
    {
      id: 3,
      name: "Business Contact",
      views: 352,
      clicks: 112,
      lastViewed: "3 days ago",
    },
    {
      id: 4,
      name: "Portfolio Showcase",
      views: 129,
      clicks: 38,
      lastViewed: "Last week",
    },
  ];
  return (
    <div className="p-6 sm:ml-64 relative">
      <Breadcrumb breadcrumb={breadcrumb} title="Dashboard" />
      <div className="">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                <Eye className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Views</p>
                <p className="text-2xl font-semibold">1,234</p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-green-500">
              <ArrowUp className="w-4 h-4" />
              <span className="ml-1 text-sm">12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Active Cards</p>
                <p className="text-2xl font-semibold">4</p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-green-500">
              <ArrowUp className="w-4 h-4" />
              <span className="ml-1 text-sm">1 new this month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-500">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Shares</p>
                <p className="text-2xl font-semibold">86</p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-red-500">
              <ArrowDown className="w-4 h-4" />
              <span className="ml-1 text-sm">3% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Connections</p>
                <p className="text-2xl font-semibold">42</p>
              </div>
            </div>
            <div className="flex items-center mt-4 text-green-500">
              <ArrowUp className="w-4 h-4" />
              <span className="ml-1 text-sm">8% from last month</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <h2 className="text-lg font-semibold mb-4">Card Views Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cardViewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Your Cards</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Card Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Views
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Clicks
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Viewed
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userCards.map((card) => (
                  <tr
                    key={card.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {card.name}
                    </th>
                    <td className="px-6 py-4">{card.views}</td>
                    <td className="px-6 py-4">{card.clicks}</td>
                    <td className="px-6 py-4">{card.lastViewed}</td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline mr-3"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        View
                      </a>
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
