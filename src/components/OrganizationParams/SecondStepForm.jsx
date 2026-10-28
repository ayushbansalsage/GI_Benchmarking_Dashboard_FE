import React, { useEffect, useState } from "react";

import SetupField from "./SetupField";
import ntee_code from '../../data/ntee_code';
import { secondStepsFields } from "../../data/steps";

const DetailRow = ({ label, value }) => (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[40%_1fr]">
        <p className="text-[14px] font-medium text-slate-600">
            {label}
        </p>

        <p className="max-w-2xl text-[14px] font-extrabold text-slate-800">
            {value}
        </p>
    </div>
)

const SecondStepForm = ({
    formData,
    onChange,
    baseClass,
    setFormData,
    handleSubmit,
    mainCatOptions,
    subCatOptions,
    currentOrganization
}) => {

    const [subCategoryOptions, setSubCategoryOptions] = useState([])

    useEffect(() => {
        if (subCatOptions?.lenght) {
            setSubCategoryOptions(subCatOptions);
        }
    }, [subCatOptions])

    return (
        <>
            <div className="rounded-2xl border border-slate-300 bg-white px-4 py-4 shadow-sm">
                <h2 className="mb-4 text-[16px] font-extrabold text-slate-900">
                    {currentOrganization.taxpayer_name}
                </h2>

                <div className="space-y-2">
                    <DetailRow label="NTEE code" value={formData?.subCategory} />
                    <DetailRow label="Revenue" value={"<$3M"} />
                    <DetailRow label="Staff size" value={10 - 19} />
                    <DetailRow label="ZIP code" value={formData.zipcode} />
                    <DetailRow label="Radius" value={"25 miles"} />
                </div>
            </div>
            <div>
                <p className="my-4 text-[11px] text-gray-400">
                    * indicates required information
                </p>
                <hr />

                <>
                    <label
                        htmlFor="mainCategory"
                        className="mt-4 block text-[14px] font-semibold text-gray-600 "
                    >
                        {"Main Category"}
                        <span className="ml-1 text-black-500">*</span>
                    </label>
                    <select
                        id={"mainCategory"}
                        name={"mainCategory"}
                        value={formData?.mainCategory ?? ""}
                        required={true}
                        onChange={(e) => onChange("mainCategory", e.target.value)}
                        className={`${baseClass} h-11`}
                    >
                        <option value="">
                            {"Select an option"}
                        </option>
                        {mainCatOptions?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </>

                <>
                    <label
                        htmlFor="subCategory"
                        className="mt-4 block text-[14px] font-semibold text-gray-600 "
                    >
                        {"Sub-Category"}
                        <span className="ml-1 text-black-500">*</span>
                    </label>
                    <select
                        id={"subCategory"}
                        name={"subCategory"}
                        value={formData?.subCategory ?? ""}
                        required={true}
                        onChange={(e) => onChange("subCategory", e.target.value)}
                        className={`${baseClass} h-11`}
                    >
                        <option value="">
                            {"Select an option"}
                        </option>
                        {subCatOptions?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </>

                {secondStepsFields.map((field) => (
                    <SetupField
                        key={field.name}
                        field={field}
                        value={formData[field.name]}
                        onChange={(newValue) =>
                            onChange(field.name, newValue)
                        }
                    />
                ))}

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-8 h-11 w-full rounded-md bg-[#295b35] text-sm font-semibold text-white transition hover:bg-[#214d2c] active:scale-[0.98]"
                >
                    {"Show peer benchmarks"}
                </button>

            </div>
        </>
    )
}

export default SecondStepForm