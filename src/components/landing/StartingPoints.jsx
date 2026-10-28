import SectionEyebrow from "../ui/SectionEyebrow";
import StartingPointCard from "./StartingPointCard";
import { startingPoints } from "../../data/landingData";

export default function StartingPoints({
  proceedProcess
}) {
  return (
    <section id="starting-points" className="scroll-mt-8 pt-20 sm:pt-24 lg:pt-28">
      <div className="container-page">
        <SectionEyebrow>Start from where you are</SectionEyebrow>
        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {startingPoints.map((item) => (
            <StartingPointCard key={item.id} item={item} proceedProcess={proceedProcess} />
          ))}
        </div>
      </div>
    </section>
  );
}
