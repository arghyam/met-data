import InfoSection from "@/components/InfoSection";
import MetDataSection from "@/components/MetDataSection";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <main>
        <section className="flex flex-col items-center justify-between">
          <MetDataSection />
          <InfoSection />
        </section>
      </main>
    </div>
  );
}
