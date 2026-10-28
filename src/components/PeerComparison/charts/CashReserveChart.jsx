import { color } from "chart.js/helpers";
import React from "react";
import { Bar } from "react-chartjs-2";

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

function formatValue(metric, value) {
    switch (metric) {
        case "liquid_months_reserve":
        case "liquid_months_reserve_with_investments":
            return `${Number(value).toFixed(2)} months`;
            break;

        case "debt_to_asset_ratio":
        case "personnel_costs_pct":
        case "revenue_yoy_growth":
        case "net_surplus_margin":
            return `${(Number(value) * 100).toFixed(2)}%`;
            break;

        default:
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            }).format(value);
            break;
    }
}

const CashReserveChart = ({ benchmark, alertsData }) => {
    const { label, metric, org_value, peer_median, alert } = benchmark;

    const hasNegativeValues = [org_value, peer_median].some(value => value < 0);
    const data = {
        labels: ["Your organisation", "Peer median"],
        datasets: [{
            data: [org_value, peer_median],
            backgroundColor: ["#047857", "#7e22ce"],
            borderRadius: 5,
            barThickness: 20,
            categoryPercentage: 0.8,
            barPercentage: 1,
            borderSkipped: false
        }],
    };

    const maximumValue = Math.max(org_value, peer_median) * 2;

    const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: {
            padding: {
                left: 0,
                right: 85,
                top: 8,
                bottom: 10
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
                display: true,
                color: "#111827",
                anchor: "end",
                align: "right",
                offset: 8,
                clip: false,
                font: { size: 12, weight: 600 },
                formatter: (value) => formatValue(metric, value)
            }
        },
        scales: {
            x: {
                min: hasNegativeValues ? Math.min(org_value, peer_median) * 2 : 0, 
                max: maximumValue,
                ticks: {
                    display: false
                },
                grid: { 
                    display: hasNegativeValues,

                    color: (context) => {
                        if(context.tick.value === 0) return "#6b7280";
                    },
                    lineWidth: (context) => {
                        if(context.tick.value === 0) return 1;
                    },
                    lineHeight: (context) => {
                        if(context.tick.value === 0) return 0;
                    }
                },
                border: { display: false }
            },
            y: { ticks: { color: "#1f2937", font: { size: 12 } }, grid: { display: false }, border: { display: false } },
        },
    };
    return (
        <div className="cash-chart-wrap">
            <div className="flex justify-between">
                <text className="text-[12px] max-w-[60%]"><b>{label}</b></text>
                <text className="text-[12px]"><b>{formatValue(metric, org_value)}</b></text>
            </div>
            <p className="mt-1 text-[9px] text-slate-500">
                2025 filing · Comparison with peers
            </p>
            {alert?.headline ?
                <Insight title={`${alert?.direction === "below" ? "↓" : "↑"} ${alert?.headline || ""}`}>
                    {alertsData?.[metric]}
                </Insight> : null
            }
            <div className="cash-chart">
                <Bar data={data} options={options} />
            </div>
            <hr style={{ marginTop: "20px" }}></hr>
        </div>
    );
}

export default CashReserveChart