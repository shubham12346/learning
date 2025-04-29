import { InputBase, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import CustomFilter from 'src/modules/common/component/filter/CustomFilter';
import {
  createFlatListByObjectKeys,
  handleCheckUncheck,
  removeFilterElement
} from 'src/modules/common/utils/utils';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';
import { TableFilterProps } from '../model/fineTypes';
import { Select } from 'src/shared/components/select/Select';

const EnforcementFilters = (props: TableFilterProps) => {
  const {
    agenciesList,
    fineAmountList,
    yearList,
    searchKeyword,
    handleSearch,
    selectedYear,
    handleSelectedYear,
    onFilterChange
  } = props;

  
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState([]);

  // On Apply
  const handleFilterValue = () => {
    const resp = createFlatListByObjectKeys(selectedFilter);
    setSelectedFilterValue(resp);
    onFilterChange(selectedFilter);
  };

  // On Cancel this is not resuable
  const handleOnCancel = (name) => {
    const newObj = {...selectedFilter}
    delete newObj[name]
    setSelectedFilter(newObj);
    const resp = createFlatListByObjectKeys(newObj);
    setSelectedFilterValue(resp);
    onFilterChange(newObj);
  };

  // Reset Filter
  const resetFilter = () => {
    setSelectedFilter({});
    setSelectedFilterValue([]);
    onFilterChange({},true);
  };

  // Remove element from both Array
  const removeElement = (ele: any) => {
    // call Remove element
    let resp = removeFilterElement(selectedFilterValue, selectedFilter, ele);
    setSelectedFilterValue(resp?.updatedFilterValue);
    setSelectedFilter(resp?.updatedFilter);
    onFilterChange(resp?.updatedFilter);
  };

  // Check Uncheck
  const handleCheck = (item: any) => {
    let resp = handleCheckUncheck(selectedFilter, item);
    setSelectedFilter(resp);
  };
  
  return (
    <>
      <Box className="mt-35">
        <Typography variant="h5">{'Enforcement Actions'} </Typography>
      </Box>
      <Box className=" flex-direction-column w-100 mt-20 mb-20">
        <Box className="flex-basic-space-start">
          <Box className="flex-column-start">
            <Box className="d-flex">
              <Paper  className="d-flex headerSearchBox">
                <Box
                  className="icon-search   flex-basic-center"
                  sx={{ pl: 5 }}
                ></Box>
                <InputBase
                  sx={{ ml: 4 }}
                  className="bg-color-search w-100"
                  placeholder={'Search '}
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onChange={handleSearch}
                  value={searchKeyword}
                />
              </Paper>

              <Box sx={{ ml: 6 }}>
                <CustomFilter
                  name="agency"
                  menuItems={agenciesList || []}
                  checkedItems={selectedFilter['agency'] || []}
                  handleCheck={(value) => handleCheck(value)}
                  onCancel={(value) => handleOnCancel(value)}
                  onApply={() => handleFilterValue()}
                  filterLabel="Agencies"
                  applyButtonDisable={
                    !selectedFilter['agency']?.length
                  }
                />
              </Box>
              <Box
                sx={{ ml: 6, mt: -2 }}
                className="filterSelect d-flex align-items-center"
              >
                <Select
                  className=""
                  label={''}
                  defaultValue={yearList[0]}
                  placeholder={selectedYear}
                  value={selectedYear || 'none'}
                  options={yearList || []}
                  itemValue={'year'}
                  itemText={'year'}
                  onChange={handleSelectedYear}
                />
              </Box>
              <Box sx={{ ml: 6 }}>
                <CustomFilter
                  name="fineRange"
                  menuItems={fineAmountList}
                  checkedItems={selectedFilter['fineRange'] || []}
                  handleCheck={(value) => handleCheck(value)}
                  onCancel={(value) => handleOnCancel(value)}
                  onApply={() => handleFilterValue()}
                  filterLabel="Fine Amount"
                  applyButtonDisable={
                    !selectedFilter['fineRange']?.length
                  }
                />
              </Box>
            </Box>
            {selectedFilterValue?.length > 0 && (
              <FilterSelectedItems
                selectedFilterValue={selectedFilterValue}
                removeElement={removeElement}
                resetFilter={resetFilter}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EnforcementFilters;
