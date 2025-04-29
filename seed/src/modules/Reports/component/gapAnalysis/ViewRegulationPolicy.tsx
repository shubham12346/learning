import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddLineBreak from 'src/modules/Regulations/components/currentTab/AddLineBreak';

const ViewRegulationPolicy = (props) => {
  //const
  const { setSelectedMoreInfo, selectedMoreInfo } = props;
  const { t } = useTranslation('regulations');
  //state varibales

  const goToBackRegulation = () => {
    setSelectedMoreInfo('');
  };

  return (
    <>
      <Box className="flex-basic-space-between mb-26">
        <Box className="flex-basic-start w-100">
          <Box
            onClick={goToBackRegulation}
            className="mr-16 d-flex iconArrowBack flex-basic-center cursorPointer"
          >
            <ArrowBackIcon sx={{ color: '#fff' }} />
          </Box>
          <Typography
            variant="h4"
            className="textWeightMedium flex-basic-start text-ellipsis customWidth100"
          >
            <Box>{'Reports'}</Box>
            <Box className="d-flex">
              <Box
                sx={{ mx: 1 }}
                className="icon-dropdown icon-rotate-273 iconStyle"
              ></Box>
            </Box>
            <Box className=" text-ellipsis">{'Gap Assesment Report'}</Box>
            <Box className="d-flex">
              <Box
                sx={{ mx: 1 }}
                className="icon-dropdown icon-rotate-273 iconStyle"
              ></Box>
            </Box>
            <Box className="textweight textPrimaryColor text-ellipsis">
              {selectedMoreInfo?.regulationName}
            </Box>
          </Typography>
        </Box>
      </Box>
      <Card className="regulationPolicySection">
        <CardContent sx={{ p: 0 }} className="regulationPolicyCardBody">
          <Grid className="regulationPolicyView" container>
            <Grid item lg={4}>
              <Box sx={{ py: 6, pl: 8 }}>
                <Typography className="textsemiWeight" variant="h6">
                  {t('averyPolicy')}
                </Typography>
                <Divider className="divider mt-22 mr-32" />
                <Box className="policyData mt-20">
                  <Typography
                    className="textWeightRegular mr-32"
                    variant="body1"
                    paragraph={true}
                  >
                    <AddLineBreak
                      text={
                        selectedMoreInfo?.policy?.averyPolicy ||
                        'Sorry, no data available.'
                      }
                    />
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Box
                  sx={{ pt: 6, pb: 4, px: 8 }}
                  className="flex-basic-space-between"
                >
                  <Typography
                    className="textsemiWeight lineHeigt-32"
                    variant="h6"
                  >
                    {t('firmPolicy')}
                  </Typography>
                </Box>
                <Divider className="divider ml-32 mr-32" />
                <Box sx={{ px: 8 }} className="policyData mt-20">
                  <Typography className="textWeightRegular" variant="body1">
                    {selectedMoreInfo?.policy?.firmPolicy ? (
                      <Box className="textWrap">
                        <AddLineBreak
                          text={selectedMoreInfo?.policy?.firmPolicy}
                        />
                      </Box>
                    ) : (
                      <Box className="mt-60 text-center">
                        <Typography className="mb-8" variant="h6">
                          {t('noFirmPolicy')}
                        </Typography>
                        <Typography
                          className="textWeightRegular"
                          variant="body1"
                        >
                          {t('noFirmPolicySubtext')}
                        </Typography>
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Box
                  sx={{ pt: 6, pb: 4, px: 8 }}
                  className="flex-basic-space-between"
                >
                  <Typography
                    className="textsemiWeight lineHeigt-32"
                    variant="h6"
                  >
                    {t('gapAnalysis')}
                  </Typography>
                </Box>
                <Divider className="divider ml-32 mr-32" />
                <Box sx={{ px: 8 }} className="policyData mt-20">
                  <Typography className="textWeightRegular" variant="body1">
                    {selectedMoreInfo?.policy?.gapAnalysis ? (
                      <Box className="textWrap">
                        <AddLineBreak
                          text={selectedMoreInfo?.policy?.gapAnalysis}
                        />
                      </Box>
                    ) : (
                      <Box className="mt-60 text-center">
                        <Typography className="mb-8" variant="h6">
                          {t('noGapAnalysis')}
                        </Typography>
                        <Typography
                          className="textWeightRegular"
                          variant="body1"
                        >
                          {t('noGapAnalysisSubtext')}
                        </Typography>
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ViewRegulationPolicy;
