import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  Box,
  PopperProps,
  TextField
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { SyntheticEvent } from 'react';
import Typography from '../../typography/Typography';
import NoRegulationFoundImage from '../../../../assets/svg/noRegulationFoundImage.svg';
import { useTranslation } from 'react-i18next';

export default function AutoCompleteBox(props: AutoCompleteBoxPropType) {
  const {
    width,
    height = '2.75rem',
    onInputChange,
    open,
    onOpen,
    onClose,
    getOptionLabel,
    isOptionEqualToValue,
    loading,
    options,
    noOptionsText,
    freeSolo = false,
    onChange,
    placeholder,
    style,
    disabled,
    ...remaining
  } = props;
 
  const handleInputChange = async (event, value) => {
    await onInputChange(event, value);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <Autocomplete
        {...remaining}
        clearIcon={<Box  className="icon-close " sx={{ pl: 2 }}></Box>}
        clearOnEscape
        freeSolo={freeSolo}
        disabled={disabled}
        sx={{ width: width, height: height }}
        isOptionEqualToValue={isOptionEqualToValue}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        getOptionLabel={getOptionLabel}
        options={options}
        loading={loading}
        onInputChange={handleInputChange}
        onChange={onChange}
        noOptionsText={<CreateCustomNoOption />}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <Box
                  className="icon-search  flex-basic-center"
                  sx={{ pl: 2 }}
                ></Box>
              ),
              endAdornment: <>{params.InputProps.endAdornment}</>
            }}
          />
        )}
      />
    </Box>
  );
}

const CreateCustomNoOption = () => {
  const { t } = useTranslation('regulations');
  return (
    <>
      <Box className="flex-basic-center seacrhNoUserFoundHeigth">
        <Box className="flex-column-center">
          <Box>
            <img src={NoRegulationFoundImage} />
          </Box>
          <Typography variant="subtitle1"> {t('noResultFound')}</Typography>
          <Typography variant="body1"> {t('tryADifferentSearch')}</Typography>
        </Box>
      </Box>
    </>
  );
};

export const CustomLoading = () => {
  const { t } = useTranslation('regulations');
  return (
    <>
      <Box className="flex-basic-center serachLoadingHeight">
        <Box>
          <Box margin={10} className="flex-column-center">
            <Box className="spinnerLoading mt-100"></Box>
          </Box>
          <Typography variant="body1">
            {' '}
            {t('pleaseWaitMessage')}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export type regulationType = {
  organization: string;
  name: string;
};

export const RegulationElement = ({ regulation }) => {
  const { name, organization } = regulation;
  return (
    <Box className="d-flex  " sx={{ ml: 3 }}>
      <Typography variant="subtitle2">{organization}</Typography>
      <Typography variant="body1">{' - ' + name}</Typography>
    </Box>
  );
};

export type AutoCompleteBoxPropType = {
  disabled?: boolean;
  width?: string;
  height?: string;
  onInputChange: (event: any, value: any) => void;
  open: boolean;
  onOpen: (event: SyntheticEvent<Element, Event>) => void;
  onClose: (
    event: SyntheticEvent<Element, Event>,
    reason: AutocompleteCloseReason
  ) => void;
  getOptionLabel: (option: unknown) => string;
  isOptionEqualToValue: (option: unknown, value: unknown) => boolean;
  loading?: boolean;
  options: any[];
  noOptionsText?: string;
  freeSolo?: boolean;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: {},
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown>
  ) => void;
  placeholder?: string;
  style?: any;
  renderOption?: (props: any, option: any) => JSX.Element;
  value?: any;
  onBlur?: any;
  id?: string;
  PopperComponent?: (props: PopperProps) => ReactElement<any, any>;
};
