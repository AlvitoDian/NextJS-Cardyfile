"use client";

import { Plus, ImageIcon, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface FormCardProps {
  isPlus: boolean;
  image?: string;
  title: string;
  id?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

export default function FormCard({
  isPlus,
  image,
  title,
  id,
  onClick,
  onEdit,
  onDelete,
  onView,
}: FormCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const linkUrl = isPlus
    ? "/dashboard/manage-card/create"
    : `/dashboard/manage-card/${id}`;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (action: () => void | undefined) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowMenu(false);
      if (action) action();
    };
  };

  return (
    <div className="flex flex-col gap-[5px] justify-start items-start">
      <div className="relative">
        {isPlus ? (
          <div
            onClick={onClick}
            className="rounded-[8px] w-[171px] h-[128px] border-[#d8dfe6] hover:shadow-[0_0_8px_rgba(228,75,55,0.3)] border-[1px] flex items-center justify-center cursor-pointer transition-all duration-400"
          >
            <Plus />
          </div>
        ) : (
          <>
            <Link
              href={linkUrl}
              className="rounded-[8px] w-[171px] h-[128px] border-[#d8dfe6] hover:shadow-[0_0_8px_rgba(228,75,55,0.3)] border-[1px] flex items-center justify-center cursor-pointer transition-all duration-400 overflow-hidden"
            >
              {image ? (
                <Image
                  src={image}
                  alt="Form Template"
                  width={171}
                  height={128}
                  className="w-full h-full object-cover rounded-[8px]"
                />
              ) : (
                <div className="flex flex-col gap-[5px] items-center">
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                  <span className="text-gray-400 text-[10px] font-semibold">
                    No Image Available
                  </span>
                </div>
              )}
            </Link>

            {/* Three Dots Menu */}
            <div className="absolute top-[-2px] right-[-23px]" ref={menuRef}>
              <button
                onClick={handleMenuClick}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute top-8 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-10">
                  <button
                    onClick={handleMenuItemClick(onView)}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat
                  </button>
                  <button
                    onClick={handleMenuItemClick(onEdit)}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150"
                  >
                    <Edit className="w-4 h-4" />
                    Sunting
                  </button>
                  <button
                    onClick={handleMenuItemClick(onDelete)}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-150"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <p className="mt-1 text-[#202124] text-[14px] font-[500]">{title}</p>
    </div>
  );
}
