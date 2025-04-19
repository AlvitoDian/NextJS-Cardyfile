import { Plus, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FormCardProps {
  isPlus: boolean;
  image?: string;
  title: string;
  id?: string;
  onClick?: () => void;
}

export default function FormCard({
  isPlus,
  image,
  title,
  id,
  onClick,
}: FormCardProps) {
  const linkUrl = isPlus
    ? "/dashboard/manage-card/create"
    : `/dashboard/manage-card/${id}`;

  return (
    <div className="flex flex-col gap-[5px] justify-start items-start">
      {isPlus ? (
        <div
          onClick={onClick}
          className="rounded-[8px] w-[171px] h-[128px] border-[#d8dfe6] hover:shadow-[0_0_8px_rgba(228,75,55,0.3)] border-[1px] flex items-center justify-center cursor-pointer transition-all duration-400"
        >
          <Plus />
        </div>
      ) : (
        <Link
          href={linkUrl}
          className="rounded-[8px] w-[171px] h-[128px] border-[#d8dfe6] hover:shadow-[0_0_8px_rgba(228,75,55,0.3)] border-[1px] flex items-center justify-center cursor-pointer transition-all duration-400 overflow-hidden"
        >
          {image ? (
            <Image
              src={image}
              alt="Form Template"
              width={171}
              height={128}
              className="w-full h-full object-cover rounded-[8px]"
            />
          ) : (
            <div className="flex flex-col gap-[5px] items-center">
              <ImageIcon className="w-10 h-10 text-gray-400" />
              <span className="text-gray-400 text-[10px] font-semibold">
                No Image Available
              </span>
            </div>
          )}
        </Link>
      )}
      <p className="mt-1 text-[#202124] text-[14px] font-[500]">{title}</p>
    </div>
  );
}
