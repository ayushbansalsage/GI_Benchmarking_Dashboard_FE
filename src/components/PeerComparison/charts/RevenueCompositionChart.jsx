import React from "react";
import { Bar } from "react-chartjs-2";

const RevenueCompositionChart = ({dataset}) => {
    console.log('---datssert-- ', dataset)

    const data = {
        labels: ["Your organisation", "Peer composition"],
        datasets: dataset,
    };
    const options = {
        indexAxis: "y", responsive: true, maintainAspectRatio: false, animation: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%` } },
            datalabels: {
                color: "#ffffff",
                
            },
        },
        scales: {
            x: { stacked: true, min: 0, max: 100, display: false },
            y: { stacked: true, display: false, ticks: { display: false } },
        },
    };
    return <div className="revenue-chart"><Bar data={data} options={options} /></div>;
}

export default RevenueCompositionChart