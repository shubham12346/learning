import { AutocompleteCloseReason, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import React, { SyntheticEvent } from 'react';
import AutoCompleteBox, { CustomLoading } from './AutoCompleteComponent';

const SearchComponent = (props: SearchComponentProptype) => {
  const {
    placeholder,
    width,
    open,
    getOptionLabel,
    options,
    handelOpen,
    handleClose,
    handleOnchange,
    handleInputChange,
    isOptionEqualToValue,
    loading,
    popper,
    selectedValue
  } = props;
  return (
    <Box className="autocompleteWrapper">
      <AutoCompleteBox
        placeholder={placeholder}
        width={width}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={handleOnchange}
        value={selectedValue}
        onClose={handleClose}
        onInputChange={handleInputChange}
        onOpen={handelOpen}
        open={open}
        options={options}
        PopperComponent={({ children, ...popperProps }) => (
          <Box
            {...popperProps}
            style={{
              position: 'absolute',
              top: popper?.top ?? 52,
              left: popper?.left ?? 0,
              backgroundColor: 'white',
              display: 'block',
              width: popper?.popperWidth ?? '492px',
              borderRadius: '24px'
            }}
          >
            {loading ? <CustomLoading /> : <Box> {children} </Box>}
          </Box>
        )}
      />
    </Box>
  );
};

export default SearchComponent;

export type SearchComponentProptype = {
  getOptionLabel: (option: unknown) => string;
  handelOpen?: (event: SyntheticEvent<Element, Event>) => void;
  handleClose: (
    event: SyntheticEvent<Element, Event>,
    reason: AutocompleteCloseReason
  ) => void;
  selectedValue?: any;
  handleOnchange: (event: any, value: any) => void;
  handleInputChange: (event: any, value: any) => void;
  isOptionEqualToValue: (option: unknown, value: unknown) => boolean;
  loading?: boolean;
  options: any[];
  open: boolean;
  renderOption?: (props: any, option: any) => JSX.Element;
  width?: string;
  placeholder?: string;
  popper?: {
    popperHeight?: string;
    popperWidth?: string;
    top?: number;
    left?: number;
  };
};
