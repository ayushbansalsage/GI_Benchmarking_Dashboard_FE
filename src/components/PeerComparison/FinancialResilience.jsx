import React from "react";
import CashReserveChart from './charts/CashReserveChart';

const FinancialResilience = ({
    financialResilienceData = [],
    financialResilienceRef = null,
}) => {
    return (
        <section ref={financialResilienceRef} className="metric-section">
            <div className="metric-heading">
                <div>
                    <div className="metric-eyebrow">FINANCIAL RESILIENCE</div>
                    <h2>Months of cash reserve</h2>
                </div>
            </div>
            <p className="metric-copy">How your cash reserve compares with the selected peer group.</p>

            {financialResilienceData?.map((benchmark) =>
                <CashReserveChart
                    key={benchmark?.metric}
                    benchmark={benchmark}
                />
            )}
        </section>
    )
}

export default FinancialResilience