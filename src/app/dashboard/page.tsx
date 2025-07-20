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
  TrendingUp,
  Calendar,
  Copy,
  ExternalLink,
  Edit3,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useEffect, useState } from "react";
import { fetchDashboard, fetchDashboardMonthly } from "@/lib/api/dashboard";
import Loader from "@/components/Loader";
import Link from "next/link";

export default function Dashboard() {
  const breadcrumb = [{ label: "Dashboard", href: "/" }];

  const [data, setData] = useState(null);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //? Fetch Data
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [cardsData, monthly] = await Promise.all([
        fetchDashboard(),
        fetchDashboardMonthly(),
      ]);
      setData(cardsData);
      setDataMonthly(monthly);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadAllData();
  }, []);
  //? Fetch Data End

  const monthNames = [
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
  ];
  const currentMonthName = monthNames[new Date().getMonth()];
  const currentMonthViews =
    dataMonthly?.find((item) => item.name === currentMonthName)?.views || "0";

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb breadcrumb={breadcrumb} title="Dashboard" />
      {isLoading ? (
        <Loader screen={true} />
      ) : (
        <div className="p-4">
          {/* Header Section */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome Back!
              </h1>
              <p className="text-gray-600 text-sm">
                Here's what's happening with your cards today.
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Views Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-[#e44b37]">
                  <Eye className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-xs font-medium">
                    Total Views
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {data?.total_views?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-[#e44b37]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-xs font-medium">
                    Active Cards
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {data?.total_cards || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Average Views per Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-[#e44b37]">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-xs font-medium">
                    Avg. Views
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {data?.total_cards
                      ? Math.round((data?.total_views || 0) / data?.total_cards)
                      : "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* This Month */}
            <div className="bg-gradient-to-br from-[#e44b37] to-red-600 rounded-xl shadow-lg p-4 text-white hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-red-100 text-xs font-medium">This Month</p>
                  <p className="text-xl font-bold">{currentMonthViews}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Card Views Analytics
                  </h2>
                  <p className="text-gray-600 text-xs">
                    Track your card performance over time
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#e44b37] rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700">
                    Views
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataMonthly}
                    margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="views"
                      fill="#e44b37"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Card List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Your Cards
                  </h2>
                  <p className="text-gray-600 text-xs">
                    Manage and track your card performance
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Card Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Card Link
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Views
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Last Viewed by People
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data?.hot_cards?.map((card, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-[#e44b37] rounded-full mr-2"></div>
                          <div className="font-medium text-gray-900 text-sm">
                            {card.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="max-w-xs truncate">
                            <span className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                              {window.location.origin}/card/{card.card_link}
                            </span>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${window.location.origin}/card/${card.card_link}`
                                );
                                // You can add a toast notification here
                              }}
                              className="p-1 text-gray-500 hover:text-[#e44b37] hover:bg-red-50 rounded transition-colors duration-200"
                              title="Copy link"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                window.open(
                                  `${window.location.origin}/card/${card.card_link}`,
                                  "_blank"
                                );
                              }}
                              className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                              title="Open in new tab"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-base font-bold text-gray-900">
                            {card.total_views}
                          </span>
                          <Eye className="w-3 h-3 text-gray-400 ml-1" />
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600 text-sm">
                        {card.last_view || "	Never before seen by anyone"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-[#e44b37] hover:bg-[#d63c2a] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#e44b37] focus:ring-opacity-50">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Card
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
