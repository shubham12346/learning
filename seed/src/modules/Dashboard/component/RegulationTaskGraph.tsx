import { Box, Grid, Typography } from '@mui/material';
import Charts from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import GraphBackImage from 'src/assets/svg/graph-bg-img.svg';
import GraphInnerShadowImage from 'src/assets/svg/inner-bg-shadow-img.svg';

interface RegulationTaskGraphProps {
  graphData: any;
  graphHeading?:string;
}

const RegulationTaskGraph = ({ graphData,graphHeading='' }: RegulationTaskGraphProps) => {
  //const
  const { t } = useTranslation('dashboard');

  let seriesData = Array.isArray(graphData)
    ? graphData?.map((item) => {
        return item?.percentComplete;
      })
    : [graphData?.percentComplete];

  let labelsNames = Array.isArray(graphData)
    ? graphData?.map((item) => {
        return item?.regulatoryOrganizationName;
      })
    : [graphData?.regulatoryOrganizationName];

  const series = seriesData;
  const options: any = {
    chart: {
      width: 460,
      type: 'donut'
    },
    labels: labelsNames,
    colors: [
      '#135A5C',
      '#1B7D7F',
      '#32AFB2',
      '#82BDBE',
      '#0E3C3E',
      '#47C1C4',
      '#9AD5D7',
      '#E3F5F5'
    ],
    plotOptions: {
      pie: {
        startAngle: 0,
        margin: 30,
        endAngle: 360,
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 10
        },
        donut: {
          size: '55%',
          margin: 30,
          background: '#fff',
          labels: {
            show: true,
            name: {
              show: true,
              margin: 30,
              fontSize: '16px',
              fontFamily: 'Inter',
              fontWeight: 500,
              color: '#121433',
              offsetY: 5,
              label: '',
              formatter: () => 'Agency'
            },
            total: {
              showAlways: false,
              show: false,
              label: 'Total'
            },
            value: {
              show: false,
              fontSize: '16px',
              fontFamily: 'Inter',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: () => 'Text you want'
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      show: false,
      name: {
        show: false,
        formatter: () => 'Text you want'
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }
    ],
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none'
        }
      }
    },
    legend: {
      show: false,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      // position: 'right',
      // horizontalAlign: 'right',
      // floating: false,
      fontSize: '12px',
      fontFamily: 'Inter',
      fontWeight: 600,
      formatter: function (series, opts) {
        return `${series} - ${
          opts['w']?.['config']?.['series'][opts['seriesIndex']]
        }%`;
      },
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: '#263238',
        useSeriesColors: false
      },
      markers: {
        width: 22,
        height: 8,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 8,
        customHTML: undefined,
        onClick: undefined
        // offsetX: 26,
        // offsetY: -20
      },
      itemMargin: {
        horizontal: 20,
        vertical: 20
      },
      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      }
    }
  };
  const graphColors = [
    '#135A5C',
    '#1B7D7F',
    '#32AFB2',
    '#82BDBE',
    '#0E3C3E',
    '#47C1C4',
    '#9AD5D7',
    '#E3F5F5'
  ];
  return (
    <Box>
      <Grid container>
        <Grid item md={6} lg={8} xl={7}>
          <Box
            className="chartContainer"
            sx={{
              background: `url(${GraphBackImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '272px',
              width: '272px',
              position: 'relative'
            }}
          >
            <Box
              className="chartInnerBoxShadow flex-basic-center"
              sx={{
                background: `url(${GraphInnerShadowImage})`
              }}
            >
              <Typography
                className="agencyText textWeightMedium"
                variant={'subtitle1'}
              >
                {graphHeading}
              </Typography>
            </Box>
            <Charts
              options={options}
              series={series}
              type="donut"
              width="320"
              height={'270'}
            />
          </Box>
        </Grid>
        <Grid item md={6} lg={4} xl={5}>
          <Box className="graphLegend flex-column-start mt-24">
            {seriesData?.map((items, index) => (
              <Box className="mb-20" key={index}>
                <Box
                  sx={{ backgroundColor: graphColors[index] }}
                  className="indicaters mb-6"
                ></Box>
                <Box className="flex-basic-center">
                  <Box className="seriesItems">{labelsNames[index]}</Box>
                  <Box className="seriesItems" sx={{ px: 1 }}>
                    {'-'}
                  </Box>
                  <Box className="textweight seriesItems">{`${items}%`}</Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegulationTaskGraph;
