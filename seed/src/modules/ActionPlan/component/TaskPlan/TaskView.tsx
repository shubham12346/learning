import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { REGULATION } from 'src/modules/GapActionPlan/component/constants';
import { FilePreviewType } from 'src/shared/components/upload/services/singleOrMultipleUploadInterface';
import {
  customInternationDate,
  customInternationDate2,
  getTimeStamp
} from 'src/shared/utils/utils';
interface TaskViewProps {
  taskDetails: any;
  taskType?: 'gap-analysis' | 'regulation';
}
function TaskView({
  taskDetails,
  taskType = 'regulation'
}: Readonly<TaskViewProps>) {
  //const
  const { t } = useTranslation('regulations');

  const handleSelected = (item) => {
    window.open(item?.link, '_blank');
  };

  let taskAttachment = taskDetails?.attachment || taskDetails?.attachments;

  console.log('taskDetails', taskDetails);
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={7} className="borderRight">
          {taskType === REGULATION ? (
            <Box sx={{ px: 8, pt: 12 }}>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography
                    variant="body1"
                    className="textsemiWeight textWrap"
                  >
                    {t('taskNameLbl')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.taskName}
                  </Typography>
                </Box>
              </Box>
              <Box className="mb-40">
                <Box>
                  <Typography variant="body1">
                    {taskDetails?.summary?.name}
                  </Typography>
                </Box>
              </Box>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('descriptionLbl')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.description || (
                      <Box className="emptyTextField">
                        {t('emptyFieldText')}
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box className="">
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('Attachments')}
                  </Typography>
                </Box>
                <Box className="fileAttachment cursorPointer">
                  {taskDetails?.attachment?.length > 0 ? (
                    <Box className="d-flex flex-wrap">
                      {taskDetails?.attachment?.map(
                        (item: FilePreviewType, index: number) => (
                          <Box
                            sx={{ p: 3 }}
                            className="fileBox mb-10 mr-10  "
                            key={`${index}- ${item?.name || item?.fileName}`}
                            onClick={() => {
                              handleSelected(item);
                            }}
                          >
                            <Box className="text-font-12 textsemiWeight textPrimaryColor">
                              {item?.name || item?.fileName}
                            </Box>
                            <Box className="text-font-12">
                              {customInternationDate2(
                                item?.lastModifiedDate || item?.uploadedAt
                              )}
                              ,
                              {getTimeStamp(
                                item?.lastModifiedDate || item?.uploadedAt
                              )}
                            </Box>
                          </Box>
                        )
                      )}
                    </Box>
                  ) : (
                    <Box className="text-font-12">{t('noFileUploaded')}</Box>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={{ px: 8, pt: 12 }}>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography
                    variant="body1"
                    className="textsemiWeight textWrap"
                  >
                    {t('taskNameLbl')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.taskName}
                  </Typography>
                </Box>
              </Box>
              <Box className="mb-40">
                <Box>
                  <Typography variant="body1">
                    {taskDetails?.summary?.name}
                  </Typography>
                </Box>
              </Box>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('gapAnalysisRemediation')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.gapAnalysisRemediation || (
                      <Box className="emptyTextField">
                        {t('emptyFieldText')}
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('firmPolicy')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.firmsPolicy || (
                      <Box className="emptyTextField">
                        {t('emptyFieldText')}
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('revisedPolicy')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.revisedPolicy || (
                      <Box className="emptyTextField">
                        {t('emptyFieldText')}
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('Attachments')}
                  </Typography>
                </Box>
                <Box className="fileAttachment cursorPointer">
                  {taskAttachment.length > 0 ? (
                    <Box className="d-flex flex-wrap">
                      {taskAttachment?.map(
                        (item: FilePreviewType, index: number) => (
                          <Box
                            sx={{ p: 3 }}
                            className="fileBox mb-10 mr-10  "
                            key={`${index}- ${item?.name || item?.fileName}`}
                            onClick={() => {
                              handleSelected(item);
                            }}
                          >
                            <Box className="text-font-12 textsemiWeight textPrimaryColor">
                              {item?.name || item?.fileName}
                            </Box>
                            <Box className="text-font-12">
                              {customInternationDate2(
                                item?.lastModifiedDate || item?.uploadedAt
                              )}
                              ,
                              {getTimeStamp(
                                item?.lastModifiedDate || item?.uploadedAt
                              )}
                            </Box>
                          </Box>
                        )
                      )}
                    </Box>
                  ) : (
                    <Box className="text-font-12">{t('noFileUploaded')}</Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Box sx={{ px: 8, pt: 10 }}>
            <Box className="mb-40">
              <Box className="mb-8">
                <Typography variant="body1" className="textsemiWeight">
                  {t('targetDateLbl')}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {customInternationDate(taskDetails?.targetDate)}
                </Typography>
              </Box>
            </Box>
            <Box className="mb-40">
              <Box className="mb-8">
                <Typography variant="body1" className="textsemiWeight">
                  {t('ownerLbl')}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {taskDetails?.owner?.name}
                </Typography>
              </Box>
            </Box>
            {taskType === REGULATION ? (
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('tags')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    {taskDetails?.tag?.split(',').join(', ') ||
                      'No tags selected '}
                  </Typography>
                </Box>
              </Box>
            ) : null}
            <Box className="mb-40">
              <Box className="mb-8">
                <Typography variant="body1" className="textsemiWeight">
                  {t('cadence')}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {taskDetails?.taskCadence?.displayName}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={7} className="borderRight">
          {taskType === REGULATION ? (
            <Box sx={{ px: 8, pb: 10 }}>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('controlTest')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.controlTest || '-'}
                  </Typography>
                </Box>
              </Box>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography variant="body1" className="textsemiWeight">
                    {t('testResults')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.testResult || '-'}
                  </Typography>
                </Box>
              </Box>
              <Box className="mb-40">
                <Box className="mb-8">
                  <Typography
                    variant="body1"
                    className="textsemiWeight textWrap"
                  >
                    {t('recommendedChanges')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="textWrap">
                    {taskDetails?.recommendedChanges || '-'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
}

export default TaskView;
