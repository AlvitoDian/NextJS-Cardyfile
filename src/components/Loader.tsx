export default function Loader({ screen = false }) {
  return (
    <div
      className={`flex items-center justify-center w-full pt-[200px] ${
        screen ? "min-h-[80vh]" : ""
      }`}
    >
      <span className="loading loading-bars loading-lg text-[#E34D39]"></span>
    </div>
  );
}
