import { Box, InputBase, Paper, Typography } from '@mui/material';
import { Select } from 'src/shared/components/select/Select';
import { GraphFilterProps } from '../model/fineTypes';
import { DEFAULT_YEAR } from './contants';

const FineHeaderFilters = (props: GraphFilterProps) => {
  // destructuring  props
  const {
    selectedYear,
    handleSelectedYear,
    yearOptions,
    selectedAgency,
    agencyOptions,
    handleSelectedAgency
  } = props;

  return (
    <Box className="flex-basic-start">
      <Box className="filterSelect ">
        <Select
          className=""
          label={''}
          placeholder={selectedYear || DEFAULT_YEAR}
          value={selectedYear || 'none'}
          options={yearOptions || []}
          itemValue={'year'}
          itemText={'year'}
          onChange={handleSelectedYear}
        />
      </Box>
      <Box className="filterSelect " sx={{ ml: 6 }}>
        <Select
          label={''}
          placeholder="Agency"
          value={selectedAgency || 'none'}
          options={agencyOptions || []}
          itemValue={'name'}
          itemText={'name'}
          onChange={handleSelectedAgency}
        />
      </Box>
    </Box>
  );
};

export default FineHeaderFilters;
