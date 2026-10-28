import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LandingHeader from "../components/landing/LandingHeader";
import Hero from "../components/landing/Hero";
import StartingPoints from "../components/landing/StartingPoints";
import HowItWorks from "../components/landing/HowItWorks";
import OrganizationsLikeYours from "../components/landing/OrganizationsLikeYours";

import FilterScreen from "../components/OrganizationParams/DashboardSetup";

import { fetchOrganization } from '../services'


export default function LandingPage() {

  const [organization, setOrganization] = useState("");
  const [orgData, setOrgData] = useState(null);
  const navigate = useNavigate();

  const [showSetup, setShowSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startingPointChoosen, setStartingPointChoosen] = useState("");

  useEffect(() => {
    if (!showSetup) {
      setOrgData(null)
      setStartingPointChoosen("");
    }
  }, [showSetup])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!organization.trim()) return;

    setIsLoading(true)
    const orgDataResponse = await fetchOrganization({ ein: organization.trim() })
    if (orgDataResponse?.status === 200) setOrgData(orgDataResponse?.data?.data);

    setIsLoading(false)
    setShowSetup(true)
    // navigate(`/where-you-stand?org=${encodeURIComponent(organization.trim())}`);
  };

  const proceedProcess = (title) => {
    setStartingPointChoosen(title);
    setShowSetup(true)
  }


  return (
    <div className="app-shell">
      <LandingHeader />

      <main>
        <Hero
          organization={organization}
          handleSubmit={handleSubmit}
          setOrganization={setOrganization}
        />
        <StartingPoints
          proceedProcess={proceedProcess}
        />
        <HowItWorks
          proceedProcess={proceedProcess}
        />
        <OrganizationsLikeYours />
      </main>

      {showSetup && (
        <FilterScreen
          onClose={() => setShowSetup(false)}
          orgData={orgData?.[0]}
          topic={startingPointChoosen}
        />
      )}
    </div>
  );
}
