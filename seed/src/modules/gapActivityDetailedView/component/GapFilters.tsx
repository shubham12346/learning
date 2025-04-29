import { useState } from 'react';
import { Box } from '@mui/material';
import CustomFilter from 'src/modules/common/component/filter/CustomFilter';
import { Button } from 'src/shared/components/button/Button';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';
import {
  createFlatListByObjectKeys,
  handleCheckUncheck,
  removeFilterElement
} from 'src/modules/common/utils/utils';

const GapFilters = (params) => {
  const {
    agencyFilterOptions,
    statusFilterOptions,
    handleViewActionPlan,
    onFilterChange,
    isDisabled
  } = params;

  //state variables
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState([]);

  // Check Uncheck
  const handleCheck = (item: any) => {
    let resp = handleCheckUncheck(selectedFilter, item);
    setSelectedFilter(resp);
  };

  // On Apply
  const handleFilterValue = () => {
    const resp = createFlatListByObjectKeys(selectedFilter);
    setSelectedFilterValue(resp);
    onFilterChange(selectedFilter);
  };

  // On Cancel this is not resuable
  const handleOnCancel = (name) => {
    const newObj = { ...selectedFilter };
    delete newObj[name];
    setSelectedFilter(newObj);
    const resp = createFlatListByObjectKeys(newObj);
    setSelectedFilterValue(resp);
    onFilterChange(newObj);
  };

  const resetFilter = () => {
    setSelectedFilter({});
    setSelectedFilterValue([]);
    onFilterChange({});
  };

  // Remove element from both Array
  const removeElement = (ele: any) => {
    let resp = removeFilterElement(selectedFilterValue, selectedFilter, ele);
    setSelectedFilterValue(resp?.updatedFilterValue);
    setSelectedFilter(resp?.updatedFilter);
    onFilterChange(resp?.updatedFilter);
  };

  return (
    <>
      <Box className="d-flex flex-basic-space-between w-100 flex-wrap">
        <Box className="d-flex flex-basic-center flex-wrap">
          <Box className="pr-10">
            <CustomFilter
              name="agency"
              menuItems={agencyFilterOptions}
              checkedItems={selectedFilter['agency'] || []}
              handleCheck={(value) => handleCheck(value)}
              onCancel={(value) => handleOnCancel(value)}
              onApply={() => handleFilterValue()}
              filterLabel="Select Agency"
              applyButtonDisable={false}
            />
          </Box>
          <Box>
            <CustomFilter
              name="status"
              menuItems={statusFilterOptions}
              checkedItems={selectedFilter['status'] || []}
              handleCheck={(value) => handleCheck(value)}
              onCancel={(value) => handleOnCancel(value)}
              onApply={() => handleFilterValue()}
              filterLabel="Select Status"
              applyButtonDisable={false}
            />
          </Box>
        </Box>
        <Box className="flex-basic-start">
          <Button
            onClick={handleViewActionPlan}
            variant="contained"
            btnText={'VIEW ACTION PLAN'}
            sx={{
              borderRadius: '2px'
            }}
            disabled={isDisabled}
          />
        </Box>
      </Box>
      <Box className="pb-15">
        {selectedFilterValue?.length > 0 && (
          <FilterSelectedItems
            selectedFilterValue={selectedFilterValue}
            removeElement={removeElement}
            resetFilter={resetFilter}
          />
        )}
      </Box>
    </>
  );
};

export default GapFilters;
