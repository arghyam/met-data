import statistics from "@/../public/statistics.webp";
import visualizations from "@/../public/visualizations.webp";
import InfoCard from "../InfoCard";

const cardItems = [
  {
    title: "Statistics",
    description: "Simplify data insights with computed yearly and monthly stats",
    image: statistics,
    link: "/statistics",
    altText: "statistics",
  },
  {
    title: "Visualizations",
    description: "Visualize trends over time with line graphs that reveal patterns at a glance",
    image: visualizations,
    link: "/visualizations",
    altText: "visualizations",
  },
];

export default function InfoSection() {
  return (
    <div className="mb-10">
      <div className="m-4 mt-10 lg:mt-8 sm:px-16 xl:px-48 flex flex-col items-center">
        <h1 className="mb-3 text-center font-extrabold leading-7 tracking-normal text-gray-800 md:text-2xl lg:text-[40px]">
          Explore
        </h1>
        <div className="grid lg:grid-cols-2 lg:gap-60 gap-10 mt-24 text-left font-normal text-gray-600 lg:text-xl">
          {cardItems.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}