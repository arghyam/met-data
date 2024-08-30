import InfoSection from "@/components/InfoSection";
import MetDataSection from "@/components/MetDataSection";
import Image from "next/image";
import coverImage from "../../public/coverImage.jpg";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <main>
        <div className="relative lg:relative">
          <Image src={coverImage} alt="Cover Image Description" priority />
          <div className="absolute inset-0 flex items-center justify-end text-green-50 mr-20 lg:text-green-50 lg:mr-20">
            <h1 className="text-[0px] mt-32 lg:text-[75px] lg:font-black">
              Met Data Visualization
            </h1>
          </div>
        </div>
        <section className="flex flex-col items-center justify-between bg-gray-100 lg:px-24">
          <MetDataSection />
          <InfoSection />
        </section>
      </main>
    </div>
  );
}
