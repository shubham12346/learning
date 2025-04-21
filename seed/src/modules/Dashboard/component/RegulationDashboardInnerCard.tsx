import { Box, Typography } from '@mui/material';
import React from 'react';
interface RegulationDashboardInnerCardProps {
  iconClass: string;
  cardSubText: string | any;
  totalCountNumber: number;
  completedCountNumber?: number;
}
const RegulationDashboardInnerCard = ({
  iconClass,
  cardSubText,
  totalCountNumber,
  completedCountNumber
}: RegulationDashboardInnerCardProps) => {
  return (
    <Box className="regulationInnerCard flex-basic-space-between">
      <Box sx={{ p: 4 }} className="innerCardItem">
        <Box className="flex-basic-space-between mt-4">
          <Box>
            <Typography
              variant="inherit"
              className="textsemiWeight text-font-24"
            >
              {completedCountNumber
                ? `${completedCountNumber}/${totalCountNumber}`
                : totalCountNumber}
            </Typography>
          </Box>
          <Box>
            <span className={iconClass}></span>
          </Box>
        </Box>
        <Box className="mt-16">
          <Typography
            variant="subtitle2"
            className="textWeightMedium subTextStyle"
          >
            {cardSubText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegulationDashboardInnerCard;
