import React from 'react';
import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChatChart = ({ data, chartType }) => {
  const chartConfig = {
    type: chartType,
    width: '900',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Activity',
        xAxisName: 'Time',
        yAxisName: 'Type',
        theme: 'fusion'
      },
      data: data
    }
  };

  return <ReactFC {...chartConfig} />;
};

export default ChatChart;