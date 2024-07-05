import InfoSection from "@/components/InfoSection";
import MetDataSection from "@/components/MetDataSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col items-center justify-between p-24">
        <MetDataSection />
        <InfoSection />
      </main>
    </div>
  );
}
