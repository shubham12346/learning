import Task from './Task';
import { Box } from '@mui/material';
import { Button } from 'src/shared/components/button/Button';
import { useTranslation } from 'react-i18next';
import { taskListPropType } from '../../model/RegulationsInterface';
import { REGULATION_PATH } from '../Utils';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoTaskImageUrl from 'src/assets/svg/taskEmptyView.svg';

const TaskList = (allTasks: taskListPropType) => {
  const { t } = useTranslation('regulations');
  const {
    tasks,
    showViewAllAfter,
    handleViewAll,
    taskLoader = false,
    idObj
  } = allTasks;
  const showViewAll: boolean = tasks?.length > showViewAllAfter;
  const TaskListToShow: any = showViewAll
    ? tasks.slice(0, showViewAllAfter)
    : tasks;
  return (
    <Box>
      {taskLoader ? (
        <Box className="flex-basic-center mt-100">
          <Box className="spinnerLoading mt-100"></Box>
        </Box>
      ) : (
        <>
          {TaskListToShow?.length > 0 &&
            TaskListToShow.map((task) => (
              <Task
                key={task?.targetDate}
                targetDate={task?.targetdate}
                titleText={task?.taskname}
                taskStatus={task?.status}
                taskPath={{
                  idObj: idObj,
                  path: REGULATION_PATH.VIEWTASK,
                  queryParam: `taskUid=${task?.id}&&taskDisplayId=${task?.taskDisplayId}&&taskOccurrenceId=${task?.taskOccurrenceId}`
                }}
              />
            ))}
          {tasks?.length == 0 && (
            <Box sx={{ py: 7, px: 2 }}>
              <EmptyPlaceholder
                imgWidth={'156'}
                imageUrl={NoTaskImageUrl}
                titleText={t('noTaskFound')}
              />
            </Box>
          )}
          {showViewAll && (
            <Box className="flex-basic-end">
              <Button
                btnText={t('viewAll')}
                className="viewAllButton"
                variant="text"
                onClick={handleViewAll}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default TaskList;
