import { useState } from "react";

export default function ResultsAccordion({
    questions = []
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <section className="w-full max-w-md">
      <h2 className="mb-4 text-sm font-extrabold text-slate-900">
        Understand these results
      </h2>

      <div className="divide-y divide-slate-200 border-t border-slate-200">
        {Object.keys(questions).map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item}>
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-3 text-left text-[11px] font-bold text-emerald-800 transition hover:text-emerald-950"
              >
                <span>{item}</span>

                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-700 text-sm transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0">
                  <div className="mb-3 rounded-lg border-l-2 border-emerald-600 bg-slate-50 p-3 text-[10px] leading-4 text-slate-600">
                    {questions[item]}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}