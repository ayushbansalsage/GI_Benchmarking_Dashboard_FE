import React from "react";
import CashReserveChart from './charts/CashReserveChart';

const OperatingProfile = ({
    operatingProfileData = [],
    financialResilienceRef = null
}) => {
    return (
        <section ref={financialResilienceRef} className="metric-section">
            <div className="metric-heading">
                <div>
                    <div className="metric-eyebrow"> OPERATING PROFILE</div>
                    <h2>Staffing, expenses and operating resukt</h2>
                </div>
            </div>
            <p className="metric-copy">How does our spending profile compare with similar organisations.</p>

            {operatingProfileData?.map((benchmark) =>
                <CashReserveChart
                    key={benchmark?.metric}
                    benchmark={benchmark}
                />
            )}
        </section>
    )
}

export default OperatingProfile;