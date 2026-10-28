import React from "react";

export default function SetupFooter() {
  return (
    <div className="mt-auto pt-10">
      <p className="text-[9px] leading-[1.5] text-gray-400">
        Check AI content for inaccuracies. This content is for information
        purposes and is not professional advice.
      </p>
      <button
        type="button"
        onClick={() => window.open("/privacy", "_blank")}
        className="mt-1 text-[9px] text-gray-500 hover:underline"
      >
        Privacy notice
      </button>
    </div>
  );
}
