import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import Button from "./Button";
import { HelpCircle, X } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios"; // Make sure to install axios if not already

interface InputField {
  name: string;
  label: string;
  type: "text" | "select" | "textarea" | "file" | "multi-select" | "number";
  required?: boolean;
  options?: string[];
  maxLength?: number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  description?: string;
  tooltip?: string;
  checkUrl?: string; // URL to check field value availability
  value?: any;
  onCompress?: (file: File) => Promise<File>;
}

interface ModalProps {
  onClose: () => void;
  onAdd?: () => void;
  inputs: InputField[];
  isSubmitting: boolean;
  formDataParent?: any;
  onSubmitSuccess: (data: any) => Promise<void>;
  currentData?: any;
}

export default function Modal({
  onClose,
  onAdd,
  inputs,
  isSubmitting,
  formDataParent,
  onSubmitSuccess,
  currentData,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isChecking, setIsChecking] = useState<Record<string, boolean>>({});
  const [checkResults, setCheckResults] = useState<
    Record<string, { valid: boolean; message?: string }>
  >({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /*   useEffect(() => {
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
  }, []); */

  const checkFieldAvailability = async (fieldName: string, value: string) => {
    if (!value || !inputs.find((i) => i.name === fieldName)?.checkUrl) return;

    setIsChecking((prev) => ({ ...prev, [fieldName]: true }));

    try {
      const response = await axios.get(
        `${
          inputs.find((i) => i.name === fieldName)?.checkUrl
        }?value=${encodeURIComponent(value)}`
      );

      setCheckResults((prev) => ({
        ...prev,
        [fieldName]: {
          valid: response.data.valid,
          message: response.data.message,
        },
      }));

      if (!response.data.valid) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: response.data.message || `${fieldName} is not available`,
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }

      /* setCheckResults((prev) => ({
        ...prev,
        [fieldName]: {
          valid: true,
          message: "Email is available",
        },
      })); */
    } catch (err: any) {
      Swal.fire({
        icon: err.message || "error",
        title: "Validation Error",
        text: "Failed to validate field. Please try again.",
      });
    } finally {
      setIsChecking((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleChange = (
    selectedOptions: any,
    isMulti: boolean = false,
    name: string | null = null
  ) => {
    if (isMulti) {
      setFormData((prev) => ({
        ...prev,
        [name as string]: Array.isArray(selectedOptions) ? selectedOptions : [],
      }));
    } else if (selectedOptions.target?.type === "file") {
      const file = selectedOptions.target.files[0];
      const name = selectedOptions.target.name;

      if (file) {
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          Swal.fire({
            icon: "error",
            title: "File Too Large",
            text: "Maximum file size is 5MB",
          });
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);

        const compressMethod = inputs.find(
          (input) => input.name === name
        )?.onCompress;
        if (compressMethod) {
          compressMethod(file)
            .then((compressedImage) => {
              setFormData((prev) => ({
                ...prev,
                [name]: compressedImage || file,
              }));
            })
            .catch((error) => {
              console.error("Compression error:", error);
              setFormData((prev) => ({
                ...prev,
                [name]: file,
              }));
            });
        } else {
          setFormData((prev) => ({
            ...prev,
            [name]: file,
          }));
        }
      }
    } else if (selectedOptions.target?.type === "number") {
      const { name, value, max } = selectedOptions.target;

      const newErrors = { ...errors };

      const numValue = Number(value);
      const maxValue = max ? Number(max) : null;

      if (maxValue !== null && numValue > maxValue) {
        const maxLength = String(maxValue).length;
        newErrors[name] = `Maksimal nilai adalah (${maxLength} digit)!`;
        setErrors(newErrors);

        setTimeout(() => {
          setErrors((prev) => {
            const updatedErrors = { ...prev };
            delete updatedErrors[name];
            return updatedErrors;
          });
        }, 2000);

        return;
      }

      setErrors(newErrors);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (
      selectedOptions.target?.type === "text" ||
      selectedOptions.target?.type === "textarea"
    ) {
      const { name, value, maxLength } = selectedOptions.target;

      const newErrors = { ...errors };

      if (maxLength && value.length >= maxLength) {
        newErrors[name] = `Maksimal ${maxLength} karakter!`;

        setErrors(newErrors);

        setTimeout(() => {
          setErrors((prev) => {
            const updatedErrors = { ...prev };
            delete updatedErrors[name];
            return updatedErrors;
          });
        }, 2000);
      } else {
        delete newErrors[name];
      }

      setErrors(newErrors);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Check if this field has a checkUrl and trigger validation
      const inputField = inputs.find((input) => input.name === name);
      if (inputField?.checkUrl && value) {
        // Debounce the check
        const timer = setTimeout(() => {
          checkFieldAvailability(name, value);
        }, 500);
        return () => clearTimeout(timer);
      }
    } else {
      const { name, value } = selectedOptions.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name || selectedOptions.target?.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name || selectedOptions.target?.name];
        return newErrors;
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const validateForm = () => {
    const newErrors = {};

    const dataToValidate = formDataParent || formData;

    inputs.forEach((input) => {
      if (input.required) {
        if (input.type === "multi-select") {
          if (
            !dataToValidate[input.name] ||
            dataToValidate[input.name].length === 0
          ) {
            newErrors[input.name] = `${input.label} harus diisi!`;
          }
        } else if (input.type === "file") {
          if (!dataToValidate[input.name] && !currentData?.[input.name]) {
            newErrors[input.name] = `${input.label} harus diisi!`;
          }
        } else if (
          !dataToValidate[input.name] ||
          dataToValidate[input.name].toString().trim() === ""
        ) {
          newErrors[input.name] = `${input.label} harus diisi!`;
        }
      }

      // Add validation for fields with checkUrl that are not valid
      if (
        input.checkUrl &&
        checkResults[input.name] &&
        !checkResults[input.name].valid
      ) {
        newErrors[input.name] =
          checkResults[input.name].message || `${input.label} is not valid`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const submissionData = { ...currentData };

      inputs.forEach((input) => {
        if (input.type === "multi-select") {
          submissionData[input.name] =
            formData[input.name]?.map((item: any) => item.value) || [];
        } else {
          submissionData[input.name] = formData[input.name];
        }
      });

      await onSubmitSuccess(submissionData);
    } catch (error) {
      console.error("Submission error:", error);
      await Swal.fire({
        icon: "error",
        title: "Submission Error",
        text:
          error instanceof Error
            ? error.message
            : "An error occurred during submission",
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className={`p-6 bg-white w-full max-w-xl rounded-xl shadow-xl transition-all duration-300 transform flex flex-col gap-5 ${
          isVisible ? "translate-y-0 scale-100" : "-translate-y-8 scale-95"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create New Card</h2>
          <div
            onClick={handleClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={20} color="#e44b37" />
          </div>
        </div>

        <div className="space-y-4">
          {inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label
                htmlFor={input.name}
                className="block text-sm font-medium text-gray-700"
              >
                {input.label}
                {input.required && (
                  <span className="text-[#e44b37] ml-1">*</span>
                )}

                {input.tooltip && (
                  <div className="relative inline-block ml-1 group">
                    <HelpCircle className="h-[13px] w-[13px] text-gray-400 cursor-help" />
                    <div className="opacity-0 bg-black text-white text-xs rounded py-1 px-2 absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-48 group-hover:opacity-100 transition-opacity duration-300">
                      {input.tooltip}
                      <div className="tooltip-arrow absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                    </div>
                  </div>
                )}
              </label>

              {input.type === "textarea" ? (
                <textarea
                  id={input.name}
                  name={input.name}
                  maxLength={input.maxLength}
                  required={input.required}
                  onChange={(e) => {
                    handleChange(e);
                    if (input.onChange) input.onChange(e);
                  }}
                  placeholder={input.placeholder}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-[#e44b37] focus:ring focus:ring-[#e44b37] focus:ring-opacity-30 transition-all duration-200"
                  rows={4}
                />
              ) : input.type === "select" ? (
                <Select
                  id={input.name}
                  value={input.options?.find(
                    (option) => option === input.value
                  )}
                  onChange={(selectedOption) => {
                    const e = {
                      target: {
                        value: selectedOption?.value,
                        name: input.name,
                        type: "select",
                      },
                    };
                    handleChange(e);
                    if (input.onChange) input.onChange(e as any);
                  }}
                  options={input.options?.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "0.5rem",
                      borderColor: "#E2E8F0",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#e44b37",
                      },
                      "&:focus-within": {
                        borderColor: "#e44b37",
                        boxShadow: "0 0 0 1px #e44b37",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.5rem",
                      overflow: "hidden",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? "#e44b37"
                        : state.isFocused
                        ? "rgba(228, 75, 55, 0.1)"
                        : null,
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                      ...theme.colors,
                      primary: "#e44b37",
                      primary25: "rgba(228, 75, 55, 0.1)",
                    },
                  })}
                />
              ) : (
                <div className="relative">
                  <input
                    id={input.name}
                    name={input.name}
                    type={input.type}
                    value={
                      formDataParent?.[input.name] ||
                      formData[input.name] ||
                      input.value ||
                      ""
                    }
                    maxLength={input.maxLength}
                    required={input.required}
                    onChange={(e) => {
                      handleChange(e);
                      if (input.onChange) input.onChange(e);
                    }}
                    placeholder={input.placeholder}
                    className="mt-1 text-sm outline-none border border-[#DDDDDD] p-2 w-full rounded-[8px] focus:outline-none focus:shadow-[0_0_8px_rgba(228,75,55,0.3)] focus:ring-0 transition-all duration-500 pr-10"
                  />
                  {isChecking[input.name] && (
                    <div className="absolute right-3 top-[15px]">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#e44b37"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="#e44b37"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  {checkResults[input.name] && !isChecking[input.name] && (
                    <div className="absolute right-3 top-[15px]">
                      {checkResults[input.name].valid ? (
                        <svg
                          className="h-4 w-4 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              )}

              {errors[input.name] && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[input.name]}
                </p>
              )}

              {input.description && (
                <p className="text-xs text-gray-500 mt-1">
                  {input.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            onClick={handleClose}
            isLoading={isSubmitting}
            variant="outlinePrimary"
            label="Cancel"
            icon="Undo"
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            variant="primary"
            label="Submit"
            icon="Check"
          />
        </div>
      </form>
    </div>
  );
}
