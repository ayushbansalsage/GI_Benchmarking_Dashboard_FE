import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

import {
  Legend,
  Tooltip,
  BarElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

import { Bar as BarChart, Doughnut } from "react-chartjs-2";
import { callback } from "chart.js/helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import chartDataLabels from 'chartjs-plugin-datalabels'

import SnapShotModal from '../components/snapShotModal'
import FundingMixPanel from "../components/PeerComparison/FundingMix";
import OperatingProfile from "../components/PeerComparison/OperatingProfile";
import FinancialResilience from '../components/PeerComparison/FinancialResilience'

import {
  insightsQuestions,
  fundingMixInsightsAPI,
  operatingProfileInsightsAPI,
  financialResilienceInsightsAPI,
} from "../services";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, chartDataLabels);

// function StatCard({ eyebrow, value, muted }) {
//   return (
//     <div className="stand-stat-card">
//       <div className="stand-stat-eyebrow">{eyebrow}</div>
//       <div className={muted ? "stand-stat-value muted" : "stand-stat-value"}>{value}</div>
//     </div>
//   );
// }

// const peerComparisonSections = [
//   {
//     id: 'financial',
//     label: "Financial Resilience"
//   },
//   {
//     id: 'funding',
//     label: "Funding Mix"
//   },
//   {
//     id: 'operating',
//     label: "Operating Performance"
//   },
// ]

// export default function WhereYouStandPage() {
//   

// 
//   

//   return (
//     <div className="stand-page">
//       <SideNav />

//       <main className="stand-main">
//         <header className="stand-header">
//           <button className="back-button" type="button" onClick={() => navigate("/")}>
//             <ArrowLeft size={16} />
//             Back
//           </button>

//           <div className="stand-header-right">
//             <div className="stand-progress">Your comparison <span>1 of 3</span></div>

//             <button
//               type="button"
//               className="download-snapshot-button"
//               onClick={() => setIsSnapShotOpen(true)}>
//               Download Snapshot
//             </button>
//           </div>
//         </header>

//         <section className="stand-content">
//           <div className="stand-kicker">YOUR PEER GROUP</div>
//           <h1>{organization?.taxpayer_name}</h1>
//           <p className="stand-subtitle">Compared with 412 human services nonprofits.</p>
//           <div className="stand-meta">
//             <span>Human services</span>
//             <span>Under $150k+</span>
//             <span>2024 filings</span>
//           </div>

//           {isDashboardMode ? (
//             <>
//               <div className="stand-stats">
//                 <StatCard eyebrow="You hold" value="2 months" />
//                 <StatCard eyebrow="Peer average" value="4 months" />
//                 <StatCard eyebrow="Typical range" value="3–6 months" />
//                 <StatCard eyebrow="Organizations like you" value="412" muted />
//               </div>

//               <FinancialResilience
//                 financialResilienceRef={financialResilienceRef}
//                 financialResilienceData={financialResilienceData}
//               />

//               <FundingMixPanel
//                 fundingMixRef={fundingMixRef}
//                 fundingMixData={fundingMixData}
//               />

//               <OperatingProfile
//                 operatingProfileData={operatingProfileData}
//                 operatingProfileRef={operatingProfileRef}
//               />
//             </>
//           ) : (
//             <>
//               {activeSection === "financial" && (
//                 <FinancialResilience
//                   financialResilienceRef={financialResilienceRef}
//                   financialResilienceData={financialResilienceData}
//                 />
//               )}
//               {activeSection === "funding" && (
//                 <FundingMixPanel
//                   fundingMixRef={fundingMixRef}
//                   fundingMixData={fundingMixData}
//                 />
//               )}
//               {activeSection === "operating" && (
//                 <OperatingProfile
//                   operatingProfileData={operatingProfileData}
//                   operatingProfileRef={operatingProfileRef}
//                 />
//               )}
//             </>
//           )}

//           {!isDashboardMode &&
//             <div className="stand-naviagtion-buttons" >
//               <button
//                 type="button"
//                 className="stand-button stand-skip"
//                 onClick={() => setIsDashBoardOpen(true)}
//               > Skip to Dashboard
//               </button>
//               {activeSection === 'financial' && (
//                 <button
//                   type="button"
//                   className="stand-button stand-primary"
//                   onClick={() => setActiveSection("funding")}
//                 > Next to Funding Mix
//                 </button>
//               )}
//               {activeSection === 'funding' && (
//                 <button
//                   type="button"
//                   className="stand-button stand-primary"
//                   onClick={() => setActiveSection("operating")}
//                 > Next to Operating Profile
//                 </button>
//               )}
//             </div>
//           }
//         </section>
//       </main>

