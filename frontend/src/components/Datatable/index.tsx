import { UnitKey, units } from "../../../Data";

interface DataEntry {
  state: string;
  district: string;
  year: number;
  annual_mean: number;
}

type DataTableProps = {
  data: DataEntry[];
  parameter: string;
};

const toUnitKeyFormat = (str: string): UnitKey => {
  return str.toLowerCase().replace(/\s+/g, "_") as UnitKey;
};

const DataTable: React.FC<DataTableProps> = ({ data, parameter }) => {
  const lowerCaseParameter = toUnitKeyFormat(parameter);

  return (
    <div className={`${data.length > 15 ? "max-h-96 overflow-y-auto" : ""}`}>
    <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            {data &&
              data.length > 0 &&
              Object.keys(data[0]).map((key, index, array) => (
                <th key={key} className="border border-gray-300 p-2">
                  {key
                    .toUpperCase()
                    .replace(/AVG_/g, "Average ")
                    .replace(/ANNUAL_/g, "Annual ")}
                  {index === array.length - 1 && lowerCaseParameter
                    ? ` (${units[lowerCaseParameter] || "N/A"})`
                    : ""}
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {data &&
            data.length > 0 &&
            data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((value, j) => (
                  <td
                    key={j}
                    className="text-center border border-gray-300 p-2"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
