import { Box, Typography } from '@mui/material';
import { Button } from 'src/shared/components/button/Button';
import { Select } from 'src/shared/components/select/Select';
import { StatusWiseClassSet, TaskTagColors } from 'src/shared/utils/utils';
import { taskHeaderType } from '../models';
import StatusChip from 'src/modules/Reports/component/statusChip/StatusChip';
import { useTranslation } from 'react-i18next';

const TaskHeader = (props: taskHeaderType) => {
  const { t } = useTranslation('regulations');
  const {
    isMoreInfo,
    actions,
    handleDelete,
    taskStatus,
    riskStatus,
    taskTitle,
    titleTags,
    handleEdit
  } = props;
  const { handleOptionChange, selectedStatus, options } = taskStatus;

  let showEditButton = actions?.includes('edit-task') && isMoreInfo;
  return (
    <Box className="GapTaskEditHeader" sx={{ px: 5, py: 3, mb: 4 }}>
      <Box className="flex-basic-space-between">
        <Box className="flex-column-start">
          <Box className="mt-4 d-flex align-items-center flex-wrap ">
            {taskTitle?.length > 0 && (
              <Typography variant="h3" sx={{ mr: 4 }}>
                {taskTitle}
              </Typography>
            )}

            <Box>
              <StatusChip chipVariant={riskStatus} />
            </Box>
          </Box>
        </Box>
        <Box className="d-flex">
          {showEditButton && (
            <Button
              variant="outlined"
              type="submit"
              size={'small'}
              className="mr-16"
              btnText={t('editBtnText')}
              onClick={handleEdit}
              sx={{ py: '0.375rem', px: '2rem' }}
            />
          )}
          {actions?.includes('delete-task') && (
            <Button
              variant="outlined"
              type="submit"
              size={'small'}
              className="mr-16"
              btnText={t('deleteBtnText')}
              onClick={handleDelete}
              sx={{ py: '0.375rem', px: '2rem' }}
            />
          )}

          {actions?.includes('edit-task') && (
            <Box
              className={` cursor-pointer customSelect ${
                StatusWiseClassSet[selectedStatus?.label]
              }`}
            >
              <Select
                id="customSelectControl"
                fullWidth
                label={''}
                defaultValue={selectedStatus?.id}
                value={selectedStatus?.id}
                options={options}
                itemValue={'id'}
                itemText={'label'}
                onChange={(e) => handleOptionChange(e)}
              />
            </Box>
          )}
        </Box>
      </Box>

      {titleTags?.length > 0 && (
        <Box className="d-flex  flex-wrap ">
          {titleTags?.map?.(({ title, value }, index) => (
            <Box
              key={`${title}-${index}`}
              sx={{ m: 2 }}
              borderRadius={'20px'}
              className={`roundedTag ${TaskTagColors[title]}`}
            >
              <Box className={`d-flex `} sx={{ py: 2, px: 3.5 }}>
                <Typography className="textWeightRegular" variant="subtitle2">
                  {title}
                </Typography>
                <Typography className="textweight" variant="subtitle2">
                  : {` ${value}`}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TaskHeader;
