"use client";

import { useState } from "react";
import CardPreview from "@/components/CardPreview";
import CardFormInput from "@/components/CardFormInput";
import ModalAddField from "@/components/ModalAddField";
import { getFormFields } from "@/utils/cardFormFields";
import { NotepadText, Plus, Trash2, Grip } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { use } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Button from "@/components/Button";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface MenuItem {
  label: string;
  href: string;
}

interface SocialMediaItem {
  platform: string;
  href: string;
}

interface CardData {
  backgroundColor: string;
  username: string;
  description: string;
  profileImage: string;
  bannerImage: string;
  socialMedia: SocialMediaItem[];
  menu: MenuItem[];
}

interface CurrentField {
  id: string;
}

export default function ManageCard({ params }: PageProps) {
  const { id } = use(params);
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Card", href: "/dashboard/manage-card" },
    { label: `${id}`, href: `/dashboard/manage-card/${id}` },
  ];

  const [cardData, setCardData] = useState<CardData>({
    backgroundColor: "#ffffff",
    username: "Leikha Mandasari",
    description:
      "Leikha Mandasari is a professional in the field of information technology.",
    profileImage: "",
    bannerImage: "",
    socialMedia: [{ platform: "Instagram", href: "" }],
    menu: [{ label: "Home", href: "" }],
  });

  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const platforms: string[] = [
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Instagram",
    "Github",
  ];

  const handleDragEnd = (
    result: DropResult,
    type: "menu" | "socialMedia"
  ): void => {
    if (!result.destination) return;

    const items = Array.from(cardData[type]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCardData((prev) => ({
      ...prev,
      [type]: items,
    }));
  };

  const handleAddModal = (): void => {
    setIsModalAddOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalAddOpen(false);
  };

  const handleAddField = (id: string): void => {
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
      }
    } catch (error) {
      console.error("Error adding field:", error.message);
    } /* finally {
      handleCloseModal();
    } */
  };

  const handleCardDataChange = (field: keyof CardData, value: string): void => {
    setCardData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCardFileImgChange = (
    field: "profileImage" | "bannerImage",
    file: File | null
  ): void => {
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
    index: number,
    key: string,
    value: string
  ): void => {
    setCardData((prevData) => {
      const updatedItems = [...prevData[type]];
      updatedItems[index] = {
        ...updatedItems[index],
        [key]: value,
      };
      return { ...prevData, [type]: updatedItems };
    });
  };

  const addItem = (type: "menu" | "socialMedia"): void => {
    const newItem =
      type === "menu"
        ? { label: "Text Here..", href: "" }
        : { platform: platforms[0], href: "" };
    setCardData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], newItem],
    }));
  };

  const removeItem = (type: "menu" | "socialMedia", index: number): void => {
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

  const [currentFields, setCurrentFields] = useState<CurrentField[]>([
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
    <div className="p-6 sm:ml-64 relative">
      <Breadcrumb breadcrumb={breadcrumb} title="Sunting Card" />
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
                    const arrayType = field.id as "menu" | "socialMedia";
                    return (
                      <div key={index} className="mb-4 relative">
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
                        <DragDropContext
                          onDragEnd={(result) =>
                            handleDragEnd(result, arrayType)
                          }
                        >
                          <Droppable
                            droppableId="droppable"
                            direction="vertical"
                          >
                            {(provided) => (
                              <div
                                className="flex flex-col gap-[10px]"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {field.value.map(
                                  (
                                    item: MenuItem | SocialMediaItem,
                                    idx: number
                                  ) => (
                                    <Draggable
                                      key={`${field.id}-${idx}`}
                                      draggableId={`${field.id}-${idx}`}
                                      index={idx}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          className="flex items-center gap-2 p-2 bg-white roundedw-full"
                                        >
                                          {field.keys.map((key, i) => (
                                            <CardFormInput
                                              key={i}
                                              label={
                                                key.charAt(0).toUpperCase() +
                                                key.slice(1)
                                              }
                                              id={`${field.id}_${key}_${idx}`}
                                              type={
                                                key === "platform"
                                                  ? "select"
                                                  : "text"
                                              }
                                              value={
                                                item[
                                                  key as keyof (
                                                    | MenuItem
                                                    | SocialMediaItem
                                                  )
                                                ]
                                              }
                                              onChange={(value: string) =>
                                                field.onChange(value, idx, key)
                                              }
                                              options={
                                                key === "platform"
                                                  ? platforms
                                                  : undefined
                                              }
                                            />
                                          ))}
                                          <div className="flex gap-3">
                                            <button
                                              onClick={() =>
                                                field.removeItem(field.id, idx)
                                              }
                                              className="text-red-500"
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                            <div
                                              className="text-gray-400 cursor-grab"
                                              {...provided.dragHandleProps}
                                            >
                                              <Grip size={16} />
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
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
                      icon={field.icon}
                    />
                  );
                })}
            </div>

            {/*   <button
              type="submit"
              className="w-full px-[15px] py-[6px] bg-gradient-to-r from-[#E44B37] to-pink-500 text-white rounded-[8px] hover:opacity-90 transition-opacity font-semibold"
            >
              Save Changes
            </button> */}
            <Button
              type="submit"
              style="w-full px-[15px] py-[6px] bg-gradient-to-r from-[#E44B37] to-pink-500 text-white rounded-[8px] hover:opacity-90 transition-opacity font-semibold"
              icon={"Simpan"}
              isLoading={isSubmitting}
              label="Simpan"
            />
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
