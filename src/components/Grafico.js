import React from "react";
import ReactEcharts from "echarts-for-react";

const Grafico = (props) => {
  const optionLine = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  const optionBar = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  const optionPie = {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
      textStyle: {
        fontSize: "8",
      },
    },
    textStyle: {
      fontSize: "8",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {props.tipo === "linha" && <ReactEcharts option={optionLine} />}

      {props.tipo === "barra" && <ReactEcharts option={optionBar} />}

      {props.tipo === "pizza" && <ReactEcharts option={optionPie} />}
    </div>
  );
};

export default Grafico;
