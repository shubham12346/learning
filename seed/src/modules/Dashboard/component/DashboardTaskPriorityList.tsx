import { Box, Chip, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import {
  StatusWiseClassSet,
  customInternationDate
} from 'src/shared/utils/utils';
import NoTaskImageUrl from 'src/assets/svg/taskEmptyView.svg';
import {
  REGULATION_PATH,
  getRegulationPath
} from 'src/modules/Regulations/components/Utils';
import { DashboardTaskEnforcementListPropsTypes } from '../model/dashboardModel';

const DashboardTaskEnforcementList = (
  props: DashboardTaskEnforcementListPropsTypes
) => {
  //const
  const { dateLabel, taskListData, isCollapsed, gotTaskList } = props;
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();

  const goToRoute = () => {
    navigate(getRegulationPath(REGULATION_PATH.REGULATION));
  };
  const getTaskStatus = (item) => {
    return (
      item?.taskStatus?.displayName ||
      item?.taskVersion?.[0]?.taskStatus?.displayName ||
      ''
    );
  };
  return (
    <Box>
      {taskListData?.length > 0 ? (
        <>
          <Box
            sx={{
              height: isCollapsed ? '564px' : '215px',
              overflow: 'hidden'
            }}
          >
            {taskListData?.map((item, index) => (
              <Box key={index}>
                <Box className="flex-basic-space-between p-relative">
                  <Typography
                    variant="subtitle1"
                    className="flex-basic-start w-80 text-noWarp"
                  >
                    {item?.regulatoryBody && item?.regulationName ? (
                      <>
                        <Box> {item?.regulatoryBody} </Box>
                        <Box sx={{ px: 1 }}> : </Box>
                        <Box
                          className={`text-ellipsis  ${
                            getTaskStatus(item) === 'Pending Approval'
                              ? 'w-70'
                              : 'w-80'
                          }`}
                        >
                          {item?.regulationName}
                        </Box>
                      </>
                    ) : (
                      <>{t('averyCoPilotChat')}</>
                    )}
                  </Typography>
                  <Box sx={{ right: '0' }} className="p-absolute">
                    <Chip
                      // cadece :label={item?.taskVersion[0]?.taskStatus?.displayName}
                      label={getTaskStatus(item)}
                      size="small"
                      color={'default'}
                      className={`chip-status ${
                        StatusWiseClassSet[getTaskStatus(item)]
                      } `}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                <Box className="d-flex mt-8">
                  <Typography variant={'subtitle2'}>{dateLabel}</Typography>
                  <Typography variant={'subtitle2'} className="textweight ml-4">
                    {customInternationDate(item?.taskTargetDate)}
                  </Typography>
                </Box>
                <Box className="d-flex mt-4">
                  <Typography
                    variant={'subtitle2'}
                    className="text-ellipsis customWidth100"
                  >
                    {item?.title}
                  </Typography>
                </Box>

                <Divider className="divider mt-20 mb-20" />
              </Box>
            ))}
          </Box>
          <Box className="flex-basic-end mt-30 mb-5">
            <Typography
              variant={'subtitle2'}
              onClick={() => gotTaskList()}
              className="textweight cursorPointer textPrimaryColor "
            >
              {t('viewAll')}
            </Typography>
          </Box>
        </>
      ) : (
        <Box sx={{ px: 4, py: 3 }}>
          <EmptyPlaceholder
            imgWidth={'115'}
            imageUrl={NoTaskImageUrl}
            titleText={t('taskEmptyStats')}
            subText={t('taskEmptySubText')}
            buttonText={t('goToRegulationBtnText')}
            goToRoute={goToRoute}
          />
        </Box>
      )}
    </Box>
  );
};

export default DashboardTaskEnforcementList;
