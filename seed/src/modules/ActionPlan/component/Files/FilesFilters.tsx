import { Paper, InputBase } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';
import CustomFilter from '../../../common/component/filter/CustomFilter';
import {
  createFlatListByObjectKeys,
  removeFilterElement,
  handleCheckUncheck
} from '../../../common/utils/utils';
import { Button } from 'src/shared/components/button/Button';

export interface FilterFilerProps {
  showFilters: boolean;
  onFilterChange: (valye: any) => void;
  handleSearch: (valye: any) => void;
  getCallToFileUploadModel: () => void;
  searchKeyword: string;
  fileTypeList: any[];
  actions?: string[];
}

const FilesFilters = ({
  showFilters,
  onFilterChange,
  handleSearch,
  searchKeyword,
  fileTypeList,
  getCallToFileUploadModel,
  actions
}: FilterFilerProps) => {
  //const
  const { t } = useTranslation('regulations');

  // Custom Filter List and object
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
    setSelectedFilter((prevState) => {
      const { [name]: _, ...rest } = prevState;
      return rest;
    });
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
            <Paper className="d-flex headerSearchBox">
              <Box
                className="icon-search   flex-basic-center"
                sx={{ pl: 5 }}
              ></Box>

              <InputBase
                sx={{ ml: 4 }}
                className="bg-color-search w-100"
                placeholder={t('placeholderForFileSearch')}
                inputProps={{ 'aria-label': 'search google maps' }}
                value={searchKeyword}
                onChange={handleSearch}
              />
            </Paper>
            <Box sx={{ ml: 6 }}>
              <CustomFilter
                name="fileTypeList"
                menuItems={fileTypeList}
                checkedItems={selectedFilter['fileTypeList'] || []}
                handleCheck={(value) => handleCheck(value)}
                onCancel={(value) => handleOnCancel(value)}
                onApply={() => handleFilterValue()}
                filterLabel="File Type"
                applyButtonDisable={selectedFilter['fileTypeList']?.length < 1}
              />
            </Box>
          </Box>
          {showFilters && selectedFilterValue?.length > 0 && (
            <FilterSelectedItems
              selectedFilterValue={selectedFilterValue}
              removeElement={removeElement}
              resetFilter={resetFilter}
            />
          )}
        </Box>

        {actions?.includes('add-task') && (
          <Box className="flex-basic-end">
            <Button
              sx={{ padding: '0.75rem 2rem' }}
              variant="contained"
              btnText={'ADD NEW FILE'}
              onClick={() => {
                getCallToFileUploadModel();
              }}
              className="w-100"
              startIcon={<AddIcon />}
            ></Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FilesFilters;
