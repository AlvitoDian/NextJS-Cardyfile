import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import SocialMediaIcon from "@/components/SocialMediaIcon";
import MenuInCard from "@/components/MenuInCard";
import { fetchCardById } from "@/lib/api/card";
import { CardPayload } from "@/types/card";
import { postView } from "@/lib/api/view";
import {
  ClassicLayout,
  CreativeLayout,
  GlassmorphismLayout,
  MinimalistLayout,
  NeonCyberpunkLayout,
  SplitScreenLayout,
} from "@/utils/layoutTemplate";

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

  const layoutMap = {
    classic: ClassicLayout,
    minimalist: MinimalistLayout,
    creative: CreativeLayout,
    splitscreen: SplitScreenLayout,
    glassmorphism: GlassmorphismLayout,
    neoncyberpunk: NeonCyberpunkLayout,
  };

  const SelectedLayout = layoutMap[cardData.temp_id] || ClassicLayout;

  return (
    <div className="bg-gradient-to-r from-[#E44B37] to-pink-500 min-h-screen flex flex-col items-center justify-center p-8">
      {hasError && (
        <div className="fixed top-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50">
          Unable to load card data. Showing default content.
        </div>
      )}

      <div
        className="max-w-[400px] w-full rounded-3xl shadow-2xl overflow-hidden relative min-h-[640px]"
        style={{ backgroundColor: cardData.backgroundColor || "#ffffff" }}
      >
        <SelectedLayout
          username={cardData.username}
          description={cardData.description}
          profileImage={cardData.profileImage}
          bannerImage={cardData.bannerImage}
          menu={cardData.menu}
          socialMedia={cardData.socialMedia}
          usernameTextColor={cardData.usernameTextColor}
          descriptionTextColor={cardData.descriptionTextColor}
          backgroundColor={cardData.backgroundColor}
        />
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
