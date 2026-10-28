import React from "react";

const FirstStepForm = ({
    formData,
    baseClass,
    handleNext,
    handleFieldChange
}) => {
    return (
        <>
            <div>
                <label
                    htmlFor="organisation"
                    className="mb-2 block text-[14px] font-semibold text-gray-600 "
                >
                    {"Organisation name or EIN"}
                    <span className="ml-1 text-black-500">*</span>
                </label>

                <input
                    id={"organisation"}
                    name={"organisation"}
                    type="text"
                    value={formData?.organisation ?? ""}
                    placeholder={"Enter organisation name, EIN or ZIP code"}
                    required={true}
                    onChange={(e) => handleFieldChange("organisation", e.target.value)}
                    className={`${baseClass} h-10 placeholder:text-xs`}
                />
            </div>

            <button
                type="button"
                onClick={handleNext}
                className="mt-4 h-11 w-full rounded-md bg-[#295b35] text-sm font-semibold text-white transition hover:bg-[#214d2c] active:scale-[0.98]"
            >
                {"Search"}
            </button>
        </>
    )
}

export default FirstStepForm