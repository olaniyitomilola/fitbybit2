import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SimpleLineChart = () => {
  // Sample data for the chart
  const data = {
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', "Sat"],
    datasets: [
      {
        data: [0, 0, 2],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Color of the line
        strokeWidth: 2 // Width of the line
      }
    ]
  };

  // Chart configuration options
  const chartConfig = {
    backgroundGradientFrom: '#fff', // Background gradient start color
    backgroundGradientTo: '#fff', // Background gradient end color
    decimalPlaces: 0, // Number of decimal places for Y-axis labels
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color of text
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color of axis labels
    style: {
      borderRadius: 16
    }
  };

  return (
    <View>
      <LineChart
        data={data}
        width={300} // Width of the chart
        height={200} // Height of the chart
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default SimpleLineChart;
