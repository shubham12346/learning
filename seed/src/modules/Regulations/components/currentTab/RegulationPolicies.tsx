import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import * as ROUTES from 'src/shared/constants/routes';
import { Button } from 'src/shared/components/button/Button';
import {
  getRegulationDetails,
  saveFirmPolicyDetails,
  saveGapAnalysisDetails
} from '../../apis/RegulationsApi';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import AddLineBreak from './AddLineBreak';

const RegulationPolicies = (props) => {
  //const
  const { actions } = props;
  let { regId } = useParams();
  const { t } = useTranslation('regulations');
  const navigate = useNavigate();
  //state varibales
  const [isAddEditFirmPolicies, setIsAddEditFirmPolicies] =
    useState<boolean>(false);
  const [isAddEditGapAnalysis, setIsAddEditGapAnalysis] =
    useState<boolean>(false);
  const [isFirmValue, setIsFirmValue] = useState<any>('');
  const [isGapAnalysisValue, setIsGapAnalysisValue] = useState<any>('');
  const [regulationDetails, setRegulationDetails] = useState<any>({});
  const [isLoaderShow, setIsLoaderShow] = useState<boolean>(true);

  //useEffect
  useEffect(() => {
    if (regId) {
      getRegulationDetailsByID(regId);
    }
  }, []);

  useEffect(() => {
    if (regulationDetails?.policy?.firmPolicy?.policy) {
      setIsFirmValue(regulationDetails?.policy?.firmPolicy?.policy);
    }
    if (regulationDetails?.policy?.gapAnalysis?.gap) {
      setIsGapAnalysisValue(regulationDetails?.policy?.gapAnalysis?.gap);
    }
  }, [regulationDetails]);

  //methods
  //api get Regulation Policy Details
  const getRegulationDetailsByID = async (regulationID) => {
    setIsLoaderShow(true);
    const respData = await getRegulationDetails(regulationID);
    setRegulationDetails(respData);
    setIsLoaderShow(false);
  };

  //api add firm policy details
  const addFirmPolicy = async () => {
    try {
      setIsFirmValue('');
      const params = {
        policy: isFirmValue
      };
      await saveFirmPolicyDetails(
        regulationDetails?.businessRegulationId,
        params
      );
      let sucessMessage = regulationDetails?.policy?.firmPolicy?.policy
        ? `Firm's Policy updated successfully`
        : `Firm's Policy added successfully`;
      showSuccessMessage(sucessMessage, '', {});
      getRegulationDetailsByID(regId);
      setIsAddEditFirmPolicies(false);
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause || error?.message, {});
    }
  };

  //api add firm policy details
  const addGapAnalysis = async () => {
    try {
      const params = {
        gap: isGapAnalysisValue
      };
      await saveGapAnalysisDetails(
        regulationDetails?.businessRegulationId,
        params
      );
      let successMessage = regulationDetails?.policy?.gapAnalysis?.gap
        ? 'Gap Analysis updated successfully'
        : 'Gap Analysis added successfully';

      showSuccessMessage(successMessage, '', {});
      getRegulationDetailsByID(regId);
      setIsAddEditGapAnalysis(false);
      setIsGapAnalysisValue(isGapAnalysisValue);
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause || error?.message, {});
    }
  };

  const goToBackRegulation = () => {
    navigate(
      `/${ROUTES.BASEPATH}/${ROUTES.REGULATION}/${regulationDetails?.regulationId}`
    );
  };

  const addEditFirmPolicies = () => {
    setIsAddEditFirmPolicies(!isAddEditFirmPolicies);
  };

  const addEditGapAnalysis = () => {
    setIsAddEditGapAnalysis(!isAddEditGapAnalysis);
  };

  const inputFirmInputChange = (event) => {
    const newValue = event.target.value;
    setIsFirmValue(newValue);
  };

  const inputGapAnalysisChange = (event) => {
    const newValue = event.target.value;
    setIsGapAnalysisValue(newValue);
  };

  const getIconClassName = () => {
    if (regulationDetails?.policy?.firmPolicy?.policy === null) {
      return 'icon-plus';
    } else if (isAddEditFirmPolicies) {
      return 'icon-close';
    } else {
      return 'icon-edit';
    }
  };
  return (
    <>
      {isLoaderShow ? (
        <Box className="flex-basic-center mt-100">
          <Box className="spinnerLoading mt-100"></Box>
        </Box>
      ) : (
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
                <Box>{regulationDetails?.regulatoryBody}</Box>
                <Box sx={{ pr: 1 }}> : </Box>
                <Box className="text-ellipsis">
                  {regulationDetails?.regulationName}
                </Box>
                <Box className="d-flex">
                  <Box
                    sx={{ mx: 1 }}
                    className="icon-dropdown icon-rotate-273 iconStyle"
                  ></Box>
                </Box>
                <Box className="textweight textPrimaryColor">
                  {t('regulationPolicies')}
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
                            regulationDetails?.policy?.averyPolicy ||
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
                      {actions.includes('add-edit-firm-policy') && (
                        <Box
                          onClick={() => {
                            addEditFirmPolicies();
                          }}
                          className="policyEditBtn flex-basic-center"
                        >
                          <Box className={`${getIconClassName()}`}></Box>
                        </Box>
                      )}
                    </Box>
                    <Divider className="divider ml-32 mr-32" />
                    {!isAddEditFirmPolicies ? (
                      <Box sx={{ px: 8 }} className="policyData mt-20">
                        <Typography
                          className="textWeightRegular"
                          variant="body1"
                        >
                          {regulationDetails?.policy?.firmPolicy?.policy ? (
                            <Box className="textWrap">
                              <AddLineBreak
                                text={
                                  regulationDetails?.policy?.firmPolicy?.policy
                                }
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
                    ) : (
                      <Box className="p-relative editControlOption">
                        <Box
                          sx={{ px: 8 }}
                          className="w-100 customTextArea mt-20"
                        >
                          <textarea
                            className="w-100"
                            placeholder={'Enter firm policy...'}
                            rows={16}
                            value={isFirmValue}
                            onChange={(event) => inputFirmInputChange(event)}
                          ></textarea>
                        </Box>
                        <Box className="submitButtonSection">
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 4 }}
                            btnText={'Submit'}
                            disabled={isFirmValue.length <= 2}
                            onClick={() => {
                              addFirmPolicy();
                            }}
                          ></Button>
                        </Box>
                      </Box>
                    )}
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
                      {actions.includes('add-edit-gap-analysis') &&
                        regulationDetails?.policy?.firmPolicy?.policy !==
                          null && (
                          <Box
                            onClick={() => {
                              addEditGapAnalysis();
                            }}
                            className="policyEditBtn flex-basic-center"
                          >
                            <Box
                              className={`${
                                regulationDetails?.policy?.gapAnalysis?.gap ===
                                null
                                  ? 'icon-plus'
                                  : isAddEditGapAnalysis
                                  ? 'icon-close'
                                  : 'icon-edit'
                              }`}
                            ></Box>
                          </Box>
                        )}
                    </Box>
                    <Divider className="divider ml-32 mr-32" />
                    {!isAddEditGapAnalysis ? (
                      <Box sx={{ px: 8 }} className="policyData mt-20">
                        <Typography
                          className="textWeightRegular"
                          variant="body1"
                        >
                          {regulationDetails?.policy?.gapAnalysis?.gap ? (
                            <Box className="textWrap">
                              <AddLineBreak
                                text={
                                  regulationDetails?.policy?.gapAnalysis?.gap
                                }
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
                    ) : (
                      <Box className="p-relative editControlOption">
                        <Box
                          sx={{ px: 8 }}
                          className="w-100 customTextArea mt-20"
                        >
                          <textarea
                            className="w-100"
                            placeholder={'Enter gap analysis...'}
                            rows={16}
                            value={isGapAnalysisValue}
                            onChange={(event) => inputGapAnalysisChange(event)}
                          ></textarea>
                        </Box>
                        <Box className="submitButtonSection">
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 4 }}
                            btnText={'Submit'}
                            disabled={isGapAnalysisValue.length <= 2}
                            onClick={() => {
                              addGapAnalysis();
                            }}
                          ></Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default RegulationPolicies;
