import Link from "next/link";

export default function MenuInCard({ label = "", href = "" }) {
  return (
    <Link
      href={href}
      className="bg-gradient-to-r from-[#E44B37] to-pink-500 rounded-[5px] p-[5px] w-full flex justify-center font-medium text-white text-md"
    >
      {label}
    </Link>
  );
}
