import { ChangeEvent } from "react";

type DropdownProps = {
  label: string;
  value: string;
  options: Array<string>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({ label, options, value, onChange }: DropdownProps) => (
  <div className="w-full m-4 flex flex-col items-center">
    <div className="w-full items-left">
      <label className="ml-4 text-left text-[#067A91]">{label}</label>
    </div>
    <select
      className="w-[90%] h-12 text-center bg-gray-100 rounded-md hover:bg-[#159AB2] hover:text-white "
      value={value}
      onChange={onChange}
    >
      <option className="bg-gray-100 text-black" value="">
        Select {label}
      </option>
      {options.map((option) => (
        <option key={option} value={option} className="bg-gray-100 text-black">
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;