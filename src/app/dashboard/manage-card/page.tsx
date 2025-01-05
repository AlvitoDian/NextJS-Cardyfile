"use client";

import { useState } from "react";
import CardPreview from "@/components/CardPreview";
import CardFormInput from "@/components/CardFormInput";
import ModalAddField from "@/components/ModalAddField";
import { getFormFields } from "@/utils/cardFormFields";

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

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const platforms = ["Facebook", "Twitter", "LinkedIn", "Instagram", "Github"];

  const handleAddModal = () => {
    setIsModalAddOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalAddOpen(false);
  };

  const handleAddField = (id) => {
    try {
      if (!formFields || formFields.length === 0) {
        throw new Error("No form fields available.");
      }

      const newField = formFields.find((field) => field.id === id);

      if (!newField) {
        throw new Error(`Field with ID "${id}" not found.`);
      }

      if (currentFields.some((field) => field.id === id)) {
        alert(`Field with ID "${id}" already exists.`);
      } else {
        setCurrentFields((prevFields) => [...prevFields, { id }]);
        console.log(`Added field: ${newField.label}`);
      }
    } catch (error) {
      console.error("Error adding field:", error.message);
    } finally {
      handleCloseModal();
    }
  };

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
  const [currentFields, setCurrentFields] = useState([
    { id: "username" },
    { id: "description" },
    { id: "profileImage" },
  ]);

  const formFields = getFormFields(
    cardData,
    handleCardDataChange,
    handleCardFileImgChange,
    handleArrayChange,
    addItem,
    removeItem
  );

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex">
        <div className="w-1/2 p-4 bg-blue-100">
          <button
            onClick={handleAddModal}
            className="mt-2 p-2 bg-green-500 text-white"
          >
            Add Field
          </button>

          {isModalAddOpen && (
            <ModalAddField onClose={handleCloseModal} onAdd={handleAddField} />
          )}

          {formFields
            .filter((field) =>
              currentFields.some((currentField) => currentField.id === field.id)
            )
            .map((field, index) => {
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
