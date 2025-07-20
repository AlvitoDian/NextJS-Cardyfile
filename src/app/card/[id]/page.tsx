import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import SocialMediaIcon from "@/components/SocialMediaIcon";
import MenuInCard from "@/components/MenuInCard";
import { fetchCardById } from "@/lib/api/card";
import { CardPayload } from "@/types/card";
import { postView } from "@/lib/api/view";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getDefaultCardData = (): CardPayload => ({
  backgroundColor: "#ffffff",
  usernameTextColor: "#000000",
  descriptionTextColor: "#67748e",
  username: "Leikha Mandasari",
  description:
    "Leikha Mandasari is a professional in the field of information technology.",
  profileImage: "",
  bannerImage: "",
  socialMedia: [{ platform: "Instagram", href: "" }],
  menu: [
    {
      label: "Home",
      href: "",
      backgroundColor: "#E44B37",
      textColor: "#ffffff",
    },
  ],
});

export default async function CardPreview({ params, searchParams }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  let cardData: CardPayload;
  let hasError = false;

  try {
    cardData = await fetchCardById(id);

    try {
      await postView({ card_link: id });
    } catch (viewError) {
      console.warn("Failed to track view:", viewError);
    }
  } catch (error) {
    console.error("Failed to fetch card data:", error);
    hasError = true;
    cardData = getDefaultCardData();
  }

  return (
    <div className="bg-gradient-to-r from-[#E44B37] to-pink-500 min-h-screen flex items-center justify-center p-8">
      {hasError && (
        <div className="fixed top-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50">
          Unable to load card data. Showing default content.
        </div>
      )}

      <div
        className="max-w-md w-full rounded-2xl shadow-2xl overflow-hidden relative"
        style={{ backgroundColor: cardData.backgroundColor || "#ffffff" }}
      >
        <div className="flex justify-center">
          {/* Banner Section */}
          <div className="absolute top-0 left-0 w-full">
            {cardData.bannerImage ? (
              <Image
                src={cardData.bannerImage}
                alt="Profile Banner"
                className="w-full h-[150px] object-cover rounded-t-2xl"
                width={400}
                height={150}
                priority
                unoptimized={process.env.NODE_ENV === "development"}
              />
            ) : (
              <div className="w-full h-[150px] bg-gray-900 rounded-t-2xl" />
            )}
          </div>
          {/* Banner Section End */}

          <div className="flex flex-col items-center w-full">
            {/* Profile Image Section */}
            <div className="pt-[100px] flex justify-center items-center relative z-10">
              {cardData.profileImage ? (
                <Image
                  className="w-[90px] h-[90px] rounded-full border-4 border-white shadow-lg"
                  src={cardData.profileImage}
                  alt="Profile avatar"
                  width={90}
                  height={90}
                  priority
                  unoptimized={process.env.NODE_ENV === "development"}
                />
              ) : (
                <div className="w-[90px] h-[90px] rounded-full bg-[#e44b37] border-4 border-white shadow-lg flex items-center justify-center">
                  <svg
                    className="w-[50px] h-[50px] text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              )}
            </div>
            {/* Profile Image Section End */}

            {/* Username Section */}
            <div className="flex flex-wrap justify-center max-w-full">
              <h1
                className="text-center mt-4 font-semibold px-2 text-xl break-words max-w-full"
                style={{
                  color: cardData.usernameTextColor || "#E44B37",
                }}
              >
                {cardData.username}
              </h1>
            </div>
            {/* Username Section End */}

            {/* Description Section */}
            <p
              className="text-center mt-4 text-sm px-6 font-normal"
              style={{
                color: cardData.descriptionTextColor || "#67748e",
              }}
            >
              {cardData.description}
            </p>
            {/* Description Section End */}

            {/* Social Media Section */}
            {cardData.socialMedia && cardData.socialMedia.length > 0 && (
              <div className="mt-4 flex gap-[10px] flex-wrap justify-center">
                {cardData.socialMedia.map((item, index) => (
                  <SocialMediaIcon
                    key={`${item.platform}-${index}`}
                    platform={item.platform}
                    href={item.href}
                  />
                ))}
              </div>
            )}
            {/* Social Media Section End */}

            {/* Menu Section */}
            {cardData.menu && cardData.menu.length > 0 && (
              <div className="mt-8 flex flex-col gap-[10px] w-full px-6">
                {cardData.menu.map((item, index) => (
                  <MenuInCard
                    key={`${item.label}-${index}`}
                    label={item.label}
                    href={item.href}
                    bgColor={item.backgroundColor}
                    textColor={item.textColor}
                  />
                ))}
              </div>
            )}
            {/* Menu Section End */}

            {/* Footer Section */}
            <p className="text-center mt-6 mb-8 text-[#67748e] text-sm px-6 font-normal">
              Made with{" "}
              <span className="text-[#E44B37] font-semibold">Cardyfile</span>
            </p>
            {/* Footer Section End */}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  if (!id) {
    return {
      title: "Card Not Found",
      description: "The requested card could not be found.",
    };
  }

  try {
    const cardData = await fetchCardById(id);

    return {
      title: `${cardData.username} - Cardyfile`,
      description:
        cardData.description || `Check out ${cardData.username}'s digital card`,
      openGraph: {
        title: cardData.username,
        description:
          cardData.description ||
          `Check out ${cardData.username}'s digital card`,
        images: cardData.profileImage ? [cardData.profileImage] : [],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: cardData.username,
        description:
          cardData.description ||
          `Check out ${cardData.username}'s digital card`,
        images: cardData.profileImage ? [cardData.profileImage] : [],
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);

    return {
      title: "Cardyfile Preview",
      description: "Preview of digital business card",
    };
  }
}
