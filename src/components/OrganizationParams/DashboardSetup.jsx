import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPeers, fetchOrganization } from "../../services";

import SetupHeader from "./SetupHeader";
import SetupProgress from "./SetupProgress";
import SetupField from "./SetupField";
import SetupFooter from "./SetupFooter";
import FirstStepForm from "./FirstStepForm";
import SecondStepForm from "./SecondStepForm";
import ntee_code from '../../data/ntee_code'

const baseClass = `
    w-full rounded-md border border-gray-200
    bg-white px-3 text-sm text-gray-800
    outline-none transition
    placeholder:text-gray-400
    focus:border-[#6e9c78]
    focus:ring-4 focus:ring-[#6e9c78]/10
  `

export default function DashboardSetup({ onClose, orgData = null, topic = "" }) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [mainCategory, setMainCategory] = useState(null);
  const [loadingPeers, setLoadingPeers] = useState(false);
  const [mainCatOptions, setMainCatOptions] = useState([])
  const [subCatOptions, setSubCatOptions] = useState([])
  const [currentOrganization, setCurrentOrganization] = useState(null)

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (orgData) {
      const ntee_code_from_data = orgData?.ntee_code;
      const [letters, numbers] = ntee_code_from_data.match(/[A-Za-z]+|\d+/g);

      const mainCategoryOptions = Object.keys(ntee_code).map(code => {
        const label = code.split("_").join(" ");
        const ntee_major = code.split("_-_")[0];

        return { label: label, value: code, name: ntee_major }
      })
      const mainCategoryValue = mainCategoryOptions?.find(item => item?.name === letters)?.value

      const subCatCodes = ntee_code?.[mainCategoryValue]
      const subCategoryOptions = Object.keys(subCatCodes).map(code => {
        return { label: `${code} - ${subCatCodes[code]}`, value: code }
      })
      const subCategoryValue = subCategoryOptions?.find(item => item?.value === ntee_code_from_data)?.value

      setFormData({
        ein: orgData?.ein,
        primarySector: letters,
        secondarySector: numbers,
        zipcode: orgData?.zip,
        mainCategory: mainCategoryValue,
        subCategory: subCategoryValue
      })
      console.log('---helloo workld-->', subCategoryOptions, subCategoryValue)

      setMainCatOptions(mainCategoryOptions)
      setSubCatOptions(subCategoryOptions)
      setCurrentOrganization(orgData)
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (mainCategory) {
      const subCatCodes = ntee_code?.[mainCategory]
      const subCategoryOptions = Object.keys(subCatCodes).map(code => {
        return { label: `${code} - ${subCatCodes[code]}`, value: code }
      })

      setSubCatOptions(subCategoryOptions)
    }
  }, [mainCategory])

  const handleFieldChange = (name, newValue) => {

    if (name === "mainCategory") setMainCategory(newValue);

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setError("");
  };

  const handleNext = async () => {
    // const missingField = step.fields.find((field) => {
    //   if (!field.required) return false;
    //   const fieldValue = formData[field.name];

    //   if (field.type === "checkbox") return fieldValue !== true;

    //   return (
    //     fieldValue === undefined ||
    //     fieldValue === null ||
    //     String(fieldValue).trim() === ""
    //   );
    // });

    // if (missingField) {
    //   setError(`Please complete "${missingField.label}".`);
    //   return;
    // }

    setError("");

    console.log('---formData--?>>>', formData)

    if (isLastStep) {
      const peersDataResponse = await callPeers(formData);

      onClose?.();
      navigate(`/where-you-stand`, {
        state: { org: peersDataResponse }
      });
      return;
    } else if (isFirstStep) {
      const organziationFetch = await fetchOrganization({ ein: formData?.organisation })

      setCurrentOrganization(organziationFetch?.data?.data?.[0])
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (isFirstStep) return;
    setCurrentStep((prev) => prev - 1);
    setError("");
  };

  const callPeers = async (payload) => {
    try {
      setLoadingPeers(true);
      setError("");
      const result = await fetchAllPeers(payload);
      return result?.data

    } catch (err) {
      console.error("Unable to fetch peers:", err);
      setError("Unable to load organisations. Please try again.");
    } finally {
      setLoadingPeers(false);
    }
  };

  const handleSkip = () => {
    setError("");
    setFormData({})
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  console.log('----topic---', topic)

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen bg-black/90">
      <div className="relative hidden h-full w-[65%] items-center justify-center overflow-hidden bg-black/50 backdrop-blur-[3px] md:flex">
        <div className="absolute inset-0 bg-white/30" />
        <div className="relative z-10 text-center">
          <p>
            Building from your answers
          </p>
          <h2 className="text-lg font-semibold text-white">
            Find your organisation to begin.
          </h2>
        </div>
      </div>

      <aside className="relative h-full w-full overflow-y-auto bg-white shadow-2xl md:w-[35%]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dashboard setup"
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-2xl font-light text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          ×
        </button>

        <div className="flex min-h-full flex-col px-6 py-9 sm:px-7">
          <SetupHeader />
          <SetupProgress
            currentStep={currentStep}
            totalSteps={2}
          />

          {topic?.length && isFirstStep ? (
            <section className="mx-auto w-full max-w-[900px] px-4 mt-4">
              {/* Black card */}
              <div className="rounded-[10px] bg-gradient-to-br from-[#263238] via-[#182126] to-[#101619] px-4 py-4 text-white shadow-lg">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#9be58e]">
                  Your starting point
                </p>

                <p className="mt-1 text-[12px] font-semibold leading-tight text-white">
                  {topic}
                </p>
              </div>
            </section>
          ) : null}

          <div>
            {currentOrganization?.ein && isFirstStep ?
              <section
                style={{
                  margin: "24px 0",
                  padding: "18px",
                  border: "1px solid #79c58d",
                  borderRadius: "12px",
                  background: "#e5f7eb",
                  color: "black"
                }}>
                <h2>Is this the right organization?</h2>
                <strong>{currentOrganization?.taxpayer_name}</strong>
                <p style={{ fontSize: "11px" }}>
                  {`
                  ${currentOrganization?.city}, 
                  ${currentOrganization?.state} * 
                  EIN ${currentOrganization?.ein} * 
                  ${currentOrganization?.ntee_major} * 
                  ${currentOrganization?.tax_year} 
                  filing`}
                </p>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentOrganization(null)}
                    className="rounded-full px-[18px] py-2 text-[16px] font-bold text-slace-700 hover:bg-white">
                    Pick another
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="rounded-full bg-emerald-600 px-7 py-3 text-[16px] font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-95">
                    Yes, continue
                  </button>

                </div>
              </section>
              :
              <>
                <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-5">
                  <div className="rounded-[10px] bg-[#f4f5f3] px-4 py-4 shadow-sm ">
                    <p className="text-[12px] font-medium leading-snug text-[#424242]">
                      {isFirstStep ?
                        "Which nonprofit would you like to explore?" :
                        "Check your organisation's details before viewing the 2025 comparison."
                      }
                    </p>
                  </div>
                  {isFirstStep ? (
                    <>
                      {/* Grey question card */}
                      <FirstStepForm
                        formData={formData}
                        baseClass={baseClass}
                        handleNext={handleNext}
                        handleFieldChange={handleFieldChange}
                      />
                    </>
                  ) : (
                    <>
                    <>
                    </>
                      <SecondStepForm
                        formData={formData}
                        baseClass={baseClass}
                        setFormData={setFormData}
                        handleSubmit={handleNext}
                        onChange={handleFieldChange}
                        mainCatOptions={mainCatOptions}
                        subCatOptions={subCatOptions}
                        currentOrganization={currentOrganization}
                      />
                    </>
                  )}
                </div>

                {error && (
                  <p role="alert" className="mt-3 text-[11px] text-red-500">
                    {error}
                  </p>
                )}
              </>
            }

            {isFirstStep && (
              <button
                type="button"
                onClick={handleSkip}
                className="mt-4 text-left text-xs text-gray-600 transition hover:text-gray-900 hover:underline"
              >
                I can't find my organisation
              </button>
            )}
          </div>

          <SetupFooter />
        </div>
      </aside>
    </div>
  );
}
