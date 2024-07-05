"use client";

import statistics from "@/../public/statistics.webp";
import visualizations from "@/../public/visualizations.webp";
import InfoCard from "../InfoCard";

const cardItems = [
  {
    title: "Statistics",
    description: "Know the annual + monthly averages over the years",
    image: statistics,
    link: "/statistics",
    altText: "statistics",
  },
  {
    title: "Visualizations",
    description: "Know the trends and patterns of the data",
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