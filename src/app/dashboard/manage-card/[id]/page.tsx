"use client";

import { useState, useCallback, useEffect } from "react";
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
import axios from "axios";
import { CardPayload } from "@/types/card";
import { fetchCardById } from "@/lib/api/card";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ id: string }>;
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

  const [cardData, setCardData] = useState<CardPayload>({
    themename: "neobrutalism-designer",
    menu: [
      {
        href: "#works",
        label: "Works",
        textColor: "#000000",
        backgroundColor: "#ffcd29",
      },
      {
        href: "#bio",
        label: "Bio",
        textColor: "#ffffff",
        backgroundColor: "#111111",
      },
      {
        href: "#contact",
        label: "Let's Talk",
        textColor: "#ffffff",
        backgroundColor: "#e11d48",
      },
    ],
    username: "Luca Moreno",
    bannerImage: "",
    description:
      "Multidisciplinary designer breaking norms through bold layouts, loud color choices, and unapologetic visuals.",
    socialMedia: [
      {
        href: "https://www.behance.net/lucamdesign",
        platform: "Behance",
      },
      {
        href: "https://www.instagram.com/lucabrutal",
        platform: "Instagram",
      },
      {
        href: "https://www.linkedin.com/in/lucamoreno",
        platform: "LinkedIn",
      },
    ],
    profileImage: "",
    backgroundColor: "#ffffff",
    usernameTextColor: "#111111",
    descriptionTextColor: "#e11d48",
  });

  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const platforms: string[] = [
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Instagram",
    "Github",
  ];

  const updateCurrentFieldsBasedOnData = (data: CardPayload) => {
    const baseFields = [
      { id: "username" },
      { id: "description" },
      { id: "profileImage" },
    ];

    const conditionalFields = [];

    if (data.socialMedia && data.socialMedia.length > 0) {
      conditionalFields.push({ id: "socialMedia" });
    }

    if (data.menu && data.menu.length > 0) {
      conditionalFields.push({ id: "menu" });
    }

    if (data.bannerImage && data.bannerImage != "") {
      conditionalFields.push({ id: "bannerImage" });
    }

    if (data.backgroundColor && data.backgroundColor != "") {
      conditionalFields.push({ id: "bgColor" });
    }

    return [...baseFields, ...conditionalFields];
  };

  const [currentFields, setCurrentFields] = useState<CurrentField[]>([
    { id: "username" },
    { id: "description" },
    { id: "profileImage" },
    { id: "socialMedia" },
  ]);

  //? Fetch Data
  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      try {
        const [cardsData] = await Promise.all([fetchCardById(id)]);

        const remappedData: CardPayload = {
          backgroundColor: cardsData.backgroundColor || "#ffffff",
          usernameTextColor: cardsData.usernameTextColor || "#000000",
          descriptionTextColor: cardsData.descriptionTextColor || "#000000",
          username: cardsData.username || "",
          description: cardsData.description || "",
          profileImage: cardsData.profileImage || "",
          bannerImage: cardsData.bannerImage || "",
          socialMedia:
            cardsData.socialMedia?.map((s) => ({
              platform: s.platform,
              href: s.href,
            })) || [],
          menu:
            cardsData.menu?.map((m) => ({
              label: m.label,
              href: m.href,
              backgroundColor: m.backgroundColor,
              textColor: m.textColor,
            })) || [],
        };

        // setCardData(remappedData);

        const updatedFields = updateCurrentFieldsBasedOnData(remappedData);
        setCurrentFields(updatedFields);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, [id]);
  //? Fetch Data End

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

  const handleAddField = (id: string, label: string): void => {
    try {
      if (!formFields || formFields.length === 0) {
        throw new Error("No form fields available.");
      }

      const newField = formFields.find((field) => field.id === id);

      if (!newField) {
        throw new Error(`Field with ID "${id}" not found.`);
      }

      if (currentFields.some((field) => field.id === id)) {
        toast.error(`Field ${label} already exists.`);
      } else {
        setCurrentFields((prevFields) => [...prevFields, { id }]);

        if (id === "socialMedia" && cardData.socialMedia.length === 0) {
          setCardData((prev) => ({
            ...prev,
            socialMedia: [{ platform: platforms[0], href: "" }],
          }));
        }

        if (id === "menu" && cardData.menu.length === 0) {
          setCardData((prev) => ({
            ...prev,
            menu: [{ label: "Text Here..", href: "" }],
          }));
        }
      }
    } catch (error) {
      console.error("Error adding field:", error.message);
    }
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

      // Remove field from currentFields if no items left
      if (newData[type].length === 0) {
        setCurrentFields((prevFields) =>
          prevFields.filter((field) => field.id !== type)
        );
      }

      return newData;
    });
  };

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

      await axios.put(`/api/cards/${id}`, cardData);

      toast.success("Kartu berhasil diperbarui!");
      fetchCardById(id);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan tak terduga. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [cardData, id]);

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb breadcrumb={breadcrumb} title={cardData?.username} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editor Panel */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Fields</h2>

              <div className="flex gap-[10px]">
                <Button
                  onClick={handleAddModal}
                  label="Add Field"
                  icon="ClipboardPlus"
                  variant="secondary"
                />
                <Button
                  onClick={handleModalSubmit}
                  variant="primary"
                  icon="CheckCheck"
                  isLoading={isSubmitting}
                  label="Save"
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

            {isLoading ? (
              <Loader screen={true} />
            ) : (
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
                                                  label={key
                                                    .replace(/([A-Z])/g, " $1")
                                                    .replace(/^./, (str) =>
                                                      str.toUpperCase()
                                                    )}
                                                  id={`${field.id}_${key}_${idx}`}
                                                  type={
                                                    key === "platform"
                                                      ? "select"
                                                      : key ===
                                                          "backgroundColor" ||
                                                        key === "textColor"
                                                      ? "color"
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
                          subInput={field.subInput}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Preview Card
              </h2>
              {/*  <div className="flex gap-2">
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
              </div> */}
            </div>

            {isLoading ? (
              <Loader screen={true} />
            ) : (
              <>
                <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                  <CardPreview
                    backgroundColor={cardData.backgroundColor}
                    username={cardData.username}
                    description={cardData.description}
                    profileImage={cardData.profileImage}
                    bannerImage={cardData.bannerImage}
                    menu={cardData.menu}
                    socialMedia={cardData.socialMedia}
                    usernameTextColor={cardData.usernameTextColor}
                    descriptionTextColor={cardData.descriptionTextColor}
                  />
                </div>

                <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-500 mt-0.5">
                      <Info size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 mb-1">
                        Customization Tips
                      </h4>
                      <p className="text-xs text-blue-600">
                        Make sure the background and text colors have good
                        contrast to improve readability. Add menu items and
                        social media links to maximize engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