//       <aside className="stand-insight-panel">
//         <div className="insight-inner">
//           <div className="insight-kicker">WHAT STANDS OUT</div>
//           <div className="insight-placeholder">Add your guidance or interpretation here.</div>
//         </div>
//       </aside>

//       {isSnapShotOpen && (
//         <SnapShotModal onClose={() => setIsSnapShotOpen(false)} />
//       )}

//     </div>
//   );
// }

import React from "react";
import ResultsAccordion from "../components/PeerComparison/QuestionSection";
import CashReserveChart from "../components/PeerComparison/charts/CashReserveChart";

const Chip = ({ children }) => (
  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
    {children}
  </span>
);

const Bar = ({ label, value, width, color = "bg-emerald-700" }) => (
  <div className="grid grid-cols-[80px_1fr_65px] items-center gap-2 text-[9px] text-slate-500">
    <span>{label}</span>
    <div className="h-2 rounded-sm bg-slate-100">
      <div className={`h-4 rounded-sm ${color}`} style={{ width }} />
    </div>
    <b className="text-right text-slate-700">{value}</b>
  </div>
);

const Insight = ({ title, children, tone = "amber" }) => (
  <div
    className={`mt-2 rounded-md border p-2 text-[9px] leading-3 ${tone === "green"
      ? "border-emerald-200 bg-emerald-50"
      : "border-amber-200 bg-amber-50"
      }`}
  >
    <div className="font-bold text-slate-700">{title}</div>
    <div className="mt-1 text-slate-600">{children}</div>
  </div>
);

const Metric = ({ title, value, bars, children }) => (
  <section className="border-b border-slate-200 py-3 last:border-0">
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-[11px] font-bold text-slate-800">{title}</h3>
      <strong className="text-sm text-slate-800">{value}</strong>
    </div>

    <p className="mt-1 text-[9px] text-slate-500">
      2025 filing · Comparison with peers
    </p>

    {children}
    <div className="mt-2 space-y-4">{bars}</div>
  </section>
);

const Donut = ({ second = false }) => (
  <div
    className="relative h-20 w-20 rounded-full"
    style={{
      background: second
        ? "conic-gradient(#087f52 0 25%, #6846a6 25% 64%, #1979a5 64% 90%, #d8dde0 90% 100%)"
        : "conic-gradient(#087f52 0 45%, #6846a6 45% 75%, #1979a5 75% 95%, #d8dde0 95% 100%)",
    }}
  >
    <div className="absolute inset-[18px] rounded-full bg-white" />
  </div>
);

