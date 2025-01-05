"use client";

import { useState } from "react";
import CardPreview from "@/components/CardPreview";

export default function ManageCard() {
  const [cardData, setCardData] = useState({
    username: "Leikha Mandasari",
    description:
      "Leikha Mandasari is a professional in the field of information technology.",
    profileImage:
      "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1735989130/Layer_1_uflkla.png",
    bannerImage:
      "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1724570906/banner1_hmwcva.png",
    socialMedia: [
      { platform: "Instagram", href: "/home" },
      { platform: "Facebook", href: "/profile" },
    ],
    menu: [
      { label: "Home", href: "/home" },
      { label: "Profile", href: "/profile" },
    ],
  });
  const platforms = ["Facebook", "Twitter", "LinkedIn", "Instagram", "Github"];

  const handleInputChange = (field: string, value: string) => {
    setCardData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardData((prevData) => ({
          ...prevData,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (type: "menu" | "socialMedia") => {
    setCardData((prevData) => ({
      ...prevData,
      [type]: [
        ...prevData[type],
        type === "menu"
          ? { label: "Text Here", href: "#" }
          : { platform: platforms[0], href: "#" },
      ],
    }));
  };

  const removeItem = (type: "menu" | "socialMedia", index: number) => {
    const updatedItems = cardData[type].filter((_, i) => i !== index);
    setCardData((prevData) => ({
      ...prevData,
      [type]: updatedItems,
    }));
  };

  console.log(cardData, "cardData");

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex">
        {/* Form Input */}
        <div className="w-1/2 p-4 bg-blue-100">
          <h2 className="text-lg font-semibold">Form</h2>

          {/* Input untuk Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={cardData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* Input untuk Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block">
              Description:
            </label>
            <textarea
              id="description"
              value={cardData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* Input untuk Profile Image */}
          <div className="mb-4">
            <label htmlFor="profileImage" className="block">
              Profile Image:
            </label>
            <input
              type="file"
              id="profileImage"
              onChange={(e) => handleFileChange("profileImage", e)}
              className="border p-2 w-full"
            />
          </div>

          {/* Input untuk Banner Image */}
          <div className="mb-4">
            <label htmlFor="bannerImage" className="block">
              Banner Image:
            </label>
            <input
              type="file"
              id="bannerImage"
              onChange={(e) => handleFileChange("bannerImage", e)}
              className="border p-2 w-full"
            />
          </div>

          {/* Input Menu */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Menu</h3>
            {cardData.menu.map((menu, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <div className="w-1/2">
                  <label htmlFor={`menuLabel-${index}`} className="block">
                    Menu Label:
                  </label>
                  <input
                    type="text"
                    id={`menuLabel-${index}`}
                    value={menu.label}
                    onChange={(e) =>
                      setCardData((prevData) => {
                        const updatedMenu = [...prevData.menu];
                        updatedMenu[index].label = e.target.value;
                        return { ...prevData, menu: updatedMenu };
                      })
                    }
                    className="border p-2 w-full"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor={`menuHref-${index}`} className="block">
                    Menu Link (href):
                  </label>
                  <input
                    type="text"
                    id={`menuHref-${index}`}
                    value={menu.href}
                    onChange={(e) =>
                      setCardData((prevData) => {
                        const updatedMenu = [...prevData.menu];
                        updatedMenu[index].href = e.target.value;
                        return { ...prevData, menu: updatedMenu };
                      })
                    }
                    className="border p-2 w-full"
                  />
                </div>
                <button
                  onClick={() => removeItem("menu", index)}
                  className="self-center text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addItem("menu")}
              className="mt-2 p-2 bg-green-500 text-white"
            >
              Add Menu
            </button>
          </div>

          {/* Input Social Media */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Social Media</h3>
            {cardData.socialMedia.map((social, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <div className="w-1/2">
                  <label htmlFor={`socialPlatform-${index}`} className="block">
                    Platform:
                  </label>
                  <select
                    id={`socialPlatform-${index}`}
                    value={social.platform}
                    onChange={(e) =>
                      setCardData((prevData) => {
                        const updatedSocialMedia = [...prevData.socialMedia];
                        updatedSocialMedia[index].platform = e.target.value;
                        return { ...prevData, socialMedia: updatedSocialMedia };
                      })
                    }
                    className="border p-2 w-full"
                  >
                    {platforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label htmlFor={`socialLink-${index}`} className="block">
                    Link (URL):
                  </label>
                  <input
                    type="url"
                    id={`socialLink-${index}`}
                    value={social.href}
                    onChange={(e) =>
                      setCardData((prevData) => {
                        const updatedSocialMedia = [...prevData.socialMedia];
                        updatedSocialMedia[index].href = e.target.value;
                        return { ...prevData, socialMedia: updatedSocialMedia };
                      })
                    }
                    className="border p-2 w-full"
                  />
                </div>
                <button
                  onClick={() => removeItem("socialMedia", index)}
                  className="self-center text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addItem("socialMedia")}
              className="mt-2 p-2 bg-green-500 text-white"
            >
              Add Social Media
            </button>
          </div>
        </div>

        {/* Card Preview */}
        <div className="w-1/2 p-4 bg-green-100 flex justify-center">
          <CardPreview
            username={cardData.username}
            description={cardData.description}
            profileImage={cardData.profileImage}
            bannerImage={cardData.bannerImage}
            menu={cardData.menu}
            socialMedia={cardData.socialMedia}
          />
        </div>
      </div>
    </div>
  );
}
