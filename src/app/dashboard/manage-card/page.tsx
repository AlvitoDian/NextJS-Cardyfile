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
      {
        name: "template",
        label: "Choose Template",
        type: "checkbox-image",
        required: true,
        multiple: false,
        containerClassName: "grid-cols-2 sm:grid-cols-4",
        imageClassName: "h-40",
        options: [
          {
            id: "modern",
            label: "Minimalist Elegance",
            imageSrc: "/assets/images/basic.png",
            description: "A minimalist template with elegant simplicity",
          },
          {
            id: "classic",
            label: "Modern Professional",
            imageSrc: "/assets/images/vintage.png",
            description: "A modern and professional looking template",
          },
          {
            id: "creative",
            label: "Creative Vibrant",
            imageSrc: "/assets/images/creative.png",
            description: "A vibrant template for creative minds",
          },
          {
            id: "techinnovator",
            label: "Tech Innovator",
            imageSrc: "/assets/images/techinnovator.png",
            description: "A template designed for tech enthusiasts",
          },
          {
            id: "artisticvision",
            label: "Artistic Vision",
            imageSrc: "/assets/images/artisticvision.png",
            description: "A visually rich template for artists",
          },
          {
            id: "academicsage",
            label: "Academic Sage",
            imageSrc: "/assets/images/academicsage.png",
            description: "An intellectual layout for academics",
          },
          {
            id: "creativelens",
            label: "Creative Lens",
            imageSrc: "/assets/images/creativelens.png",
            description: "A fresh creative style with perspective",
          },
          {
            id: "educationalhub",
            label: "Educational Hub",
            imageSrc: "/assets/images/educationalhub.png",
            description: "A perfect template for educators and trainers",
          },
          {
            id: "strategicgrowth",
            label: "Strategic Growth",
            imageSrc: "/assets/images/strategicgrowth.png",
            description: "Ideal for business and growth strategies",
          },
          {
            id: "digitalcreator",
            label: "Digital Creator",
            imageSrc: "/assets/images/digitalcreator.png",
            description: "A modern look for digital content creators",
          },
          {
            id: "corporateprestige",
            label: "Corporate Prestige",
            imageSrc: "/assets/images/corporateprestige.png",
            description: "Professional and prestigious template for corporates",
          },
          {
            id: "neodesign",
            label: "Neo Design",
            imageSrc: "/assets/images/neodesign.png",
            description:
              "Sleek and professional template tailored for modern businesses and corporate portfolios. Clean layout, refined typography, and a strong visual hierarchy.",
          },
        ],
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
        temp_id: formData.template || "",
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
