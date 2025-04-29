import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from 'src/shared/components/index';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

interface MenuItemsI {
  id?: string;
  label: string;
  value: string;
}

interface CustomFilterI {
  name: string;
  menuItems: MenuItemsI[];
  checkedItems: any;
  handleCheck: (ele: any) => void;
  onCancel: (ele: any) => void;
  onApply: () => void;
  filterLabel: string;
  applyButtonDisable?: boolean;
  disableFilter?: boolean;
}
export const CustomFilter = (props: CustomFilterI) => {
  const {
    name,
    menuItems,
    checkedItems,
    handleCheck,
    onCancel,
    onApply,
    filterLabel,
    applyButtonDisable = false,
    disableFilter = false
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [customStyle, setcustomStyle] = useState(false);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setcustomStyle(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setcustomStyle(false);
  };

  // Handle the selected items (checkedItems) here
  const handleApply = () => {
    onApply();
    handleClose();
  };

  // Clear the selected items
  const handleCancel = () => {
    onCancel(name);
    handleClose();
  };
  //filterButtonDisabled

  return (
    <Box
      className={`filterGroup ${disableFilter ? 'filterButtonDisabled' : ''} `}
    >
      <Box
        onClick={handleOpen}
        className={clsx(
          { ['filterButtonActive']: customStyle },
          'filterButton flex-basic-start'
        )}
      >
        <Box className="btnText">{filterLabel}</Box>
        <Box className="d-flex" sx={{ ml: 4 }}>
          <span
            className={`${
              customStyle ? 'icon-dropdown icon-rotate-180' : 'icon-dropdown'
            }`}
          ></span>
        </Box>
      </Box>
      <Menu
        id="menu"
        className="mt-6 w-80"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PopoverClasses={{ root: 'filterPopover' }}
      >
        <List className="filterList ">
          {menuItems.map((item) => (
            <ListItem key={item.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    className="MuiCheckboxCustomStyle"
                    checked={checkedItems.some((e) => e.value === item.value)}
                    onChange={() => handleCheck({ ...item, name })}
                  />
                }
                label={item?.label}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ px: 5, pb: 5, pt: 1 }} className="flex-basic-space-between">
          <Button
            variant="outlined"
            onClick={handleCancel}
            color="secondary"
            btnText="Cancel"
            style={{ padding: '6px 32px' }}
          />
          <Button
            onClick={handleApply}
            color="primary"
            disabled={applyButtonDisable}
            variant="contained"
            style={{ padding: '6px 32px' }}
            btnText="Apply"
          />
        </Box>
      </Menu>
    </Box>
  );
};

export default CustomFilter;
