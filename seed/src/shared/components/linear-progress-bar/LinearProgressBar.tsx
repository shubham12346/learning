import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useTranslation } from 'react-i18next';
interface LinearProgressBarProps {
  isShowTotalCount: boolean;
  totalTasksCount?: number;
  totalNumberOfTaskCompleted?: number;
}

function LinearProgressBar({
  totalTasksCount = 0,
  isShowTotalCount = false,
  totalNumberOfTaskCompleted = 0
}: LinearProgressBarProps) {
  //const
  const { t } = useTranslation('regulations');
  const taskPercentage =
    totalTasksCount >= 1
      ? (totalNumberOfTaskCompleted / totalTasksCount) * 100
      : 0;

  return (
    <Box sx={{ width: '100%' }} className="customLinearProgress p-relative">
      {isShowTotalCount && (
        <Box className="flex-basic-start mb-4">
          <Typography variant={'subtitle2'} className="textsemiWeight mr-8">
            <span
              className={`${
                totalNumberOfTaskCompleted === 0 ? 'textCountColors' : ''
              }`}
            >
              {totalNumberOfTaskCompleted}
            </span>
            <span className="textweight"> / {totalTasksCount}</span>
          </Typography>
          <Typography
            variant={'inherit'}
            className="text-font-12 textWeightMedium"
          >
            {t('tasksCompletedText')}
          </Typography>
        </Box>
      )}

      <LinearProgress
        variant="determinate"
        value={taskPercentage > 100 ? 100 : taskPercentage}
      />
    </Box>
  );
}
export default LinearProgressBar;
