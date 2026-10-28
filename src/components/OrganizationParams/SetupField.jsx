import React from "react";

export default function SetupField({ field, value, onChange }) {
  const baseClass = `
    w-full rounded-md border border-gray-200
    bg-white px-3 text-sm text-gray-800
    outline-none transition
    placeholder:text-gray-400
    focus:border-[#6e9c78]
    focus:ring-4 focus:ring-[#6e9c78]/10
  `;

  if (field.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-start gap-3 text-[14px]">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#295b35] focus:ring-[#6e9c78]"
        />
        <span className="text-xs leading-5 text-gray-700">
          {field.label}
          {field.required && <span className="ml-1 text-red-500">*</span>}
        </span>
      </label>
    );
  } else if (field.type === "section") {
    return (
      <div className="col-span-1 border-b border-gray-100 pb-2">
        <h3 className="text-sm font-semibold text-[#252a25]">
          {field.label}
        </h3>
        <p className="mt-1 text-[11px] text-gray-400">
          * indicates required information
        </p>
      </div>
    );
  } else if (field.type === "radio-cards") {
    return (
      <fieldset className="col-span-1 min-w-0">
        <legend className="mb-4 text-sm font-semibold text-[#252a25]">
          {field.label}
          {field.required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </legend>

        <div className="!grid !grid-rows-3 gap-2">
          {field.options.map((option, index) => {
            const selected = value === option.value;

            return (
              <label
                key={option.value}
                className={`flex min-w-0 cursor-pointer flex-col rounded-xl border p-2 transition text-[14px] ${selected
                    ? "border-[#6e9c78] bg-[#f4f8f4] ring-2 ring-[#6e9c78]/20"
                    : "border-gray-200 bg-white hover:border-[#a6bbaa]"
                  }`}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={selected}
                  onChange={() => onChange(option.value)}
                  className="mb-1 h-4 w-4 shrink-0 accent-[#295b35]"
                />

                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f1e9] text-xs font-semibold text-[#295b35]">
                  {index + 1}
                </span>

                <span className="break-words text-xs font-semibold leading-2 text-[#252a25]">
                  {option.label}
                </span>

                <span className="mt-1 break-words text-[10px] leading-2 text-gray-500">
                  {option.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <div>
      <label
        htmlFor={field.name}
        className="mt-4 block text-[14px] font-semibold text-gray-600 "
      >
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {field.type === "select" ? (
        <select
          id={field.name}
          name={field.name}
          value={value ?? ""}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} h-11`}
        >
          <option value="">
            {field.placeholder || "Select an option"}
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          value={value ?? ""}
          placeholder={field.placeholder}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${baseClass} min-h-24 py-3`}
        />
      ) : (
        <input
          id={field.name}
          name={field.name}
          type="text"
          value={value ?? ""}
          placeholder={field.placeholder}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} h-10 placeholder:text-xs`}
        />
      )}
    </div>
  );
}
