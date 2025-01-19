"use client";

import { useState } from "react";
import CardPreview from "@/components/CardPreview";
import CardFormInput from "@/components/CardFormInput";
import ModalAddField from "@/components/ModalAddField";
import { getFormFields } from "@/utils/cardFormFields";
import { NotepadText, Plus, Trash2 } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function ManageCard() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Manage Card", href: "/dashboard/manage-card" },
  ];

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
    setCardData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCardFileImgChange = (field: string, file: File | null) => {
    console.log(file, "file");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardData((prevData) => ({
          ...prevData,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setCardData((prevData) => ({
        ...prevData,
        [field]: "",
      }));
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
      updatedItems[index][key] = value;
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

  const removeItem = (type: "menu" | "socialMedia", index: number) => {
    setCardData((prevData) => {
      const newData = {
        ...prevData,
        [type]: prevData[type].filter((_, i) => i !== index),
      };

      if (newData[type].length === 0) {
        setCurrentFields((prevFields) =>
          prevFields.filter((field) => field.id !== type)
        );
      }

      return newData;
    });
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

  console.log(cardData, "cardData");

  return (
    <div className="p-6 sm:ml-64">
      <Breadcrumb breadcrumb={breadcrumb} title={"Sunting Card"} />
      <div className="flex">
        <div className="w-1/2 p-[10px] bg-white">
          <button
            onClick={handleAddModal}
            className="mt-2 px-[15px] py-[6px] text-sm font-semibold bg-gradient-to-r from-[#E44B37] to-pink-500 text-white rounded-[8px] mb-[16px] flex items-center gap-[5px]"
          >
            <NotepadText size={16} />
            Add Field
          </button>

          <div
            className="bg-white rounded-xl p-6"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
            }}
          >
            {isModalAddOpen && (
              <ModalAddField
                onClose={handleCloseModal}
                onAdd={handleAddField}
              />
            )}
            <div className="grid grid-cols-1 gap-[5px]">
              {formFields
                .filter((field) =>
                  currentFields.some(
                    (currentField) => currentField.id === field.id
                  )
                )
                .map((field, index) => {
                  if (field.type === "array") {
                    return (
                      <div key={index} className="mb-4 ">
                        <div className="flex items-center gap-[10px] pb-[7px]">
                          <h3 className="text-[#333333] font-semibold">
                            {field.label}
                          </h3>
                          <button
                            onClick={field.addItem}
                            className="px-[10px] py-[4px] font-semibold bg-[#E44B37] text-white rounded-[8px] text-xs flex items-center gap-[3px]"
                          >
                            <Plus size={15} />
                            Add
                          </button>
                        </div>
                        {field.value.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex gap-2 mb-2 items-center"
                          >
                            {field.keys.map((key, i) => (
                              <CardFormInput
                                key={i}
                                label={
                                  key.charAt(0).toUpperCase() + key.slice(1)
                                }
                                id={`${field.id}_${key}_${idx}`}
                                type={key === "platform" ? "select" : "text"}
                                value={item[key]}
                                onChange={(value: string) =>
                                  field.onChange(value, idx, key)
                                }
                                options={
                                  key === "platform" ? platforms : undefined
                                }
                              />
                            ))}
                            <button
                              onClick={() => field.removeItem(field.id, idx)}
                              className="self-center text-red-500 pt-[10px]"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
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

            <button
              type="submit"
              className="w-full px-[15px] py-[6px] bg-gradient-to-r from-[#E44B37] to-pink-500 text-white rounded-[8px] hover:opacity-90 transition-opacity font-semibold"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="w-1/2 bg-white flex justify-center">
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
