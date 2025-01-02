import { ChangeEvent } from "react";

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function Dropdown({ label, value, options, onChange }: DropdownProps) {
  return (
    <div className="w-full my-8 flex flex-col items-center">
      <div className="w-full text-left text-[#067A91] text-xl font-semibold pl-8">
        <label className="">{label}</label>
      </div>
      <select
        className="w-full h-16 text-center font-semibold bg-gray-150 rounded-lg hover:bg-[#159AB2] hover:text-white text-xl"
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className={`bg-gray-200 text-black text-lg ${
              label !== "Starting Year" && label !== "Ending Year" ? "text-left" : ""
            }`}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;