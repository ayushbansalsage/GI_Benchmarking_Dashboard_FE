export default function LandingHeader() {
  return (
    <header className="border-b border-white/10">
      <div className="container-page flex min-h-14 items-center justify-between py-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.16em] text-zinc-300">
            GROWTH &amp; INSIGHTS
          </p>
          <p className="mt-0.5 text-[10px] text-zinc-600">Nonprofit resilience</p>
        </div>
        <p className="hidden text-[10px] text-zinc-600 sm:block">
          Find, compare and act
        </p>
      </div>
    </header>
  );
}
