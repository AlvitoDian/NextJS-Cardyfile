"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FormCard from "@/components/CardSelect";
import Modal from "@/components/Modal";
import { fetchCards } from "@/lib/api/card";

export default function ManageCard() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Card", href: "/dashboard/manage-card" },
  ];

  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //? Common Handle Change
  const handleChange = useCallback((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  //? Common Handle Change End

  //? Fetch Data
  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      try {
        const [cardsData] = await Promise.all([fetchCards()]);
        setData(cardsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);
  //? Fetch Data End

  const imageUrl =
    "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1714122464/cld-sample-5.jpg";
  const cards = [
    { id: "1", isPlus: true, image: null, title: "Add New" },
    { id: "2", isPlus: false, image: imageUrl, title: "Template 1" },
    { id: "3", isPlus: false, image: imageUrl, title: "Template 2" },
    { id: "4", isPlus: false, image: imageUrl, title: "Template 3" },
    { id: "5", isPlus: false, image: imageUrl, title: "Template 4" },
    { id: "6", isPlus: false, image: imageUrl, title: "Template 5" },
    { id: "7", isPlus: false, image: imageUrl, title: "Template 6" },
    { id: "8", isPlus: false, image: imageUrl, title: "Template 7" },
    { id: "9", isPlus: false, image: imageUrl, title: "Template 8" },
    { id: "10", isPlus: false, image: imageUrl, title: "Template 9" },
  ];

  const inputs = useMemo(
    () => [
      {
        name: "card_link",
        label: "Link Kartu",
        type: "text",
        required: true,
        maxLength: "20",
        onChange: (e) => handleChange(e.target.name, e.target.value),
      },
    ],
    [handleChange]
  );

  const handleCloseModal = () => {
    setIsModalAddOpen(false);
  };

  const handleAddField = (id) => {
    try {
      console.log("adds");
    } catch (error) {
      console.error("Error adding field:", error.message);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="p-6 sm:ml-64">
      <Breadcrumb breadcrumb={breadcrumb} title={"Card"} />

      {isModalAddOpen && (
        <Modal
          onClose={handleCloseModal}
          onAdd={handleAddField}
          inputs={inputs}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-center w-full pt-[200px]">
          <span className="loading loading-bars loading-lg text-[#E34D39]"></span>
        </div>
      ) : (
        <div className="flex">
          <div className="flex gap-[30px] flex-wrap">
            {cards.map((card, index) => (
              <div key={index}>
                <FormCard
                  isPlus={card.isPlus}
                  image={card.image}
                  title={card.title}
                  id={card.id}
                  onClick={() => setIsModalAddOpen(true)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
