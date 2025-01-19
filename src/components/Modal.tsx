import { useState, useEffect, useRef } from "react";
import Select from "react-select";

interface InputField {
  name: string;
  label: string;
  type: "text" | "select";
  required?: boolean;
  options?: string[];
  maxLength?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

interface ModalProps {
  onClose: () => void;
  onAdd: () => void;
  inputs: InputField[];
}

export default function Modal({ onClose, onAdd, inputs }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const dropdownStyle = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused ? "0 0 8px rgba(228, 75, 55, 0.3)" : "none",
      borderColor: state.isFocused ? "#E44B37" : provided.borderColor,
      borderRadius: "8px",
      "&:hover": {
        borderColor: "#E44B37",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#E44B37"
        : state.isSelected
        ? "#FBC5B4"
        : "white",
      color: state.isFocused || state.isSelected ? "white" : "#333",
      boxShadow: state.isFocused ? "0 0 8px rgba(228, 75, 55, 0.3)" : "none",
      "&:active": {
        backgroundColor: "#F78E7F",
      },
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow:
        "0 0 8px rgba(228, 75, 55, 0.3), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      borderRadius: "8px",
    }),
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        className={`py-[30px] px-[30px] bg-white w-[50vw] rounded-lg shadow-lg transition-all duration-300 transform flex flex-col gap-[20px] ${
          isVisible ? "translate-y-[0px]" : "-translate-y-[30px]"
        }`}
      >
        <div className="font-semibold text-[18px]">Create New Card</div>
        <div className="flex flex-col gap-[15px]">
          {inputs.map((input) => (
            <div key={input.name} className="flex flex-col gap-[7px]">
              <label
                htmlFor={input.name}
                className="text-[#333333] font-semibold text-sm"
              >
                {input.label}
              </label>
              {input.type === "textarea" ? (
                <textarea
                  id={input.name}
                  name={input.name}
                  maxLength={input.maxLength}
                  required={input.required}
                  onChange={input.onChange}
                  className="outline-none border border-[#DDDDDD] p-2 w-full rounded-[8px] focus:outline-none focus:shadow-[0_0_8px_rgba(228,75,55,0.3)] focus:ring-0 transition-all duration-500"
                />
              ) : input.type === "select" ? (
                <Select
                  id={input.name}
                  value={input.options?.find(
                    (option) => option === input.value
                  )}
                  onChange={(selectedOption) =>
                    input.onChange({
                      target: { value: selectedOption?.value },
                    })
                  }
                  options={input.options.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  className="w-full"
                  classNamePrefix="react-select"
                />
              ) : (
                <input
                  id={input.name}
                  name={input.name}
                  type={input.type}
                  maxLength={input.maxLength}
                  required={input.required}
                  onChange={input.onChange}
                  className="outline-none border border-[#DDDDDD] p-2 w-full rounded-[8px] focus:outline-none focus:shadow-[0_0_8px_rgba(228,75,55,0.3)] focus:ring-0 transition-all duration-500"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-[10px]">
          <button
            onClick={handleClose}
            className="mt-2 px-[15px] py-[6px] text-sm font-semibold bg-gradient-to-r from-[#E44B37] to-pink-500 text-white rounded-[8px] flex items-center gap-[5px]"
          >
            Close
          </button>
          <button
            onClick={onAdd}
            className="mt-2 px-[15px] py-[6px] text-sm font-semibold bg-gradient-to-r from-[#E44B37] to-pink-500 text-white rounded-[8px] flex items-center gap-[5px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
