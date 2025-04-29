import {
  Box,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  CardActions
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/shared/components/button/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import * as ROUTES from 'src/shared/constants/routes';
import { customInternationDate } from 'src/shared/utils/utils';
import EnforcementDetails from '../../Regulations/components/EnforcementDetails';
import { deleteActionPlan, saveActionPlan } from '../api/actionplanApi';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { ActionPlanProps } from '../model';
import {
  REGULATION_PATH,
  getRegulationPath
} from '../../Regulations/components/Utils';
import DiscardModal from 'src/modules/common/component/DiscardModel';
import FilterAndFileUploadRedirection from './FilterAndFileUploadRedirection';
import { formatTasksAndVersions } from 'src/modules/Tasks/component/util';
import RegulationTable from 'src/modules/Regulations/components/currentTab/RegulationTable';

function ActionPlanDetails({
  isShowLoader,
  generatedActionPlanDetail,
  getUpdatedActionPlanDetails,
  actions,
  taskListLoader
}: Readonly<ActionPlanProps>) {
  //const
  let { regId, actionId } = useParams();
  const { t } = useTranslation('regulations');
  const navigate = useNavigate();

  //state Variables
  const [isShowSummary, setIsShowSummary] = useState(true);
  const [regulationInfo, setRegulationInfo] = useState<any>();
  const [showModelOnNavigateBack, setShowModelOnNavigateBack] = useState(false);
  const [isActionPlanSaved, setIsActionPlanSaved] = useState<boolean>();
  const [actionPlanVersionUid, setActionPlanVersionUid] = useState('');
  const [nextPath, setNextPath] = useState('');
  const [isDiscardClicked, setIsDiscardClicked] = useState(false);
  const [selectedTaskFilter, setSelectedTaskFilter] = useState('');
  const [tableData, setTableData] = useState<any>();

  //useEffect
  useEffect(() => {
    setActionPlanVersionUid(generatedActionPlanDetail?.actionPlanVersionUid);
    setIsActionPlanSaved(generatedActionPlanDetail?.isAccepted);
    setRegulationInfo(generatedActionPlanDetail?.regulationInfo);
    if (
      generatedActionPlanDetail?.tasksList?.length > 0 &&
      generatedActionPlanDetail?.tasksList[0].taskId
    ) {
      console.log('generatedActionPlanDetail', generatedActionPlanDetail);
      let mainRow = {
        regulatoryBody:
          generatedActionPlanDetail?.regulationInfo?.regulatoryBody,
        regulationName:
          generatedActionPlanDetail?.regulationInfo?.regulationName
      };
      let tableDataFormatted = formatTasksAndVersions(
        generatedActionPlanDetail?.tasksList,
        mainRow
      );

      setTableData(tableDataFormatted);
    } else {
      setTableData([]);
    }
  }, [generatedActionPlanDetail]);

  const goBackToRegulationSummary = () => {
    const path = getRegulationPath(REGULATION_PATH.REGULATION_WITH_ID, {
      regId
    });
    navigate(path);
  };

  //methods
  const handleIconClick = () => {
    setIsShowSummary(!isShowSummary);
  };

  const checkIfActionPlanIsSaved = (discardClicked: any) => {
    setIsDiscardClicked(false);
    if (isActionPlanSaved || !actions?.includes('add-regulations')) {
      goBackToRegulationSummary();
    } else {
      setIsDiscardClicked(!!discardClicked);
      setShowModelOnNavigateBack(true);
    }
  };

  const handleSaveActionPlan = async () => {
    try {
      const respData = await saveActionPlan(actionPlanVersionUid);
      if (respData.message === t('actionPlanAcceptedMessage')) {
        showSuccessMessage(t('actionPlanAcceptedMessage'), '', {
          position: 'top-right'
        });
        setIsActionPlanSaved(true);
      }
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
    }

    setIsActionPlanSaved(true);
  };

  const handleDiscardActionPlan = async () => {
    try {
      const respData = await deleteActionPlan(actionPlanVersionUid);
      if (respData.message === t('actionPlanDiscardedMessage')) {
        showSuccessMessage(t('actionPlanDiscardedMessage'), '', {
          position: 'top-right'
        });
        setTimeout(() => {
          navigate(`/${ROUTES.BASEPATH}/${ROUTES.REGULATION}/${regId}`);
        }, 4000);
      }
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
    }
  };

  const handleleavePage = () => {
    if (isDiscardClicked) {
      setShowModelOnNavigateBack(false);
    } else {
      setShowModelOnNavigateBack(false);
      if (!nextPath) {
        goBackToRegulationSummary();
      }
    }
  };

  const handleStayPage = () => {
    setShowModelOnNavigateBack(false);
    if (isDiscardClicked) {
      handleDiscardActionPlan();
    } else {
      handleSaveActionPlan();
    }
  };

  const handleFilterChange = (e) => {
    let selectedFilter = e.target.value;
    setSelectedTaskFilter(selectedFilter);
    let taskType = selectedFilter === t('allTasks') ? '' : selectedFilter;
    getUpdatedActionPlanDetails({ taskType: taskType });
  };

  if (isShowLoader) {
    return (
      <Box className="flex-basic-center mt-100">
        <Box className="spinnerLoading mt-100"></Box>
      </Box>
    );
  }

  console.log('taskListLoader', tableData);
  console.log('generatedActionPlanDetail', generatedActionPlanDetail);
  return (
    <>
      <Box className="flex-basic-space-between mb-26">
        <Box className="flex-basic-start w-100">
          <Box
            onClick={checkIfActionPlanIsSaved}
            className="mr-16 d-flex iconArrowBack flex-basic-center cursorPointer"
          >
            <ArrowBackIcon className="breadcrumbArrowIcon" />
          </Box>
          <Typography
            variant="h4"
            className="textWeightMedium flex-basic-start text-ellipsis customWidth100"
          >
            <Box>{regulationInfo?.regulatoryBody}</Box>
            <Box sx={{ pr: 1 }}> : </Box>
            <Box className="text-ellipsis">
              {regulationInfo?.regulationName}
            </Box>
            <Box className="d-flex">
              <Box
                sx={{ mx: 1 }}
                className="icon-dropdown icon-rotate-273 iconStyle"
              ></Box>
            </Box>
            <Box className="textweight textPrimaryColor">
              {t('actionPlanSectionText.actionPlanText')}
            </Box>
          </Typography>
        </Box>
      </Box>
      <Card className="actionCardSection">
        <CardHeader
          sx={{ py: 6, px: 8 }}
          title={
            <Box className="flex-basic-start p-relative">
              <EnforcementDetails
                iconClassName="icon-date iconStyle"
                enforcementLabel={t('enforcementDate')}
                enforcementValue={customInternationDate(
                  regulationInfo?.regulationEnforcementDate
                )}
              />

              <EnforcementDetails
                iconClassName="icon-date iconStyle"
                enforcementLabel={t('dateofRegulationNotice')}
                enforcementValue={customInternationDate(
                  regulationInfo?.regulationNoticeDate
                )}
              />
              <Tooltip
                title={
                  !isShowSummary
                    ? t(
                        'actionPlanSectionText.expandRegulationSummaryTooltipText'
                      )
                    : t(
                        'actionPlanSectionText.collapseRegulationSummaryTooltipText'
                      )
                }
                arrow
              >
                <Box
                  onClick={() => handleIconClick()}
                  className="summaryCollapseBtn flex-basic-center cursorPointer"
                >
                  <Box
                    className={`${
                      isShowSummary ? 'icon-collapse' : 'icon-expand'
                    }  iconStyle`}
                  ></Box>
                </Box>
              </Tooltip>
            </Box>
          }
        />
        <Divider className="divider" />
        <CardContent
          sx={{
            height: `calc(100vh - ${!isActionPlanSaved ? '400px' : '308px'})`
          }}
          className="summaryCard"
        >
          <Box
            sx={{ px: 8, pt: 7 }}
            className={`mb-24 my-div ${isShowSummary ? 'visible' : 'hidden'}`}
          >
            <Box className="summaryHeader flex-basic-space-between mb-16">
              <Typography variant="h6" className="textsemiWeight">
                {t('regulationSummaryTitle')}
              </Typography>
            </Box>
            <Box className="summaryList">
              <Box sx={{ fontWeight: '400' }}>{regulationInfo?.summary}</Box>
            </Box>
          </Box>
          <FilterAndFileUploadRedirection
            isShowTotalCount={true}
            actions={actions}
            isActionPlanSaved={isActionPlanSaved}
            totalNumberOfTaskCompleted={
              generatedActionPlanDetail?.taskStatusCounts?.approved
            }
            totalTasksCount={generatedActionPlanDetail?.totalNumberOfTasks}
            regId={regId}
            actionId={actionId}
            handleFilterChange={handleFilterChange}
            selectedFilter={selectedTaskFilter}
          />
          <Box>
            <RegulationTable
              actions={['edit-tasks']}
              loader={taskListLoader}
              pager={{
                currentPage: 1,
                limit: 10,
                startIndex: 0,
                totalItems: 0,
                totalPages: 0
              }}
              tableListData={tableData}
              regulationInfo={regulationInfo}
            />
          </Box>
        </CardContent>
        {!isActionPlanSaved && (
          <CardActions className="actionCardFooter">
            <Box
              sx={{ py: 4, px: 4 }}
              className="flex-basic-space-between w-100"
            >
              {isActionPlanSaved ? (
                <Box className="flex-basic-end w-60">
                  <Button
                    variant="outlined"
                    type="submit"
                    className="mr-24 displayNone"
                    btnText={t('SaveAsNewVersion')}
                    onClick={handleDiscardActionPlan}
                    sx={{
                      py: '0.62rem',
                      px: '2rem',
                      minWidth: '125px'
                    }}
                  />
                </Box>
              ) : (
                <>
                  {actions?.includes('add-regulations') && (
                    <Box className="flex-basic-end w-60">
                      <Button
                        variant="outlined"
                        type="submit"
                        className="mr-24"
                        btnText="Discard"
                        onClick={() => checkIfActionPlanIsSaved(true)}
                        sx={{
                          py: '0.62rem',
                          px: '2rem',
                          minWidth: '125px'
                        }}
                      />
                      <Button
                        variant="contained"
                        type="submit"
                        btnText="Save"
                        onClick={handleSaveActionPlan}
                        sx={{
                          py: '0.62rem',
                          px: '2rem',
                          minWidth: '120px'
                        }}
                      />
                    </Box>
                  )}
                </>
              )}
              <Box className="displayHidden">
                <Button
                  variant="outlined"
                  type="submit"
                  btnText="Download"
                  disabled={true}
                  startIcon={<Box className="icon-download iconStyle" />}
                  onClick={() => {}}
                  sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
                />
              </Box>
            </Box>
          </CardActions>
        )}
      </Card>
      <DiscardModal
        handleLeavePage={handleleavePage}
        handleStayPage={handleStayPage}
        open={showModelOnNavigateBack}
        text={
          isDiscardClicked
            ? {
                acceptTitle: t('yes'),
                discardTitle: t('no'),
                description: t('discardChages'),
                title: t('discardUnsavedChanges')
              }
            : {
                acceptTitle: t('save'),
                discardTitle: t('leave'),
                description: t('unsavedDescription'),
                title: t('unsavedChanges')
              }
        }
      />
    </>
  );
}

export default ActionPlanDetails;
