import Image from "next/image";
import SocialMediaIcon from "@/components/SocialMediaIcon";
import MenuInCard from "@/components/MenuInCard";

export default function CardPreview() {
  return (
    <div className="bg-white relative overflow-hidden">
      <div className="flex justify-center">
        {/* Banner Section */}
        <div className="absolute top-0 left-0 w-full flex justify-center ">
          <Image
            src="https://res.cloudinary.com/dgfcvu9ns/image/upload/v1724570906/banner1_hmwcva.png"
            alt="Profile Banner"
            className="w-full h-[150px] object-cover"
            width={100}
            height={100}
          />
        </div>
        {/* Banner Section End */}

        <div className="flex flex-col items-center">
          {/* Image Profile Section */}
          <div className="pt-[100px] flex justify-center items-center">
            {/* Profile Image */}
            <Image
              className="w-[90px] h-[90px] rounded-full z-10"
              src={
                "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1735989130/Layer_1_uflkla.png"
              }
              alt="Rounded avatar"
              width={100}
              height={100}
            />
          </div>
          {/* Image Profile Section End */}

          {/* Description Section */}
          <span className="text-center mt-4 text-[#67748e] text-sm px-2 font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          {/* Description Section End */}

          {/* Social Media Section */}
          <div className="mt-4 flex gap-[10px]">
            <SocialMediaIcon />
            <SocialMediaIcon />
            <SocialMediaIcon />
            <SocialMediaIcon />
          </div>
          {/* Social Media Section End */}

          {/* Menu Section */}
          <div className="mt-8 flex flex-col gap-[10px] w-full px-[15px]">
            <MenuInCard />
            <MenuInCard />
            <MenuInCard />
          </div>
          {/* Menu Section End */}

          {/* Footer Section */}
          <span className="text-center mt-6 text-[#67748e] text-sm px-2 font-normal">
            Made with{" "}
            <span className="text-[#E44B37] font-semibold">Cardyfile</span>
          </span>
          {/* Footer Section End */}
        </div>
      </div>
    </div>
  );
}
