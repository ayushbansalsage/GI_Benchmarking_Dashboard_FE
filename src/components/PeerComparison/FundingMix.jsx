
import React, { useEffect, useEffectEvent, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ["#07834f", "#6846a6", "#1979a5", "#9ca3af", "#a95f4a", "#a7a045", "#be518a", "#3fa697"];

const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false,
        },
        datalabels: {
            display: false
        },
        tooltip: {
            enabled: false
        },
    },
};

const revenueRows = [
    {
        label: "Government grants",
        you: "45%",
        peers: "25%",
        gap: "↑ 20 pp",
        color: "#07834f",
    },
    {
        label: "Contributions & grants",
        you: "30%",
        peers: "40%",
        gap: "↓ 10 pp",
        color: "#6846a6",
    },
    {
        label: "Program service revenue",
        you: "20%",
        peers: "25%",
        gap: "↓ 5 pp",
        color: "#1979a5",
    },
    {
        label: "Membership revenue",
        you: "5%",
        peers: "10%",
        gap: "↓ 5 pp",
        color: "#9ca3af",
    },
];

export default function FundingMix({
    fundingMixData = []
}) {

    const [peerCompositionData, setPeerCompositionData] = useState({});
    const [yourOrganisationData, setYourOrganisationData] = useState({});

    useEffect(() => {

        console.log('----fundingMixData--', fundingMixData)
        if (fundingMixData.length) {
            let labels = [];
            let orgData = [];
            let peerData = [];
            fundingMixData?.map(item => {
                labels.push(item.label)
                orgData.push(item.org_pct)
                peerData.push(item.peer_pct)
            })

            console.log('------labels---', labels, orgData, peerData)

            setYourOrganisationData({
                labels: labels,
                datasets: [{
                    data: orgData,
                    backgroundColor: colors,
                    borderColor: "#ffffff",
                    borderWidth: 2,
                    hoverOffset: 5,
                }],
            })
            setPeerCompositionData({
                labels: labels,
                datasets: [{
                    data: peerData,
                    backgroundColor: colors,
                    borderColor: "#ffffff",
                    borderWidth: 2,
                    hoverOffset: 5,
                }],
            })
        }

    }, [])

    return (
        <div className="rounded-lg border border-slate-300 bg-white p-5">
            <h2 className="text-2xl font-extrabold text-slate-900">
                Funding mix
            </h2>

            <p className="mt-2 text-sm leading-5 text-slate-500">
                2025 filing · Your organisation and peers
            </p>

            {/* Pie charts */}
            <div className="mt-8 grid grid-cols-2 gap-5">
                <div className="text-center">
                    <h3 className="mb-4 text-sm font-bold text-slate-800">
                        Your organisation
                    </h3>

                    {yourOrganisationData?.labels?.length ?
                        <div className="mx-auto h-[145px] w-[145px]">
                            <Pie
                                data={yourOrganisationData}
                                options={pieOptions}
                            />
                        </div> : null
                    }
                </div>

                <div className="text-center">
                    <h3 className="mb-4 text-sm font-bold text-slate-800">
                        Peer composition
                    </h3>

                    {peerCompositionData?.labels?.length ?
                        <div className="mx-auto h-[145px] w-[145px]">
                            <Pie
                                data={peerCompositionData}
                                options={pieOptions}
                            />
                        </div> : null
                    }
                </div>
            </div>

            {/* Table heading */}
            <h3 className="mt-10 text-base font-extrabold text-slate-900">
                Share of revenue by category
            </h3>

            <div className="mt-5 grid grid-cols-[1fr_48px_55px_65px] gap-2 border-b border-slate-300 pb-3 text-xs font-bold text-slate-500">
                <span>Revenue category</span>
                <span>You</span>
                <span>Peers</span>
                <span>Gap</span>
            </div>

            {/* Revenue rows */}
            <div>
                {fundingMixData.map((row, index) => (
                    <div
                        key={row.label}
                        className="grid grid-cols-[1fr_48px_55px_65px] items-center gap-2 border-b border-slate-200 py-4 text-xs"
                    >
                        <div className="flex items-start gap-2 font-semibold text-slate-700">
                            <span
                                className="mt-0.5 h-4 w-4 shrink-0 rounded"
                                style={{ backgroundColor: colors[index] }}
                            />

                            <span>{row.label}</span>
                        </div>

                        <span className="font-semibold text-slate-700">
                            {`${row.org_pct}%`}
                        </span>

                        <span className="font-semibold text-slate-700">
                            {`${row.peer_pct}%`}
                        </span>

                        <span className="font-bold text-slate-700">
                            {`${(Number(row?.org_pct - row?.peer_pct)?.toFixed(2))}%`}
                        </span>
                    </div>
                ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">
                Contributions & grants excludes government grants for this reporting
                year. Membership revenue is shown where applicable.
            </p>

            <div className="mt-5 rounded-md border-l-4 border-emerald-600 bg-emerald-50 p-3 text-xs leading-5 text-slate-700">
                <b>Different funding balance</b>

                <p className="mt-1">
                    Government grants represent 45% of your income, compared with 25% in
                    the peer composition.
                </p>
            </div>
        </div>
    );
}