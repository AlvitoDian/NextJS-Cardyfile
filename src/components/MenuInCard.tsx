import Link from "next/link";

export default function MenuInCard({ label, href }) {
  return (
    <Link
      href={href}
      className="bg-[#E44B37] rounded-[5px] p-[5px] w-full flex justify-center font-medium text-white text-md"
    >
      {label}
    </Link>
  );
}
