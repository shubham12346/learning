import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface FilterSelectedItemsProps {
  selectedFilterValue: any;
  removeElement: (event: any) => void;
  resetFilter: () => void;
}
function FilterSelectedItems({
  selectedFilterValue,
  removeElement,
  resetFilter
}: FilterSelectedItemsProps) {
  const { t } = useTranslation('english');
  return (
    <Box className="autoScrollFilterItem w-100">
      <Box className="d-flex selectedFilter mt-24">
        {selectedFilterValue.map((ele: any, index) => {
          return (
            <Box
              className="filterItemSelected flex-basic-center mr-12"
              key={index}
            >
              <Box> {ele.label}</Box>
              <Box
                className="icon-close iconStyle ml-10 cursorPointer"
                onClick={() => removeElement(ele)}
              ></Box>
            </Box>
          );
        })}
        <Box
          className="resetBtn flex-basic-start ml-26 cursorPointer"
          onClick={() => resetFilter()}
        >
          <Box className="icon-reset-filter iconStyle" sx={{ mr: 2 }}></Box>
          <Typography variant="body2" className="textweight">
            {t('resetFilterText')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default FilterSelectedItems;
