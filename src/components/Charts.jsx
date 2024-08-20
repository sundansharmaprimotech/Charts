import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChatChart = ({ data, chartType }) => {
  const chartConfig = {
    type: chartType,
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Chat Activity',
        xAxisName: 'Time',
        yAxisName: 'Messages',
        theme: 'fusion'
      },
      data: data
    }
  };

  // Adjust data format for pie and doughnut charts
  if (chartType === 'pie2d' || chartType === 'doughnut2d') {
    chartConfig.dataSource.data = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }

  // Adjust data format for scatter and bubble charts
  if (chartType === 'scatter' || chartType === 'bubble') {
    chartConfig.dataSource.dataset = [{
      data: data.map(item => ({
        x: item.label,
        y: item.value,
        z: Math.random() * 50 // Only for bubble chart, you might want to adjust this
      }))
    }];
    delete chartConfig.dataSource.data;
  }

  // Adjust data format for heatmap
  if (chartType === 'heatmap') {
    chartConfig.dataSource.dataset = [{
      data: data.map(item => ({
        rowid: "1",
        columnid: item.label,
        value: item.value
      }))
    }];
    chartConfig.dataSource.colorrange = {
      gradient: "0",
      minvalue: "0",
      code: "#62B58F",
      maxvalue: "50",
      color: [
        {
          code: "#FFC533",
          minvalue: "0",
          maxvalue: "25"
        },
        {
          code: "#F2726F",
          minvalue: "25",
          maxvalue: "50"
        }
      ]
    };
    delete chartConfig.dataSource.data;
  }

  return <ReactFC {...chartConfig} />;
};

export default ChatChart;