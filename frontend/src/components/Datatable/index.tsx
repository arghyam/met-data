import React from "react";

interface DataEntry {
  state: string;
  district: string;
  year: number;
  annual_mean: number;
}

type DataTableProps = {
  data: DataEntry[];
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            {data &&
              data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key} className="border border-gray-300 p-2">
                  {key
                    .toUpperCase()
                    .replace(/AVG_/g, "Average ")
                    .replace(/ANNUAL_/g, "ANNUAL ")}
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
