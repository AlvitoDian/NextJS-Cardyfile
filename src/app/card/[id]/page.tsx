"use client";

import Image from "next/image";
import SocialMediaIcon from "@/components/SocialMediaIcon";
import MenuInCard from "@/components/MenuInCard";
import { fetchCardById } from "@/lib/api/card";
import { CardPayload } from "@/types/card";
import { use, useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function CardPreview({ params }: PageProps) {
  const { id } = use(params);

  const [cardData, setCardData] = useState<CardPayload>({
    backgroundColor: "#ffffff",
    username: "Leikha Mandasari",
    description:
      "Leikha Mandasari is a professional in the field of information technology.",
    profileImage: "",
    bannerImage: "",
    socialMedia: [{ platform: "Instagram", href: "" }],
    menu: [{ label: "Home", href: "" }],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  //? Fetch Data
  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      try {
        const [cardsData] = await Promise.all([fetchCardById(id)]);

        setCardData(cardsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, [id]);
  //? Fetch Data End

  return (
    <div className="bg-gradient-to-r from-[#E44B37] to-pink-500 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        {isLoading ? (
          <Loader screen={true} />
        ) : (
          <div className="flex justify-center">
            {/* Banner Section */}
            <div className="absolute top-0 left-0 w-full">
              <Image
                src={cardData.bannerImage}
                alt="Profile Banner"
                className="w-full h-[150px] object-cover rounded-t-2xl"
                width={400}
                height={150}
              />
            </div>
            {/* Banner Section End */}

            <div className="flex flex-col items-center w-full">
              {/* Image Profile Section */}
              <div className="pt-[100px] flex justify-center items-center relative z-10">
                {/* Profile Image */}
                <Image
                  className="w-[90px] h-[90px] rounded-full border-4 border-white shadow-lg"
                  src={cardData.profileImage}
                  alt="Rounded avatar"
                  width={90}
                  height={90}
                />
              </div>
              {/* Image Profile Section End */}

              {/* Description Section */}
              <span className="text-center mt-4 text-[#67748e] text-sm px-6 font-normal">
                {cardData.description}
              </span>
              {/* Description Section End */}

              {/* Social Media Section */}
              <div className="mt-4 flex gap-[10px]">
                {cardData.socialMedia.map((item, index) => (
                  <SocialMediaIcon
                    key={index}
                    platform={item.platform}
                    href={item.href}
                  />
                ))}
              </div>
              {/* Social Media Section End */}

              {/* Menu Section */}
              <div className="mt-8 flex flex-col gap-[10px] w-full px-6">
                {cardData.menu.map((item, index) => (
                  <MenuInCard key={index} label={item.label} href={item.href} />
                ))}
              </div>
              {/* Menu Section End */}

              {/* Footer Section */}
              <span className="text-center mt-6 mb-8 text-[#67748e] text-sm px-6 font-normal">
                Made with{" "}
                <span className="text-[#E44B37] font-semibold">Cardyfile</span>
              </span>
              {/* Footer Section End */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
