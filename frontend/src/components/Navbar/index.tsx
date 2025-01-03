import Logo from "../../../public/Logo.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="h-24 mb-32 flex items-center">
      <div className="ml-8 mt-8 flex-shrink-0">
        <Image src={Logo} alt="Logo" height={80} />
      </div>
      <div className="ml-auto"></div>
    </nav>
  );
}