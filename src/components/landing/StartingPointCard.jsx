import ArrowIcon from "../ui/ArrowIcon";

export default function StartingPointCard({ item, proceedProcess }) {
  return (
    <button
      type="button"
      onClick={() => proceedProcess(item?.title)}
      className="group flex min-h-[122px] w-full items-center justify-between gap-6 rounded-md border border-white/15 bg-white/[0.018] px-5 py-5 text-left transition hover:border-lime-400/50 hover:bg-lime-400/[0.035] focus:outline-none focus:ring-2 focus:ring-lime-400/30 sm:px-6"
    >
      <span className="min-w-0">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-lime-400">
          {item.label}
        </span>
        <span className="block text-sm font-semibold leading-5 text-zinc-100 sm:text-[15px]">
          {item.title}
        </span>
      </span>
      <ArrowIcon className="h-5 w-5 shrink-0 text-lime-400 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
