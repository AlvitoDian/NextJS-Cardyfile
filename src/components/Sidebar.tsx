"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Gauge,
  SquareChartGantt,
  CreditCard,
  ChevronDown,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Gauge color="#E44B37" strokeWidth={2.25} size={20} />,
    href: "/dashboard",
  },
  {
    id: "manage",
    label: "Manage Card",
    icon: <SquareChartGantt color="#E44B37" strokeWidth={2.25} size={20} />,
    subItems: [{ label: "Card", href: "/dashboard/manage-card" }],
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: <CreditCard color="#E44B37" strokeWidth={2.25} size={20} />,
    subItems: [{ label: "Billing", href: "/dashboard/billing" }],
  },
  {
    id: "account-settings",
    label: "Account Settings",
    icon: <User color="#E44B37" strokeWidth={2.25} size={20} />,
    href: "/dashboard/account-settings", // Atur URL yang sesuai
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // Initialize dropdown state based on current path
  const [dropdowns, setDropdowns] = useState({});

  useEffect(() => {
    // Auto-expand dropdown if a child route is active
    const initialDropdowns = {};
    menuItems.forEach((item) => {
      if (item.subItems) {
        const isActive = item.subItems.some(
          (subItem) => pathname === subItem.href
        );
        if (isActive) {
          initialDropdowns[item.id] = true;
        }
      }
    });
    setDropdowns(initialDropdowns);
  }, [pathname]);

  const toggleDropdown = (dropdownId) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  const isActive = (href) => {
    return pathname === href;
  };

  if (!isDashboard) return null;

  return (
    <aside
      id="sidebar"
      className="fixed top-[55px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full bg-white shadow-lg">
        <div className="flex items-center justify-center py-5 border-b border-gray-100">
          <Image
            src="/assets/images/logo.png"
            alt="Nimbrunk Logo"
            width={130}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <div className="flex-1 px-4 py-5 overflow-y-auto scrollbar-thin">
          <ul className="space-y-1.5">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.subItems ? (
                  <div className="mb-1">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-2.5 text-[#67748e] rounded-lg group hover:bg-gray-50 transition-colors"
                      onClick={() => toggleDropdown(item.id)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ease-in-out ${
                          dropdowns[item.id] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        dropdowns[item.id]
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="pl-9 mt-1 space-y-1">
                        {item.subItems.map((subItem, index) => (
                          <li key={index}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center p-2 text-sm rounded-md transition-colors ${
                                isActive(subItem.href)
                                  ? "bg-gray-50 text-[#E44B37] font-medium"
                                  : "text-[#67748e] hover:bg-gray-50"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center p-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-gray-50 text-[#E44B37] font-medium"
                        : "text-[#67748e] hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">UN</span>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-700">User Name</p>
              <p className="text-xs text-gray-500">user@nimbrunk.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
