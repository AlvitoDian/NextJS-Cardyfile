"use client";

import { useState, useCallback, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FormCard from "@/components/CardSelect";
import Modal from "@/components/Modal";

export default function ManageCard() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Card", href: "/dashboard/manage-card" },
  ];

  const [formData, setFormData] = useState({});
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  //? Common Handle Change
  const handleChange = useCallback((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  //? Common Handle Change End

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
        name: "cardid",
        label: "Bin ID",
        type: "text",
        required: true,
        maxLength: "20",
        onChange: (e) => handleChange(e.target.name, e.target.value),
      },
      {
        name: "werks",
        label: "Gudang",
        type: "select",
        options: [
          { value: "MST", label: "Master Data" },
          { value: "REP", label: "Laporan" },
          { value: "TRN", label: "Transaksi" },
          { value: "SET", label: "Pengaturan" },
        ],
        required: true,
        onChange: (e) => handleChange(e.target.name, e.target.value),
      },
      {
        name: "name1",
        required: true,
        maxLength: "40",
        label: "Deskripsi",
        type: "text",
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
    </div>
  );
}
