//Built-in Imports
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

//Internal Imports
import CustomFilter from 'src/modules/common/component/filter/CustomFilter';
import {
  createFlatListByObjectKeys,
  handleCheckUncheck,
  removeFilterElement
} from 'src/modules/common/utils/utils';
import { Button } from 'src/shared/components/button/Button';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';
import { Select } from 'src/shared/components/select/Select';
import { TgapAssessmentHeader } from '../../model/reportsModel';

const GapAnalysisHeader = (props: TgapAssessmentHeader) => {
  const {
    showFilters,
    onFilterChange,
    listOfAgency,
    listOfRegulations,
    hideAgency = true,
    isGenerateButtonDisabled = false,
    isVisiableGenerateBtn = false,
    handleGenerateButton,
    showRefreshButton = false,
    showGapAssesment = false,
    gapOptions,
    handleGapOptions,
    selectedGapOptions
  } = props;
  const { t } = useTranslation('reports');
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('lg'));

  // Custom Filter List and object
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState([]);

  useEffect(() => {
    refreshThePage();
  }, []);
  //methods

  // On Apply
  const handleFilterValue = () => {
    const resp = createFlatListByObjectKeys(selectedFilter);
    setSelectedFilterValue(resp);
    onFilterChange(selectedFilter);
  };

  // On Cancel this is not resuable
  const handleOnCancel = (name) => {
    delete selectedFilter[name];
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

  // refresh the page
  const refreshThePage = () => {
    resetFilter();
    handleGapOptions();
  };
  return (
    <Box className="flex-direction-column w-100 reportFilterSection">
      <Box className="p-relative ">
        <Box className="flex-column-start ">
          <Box className="d-flex">
            {showFilters && (
              <>
                {hideAgency && (
                  <Box>
                    <CustomFilter
                      name="agency"
                      menuItems={listOfAgency}
                      checkedItems={selectedFilter['agency'] || []}
                      handleCheck={(value) => handleCheck(value)}
                      onCancel={(value) => handleOnCancel(value)}
                      onApply={() => handleFilterValue()}
                      filterLabel="Agency"
                      applyButtonDisable={!selectedFilter['agency']?.length}
                    />
                  </Box>
                )}
                <Box sx={{ ml: 6 }}>
                  <CustomFilter
                    name="regulation"
                    menuItems={listOfRegulations}
                    checkedItems={selectedFilter['regulation'] || []}
                    handleCheck={(value) => handleCheck(value)}
                    onCancel={(value) => handleOnCancel(value)}
                    onApply={() => handleFilterValue()}
                    filterLabel="Regulation"
                    applyButtonDisable={!selectedFilter['regulation']?.length}
                  />
                </Box>
                <Box
                  sx={{ ml: 6, mt: -2 }}
                  className="filterSelect d-flex align-items-center"
                >
                  <Select
                    className=""
                    label={''}
                    defaultValue={gapOptions[1]}
                    placeholder={
                      selectedGapOptions || t('gapAssessmentPlaceholder')
                    }
                    value={selectedGapOptions || 'none'}
                    options={gapOptions || []}
                    itemValue={'id'}
                    itemText={'name'}
                    onChange={handleGapOptions}
                  />
                </Box>
              </>
            )}
          </Box>
          {showFilters && selectedFilterValue.length > 0 && (
            <FilterSelectedItems
              selectedFilterValue={selectedFilterValue}
              removeElement={removeElement}
              resetFilter={resetFilter}
            />
          )}
        </Box>

        <Box className=" p-absolute refreshBtn">
          {showRefreshButton && (
            <Button
              type="submit"
              variant="outlined"
              className="mr-16"
              btnText={smallDevice ? '' : 'Refresh'}
              onClick={refreshThePage}
              startIcon={
                <Box className="icon-reset-filter  iconStyle textWhiteColor" />
              }
              sx={{ py: '0.5rem', px: '1rem' }}
            ></Button>
          )}

          {isVisiableGenerateBtn && (
            <Button
              type="submit"
              variant="contained"
              disabled={isGenerateButtonDisabled}
              btnText={t('generateNewReport')}
              onClick={handleGenerateButton}
              startIcon={
                <Box className="icon-plus  iconStyle textWhiteColor" />
              }
              sx={{ py: '0.5rem', px: '1rem' }}
            ></Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GapAnalysisHeader;
