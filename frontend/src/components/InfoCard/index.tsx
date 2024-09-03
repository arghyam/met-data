"use client";

import Image from "next/image";
import Link from "next/link";

type InfoCardProps = {
  title: string;
  description: string;
  image: any;
  link: string;
  altText: string;
};

export default function InfoCard({
  title,
  description,
  image,
  link,
  altText,
}: InfoCardProps) {
  return (
    <div className="max-w-sm bg-white  rounded-lg shadow transition-transform transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
      <div className="lg:h-80 bg-white">
        <Link href={link}>
          <Image
            src={image}
            alt={altText}
            className="rounded-t-lg object-contain w-full h-full"
          />
        </Link>
      </div>
      <div className="p-5">
        <Link href={link}>
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </div>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <Link href={link}>
          <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Go here
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
