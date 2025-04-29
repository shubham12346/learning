import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Card from 'src/shared/components/card/Card';
import {
  checkTheDeadLine,
  customInternationDate,
  StatusWiseClassSet
} from 'src/shared/utils/utils';
import { TaskPropType } from '../../model/RegulationsInterface';
import { useNavigate } from 'react-router-dom';
import { getRegulationPath } from '../Utils';

const Task = (props: TaskPropType) => {
  const { targetDate, titleText, taskStatus, taskPath } = props;
  const { t } = useTranslation('regulations');
  const navigate = useNavigate();

  const isNearDeadline = checkTheDeadLine(10, targetDate);
  const checkDateSatus = isNearDeadline ? 'nearDeadline' : 'targetDate';

  const handleClick = () => {
    const path = getRegulationPath(
      taskPath.path,
      taskPath.idObj,
      taskPath.queryParam
    );
    navigate(path);
  };

  return (
    <Box className="tasklistWrapper mb-16" onClick={handleClick}>
      <Card className="taskContent" sx={{ p: 4 }}>
        <Box className="tasksHeader flex-basic-space-between mb-15">
          <Box className="iconAndDate flex-basic-start">
            <Box className="icon-calender icon-task-date p-relative mr-8">
              {isNearDeadline && <Box className="p-absolute alert"></Box>}
            </Box>
            <Typography className="targetDateLabel">
              <span>{t('targetDate')}</span>
              <span className={checkDateSatus}>
                {customInternationDate(targetDate)}
              </span>
            </Typography>
          </Box>
          <Box className="">
            <Chip
              label={[taskStatus]}
              size="small"
              color={'default'}
              className={`chip-status ${StatusWiseClassSet[taskStatus]} `}
              variant="outlined"
            />
          </Box>
        </Box>
        <Typography className="tasktitle">{titleText}</Typography>
      </Card>
    </Box>
  );
};

export default Task;
