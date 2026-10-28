import React from "react";

export default function SetupHeader() {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1 text-[10px] font-bold tracking-[1px] text-[#5d765f]">
        <span className="text-[#52775a]">✦</span>
        SAGE COPILOT
      </div>
      <h1 className="text-[22px] font-semibold leading-tight text-[#20251f]">
        Build your dashboard
      </h1>
      <p className="mt-1 text-xs text-gray-400">
        A few steps should be enough.
      </p>
    </div>
  );
}
