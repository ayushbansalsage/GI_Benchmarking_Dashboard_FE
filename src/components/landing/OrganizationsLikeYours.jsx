import SectionEyebrow from "../ui/SectionEyebrow";

const organizations = [
  "Community services",
  "Family support",
  "Education",
  "Health & wellbeing",
];

export default function OrganizationsLikeYours() {
  return (
    <section className="pb-16 pt-20 sm:pb-24 sm:pt-24">
      <div className="container-page">
        <SectionEyebrow>Organizations like yours</SectionEyebrow>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {organizations.map((name) => (
            <div
              key={name}
              className="rounded-md border border-white/10 bg-white/[0.015] px-4 py-5 text-center text-xs text-zinc-500"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
