import { Box, Typography } from '@mui/material';
import Charts from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import scoreGraphIcon from '../../../assets/svg/score-g-icons.svg';

interface ComplianceScoreGraphProps {
  complianceCurrentScore: any;
}

const ComplianceScoreGraph = ({
  complianceCurrentScore
}: ComplianceScoreGraphProps) => {
  //const
  const { t } = useTranslation('dashboard');
  const series = [complianceCurrentScore?.currentScore];
  const options: any = {
    chart: {
      height: 120,
      type: 'radialBar'
    },
    fill: {
      colors: ['#ED981B']
    },
    plotOptions: {
      radialBar: {
        inverseOrder: false,
        startAngle: 0,
        endAngle: 360,
        offsetX: 0,
        offsetY: 0,
        hollow: {
          margin: 30,
          size: '70%',
          background: 'rgba(229, 229, 239, 1)',
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
          background: 'rgba(63, 65, 89, 0.8)',
          strokeWidth: '30%',
          opacity: 0.2,
          margin: 5,
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
        dataLabels: {
          show: true,
          name: {
            show: false
          },
          value: {
            show: true,
            fontSize: '28px',
            fontFamily: 'inter',
            fontWeight: 600,
            color: 'rgba(18, 20, 51, 1)',
            offsetY: 10,
            formatter: function (val) {
              return val + '%';
            }
          }
        }
      }
    },

    stroke: {
      lineCap: 'square'
    }
  };
  return (
    <Box>
      <Box className="flex-basic-center">
        <Charts
          options={options}
          series={series}
          type="radialBar"
          width="500"
          height={'330'}
        />
      </Box>

      <Typography
        className="flex-basic-center mb-12"
        variant={'subtitle1'}
        sx={{ color: 'rgba(88, 89, 91, 0.8)' }}
      >
        <Box sx={{ pr: 2 }}>
          <img alt={scoreGraphIcon} src={scoreGraphIcon} />
        </Box>
        <Box>+</Box>
        <Box sx={{ px: 1 }}>
          {complianceCurrentScore?.differenceFromYesterday}
        </Box>
        {t('pointFromYesterday')}
      </Typography>
    </Box>
  );
};

export default ComplianceScoreGraph;
