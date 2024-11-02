export const toSnakeCase = (str) => {
  return str
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("_");
};

export const calculateMeans = (plotdata, state, district, start, end, info) => {
  // console.log("calculateData called with:", { plotdata, state, district, start, end, info });

  const filteredData = plotdata.filter(
    (item) =>
      item.state === state &&
      item.district === district &&
      item.year >= start &&
      item.year <= end
  );

  // console.log("Filtered data:", filteredData);

  if (info === "annual_mean") {
    const result = filteredData.map((item) => ({
      state: item.state,
      district: item.district,
      year: item.year,
      annual_mean: (
        (item.values.january +
          item.values.february +
          item.values.march +
          item.values.april +
          item.values.may +
          item.values.june +
          item.values.july +
          item.values.august +
          item.values.september +
          item.values.october +
          item.values.november +
          item.values.december) /
        12
      ).toFixed(5),
    }));
    // console.log("Annual mean result:", result);
    return result;
  }

  if (info === "monthly_mean") {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const monthlyMeans = {};

    months.forEach((month) => {
      const total = filteredData
        .reduce((sum, item) => sum + item.values[month], 0)
      monthlyMeans[`${month}`] = (total / filteredData.length).toFixed(5);;
    });

    const result = [
      {
        state: state,
        district: district,
        ...monthlyMeans,
      },
    ];
    // console.log("Monthly mean result:", result);
    return result;
  }

  if (info === "annual_total") {
    const result = filteredData.map((item) => ({
      state: item.state,
      district: item.district,
      year: item.year,
      annual_total: (
        item.values.january +
        item.values.february +
        item.values.march +
        item.values.april +
        item.values.may +
        item.values.june +
        item.values.july +
        item.values.august +
        item.values.september +
        item.values.october +
        item.values.november +
        item.values.december
      ).toFixed(5),
    }));
    // console.log("Annual total result:", result);
    return result;
  }

  throw new Error("Invalid infoType");
};

export const calculateTrendPlot = (
  plotdata,
  state,
  district,
  start,
  end,
  info
) => {
  return plotdata
    .filter(
      (item) =>
        item.state === state &&
        item.district === district &&
        item.year >= start &&
        item.year <= end
    )
    .map((item) => {
      const monthlyValues = Object.values(item.values);
      const mean =
        monthlyValues.reduce((sum, value) => sum + value, 0).toFixed(5) /
        monthlyValues.length;
      return {
        year: item.year,
        value: mean,
      };
    });
};
