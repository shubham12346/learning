//Built-in Imports
import { useEffect, useState } from 'react';

//External Imports
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

//Internal Imports
import { Button } from 'src/shared/components/index';
import CustomFilter from 'src/modules/common/component/filter/CustomFilter';
import {
  createFlatListByObjectKeys,
  handleCheckUncheck,
  removeFilterElement
} from 'src/modules/common/utils/utils';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';

interface HeaderTenantFilterProps {
  addButtonLabel: string;
  showAddCompany?: () => void;
  showFilters?: boolean;
  filterList1?: any;
  showButton?: boolean;
  onFilterChange?: any;
}

export const HeaderFilter = ({
  addButtonLabel,
  showAddCompany,
  showFilters,
  filterList1,
  showButton = true,
  onFilterChange
}: HeaderTenantFilterProps) => {
  // Custom Filter List and object
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState([]);
  const [groupFilterList, setGroupFilterList] = useState<any>([]);
  const [roleFilterList, setRoleFilterList] = useState<any>([]);

  //useEffect
  useEffect(() => {
    if (filterList1?.groups) {
      const groups = filterList1?.groups.map((item: any) => {
        return {
          label: item.groupName,
          id: item.groupId,
          value: item.groupName
        };
      });
      setGroupFilterList(groups);
    }
    if (filterList1?.roles) {
      const roles = filterList1?.roles.map((item: any) => {
        return {
          label: item.displayName,
          id: item.id,
          value: item.name
        };
      });
      setRoleFilterList(roles);
    }
  }, [filterList1]);

  // On Apply
  const handleFilterValue = () => {
    const resp = createFlatListByObjectKeys(selectedFilter);
    setSelectedFilterValue(resp);
    onFilterChange(selectedFilter);
  };

  // On Cancel this is not resuable
  const handleOnCancel = (name) => {
    delete selectedFilter[name];
    const updatedSelectedFilter = { ...selectedFilter };
    setSelectedFilter(updatedSelectedFilter);
    const resp = createFlatListByObjectKeys(selectedFilter);
    setSelectedFilterValue(resp);
    onFilterChange(selectedFilter);
  };

  // Reset Filter
  const resetFilter = () => {
    setSelectedFilter({});
    setSelectedFilterValue([]);
    onFilterChange({});
  };

  // Remove element from both Array
  const removeElement = (ele: any) => {
    // call Remove element
    let resp = removeFilterElement(selectedFilterValue, selectedFilter, ele);
    setSelectedFilterValue(resp.updatedFilterValue);
    setSelectedFilter(resp.updatedFilter);
    onFilterChange(resp.updatedFilter);
  };
  // Check Uncheck
  const handleCheck = (item: any) => {
    let resp = handleCheckUncheck(selectedFilter, item);
    setSelectedFilter(resp);
  };

  return (
    <Box className=" flex-direction-column w-100">
      <Box className="flex-basic-space-start">
        <Box className="flex-column-start">
          <Box className="d-flex">
            {showFilters && (
              <>
                <Box>
                  <CustomFilter
                    name="group"
                    menuItems={groupFilterList}
                    checkedItems={selectedFilter['group'] || []}
                    handleCheck={(value) => handleCheck(value)}
                    onCancel={(value) => handleOnCancel(value)}
                    onApply={() => handleFilterValue()}
                    filterLabel="Group Name"
                    applyButtonDisable={selectedFilter['group']?.length < 1}
                  />
                </Box>
                <Box sx={{ ml: 6 }}>
                  <CustomFilter
                    name="role"
                    menuItems={roleFilterList}
                    checkedItems={selectedFilter['role'] || []}
                    handleCheck={(value) => handleCheck(value)}
                    onCancel={(value) => handleOnCancel(value)}
                    onApply={() => handleFilterValue()}
                    filterLabel="Role Type"
                    applyButtonDisable={selectedFilter['role']?.length < 1}
                  />
                </Box>
              </>
            )}
          </Box>
          {showFilters && selectedFilterValue?.length > 0 && (
            <FilterSelectedItems
              selectedFilterValue={selectedFilterValue}
              removeElement={removeElement}
              resetFilter={resetFilter}
            />
          )}
        </Box>

        {showButton && (
          <Box className="flex-basic-end">
            <Button
              sx={{ padding: '0.75rem 2rem' }}
              type="submit"
              variant="contained"
              btnText={addButtonLabel}
              onClick={() => showAddCompany()}
              className="w-100"
              startIcon={<AddIcon />}
            ></Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
