import { MessageSquare, Logs, Image } from "lucide-react";

export default function ModalAddField({ onClose, onAdd }) {
  const fields = [
    {
      id: "bannerImage",
      label: "Add Banner Image",
      icon: <Image color="#67748e" strokeWidth={2.25} size={20} />,
    },
    {
      id: "socialMedia",
      label: "Add Social Media",
      icon: <MessageSquare color="#67748e" strokeWidth={2.25} size={20} />,
    },
    {
      id: "menu",
      label: "Add Menu",
      icon: <Logs color="#67748e" strokeWidth={2.25} size={20} />,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex flex-col gap-[15px]">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex gap-[10px] items-center p-[8px] bg-slate-100 rounded-[4px] cursor-pointer"
              onClick={() => onAdd(field.id)}
            >
              <div>{field.icon}</div>
              <span className="text-[#67748e] font-semibold text-sm">
                {field.label}
              </span>
            </div>
          ))}
        </div>
        <div></div>
        <button
          onClick={onClose}
          className="mt-2 p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
