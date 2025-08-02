"use client";

import Image from "next/image";
import SocialMediaIcon from "./SocialMediaIcon";
import MenuInCard from "./MenuInCard";
import { useState } from "react";
import {
  ClassicLayout,
  CreativeLayout,
  GlassmorphismLayout,
  MinimalistLayout,
  ModernCardLayout,
  NeonCyberpunkLayout,
  SplitScreenLayout,
} from "@/utils/layoutTemplate";

export default function CardPreview({
  backgroundColor,
  username,
  description,
  profileImage,
  bannerImage,
  menu,
  socialMedia,
  usernameTextColor = "#E44B37",
  descriptionTextColor = "#67748e",
  temp_id,
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

  const layoutMap = {
    classic: ClassicLayout,
    minimalist: MinimalistLayout,
    creative: CreativeLayout,
    splitscreen: SplitScreenLayout,
    glassmorphism: GlassmorphismLayout,
    neoncyberpunk: NeonCyberpunkLayout,
  };

  const SelectedLayout = layoutMap[temp_id] || ClassicLayout;

  return (
    <div
      className={`max-w-[400px] w-full h-[640px] rounded-3xl relative overflow-hidden select-none backdrop-blur-sm shadow-xl`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: backgroundColor,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <SelectedLayout
        username={username}
        description={description}
        profileImage={profileImage}
        bannerImage={bannerImage}
        menu={menu}
        socialMedia={socialMedia}
        usernameTextColor={usernameTextColor}
        descriptionTextColor={descriptionTextColor}
        backgroundColor={backgroundColor}
      />
    </div>
  );
}
