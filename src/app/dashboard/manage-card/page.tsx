"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FormCard from "@/components/CardSelect";
import Modal from "@/components/Modal";
import { fetchCards } from "@/lib/api/card";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

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
  useEffect(() => {
    loadAllData();
  }, []);
  //? Fetch Data End

  const inputs = useMemo(
    () => [
      {
        name: "card_link",
        label: "Card Link",
        type: "text",
        required: true,
        maxLength: 20,
        tooltip: "Enter a unique link for this card. Maximum 20 characters.",
        onChange: (e) => handleChange(e.target.name, e.target.value),
      },
      {
        name: "title",
        label: "Card Name",
        type: "text",
        required: true,
        maxLength: 100,
        tooltip:
          "Enter a recognizable name for the card. Maximum 100 characters.",
        onChange: (e) => handleChange(e.target.name, e.target.value),
      },
    ],
    [handleChange]
  );

  const handleCloseModal = () => {
    setIsModalAddOpen(false);
  };

  const handleModalSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      const payload = {
        card_link: formData.card_link || "",
        title: formData.title || "",
      };

      await axios.post("/api/cards", payload);

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
  }, [formData, router]);

  const handleDeleteCard = useCallback(async (id) => {
    try {
      setIsSubmitting(true);

      await axios.delete(`/api/cards/${id}`);

      await loadAllData();
    } catch (err) {
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
  }, []);

  return (
    <div>
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
        <Loader screen={true} />
      ) : (
        <div className="flex gap-[10px] flex-wrap flex-col">
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
                title={card.title}
                id={card.card_link}
                onClick={() => setIsModalAddOpen(true)}
                createdAt={card.crtdt}
                viewCount={card.total_views}
                lastModified={card.chgdt}
                onView={() => {
                  window.open(`/card/${card.card_link}`, "_blank");
                }}
                onDelete={() => handleDeleteCard(card.card_link)}
                onEdit={() => {
                  router.push(`/dashboard/manage-card/${card.card_link}`);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
