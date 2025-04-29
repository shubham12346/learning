import Charts from 'react-apexcharts';
import { horizontalBraGraphTye } from './model/graphModel';
import { Box } from '@mui/material';

const HorizontalBarGraph = (props: horizontalBraGraphTye) => {
  // de structure props  and paasing default values

  const {
    colrs = ['#CBD0F6', '#A8B5F8', '#7C83E5', '#314DDD', '#353DA9', '#070D2D'],
    series = [
      {
        data: [10, 20, 50, 30, 90, 100]
      }
    ],
    xAxisCategories = ['CFPA', 'NFA', 'FTC', 'CCPA', 'SEC', 'FINRA'],
    xAxisTitle = 'No of events',
    yAxisTitle = 'Agencies',
    height,
    width
  } = props;

  // const series = series
  const options: any = {
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: false // <== line to add
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: '55%',
        borderRadius: 8,
        borderRadiusApplication: 'end',
        dataLabels: {
          position: 'top'
        }
      }
    },
    colors: colrs,
    dataLabels: {
      enabled: false,
      offsetX: 30,
      style: {
        fontSize: '12px',
        colors: ['#000']
      }
    },
    xaxis: {
      categories: xAxisCategories,
      title: {
        text: xAxisTitle,
        offsetX: 0,
        offsetY: 10,
        style: {
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 400
        }
      },
      lables: {
        style: {
          fontSize: '14px',
          fontFamily: 'Inter',
          fontWeight: 400
        }
      },
      tickAmount: 10
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      title: {
        text: yAxisTitle,
        font: 'Inter',
        fontSize: '12px',
        offsetX: 2,
        offsetY: 10,
        style: {
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 500,
          cssClass: 'apexcharts-xaxis-title'
        }
      }
    },
    grid: {
      show: true, // you can either change hear to disable all grids
      xaxis: {
        lines: {
          show: true //or just here to disable only x axis grids
        }
      },
      yaxis: {
        lines: {
          show: false //or just here to disable only y axis
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return '';
          }
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
          value: 0.35
        }
      }
    }
  };
  return (
    <Box className="w-100">
      <Charts
        options={options}
        series={series}
        type="bar"
        width={'100%'}
        height={height}
      />
    </Box>
  );
};

export default HorizontalBarGraph;
