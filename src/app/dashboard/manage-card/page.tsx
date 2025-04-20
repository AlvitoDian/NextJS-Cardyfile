"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FormCard from "@/components/CardSelect";
import Modal from "@/components/Modal";
import { fetchCards } from "@/lib/api/card";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ManageCard() {
  const router = useRouter();

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Card", href: "/dashboard/manage-card" },
  ];

  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const inputs = useMemo(
    () => [
      {
        name: "card_link",
        label: "Link Kartu",
        type: "text",
        required: true,
        maxLength: 20,
        tooltip: "Masukkan link unik untuk kartu ini. Maksimal 20 karakter.",
        /* checkUrl: "/api/check-email", */
        onChange: (e) => handleChange(e.target.name, e.target.value),
      },
      {
        name: "title",
        label: "Nama Kartu",
        type: "text",
        required: true,
        maxLength: 100,
        tooltip:
          "Masukkan nama kartu yang mudah dikenali. Maksimal 100 karakter.",
        /* checkUrl: "/api/check-email", */
        onChange: (e) => handleChange(e.target.name, e.target.value),
      },
    ],
    [handleChange]
  );

  const handleCloseModal = () => {
    setIsModalAddOpen(false);
  };

  const handleModalSubmit = useCallback(
    async (modalPayload) => {
      try {
        setIsSubmitting(true);

        const payload = {
          card_link: formData.card_link || "",
          title: formData.title || "",
        };

        const response = await axios.post("/api/cards", payload);

        setFormData({});
        setIsModalAddOpen(false);

        const cardLink = payload.card_link;

        router.push(`/dashboard/manage-card/${cardLink}`);
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
    },
    [formData, router]
  );
  return (
    <div className="p-6 sm:ml-64 min-h-screen">
      <Breadcrumb breadcrumb={breadcrumb} title={"Card"} />

      {isModalAddOpen && (
        <Modal
          onClose={handleCloseModal}
          onSubmitSuccess={handleModalSubmit}
          inputs={inputs}
          isSubmitting={isSubmitting}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-center w-full pt-[200px]">
          <span className="loading loading-bars loading-lg text-[#E34D39]"></span>
        </div>
      ) : (
        <div className="flex">
          <div className="flex gap-[30px] flex-wrap">
            <FormCard
              isPlus={true}
              image={
                "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1714122464/cld-sample-5.jpg"
              }
              title={"Add New"}
              onClick={() => setIsModalAddOpen(true)}
            />
            {data?.map((card, index) => (
              <div key={index}>
                <FormCard
                  /*      image={card.primg} */
                  title={card.title}
                  id={card.card_link}
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
