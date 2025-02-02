import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "100%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#FF1654", "#247BA0"],
      series: [
        {
          name: "Series A",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 20],
        },
        {
          name: "Series B",
          data: [20, 29, 37, 36, 44, 45, 50, 58],
        },
      ],
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },
      yaxis: {
        title: {
          text: "Values",
        },
      },
      tooltip: {
        shared: false,
        intersect: true,
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="m-2 shadow-md">
      <h2 className="text-xl p-2">Bar Graph</h2>
      <div ref={chartRef} className="w-full"></div>
    </div>
  );
};

export default BarChart;
