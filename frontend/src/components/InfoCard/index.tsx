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
    <div className="max-w-[18rem] bg-white rounded-lg shadow transition-transform transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <Link href={link} legacyBehavior>
        <a className="block h-64 bg-white rounded-t-lg overflow-hidden">
          <Image
            src={image}
            alt={altText}
            className="object-contain w-full h-full"
          />
        </a>
      </Link>
      <div className="p-5 bg-[#D9D9D9] flex flex-col flex-grow text-center">
        <p className="mb-3 font-normal text-black">
          {description}
        </p>
        <div className="flex justify-center mt-auto">
          <Link href={link} legacyBehavior>
            <a className="inline-flex items-center justify-center w-1/2 px-5 py-3 text-lg font-medium text-center text-white bg-[#0097B2] rounded-full hover:bg-[#008FA3] focus:ring-4 focus:outline-none focus:ring-[#008FA3] dark:bg-[#0097B2] dark:hover:bg-[#008FA3] dark:focus:ring-[#008FA3]">
              Start
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}