import { Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FineGraphsInnerCardTypes } from '../model/fineTypes';

const FineGraphsInnerCard = (props: FineGraphsInnerCardTypes) => {
  const { title, descriptions } = props;
  const cardTitle = title?.length >= 10 ? title.slice(0, 7) + '...' : title;

  return (
    <Box className="fineGraphsInnerCard">
      <Box className="flex-column-start">
        {title?.length >= 10 ? (
          <Tooltip title={title} arrow>
            <Typography variant="h6" className="mb-10">
              {cardTitle}
            </Typography>
          </Tooltip>
        ) : (
          <Typography variant="h6" className="mb-10">
            {cardTitle}
          </Typography>
        )}
        <Typography className="description  ">{descriptions}</Typography>
      </Box>
    </Box>
  );
};

export default FineGraphsInnerCard;
