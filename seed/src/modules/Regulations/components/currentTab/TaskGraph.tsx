import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TaskGraphPropType } from '../../model/RegulationsInterface';
import RadialGraph from 'src/modules/common/component/graphs/RadialGraph';

const TaskGraph = (props: TaskGraphPropType) => {
  const { t } = useTranslation('regulations');
  const {
    series,
    colors,
    taskStatusCounts,
    graphButtomTitle,
    labels,
    totalNumberOfTask
  } = props;

  return (
    <Box className="flex-basic-space-around align-items-center radialGraphProgress ">
      <Box className="flex-column-start">
        <Box className="radialCircle">
          <RadialGraph
            colors={colors}
            labels={labels}
            series={series}
            height="170px"
            width="170px"
            totalNumberOfTasks={totalNumberOfTask}
            taskCompleted={taskStatusCounts?.approved}
          />
        </Box>
        <Typography className="graphTitle ml-20 mb-9">
          {graphButtomTitle}
        </Typography>
      </Box>
      <Box className="statusText column mt-40">
        <Typography className="statusCountText mb-10">
          <span className="textweight mr-16">{taskStatusCounts?.overdue}</span>
          {t('overdue')}
        </Typography>
        <Typography className="statusCountText mb-10">
          <span className="textweight mr-16">
            {taskStatusCounts?.pendingApproval}
          </span>
          {t('pendingApproval')}
        </Typography>
        <Typography className="statusCountText">
          <span className="textweight mr-16">{taskStatusCounts?.approved}</span>
          {t('approval')}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskGraph;
