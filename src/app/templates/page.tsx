"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Star, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Templates() {
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 12;

  const templates = [
    {
      id: 1,
      name: "Minimalist Elegance",
      image: "/assets/images/basic.png",
      usageCount: 1245,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Modern Professional",
      image: "/assets/images/vintage.png", // This one already exists in your original list.
      usageCount: 982,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Creative Vibrant",
      image: "/assets/images/creative.png",
      usageCount: 876,
      rating: 4.5,
    },
    {
      id: 4,
      name: "Tech Innovator",
      image: "/assets/images/techinnovator.png",
      usageCount: 680,
      rating: 4.7,
    },
    {
      id: 5,
      name: "Artistic Vision",
      image: "/assets/images/artisticvision.png",
      usageCount: 520,
      rating: 4.5,
    },
    {
      id: 7,
      name: "Academic Sage",
      image: "/assets/images/academicsage.png",
      usageCount: 410,
      rating: 4.4,
    },
    {
      id: 8,
      name: "Creative Lens",
      image: "/assets/images/creativelens.png",
      usageCount: 600,
      rating: 4.8,
    },
    {
      id: 9,
      name: "Educational Hub",
      image: "/assets/images/educationalhub.png",
      usageCount: 550,
      rating: 4.3,
    },
    {
      id: 10,
      name: "Strategic Growth",
      image: "/assets/images/strategicgrowth.png",
      usageCount: 700,
      rating: 4.7,
    },
    {
      id: 11,
      name: "Digital Creator",
      image: "/assets/images/digitalcreator.png",
      usageCount: 620,
      rating: 4.6,
    },
    {
      id: 12,
      name: "Corporate Prestige",
      image: "/assets/images/corporateprestige.png",
      usageCount: 890,
      rating: 4.9,
    },
    {
      id: 13,
      name: "Neo Design",
      image: "/assets/images/neodesign.png",
      usageCount: 890,
      rating: 4.9,
    },
  ];

  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = templates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );
  const totalPages = Math.ceil(templates.length / templatesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <section className="py-12 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Explore Our Templates
            </h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Browse our collection of professional templates. Each template
              shows how many times it's been used by our community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <div className="h-48 bg-white">
                    <Image
                      src={template.image}
                      alt={template.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
                    <h3 className="text-white font-semibold text-sm">
                      {template.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-end items-center mb-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{template.usageCount.toLocaleString()} uses</span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/manage-card"
                    className="w-full py-2 bg-[#e44b37] text-white rounded-md hover:bg-opacity-90 transition flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Use Template
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-md flex items-center justify-center ${
                      currentPage === number
                        ? "bg-[#e44b37] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