export default function WhereYouStandPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const organization = location?.state?.org;

  const fundingMixRef = useRef(null)
  const operatingProfileRef = useRef(null)
  const financialResilienceRef = useRef(null)

  const [isSnapShotOpen, setIsSnapShotOpen] = useState(false)
  const [isDashboardMode, setIsDashBoardOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('financial_resilience')

  const [alertsData, setAlertsData] = useState([])
  const [narrativesData, setNarrativesData] = useState({})
  const [fundingMixData, setFundingMixData] = useState([])
  const [operatingProfileData, setOperatingProfileData] = useState([])
  const [insightsQuestionsData, setInsightsQuestionsData] = useState([])
  const [financialResilienceData, setFinancialResilienceData] = useState([])

  useEffect(() => {
    const funding_mix_data = [...organization?.funding_mix];
    const ope_profile_data = organization?.benchmarks?.filter((item) => item?.module === "operating_profile");
    const financial_res_data = organization?.benchmarks?.filter((item) => item?.module === "financial_resilience");

    console.log('---fundingMix--', funding_mix_data)
    setFundingMixData(funding_mix_data);
    setOperatingProfileData(ope_profile_data);
    setFinancialResilienceData(financial_res_data);

    fetchLatestInsights('financial-resilience')
  }, [organization])

  const fetchLatestInsights = async (insightsFetchedFor) => {

    const apiResponse = await Promise.allSettled([
      fundingMixInsightsAPI(organization?.ein),
      financialResilienceInsightsAPI(organization?.ein),
      operatingProfileInsightsAPI(organization?.ein)
    ]);

    let tmpAlertsData = {};
    let tmpNarrativesData = {};
    apiResponse.map(res => {
      if (res?.status === "fulfilled") {
        const data = res.value?.data;

        tmpAlertsData = {
          ...tmpAlertsData,
          [data?.module]: data?.alerts
        }
        tmpNarrativesData = {
          ...tmpNarrativesData,
          [data?.module]: data?.narrative
        }

      }
    })
    setAlertsData(tmpAlertsData);
    setNarrativesData(tmpNarrativesData);

    const questionResponse = await insightsQuestions(organization?.ein)
    setInsightsQuestionsData(questionResponse?.data?.answers || {})
  }

  console.log('---ayush==----->>> ', organization, '--', alertsData, '----', narrativesData, '--', insightsQuestionsData)

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <main className="mx-auto grid grid-cols-1 xl:grid-cols-[1fr_380px]">
        <div className="p-5 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wide text-emerald-700">
                Your organisation and peers
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                {organization?.taxpayer_name}
              </h1>

              <p className="text-[10px] text-slate-500">
                Reporting year: 2025 · Peer group: similar NTEE code, revenue,
                staff size and ZIP area
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>P20 — Human services</Chip>
                <Chip>$3M</Chip>
                <Chip>10–19 staff</Chip>
              </div>
            </div>

            <button 
            type="button"
            onClick={() => setIsSnapShotOpen(true)}
            className="rounded-full bg-emerald-700 px-4 py-2 text-[10px] font-bold text-white shadow-sm"
            >
              Download snapshot
            </button>
          </div>

          <div className="mt-5 rounded-md border border-blue-200 bg-blue-50 px-3 py-3 text-[10px]">
            <b>Your benchmark dashboard</b>
            <p className="text-slate-600">
              Compare your financial cushion, funding sources and operating
              results with peers. Revenue growth compares 2024 with 2025.
            </p>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            <div className="rounded-lg border-2 border-emerald-600 bg-emerald-50/40 px-5">
              <p className="mt-3 text-[8px] font-bold uppercase text-emerald-700">
                Selected topic
              </p>

              <h2 className="text-base font-black">Financial resilience</h2>

              <p className="text-[9px] text-slate-500">
                2025 filing · Your organisation and peers
              </p>

              <div className="mt-5 mb-5 flex gap-4 text-[12px]">
                <span className="text-emerald-700">
                  ■ Your organisation
                </span>
                <span className="text-purple-700">■ Peer median</span>
              </div>

              {financialResilienceData?.map(item => (
                <CashReserveChart
                  key={item?.metric}
                  benchmark={item}
                  alertsData={alertsData?.["financial_resilience"]}
                />
              ))}
            </div>

            <FundingMixPanel fundingMixData={organization?.funding_mix} />


            <div className="rounded-lg border border-slate-300 bg-white px-5">
              <h2 className="mt-2 text-base font-black">Operating profile</h2>

              <p className="text-[9px] text-slate-500">
                2025 filing · Your organisation and peers
              </p>

              <div className="mt-4 mb-5 flex gap-4 text-[12px]">
                <span className="text-emerald-700">
                  ■ Your organisation
                </span>
                <span className="text-purple-700">■ Peer median</span>
              </div>

              {operatingProfileData?.map(item => (
                <CashReserveChart
                  key={item?.metric}
                  benchmark={item}
                  alertsData={alertsData?.["operating_profile"]}
                />
              ))}

            </div>
          </div>
        </div>

        <aside className="border-l border-slate-200 bg-white p-5">
          <p className="text-[9px] font-bold uppercase text-emerald-700">
            ✦ Sage peer benchmarking
          </p>

          <h2 className="mt-2 text-xl font-black">What stands out</h2>

          <div className="mt-4 space-y-2">
            {[
              { label: "Financial resilience", value: "financial_resilience" },
              { label: "Funding mix", value: "funding_mix" },
              { label: "Operating profile", value: "operating_profile" },
            ].map((item, index) => (
              <button
                key={`${item?.value}-${index}`}
                onClick={() => setActiveSection(item?.value)}
                className={`block w-full rounded-md border px-3 py-2 text-left text-[10px] font-bold 
                  ${item?.value === activeSection
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-emerald-800"
                  } border-emerald-700`}
              >
                {item?.label}
              </button>
            ))}
          </div>

          <hr className="my-5" />

          <h3 className="text-[11px] font-black">
            Understanding financial resilience
          </h3>

          <div className="mt-3 rounded-r-lg border-l-2 border-emerald-600 bg-slate-100 p-3 text-[10px]">
            <b>
              You hold 2 months of cash compared with a peer median of 4
              months.
            </b>

            <p className="mt-2 text-slate-600">
              {narrativesData?.[activeSection]?.['headline']}
            </p>

            <small>Reporting year: 2025</small>
          </div>

          <ResultsAccordion questions={insightsQuestionsData} />
        </aside>
      </main>

        {isSnapShotOpen && (
          <SnapShotModal onClose={() => setIsSnapShotOpen(false)} />
        )}
    </div>
  );
}
