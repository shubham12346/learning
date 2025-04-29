import { Box, Typography } from '@mui/material';
import React from 'react';
interface OverallRegulatoryEventsCardProps {
  iconClass: string;
  cardSubText: string;
  totalCountNumber: number;
  completedCountNumber?: number;
}
const OverallRegulatoryEventsCard = ({
  iconClass,
  cardSubText,
  totalCountNumber,
  completedCountNumber
}: OverallRegulatoryEventsCardProps) => {
  return (
    <Box className="regulatoryInnerCard flex-basic-space-between">
      <Box sx={{ p: 5 }} className="innerCardItem">
        <Box className="flex-basic-space-between">
          <Box className="flex-column-start">
            <Box>
              <Typography
                variant="inherit"
                className="textsemiWeight text-font-24"
              >
                {completedCountNumber ? '' : totalCountNumber}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              className="textWeightMedium subTextStyle mt-6"
            >
              {cardSubText}
            </Typography>
          </Box>
          <Box className="mt-16">
            <Box>
              <span className={`iconStyle ${iconClass}`}></span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OverallRegulatoryEventsCard;
