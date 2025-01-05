"use client";

export default function CardFormInput({
  label,
  type,
  id,
  value,
  onChange,
  options = [],
}) {
  if (type === "select") {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block">
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target)}
          className="border p-2 w-full"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block">
          {label}
        </label>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target)}
          className="border p-2 w-full"
        />
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block">
          {label}
        </label>
        <input
          type="file"
          id={id}
          onChange={(e) => {
            if (e.target.files) {
              onChange(e.target.files[0]);
            }
          }}
          className="border p-2 w-full"
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target)}
        className="border p-2 w-full"
      />
    </div>
  );
}
