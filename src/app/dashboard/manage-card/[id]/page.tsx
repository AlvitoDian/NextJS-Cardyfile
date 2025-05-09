"use client";

import { useState, useCallback } from "react";
import CardPreview from "@/components/CardPreview";
import CardFormInput from "@/components/CardFormInput";
import ModalAddField from "@/components/ModalAddField";
import { getFormFields } from "@/utils/cardFormFields";
import { Plus, Trash2, Grip, Info, Smartphone, Eye } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { use } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { CardPayload } from "@/types/card";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface CurrentField {
  id: string;
}

export default function ManageCard({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Card", href: "/dashboard/manage-card" },
    { label: `${id}`, href: `/dashboard/manage-card/${id}` },
  ];

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

  console.log(cardData, "prepare payload");

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

  const handleModalSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      /* console.log(cardData, "cardData");
      return; */

      const response = await axios.put(`/api/cards/${id}`, cardData);

      setIsModalAddOpen(false);

      router.push(`/dashboard/manage-card/${id}`);
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          err.message ||
          "An unexpected error has occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [cardData, router, id]);

  return (
    <div className="p-6 sm:ml-64 min-h-screen ">
      <div className="mb-6">
        <Breadcrumb breadcrumb={breadcrumb} title="Kustomisasi Card" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editor Panel */}
        <div className="w-full lg:w-1/2">
          {/*   <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="flex border-b">
              <button className="px-6 py-3 font-medium text-gray-800 border-b-2 border-red-500">
                Konten
              </button>
              <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-800">
                Tampilan
              </button>
              <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-800">
                Pengaturan
              </button>
            </div>
          </div> */}

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Kolom Informasi
              </h2>

              <div className="flex gap-[10px]">
                <Button
                  onClick={handleAddModal}
                  label="Tambah Kolom"
                  icon="ClipboardPlus"
                  variant="secondary"
                />
                <Button
                  onClick={handleModalSubmit}
                  variant="primary"
                  icon="CheckCheck"
                  isLoading={isSubmitting}
                  label="Simpan"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                />
              </div>
            </div>

            {isModalAddOpen && (
              <ModalAddField
                onClose={handleCloseModal}
                onAdd={handleAddField}
              />
            )}

            <div className="space-y-6">
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
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-gray-800 font-semibold flex items-center">
                            {field.icon && (
                              <span className="mr-2 text-red-500">
                                <field.icon size={18} />
                              </span>
                            )}
                            {field.label}
                          </h3>
                          <button
                            onClick={field.addItem}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm flex items-center gap-1 transition-colors"
                          >
                            <Plus size={14} />
                            Tambah Item
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
                                className="space-y-3"
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
                                          className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm"
                                        >
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-500"></span>
                                            <div className="flex items-center gap-2">
                                              <button
                                                onClick={() =>
                                                  field.removeItem(
                                                    field.id,
                                                    idx
                                                  )
                                                }
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                title="Hapus"
                                              >
                                                <Trash2 size={16} />
                                              </button>
                                              <div
                                                className="text-gray-400 hover:text-gray-600 cursor-grab"
                                                {...provided.dragHandleProps}
                                                title="Pindahkan"
                                              >
                                                <Grip size={16} />
                                              </div>
                                            </div>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                                  field.onChange(
                                                    value,
                                                    idx,
                                                    key
                                                  )
                                                }
                                                options={
                                                  key === "platform"
                                                    ? platforms
                                                    : undefined
                                                }
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                                )}
                                {provided.placeholder}
                                {field.value.length === 0 && (
                                  <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    Belum ada item. Klik "Tambah Item" untuk
                                    menambahkan.
                                  </div>
                                )}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                    );
                  }

                  return (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <CardFormInput
                        label={field.label}
                        id={field.id}
                        type={field.type}
                        value={field.value}
                        onChange={field.onChange}
                        options={
                          field.type === "select" ? platforms : undefined
                        }
                        icon={field.icon}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Pratinjau Card
              </h2>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  title="Lihat sebagai pengunjung"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  title="Tampilan mobile"
                >
                  <Smartphone size={18} />
                </button>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
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

            <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 mt-0.5">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-700 mb-1">
                    Tips Kustomisasi
                  </h4>
                  <p className="text-xs text-blue-600">
                    Pastikan warna latar dan teks memiliki kontras yang baik
                    untuk meningkatkan keterbacaan. Tambahkan menu dan sosial
                    media untuk memaksimalkan engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
