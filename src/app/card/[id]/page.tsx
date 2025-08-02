import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
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
import Image from "next/image";
import SocialMediaIcon from "@/components/SocialMediaIcon";
import MenuInCard from "@/components/MenuInCard";

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
        {cardData.temp_id === "classic" ? (
          <div className="flex justify-center">
            {/* Banner Section */}
            <div className="absolute top-0 left-0 w-full flex justify-center ">
              {cardData.bannerImage ? (
                <Image
                  src={cardData.bannerImage}
                  alt="Profile Banner"
                  className="w-[900px] h-[150px] object-cover"
                  width={900}
                  height={150}
                />
              ) : (
                <div className="w-full h-[150px] bg-gray-900"></div>
              )}
            </div>
            {/* Banner Section End */}

            <div className="flex flex-col items-center w-full">
              {/* Image Profile Section */}
              <div className="pt-[100px] flex justify-center items-center">
                {/* Profile Image */}
                {cardData.profileImage ? (
                  <Image
                    className="w-[90px] h-[90px] rounded-full z-10 object-cover"
                    src={cardData.profileImage}
                    alt="Profile Avatar"
                    width={90}
                    height={90}
                  />
                ) : (
                  <div className="w-[90px] h-[90px] rounded-full bg-[#e44b37] flex items-center justify-center z-10">
                    <svg
                      className="w-[50px] h-[50px] text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Image Profile Section End */}

              {/* Username Section */}
              <div className="flex flex-wrap justify-center max-w-full">
                <span
                  className="text-center mt-4  font-semibold px-2 text-xl break-words max-w-full"
                  style={{
                    color: cardData.usernameTextColor,
                  }}
                >
                  {cardData.username}
                </span>
              </div>
              {/* Username Section End */}

              {/* Description Section */}
              <div className="flex flex-wrap justify-center max-w-full">
                <span
                  className="text-center mt-4 text-sm px-2 font-normal break-words max-w-full"
                  style={{
                    color: cardData.descriptionTextColor,
                  }}
                >
                  {cardData.description}
                </span>
              </div>
              {/* Description Section End */}

              {/* Social Media Section */}
              <div className="mt-4 flex gap-[10px] flex-wrap justify-center">
                {cardData.socialMedia.map((item, index) => (
                  <SocialMediaIcon
                    key={index}
                    platform={item.platform}
                    href={item.href}
                  />
                ))}
              </div>
              {/* Social Media Section End */}

              {/* Menu Section */}
              <div className="mt-8 flex flex-col gap-[10px] w-full px-6">
                {cardData.menu.map((item, index) => (
                  <MenuInCard
                    key={index}
                    label={item.label}
                    href={item.href}
                    bgColor={item.backgroundColor}
                    textColor={item.textColor}
                  />
                ))}
              </div>
              {/* Menu Section End */}

              {/* Footer Section */}
              <p className="text-center mt-6 mb-8 text-[#67748e] text-sm px-6 font-normal">
                Made with{" "}
                <span className="text-[#E44B37] font-semibold">Cardyfile</span>
              </p>
              {/* Footer Section End */}
            </div>
          </div>
        ) : cardData.temp_id === "minimalist" ? (
          <MinimalistLayout
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
        ) : cardData.temp_id === "creative" ? (
          <CreativeLayout
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
        ) : cardData.temp_id === "splitscreen" ? (
          <SplitScreenLayout
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
        ) : cardData.temp_id === "glassmorphism" ? (
          <GlassmorphismLayout
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
        ) : cardData.temp_id === "neoncyberpunk" ? (
          <NeonCyberpunkLayout
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
        ) : (
          <div className="flex justify-center">
            {/* Banner Section */}
            <div className="absolute top-0 left-0 w-full flex justify-center ">
              {cardData.bannerImage ? (
                <Image
                  src={cardData.bannerImage}
                  alt="Profile Banner"
                  className="w-[900px] h-[150px] object-cover"
                  width={900}
                  height={150}
                />
              ) : (
                <div className="w-full h-[150px] bg-gray-900"></div>
              )}
            </div>
            {/* Banner Section End */}

            <div className="flex flex-col items-center w-full">
              {/* Image Profile Section */}
              <div className="pt-[100px] flex justify-center items-center">
                {/* Profile Image */}
                {cardData.profileImage ? (
                  <Image
                    className="w-[90px] h-[90px] rounded-full z-10 object-cover"
                    src={cardData.profileImage}
                    alt="Profile Avatar"
                    width={90}
                    height={90}
                  />
                ) : (
                  <div className="w-[90px] h-[90px] rounded-full bg-[#e44b37] flex items-center justify-center z-10">
                    <svg
                      className="w-[50px] h-[50px] text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Image Profile Section End */}

              {/* Username Section */}
              <div className="flex flex-wrap justify-center max-w-full">
                <span
                  className="text-center mt-4  font-semibold px-2 text-xl break-words max-w-full"
                  style={{
                    color: cardData.usernameTextColor,
                  }}
                >
                  {cardData.username}
                </span>
              </div>
              {/* Username Section End */}

              {/* Description Section */}
              <div className="flex flex-wrap justify-center max-w-full">
                <span
                  className="text-center mt-4 text-sm px-2 font-normal break-words max-w-full"
                  style={{
                    color: cardData.descriptionTextColor,
                  }}
                >
                  {cardData.description}
                </span>
              </div>
              {/* Description Section End */}

              {/* Social Media Section */}
              <div className="mt-4 flex gap-[10px] flex-wrap justify-center">
                {cardData.socialMedia.map((item, index) => (
                  <SocialMediaIcon
                    key={index}
                    platform={item.platform}
                    href={item.href}
                  />
                ))}
              </div>
              {/* Social Media Section End */}

              {/* Menu Section */}
              <div className="mt-8 flex flex-col gap-[10px] w-full px-6">
                {cardData.menu.map((item, index) => (
                  <MenuInCard
                    key={index}
                    label={item.label}
                    href={item.href}
                    bgColor={item.backgroundColor}
                    textColor={item.textColor}
                  />
                ))}
              </div>
              {/* Menu Section End */}

              {/* Footer Section */}
              <p className="text-center mt-6 mb-8 text-[#67748e] text-sm px-6 font-normal">
                Made with{" "}
                <span className="text-[#E44B37] font-semibold">Cardyfile</span>
              </p>
              {/* Footer Section End */}
            </div>
          </div>
        )}
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
