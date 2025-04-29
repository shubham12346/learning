import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomFilter from 'src/modules/common/component/filter/CustomFilter';
import {
  createFlatListByObjectKeys,
  handleCheckUncheck,
  removeFilterElement
} from 'src/modules/common/utils/utils';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';
import useRegulationList from '../hooks/useRegulationList';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';

const GapActionPlanFiltersAndSearch = ({ handleFilterChange }) => {
  const { t } = useTranslation('regulations');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gapId = searchParams.get('gapId');
  const { taskStatus, riskStatusLevelOptions } = useSelector(
    (state: RootState) => state.gapAnalysis
  );

  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState([]);

  // On Apply
  const handleFilterValue = () => {
    const resp = createFlatListByObjectKeys(selectedFilter);
    setSelectedFilterValue(resp);
    handleFilterChange(selectedFilter);
  };

  // On Cancel this is not resuable
  const handleOnCancel = (name) => {
    const newSelectedFilters = { ...selectedFilter };
    delete newSelectedFilters[name];
    setSelectedFilter(newSelectedFilters);
    const resp = createFlatListByObjectKeys(newSelectedFilters);
    setSelectedFilterValue(resp);
    handleFilterChange(newSelectedFilters);
  };

  // Reset Filter
  const resetFilter = () => {
    setSelectedFilter({});
    setSelectedFilterValue([]);
    handleFilterChange({});
  };

  // Remove element from both Array
  const removeElement = (ele: any) => {
    // call Remove element
    let resp = removeFilterElement(selectedFilterValue, selectedFilter, ele);
    setSelectedFilterValue(resp.updatedFilterValue);
    setSelectedFilter(resp.updatedFilter);
    handleFilterChange(resp.updatedFilter);
  };

  // Check Uncheck
  const handleCheck = (item: any) => {
    let resp = handleCheckUncheck(selectedFilter, item);
    setSelectedFilter(resp);
  };

  const regulationsOptions = useRegulationList(gapId) || [];

  return (
    <Box
      className="gapActionPlanFiltersWrapper"
      sx={{ py: 4, px: 5, mt: 3, mb: 1 }}
    >
      <Box className="d-flex align-items-center flex-wrap">
        <Box sx={{ mr: 5, m: 2 }}>
          <Typography className="title">
            {t('gapActionPlan.gapAnalysisTask')}
          </Typography>
        </Box>
        <Box sx={{ ml: 6 }}>
          <CustomFilter
            name="regulation"
            menuItems={regulationsOptions || []}
            checkedItems={selectedFilter['regulation'] || []}
            handleCheck={(value) => handleCheck(value)}
            onCancel={(value) => handleOnCancel(value)}
            onApply={() => handleFilterValue()}
            filterLabel={t('gapActionPlan.selectRegulation')}
            applyButtonDisable={selectedFilter['regulation']?.length < 1}
          />
        </Box>
        <Box sx={{ ml: 6, m: 2 }}>
          <CustomFilter
            name="riskLevel"
            menuItems={riskStatusLevelOptions || []}
            checkedItems={selectedFilter['riskLevel'] || []}
            handleCheck={(value) => handleCheck(value)}
            onCancel={(value) => handleOnCancel(value)}
            onApply={() => handleFilterValue()}
            filterLabel={t('gapActionPlan.selectRiskLevel')}
            applyButtonDisable={selectedFilter['riskLevel']?.length < 1}
          />
        </Box>
        <Box sx={{ ml: 6, m: 2 }}>
          <CustomFilter
            name="status"
            menuItems={taskStatus || []}
            checkedItems={selectedFilter['status'] || []}
            handleCheck={(value) => handleCheck(value)}
            onCancel={(value) => handleOnCancel(value)}
            onApply={() => handleFilterValue()}
            filterLabel={t('gapActionPlan.selectStatus')}
            applyButtonDisable={selectedFilter['status']?.length < 1}
          />
        </Box>
      </Box>

      <Box>
        {selectedFilterValue?.length > 0 && (
          <FilterSelectedItems
            selectedFilterValue={selectedFilterValue}
            removeElement={removeElement}
            resetFilter={resetFilter}
          />
        )}
      </Box>
    </Box>
  );
};

export default GapActionPlanFiltersAndSearch;
