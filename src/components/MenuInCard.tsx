import Link from "next/link";

export default function MenuInCard({
  label = "",
  href = "",
  bgColor = "linear-gradient(to right, #E44B37, #EC4899)",
  textColor = "#ffffff",
}) {
  return (
    <Link
      href={href}
      className="rounded-[5px] p-[5px] w-full flex justify-center font-medium text-md"
      style={{
        background: bgColor,
        backgroundImage: bgColor.startsWith("linear-gradient")
          ? bgColor
          : undefined,
        color: textColor,
      }}
    >
      {label}
    </Link>
  );
}
