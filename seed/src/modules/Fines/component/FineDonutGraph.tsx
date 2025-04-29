import { Box, Grid, Typography } from '@mui/material';
import Charts from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import GraphBackImage from 'src/assets/svg/graph-bg-img.svg';
import GraphInnerShadowImage from 'src/assets/svg/inner-bg-shadow-img.svg';
import { FineDonutGraphProps } from '../model/fineTypes';

const FineDonutGraph = (props: FineDonutGraphProps) => {
  //const
  const {
    handleSelectedDonutSection,
    selectedSection,
    graphData,
    labelName,
    seriesData
  } = props;
  const { t } = useTranslation('dashboard');

  const options: any = {
    chart: {
      width: 460,
      type: 'donut',
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const { dataPointIndex } = config;
          handleSelectedDonutSection(
            graphData[dataPointIndex],
            labelName[dataPointIndex],
            dataPointIndex
          );
        }
      }
    },
    labels: labelName,
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
    legend: {
      show: false
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
          type: 'none'
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none'
        }
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
      {seriesData && (
        <Grid container>
          <Grid item md={6} lg={7} xl={7}>
            <Box
              className="chartContainer graphBorder"
              sx={{
                background: `url(${GraphBackImage})`
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
                  {t('agency')}
                </Typography>
              </Box>
              <Charts
                options={options}
                series={seriesData}
                type="donut"
                width="320"
                height={'270'}
              />
            </Box>
          </Grid>
          <Grid item md={6} lg={5} xl={5}>
            <Box className="graphLegend flex-column-start mt-35 ml-28">
              {graphData?.seriesData?.map((items, index) => (
                <Box
                  className={`mb-20 p-10
                  ${
                    selectedSection?.labelName === labelName[index]
                      ? 'selectedDonut py-2'
                      : ''
                  }
                `}
                  key={index}
                >
                  <Box
                    sx={{ backgroundColor: graphColors[index] }}
                    className="indicaters mb-6"
                  ></Box>
                  <Box className="flex-basic-start">
                    <Box className="seriesItems">{labelName[index]}</Box>
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
      )}
    </Box>
  );
};

export default FineDonutGraph;
