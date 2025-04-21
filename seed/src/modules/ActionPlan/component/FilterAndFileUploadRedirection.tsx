import { FilterAndFileUploadRedirectionTypes } from '../model';
import { Box, Typography } from '@mui/material';
import { Button } from 'src/shared/components/button/Button';
import LinearProgressBar from 'src/shared/components/linear-progress-bar/LinearProgressBar';
import { useTranslation } from 'react-i18next';
import {
  getRegulationPath,
  REGULATION_PATH
} from 'src/modules/Regulations/components/Utils';
import { useNavigate } from 'react-router';
import { Select } from 'src/shared/components/select/Select';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import useTaskTypesOptions from 'src/modules/Tasks/hooks/useTaskTypesOptions';
import { useMemo } from 'react';

const FilterAndFileUploadRedirection = (
  props: FilterAndFileUploadRedirectionTypes
) => {
  const {
    isShowTotalCount,
    selectedFilter,
    actionId,
    actions,
    handleFilterChange,
    isActionPlanSaved,
    regId,
    totalNumberOfTaskCompleted,
    totalTasksCount
  } = props;
  const { t } = useTranslation('regulations');
  const navigate = useNavigate();

  const taskDropdown = useSelector(
    (state: RootState) => state?.tasks?.taskDropDown
  );

  const removeOtherFromTaskDropdown = useMemo(() => {
    return taskDropdown?.filter((item) => item?.label !== 'Other');
  }, [taskDropdown]);

  useTaskTypesOptions();

  const allOptions = {
    id: 'all',
    value: t('allTasks'),
    label: t('allTasks')
  };
  const goToAddNewTask = () => {
    const path = getRegulationPath(REGULATION_PATH.ADDTASK, {
      regId,
      actionId
    });
    navigate(path);
  };

  const goToFiles = () => {
    const path = getRegulationPath(REGULATION_PATH.ACTION_PALN_VIEW, {
      regId,
      actionId
    });
    navigate(`${path}/attachment`);
  };

  return (
    <Box className="p-relative" sx={{ px: 8, mt: 8 }}>
      <Box className="flex-basic-space-between">
        <Box>
          <Typography
            variant={'inherit'}
            className="textsemiWeight text-font-24"
          >
            {t('actionPlanSectionText.taskListTitle')}
          </Typography>
        </Box>
        <Box className="taskListControlBtns d-flex align-items-center">
          <Box
            sx={{ mr: 4 }}
            className="filterSelect d-flex align-items-center selectHeight"
          >
            <Select
              className=""
              label={''}
              defaultValue={''}
              placeholder={t('taskType', { ns: 'english' })}
              value={selectedFilter || 'none'}
              options={[...removeOtherFromTaskDropdown, allOptions]}
              itemValue={'value'}
              itemText={'label'}
              onChange={handleFilterChange}
            />
          </Box>

          <Button
            variant="outlined"
            type="submit"
            className="mr-16"
            btnText={t('actionPlanSectionText.filesText')}
            size={'small'}
            startIcon={<Box className="icon-folder iconStyle" />}
            onClick={() => {
              goToFiles();
            }}
            sx={{ py: '0.5rem', px: '1rem' }}
            disabled={!isActionPlanSaved}
          />
          {actions?.includes('add-task') && (
            <Button
              variant="outlined"
              type="submit"
              size={'small'}
              btnText={t('actionPlanSectionText.addNewTaskText')}
              startIcon={<Box className="icon-plus iconStyle" />}
              onClick={() => {
                goToAddNewTask();
              }}
              sx={{ py: '0.5rem', px: '1rem' }}
            />
          )}
        </Box>
      </Box>
      <Box className="mt-14">
        <LinearProgressBar
          isShowTotalCount={isShowTotalCount}
          totalNumberOfTaskCompleted={totalNumberOfTaskCompleted}
          totalTasksCount={totalTasksCount}
        />
      </Box>
    </Box>
  );
};

export default FilterAndFileUploadRedirection;
