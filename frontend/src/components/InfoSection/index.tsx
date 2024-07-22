"use client";

import statistics from "@/../public/statistics.webp";
import visualizations from "@/../public/visualizations.webp";
import InfoCard from "../InfoCard";

const cardItems = [
  {
    title: "Statistics",
    description: "Statistics: We'll compute the annual and monthly averages and totals for various meteorological parameters. This will give us a broad overview of the data.",
    image: statistics,
    link: "/statistics",
    altText: "statistics",
  },
  {
    title: "Visualizations",
    description: "Trend Plots: These are used to visualize the change in a parameter over time.They are essentially line graphs that can show trends or patterns over a specified period.",
    image: visualizations,
    link: "/visualizations",
    altText: "visualizations",
  },
];

export default function InfoSection() {
  return (
    <div className="mb-10">
      <div className="justify-center items-center m-4 mt-10 lg:mt-8">
        <div className="sm:px-16 xl:px-48">
          <h1 className="mb-3 text-center font-extrabold leading-7 
           tracking-normal text-gray-800 md:text-2xl lg:text-3xl ">
            Insights that we provide
          </h1>
          <div className="grid lg:grid-cols-2 gap-40 mt-12 text-left font-normal text-gray-600 lg:text-xl">
            {cardItems.map((card, index) => (
              <InfoCard
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                link={card.link}
                altText={card.altText}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}