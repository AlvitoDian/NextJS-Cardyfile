import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  breadcrumb: BreadcrumbItem[];
  title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb, title }) => {
  const currentPath = window.location.pathname;
  return (
    <div className="mb-4">
      <span className="font-bold text-2xl text-[#333333]">{title}</span>
      <ul className="flex text-sm text-gray-600">
        {breadcrumb.map((item, index) => {
          const isActive = currentPath === item.href;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <Link
                href={item.href}
                className={`text-[#67748e]  ${
                  isActive ? "font-semibold text-[#E44B3A]" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
