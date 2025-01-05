"use client";

import { useState } from "react";
import CardPreview from "@/components/CardPreview";
import CardFormInput from "@/components/CardFormInput";

export default function ManageCard() {
  const [cardData, setCardData] = useState({
    backgroundColor: "#ffffff",
    username: "Leikha Mandasari",
    description:
      "Leikha Mandasari is a professional in the field of information technology.",
    profileImage: "",
    bannerImage: "",
    socialMedia: [{ platform: "Instagram", href: "" }],
    menu: [{ label: "Home", href: "" }],
  });

  const platforms = ["Facebook", "Twitter", "LinkedIn", "Instagram", "Github"];

  const handleCardDataChange = (field, value) => {
    setCardData((prevData) => ({ ...prevData, [field]: value.value }));
  };

  const handleCardFileImgChange = (field: string, file: File | null) => {
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

  const handleArrayChange = (
    type: "menu" | "socialMedia",
    index,
    key,
    value
  ) => {
    setCardData((prevData) => {
      const updatedItems = [...prevData[type]];
      updatedItems[index][key] = value.value;
      return { ...prevData, [type]: updatedItems };
    });
  };

  const addItem = (type: "menu" | "socialMedia") => {
    const newItem =
      type === "menu"
        ? { label: "Text Here..", href: "" }
        : { platform: platforms[0], href: "" };
    setCardData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], newItem],
    }));
  };

  const removeItem = (type: "menu" | "socialMedia", index) => {
    setCardData((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((_, i) => i !== index),
    }));
  };

  const formFields = [
    {
      label: "Username",
      id: "username",
      type: "text",
      value: cardData.username,
      onChange: (value) => handleCardDataChange("username", value),
    },
    {
      label: "Description",
      id: "description",
      type: "textarea",
      value: cardData.description,
      onChange: (value) => handleCardDataChange("description", value),
    },
    {
      label: "Profile Image",
      id: "profile_image",
      type: "file",
      value: cardData.profileImage,
      onChange: (value) => handleCardFileImgChange("profileImage", value),
    },
    {
      label: "Banner Image",
      id: "banner_image",
      type: "file",
      value: cardData.bannerImage,
      onChange: (value) => handleCardFileImgChange("bannerImage", value),
    },
    {
      label: "Background Color",
      id: "bg_color",
      type: "color",
      value: cardData.backgroundColor,
      onChange: (value) => handleCardDataChange("backgroundColor", value),
    },
    {
      label: "Menu Items",
      id: "menu",
      type: "array",
      value: cardData.menu,
      onChange: (value, index, key) =>
        handleArrayChange("menu", index, key, value),
      addItem: () => addItem("menu"),
      removeItem: removeItem,
      keys: ["label", "href"],
    },
    {
      label: "Social Media",
      id: "socialMedia",
      type: "array",
      value: cardData.socialMedia,
      onChange: (value, index, key) =>
        handleArrayChange("socialMedia", index, key, value),
      addItem: () => addItem("socialMedia"),
      removeItem: removeItem,
      keys: ["platform", "href"],
    },
  ];

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex">
        <div className="w-1/2 p-4 bg-blue-100">
          {formFields.map((field, index) => {
            if (field.type === "array") {
              return (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg">{field.label}</h3>
                  {field.value.map((item, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      {field.keys.map((key, i) => (
                        <CardFormInput
                          key={i}
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          id={`${field.id}_${key}_${idx}`}
                          type={key === "platform" ? "select" : "text"}
                          value={item[key]}
                          onChange={(value: string) =>
                            field.onChange(value, idx, key)
                          }
                          options={key === "platform" ? platforms : undefined}
                        />
                      ))}
                      <button
                        onClick={() => field.removeItem(field.id, idx)}
                        className="self-center text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={field.addItem}
                    className="mt-2 p-2 bg-green-500 text-white"
                  >
                    Add {field.label}
                  </button>
                </div>
              );
            }
            return (
              <CardFormInput
                key={index}
                label={field.label}
                id={field.id}
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                options={field.type === "select" ? platforms : undefined}
              />
            );
          })}
        </div>

        <div className="w-1/2 p-4 bg-green-100 flex justify-center">
          <CardPreview
            backgroundColor={cardData.backgroundColor}
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
