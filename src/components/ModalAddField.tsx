import { MessageSquare, Logs, Image, PaintBucket } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ModalAddField({ onClose, onAdd }) {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fields = [
    {
      id: "bannerImage",
      label: "Add Banner Image",
      icon: <Image color="#67748e" strokeWidth={2.25} size={20} />,
    },
    {
      id: "bgColor",
      label: "Add Background Color",
      icon: <PaintBucket color="#67748e" strokeWidth={2.25} size={20} />,
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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`py-[30px] px-[30px] bg-white rounded-lg shadow-lg w-[400px] transition-all duration-300 transform flex flex-col gap-[20px] ${
          isVisible ? "translate-y-[0px]" : "-translate-y-[30px]"
        }`}
      >
        <div className="font-semibold text-[18px]">Add Input</div>
        <div className="flex flex-col gap-[15px]">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex gap-[10px] items-center p-[8px] bg-slate-100 rounded-[4px] cursor-pointer hover:bg-slate-200 transition-all duration-200"
              onClick={() => {
                onAdd(field.id);
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
            >
              <div>{field.icon}</div>
              <span className="text-[#67748e] font-semibold text-sm">
                {field.label}
              </span>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={handleClose}
            className="mt-2 px-[15px] py-[6px] text-sm font-semibold bg-[#E44B37] text-white rounded-[8px] flex items-center gap-[5px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
