import { Box } from '@mui/material';
import Charts from 'react-apexcharts';
import { currencyFormatter } from 'src/shared/constants/constants';
import { FinehorizontalBraGraphTye } from '../model/fineTypes';

const FineHorizontalBarGraph = (props: FinehorizontalBraGraphTye) => {
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
    yAxisTitle = 'Agency',
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
    dataLabels: {
      enabled: false,
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
      labels: {
        formatter: function (value) {
          return currencyFormatter(Math.pow(10, value));
        },
        style: {
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 400
        }
      },
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
      },
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Inter',
          fontWeight: 400
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
        logarithmic: true,
        logBase: 10,
        lines: {
          show: false //or just here to disable only y axis
        }
      }
    },

    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<Box class="horziontalGraphTooltip">' +
          '<span>' +
          'Fine Amount - ' +
          currencyFormatter( Math.pow(10,Number(series[seriesIndex][dataPointIndex]))) +
          '</span>' +
          '</Box>'
        );
      },
      intersect: true,
      followCursor: false,
      position: 'topRight'
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

export default FineHorizontalBarGraph;
