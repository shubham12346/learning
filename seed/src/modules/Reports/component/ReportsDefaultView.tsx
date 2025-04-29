import { Box, Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReportsDefaultViewPropsTypes } from '../model/reportsModel';

const ReportsDefaultView = (props: ReportsDefaultViewPropsTypes) => {
  //const
  const { t } = useTranslation('reports');
  const { goToReportDetails } = props;
  const headerList = [
    {
      title: t('auditTrailReport'),
      description: t('reportDescText'),
      goToDetails: 'Audit Trail Report',
      viewAll: t('viewAll')
    },
    {
      title: t('annualReports'),
      description: t('annualReportDescription'),
      goToDetails: 'Annual Report',
      viewAll: t('viewAll')
    },
    {
      title: t('gapReport'),
      description: t('gapDescriptionText'),
      goToDetails: 'Gap Report',
      viewAll: t('viewAll')
    }
  ];

  return (
    <>
      <Grid container spacing={8}>
        {headerList.map((item) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={4}
            key={item.description}
          >
            <Card sx={{ p: 6 }} className="reportsCard">
              <Box className="flex-basic-start align-items-start">
                <Box className="reportIconBox flex-basic-center">
                  <Box className="icon-audit-trail-report"></Box>
                </Box>
                <Box sx={{ ml: 6 }}>
                  <Typography className="mb-16" variant={'h5'}>
                    {item.title}
                  </Typography>
                  <Typography className="mb-24 description" variant={'body1'}>
                    {item.description}
                  </Typography>
                  <Box className="flex-basic-start mb-8 ">
                    <Box
                      className="cursorPointer d-flex"
                      onClick={() => goToReportDetails(true, item.goToDetails)}
                    >
                      <Typography
                        className="textweight textPrimaryColor"
                        variant={'subtitle2'}
                      >
                        {t('viewAll')}
                      </Typography>

                      <Box className="ml-8 viewAllArrow flex-basic-center">
                        <span className="icon-ic_right-arrow"></span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ReportsDefaultView;
