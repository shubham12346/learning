//Built-in Imports
import { useState } from 'react';

//External Imports
import { Box, Container, InputBase, Paper, Typography } from '@mui/material';

//Internal Imports
import CustomFilter from 'src/modules/common/component/filter/CustomFilter';
import {
  createFlatListByObjectKeys,
  handleCheckUncheck,
  removeFilterElement
} from 'src/modules/common/utils/utils';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';
import { convertIntoFiltersOptionsArrayType } from './utils';
import HorizontalScrollBar from './HorizontalScrollBar';

interface newsHeaderPropsTypes {
  showAddCompany?: () => void;
  showFilters?: boolean;
  showButton?: boolean;
  onFilterChange?: any;
  newsAgencyList: [];
  newsCategoryList: [];
  searchKeyword: string;
  handleSearchKeyword: (e: any) => void;
}

const NewsHeader = ({
  showFilters,
  onFilterChange,
  newsAgencyList,
  newsCategoryList,
  searchKeyword,
  handleSearchKeyword
}: newsHeaderPropsTypes) => {
  // Custom Filter List and object
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState([]);

  // use effect for applying filter change

  // On Apply
  const handleFilterValue = () => {
    //  get a list of new categories from selected agencies
    const listOfSelectedAgencies = convertIntoFiltersOptionsArrayType(
      selectedFilter?.['newsAgency']
    );
    // filter value which are not in agencies
    //  remove the news categories from selected news categories which does not lies in above
    const filterNewsCategories = listOfSelectedAgencies.filter((item1) =>
      selectedFilter?.['newsCategory']?.some((item2) => item2.id === item1.id)
    );

    const resp = createFlatListByObjectKeys({
      newsAgency: selectedFilter?.['newsAgency'],
      newsCategory: filterNewsCategories
    });

    setSelectedFilterValue(resp);
    onFilterChange({
      newsAgency: selectedFilter?.['newsAgency'],
      newsCategory: filterNewsCategories
    });
  };

  // On Cancel this is not resuable
  const handleOnCancel = (name) => {
    delete selectedFilter[name];
    if (name === 'newsAgency') {
      delete selectedFilter['newsCategory'];
    }
    setSelectedFilter(selectedFilter);
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
    if (ele.name != 'newsAgency') {
      let resp = removeFilterElement(selectedFilterValue, selectedFilter, {
        ...ele,
        name: 'newsCategory'
      });
      setSelectedFilterValue(resp.updatedFilterValue);
      setSelectedFilter(resp.updatedFilter);
      onFilterChange(resp.updatedFilter);
    } else {
      removeAllCategoryBasedOnAgency(ele);
    }

    // removeCategoryWhenAgencyRemoved(ele, resp.updatedFilter);
  };
  // Check Uncheck
  const handleCheck = (item: any) => {
    let resp = handleCheckUncheck(selectedFilter, item);
    setSelectedFilter(resp);
  };

  //  Remove Category based on Agency
  const removeAllCategoryBasedOnAgency = (ele) => {
    const removeSelectedFilterValue = selectedFilterValue?.filter(
      (item1) => !ele?.newsCategory.some((item2) => item2.id === item1.id)
    );

    let selectedList = selectedFilter['newsCategory'];
    const updatedFilterArray = selectedList?.filter(
      (item) => !ele?.newsCategory.some((item2) => item2.id === item.id)
    );
    const updatedFilter = {
      ...selectedFilter,
      ['newsCategory']: updatedFilterArray
    };

    let resp = removeFilterElement(
      removeSelectedFilterValue,
      updatedFilter,
      ele
    );

    setSelectedFilterValue(resp.updatedFilterValue);
    setSelectedFilter(resp.updatedFilter);
    onFilterChange(resp.updatedFilter);
  };

  return (
    <Box>
      <Box className="mb-35">
        <Typography variant="h3">{'News'}</Typography>
      </Box>

      <Box className="d-flex">
        <Paper className="d-flex headerSearchBox">
          <Box className="icon-search   flex-basic-center" sx={{ pl: 5 }}></Box>

          <InputBase
            sx={{ ml: 4 }}
            className="bg-color-search w-100"
            placeholder={'Search news'}
            inputProps={{ 'aria-label': 'search google maps' }}
            value={searchKeyword}
            onChange={handleSearchKeyword}
          />
        </Paper>

        <Box sx={{ ml: 6 }}>
          <CustomFilter
            name="newsAgency"
            menuItems={newsAgencyList || []}
            checkedItems={selectedFilter['newsAgency'] || []}
            handleCheck={(value) => handleCheck(value)}
            onCancel={(value) => handleOnCancel(value)}
            onApply={() => handleFilterValue()}
            filterLabel="Agency"
            applyButtonDisable={
              selectedFilter['newsAgency']?.length >= 1 ? false : true
            }
          />
        </Box>
        <Box sx={{ ml: 6 }}>
          <CustomFilter
            disableFilter={selectedFilterValue?.length >= 1 ? false : true}
            name="newsCategory"
            menuItems={newsCategoryList || []}
            checkedItems={selectedFilter['newsCategory'] || []}
            handleCheck={(value) => handleCheck(value)}
            onCancel={(value) => handleOnCancel(value)}
            onApply={() => handleFilterValue()}
            filterLabel="News Category"
            applyButtonDisable={
              selectedFilter['newsCategory']?.length >= 1 ? false : true
            }
          />
        </Box>
      </Box>
      <HorizontalScrollBar>
        {selectedFilterValue?.length > 0 && (
          <FilterSelectedItems
            selectedFilterValue={selectedFilterValue}
            removeElement={removeElement}
            resetFilter={resetFilter}
          />
        )}
      </HorizontalScrollBar>
    </Box>
  );
};

export default NewsHeader;
