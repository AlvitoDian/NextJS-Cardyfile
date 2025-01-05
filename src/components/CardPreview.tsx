"use client";

import Image from "next/image";
import SocialMediaIcon from "./SocialMediaIcon";
import MenuInCard from "./MenuInCard";
import { useState } from "react";

export default function CardPreview({
  backgroundColor,
  username,
  description,
  profileImage,
  bannerImage,
  menu,
  socialMedia,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - e.currentTarget.offsetTop);
    setScrollTop(e.currentTarget.scrollTop);
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseLeave = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = "grab";
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const moveY = e.pageY - startY;
    e.currentTarget.scrollTop = scrollTop - moveY;
  };
  return (
    <div
      className={`w-[320px] h-[640px] rounded-3xl shadow-lg relative overflow-hidden select-none`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="flex justify-center">
        {/* Banner Section */}
        <div className="absolute top-0 left-0 w-full flex justify-center ">
          <Image
            src={
              bannerImage
                ? bannerImage
                : "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1724570906/banner1_hmwcva.png"
            }
            alt="Profile Banner"
            className="w-[900px] h-[150px] object-cover"
            width={100}
            height={100}
          />
        </div>
        {/* Banner Section End */}

        <div className="flex flex-col items-center w-full">
          {/* Image Profile Section */}
          <div className="pt-[100px] flex justify-center items-center">
            {/* Profile Image */}
            <Image
              className="w-[90px] h-[90px] rounded-full z-10"
              src={
                profileImage
                  ? profileImage
                  : "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1735989130/Layer_1_uflkla.png"
              }
              alt="Rounded avatar"
              width={100}
              height={100}
            />
          </div>
          {/* Image Profile Section End */}

          {/* Username Section */}
          <div className="flex flex-wrap justify-center max-w-full">
            <span className="text-center mt-4 text-[#E44B37] font-semibold px-2 text-xl break-words max-w-full">
              {username}
            </span>
          </div>
          {/* Username Section End */}

          {/* Description Section */}
          <div className="flex flex-wrap justify-center max-w-full">
            <span className="text-center mt-4 text-[#67748e] text-sm px-2 font-normal break-words max-w-full">
              {description}
            </span>
          </div>
          {/* Description Section End */}

          {/* Social Media Section */}
          <div className="mt-4 flex gap-[10px]">
            {socialMedia.map((item, index) => (
              <SocialMediaIcon
                key={index}
                platform={item.platform}
                href={item.href}
              />
            ))}
          </div>
          {/* Social Media Section End */}

          {/* Menu Section */}
          <div className="mt-8 flex flex-col gap-[10px] w-full px-[20px]">
            {menu.map((item, index) => (
              <MenuInCard key={index} label={item.label} href={item.href} />
            ))}
          </div>
          {/* Menu Section End */}

          {/* Footer Section */}
          <span className="text-center mt-6 text-[#67748e] text-sm px-2 font-normal">
            Made with{" "}
            <span className="text-[#E44B37] font-semibold">Cardyfile</span>
          </span>
          {/* Footer Section End */}
        </div>
      </div>
    </div>
  );
}
