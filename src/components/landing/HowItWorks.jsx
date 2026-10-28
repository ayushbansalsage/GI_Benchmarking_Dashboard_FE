import SectionEyebrow from "../ui/SectionEyebrow";
import { howItWorks } from "../../data/landingData";

export default function HowItWorks({
  proceedProcess
}) {
  return (
    <section className="pt-20 sm:pt-24 lg:pt-28">
      <div className="container-page">
        <SectionEyebrow>How it works</SectionEyebrow>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {howItWorks.map((item) => (
            <article className="rounded-md border border-white/15 bg-white/[0.018] p-5 sm:p-6">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-zinc-950">
                {item.number}
              </div>

              <h3 className="mt-5 text-sm font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={() => proceedProcess("")}
            className="group inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            Get started
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
