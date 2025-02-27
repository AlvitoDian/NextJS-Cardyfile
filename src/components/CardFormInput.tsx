"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Image as LucideImage,
  Contact,
  AlignLeft,
  MessageSquare,
  PaintBucket,
  Logs,
} from "lucide-react";
import { X } from "lucide-react";
import Select from "react-select";

export default function CardFormInput({
  label,
  type,
  id,
  value,
  onChange,
  options = [],
  icon: Icon,
}) {
  const profileInput = useRef<HTMLInputElement | null>(null);
  const bannerInput = useRef<HTMLInputElement | null>(null);

  const [profilePreview, setProfilePreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  const renderIcon =
    id === "username" ? (
      <div className="icon-container">
        <Contact size={14} color="#333333" />
      </div>
    ) : id === "description" ? (
      <div className="icon-container">
        <AlignLeft size={14} color="#333333" />
      </div>
    ) : id === "profileImage" ? (
      <div className="icon-container">
        <LucideImage size={14} color="#333333" />
      </div>
    ) : id === "bannerImage" ? (
      <div className="icon-container">
        <LucideImage size={14} color="#333333" />
      </div>
    ) : id === "socialMedia" ? (
      <div className="icon-container">
        <MessageSquare size={14} color="#333333" />
      </div>
    ) : id === "menu" ? (
      <div className="icon-container">
        <Logs size={14} color="#333333" />
      </div>
    ) : id === "bgColor" ? (
      <div className="icon-container">
        <PaintBucket size={14} color="#333333" />
      </div>
    ) : Icon ? (
      <div className="icon-container">{<Icon />}</div>
    ) : null;
  const dropdownStyle = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused ? "0 0 8px rgba(228, 75, 55, 0.3)" : "none",
      borderColor: state.isFocused ? "#E44B37" : provided.borderColor,
      borderRadius: "8px",
      "&:hover": {
        borderColor: "#E44B37",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#E44B37"
        : state.isSelected
        ? "#FBC5B4"
        : "white",
      color: state.isFocused || state.isSelected ? "white" : "#333",
      boxShadow: state.isFocused ? "0 0 8px rgba(228, 75, 55, 0.3)" : "none",
      "&:active": {
        backgroundColor: "#F78E7F",
      },
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow:
        "0 0 8px rgba(228, 75, 55, 0.3), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      borderRadius: "8px",
    }),
  };

  const handleProfileChange = (target: EventTarget & HTMLInputElement) => {
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(target.files[0]);
    }
  };

  const handleBannerChange = (target: EventTarget & HTMLInputElement) => {
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(target.files[0]);
    }
  };

  const handleDeleteProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfilePreview(null);
    onChange(null);
  };

  const handleDeleteBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBannerPreview(null);
    onChange(null);
  };

  const handleProfileClick = () => {
    if (profileInput.current) {
      profileInput.current.click();
    }
  };

  const handleBannerClick = () => {
    if (bannerInput.current) {
      bannerInput.current.click();
    }
  };

  if (type === "select") {
    const selectOption = options.map((option) => ({
      label: option,
      value: option,
    }));

    const labelClass = id.includes("_") ? "opacity-60 text-xs" : "";

    return (
      <div className="mb-4 flex flex-col gap-[8px] text-sm">
        <div className="flex items-center gap-[5px]">
          {renderIcon}
          <label
            htmlFor={id}
            className={`text-[#333333] font-semibold ${labelClass}`}
          >
            {label}
          </label>
        </div>
        <Select
          id={id}
          value={selectOption.find((option) => option.value === value)}
          onChange={(selectedOption) => onChange(selectedOption?.value)}
          options={selectOption}
          className="w-full"
          classNamePrefix="react-select"
          styles={dropdownStyle}
        />
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-4 flex flex-col gap-[8px] text-sm">
        <div className="flex items-center gap-[5px]">
          {renderIcon}
          <label htmlFor={id} className="text-[#333333] font-semibold">
            {label}
          </label>
        </div>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="outline-none border border-[#DDDDDD] p-2 w-full rounded-[8px] focus:outline-none focus:shadow-[0_0_8px_rgba(228,75,55,0.3)] focus:ring-0 transition-all duration-500"
        />
      </div>
    );
  }

  if (type === "color") {
    return (
      <div className="mb-4 flex flex-col gap-[8px] text-sm">
        <div className="flex items-center gap-[5px]">
          {renderIcon}
          <label htmlFor={id} className="text-[#333333] font-semibold ">
            {label}
          </label>
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_0_8px_rgba(228,75,55,0.3)] transition-all duration-500"
          title="Choose your color"
        />
      </div>
    );
  }

  if (type === "file" && id === "profileImage") {
    return (
      <div className="mb-4 flex flex-col gap-[8px] text-sm">
        <div className="flex items-center gap-[5px]">
          {renderIcon}
          <label htmlFor={id} className="text-[#333333] font-semibold">
            {label}
          </label>
        </div>

        <input
          type="file"
          id={id}
          ref={profileInput}
          onChange={(e) => handleProfileChange(e.target)}
          className="hidden"
        />

        <div
          onClick={handleProfileClick}
          className={`w-[100px] h-[100px] border-[1.5px] border-dashed border-gray-300 flex justify-center items-center cursor-pointer rounded-[8px] hover:border-[#E44B37] transition-all duration-500
             ${profilePreview ? "bg-gray-100" : "bg-white"}`}
        >
          {!profilePreview ? (
            <div className="flex flex-col items-center">
              <LucideImage color="#DDDDDD" />
              <span className="text-[10px] font-[600] text-[#67748e]">
                100 x 100 (px)
              </span>
            </div>
          ) : (
            <div className="relative w-full h-full rounded-[8px]">
              <Image
                src={profilePreview}
                alt="Preview"
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-[8px]"
              />

              <button
                type="button"
                onClick={handleDeleteProfile}
                className="absolute top-[-10px] right-[-10px] bg-red-500 text-white p-1 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === "file" && id === "bannerImage") {
    return (
      <div className="mb-4 flex flex-col gap-[8px] text-sm">
        <div className="flex items-center gap-[5px]">
          {renderIcon}
          <label htmlFor={id} className="text-[#333333] font-semibold">
            {label}
          </label>
        </div>

        <input
          type="file"
          id={id}
          ref={bannerInput}
          onChange={(e) => handleBannerChange(e.target)}
          className="hidden"
        />

        <div
          onClick={handleBannerClick}
          className={`w-[200px] h-[100px] border-[1.5px] border-dashed border-gray-300 flex justify-center items-center cursor-pointer rounded-[8px] hover:border-[#E44B37] transition-all duration-500 ${
            bannerPreview ? "bg-gray-100" : "bg-white"
          }`}
        >
          {!bannerPreview ? (
            <div className="flex flex-col items-center">
              <LucideImage color="#DDDDDD" />
              <span className="text-[10px] font-[600] text-[#67748e]">
                100 x 100 (px)
              </span>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={bannerPreview}
                alt="Preview"
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-[8px]"
              />
              <button
                type="button"
                onClick={handleDeleteBanner}
                className="absolute top-[-10px] right-[-10px] bg-red-500 text-white p-1 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 flex flex-col gap-[8px] text-sm">
      <div className="flex items-center gap-[5px]">
        {renderIcon}
        <label
          htmlFor={id}
          className={`text-[#333333] font-semibold ${
            id.includes("_") ? "opacity-60 text-xs" : ""
          }`}
        >
          {label}
        </label>
      </div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="outline-none border border-[#DDDDDD] p-2 w-full rounded-[8px] focus:outline-none focus:shadow-[0_0_8px_rgba(228,75,55,0.3)] focus:ring-0 transition-all duration-500"
      />
    </div>
  );
}
