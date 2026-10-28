import { useState } from "react";
import SectionEyebrow from "../ui/SectionEyebrow";
import ArrowIcon from "../ui/ArrowIcon";

export default function Hero({
  organization,
  handleSubmit,
  setOrganization
}) {

  return (
    <section className="pt-12 sm:pt-16 lg:pt-20">
      <div className="container-page">
        <div className="max-w-4xl">
          <SectionEyebrow>Find, compare and act</SectionEyebrow>

          <h1 className="text-4xl font-extrabold leading-[1.03] tracking-[-0.04em] text-white sm:text-5xl lg:text-[64px]">
            See where your nonprofit stands,
            <br className="hidden md:block" />
            and where to focus next.
          </h1>

          <p className="mt-6 max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base">
            Compare your organization with similar nonprofits, and get
            plain-language guidance you can take to your board.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-3xl">
            <label
              htmlFor="organization-input"
              className="mb-2 block text-xs font-semibold text-zinc-300"
            >
              Find your organization
            </label>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
              <input
                id="organization-input"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Harbor Family Services"
                className="h-11 w-full rounded-md border border-white/20 bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/70 focus:ring-2 focus:ring-lime-400/10"
              />

              <button
                type="submit"
                disabled={false}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-lime-400 px-5 text-sm font-bold text-zinc-950 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300"
              >
                See where you stand
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-xs text-zinc-600">
              Can't find your organization? Search for a close match.
            </p>
          </form>
        </div>
      </div>

    </section>
  );
}
