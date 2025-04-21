import { Box } from '@mui/material';
import React, { useState } from 'react';
import Charts from 'react-apexcharts';
import { radialGraphpropType } from './model/graphModel';

const RadialGraph = (props: radialGraphpropType) => {
  const {
    series,
    colors,
    labels,
    height = '180px',
    width = '60%',
    totalNumberOfTasks,
    taskCompleted
  } = props;

  const options: any = {
    chart: {
      height: 350
    },
    fill: {
      colors: ['#1B7D7F']
    },
    plotOptions: {
      radialBar: {
        inverseOrder: false,
        startAngle: 0,
        endAngle: 360,
        offsetX: 0,
        offsetY: 0,
        hollow: {
          margin: 10,
          size: '50%',
          background: 'transparent',
          position: 'front',
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
        track: {
          show: true,
          background: '#D5E2F1',
          strokeWidth: '110%',
          opacity: 0.2,
          margin: 5,
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0
            // blur: 3,
            // opacity: 0.5
          }
        },
        dataLabels: {
          show: true,
          name: {
            show: false
          },
          value: {
            show: false,
            fontSize: '14px',
            fontFamily: 'inter',
            fontWeight: 700,
            color: undefined,
            offsetY: 5
          }
        }
      }
    },

    stroke: {
      lineCap: 'square'
    },
    labels: labels,
    colors: colors
  };

  return (
    <Box className="radialCircle p-relative">
      <Charts
        options={options}
        series={series}
        type="radialBar"
        height={height}
        width={width}
      />
      <Box className="taskCompletedCount">
        {taskCompleted + '/' + totalNumberOfTasks}
      </Box>
    </Box>
  );
};

export default RadialGraph;
