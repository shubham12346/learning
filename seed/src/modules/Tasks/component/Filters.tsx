import { Grid, InputBase, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';
import CustomFilter from '../../common/component/filter/CustomFilter';
import {
  createFlatListByObjectKeys,
  handleCheckUncheck,
  removeFilterElement
} from '../../common/utils/utils';
import { getAgencyList, getTaskStatusOptions } from '../api/tasksApi';
import { FilterPropsType } from '../model/taskModel';
import TabView from './TabView';
import CalendarDropDown from './tasks/CalendarDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import useTaskStatus from 'src/modules/GapActionPlan/hooks/useTaskStatus';
import useAgency from '../hooks/useAgency';

const Filters = ({
  showFilters,
  onFilterChange,
  handleSearch,
  searchKeyword,
  calendarDropDownProps,
  handleViewChange,
  view
}: FilterPropsType) => {
  const { t } = useTranslation('task');
  const taskDropdown = useSelector(
    (state: RootState) => state.tasks.taskDropDown
  );
  const permissions = useSelector(
    (state: RootState) => state.tasks.permissions
  );

  const dispatch = useDispatch();

  useTaskStatus();
  useAgency({});
  // Custom Filter List and object
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState([]);
  const [agencyFilterList, setAgencyFilterList] = useState<any>([]);
  const [statusFilterList, setStatusList] = useState<any>([]);

  useEffect(() => {
    getAgencyFilter();
    getStatusList();
  }, []);

  //
  const getStatusList = async () => {
    const res = await getTaskStatusOptions();
    const { status } = res;
    const filterListForStatus = status?.map((item) => {
      return {
        ...item,
        label: item?.displayName,
        id: item?.id,
        value: item?.name
      };
    });
    setStatusList(filterListForStatus);
  };

  // On Apply
  const handleFilterValue = () => {
    const resp = createFlatListByObjectKeys(selectedFilter);
    setSelectedFilterValue(resp);
    onFilterChange(selectedFilter);
  };

  // On Cancel this is not reuable
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

  // // api calls
  const getAgencyFilter = async () => {
    const res = await getAgencyList({});
    const { regulatoryOrganizations } = res;
    const filterListForAgency = regulatoryOrganizations?.map((item) => {
      return {
        ...item,
        label: item?.name,
        id: item?.id,
        value: item?.name
      };
    });
    setAgencyFilterList(filterListForAgency);
  };

  const onAddTaskClick = () => {
    dispatch({ type: 'tasks/selectCurrentScreen', payload: 'AddTaskView' });
  };

  return (
    <Box className=" flex-direction-column w-100">
      <Grid container className="d-flex flex-wrap">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={7} sx={{ mt: 2 }}>
          <Box className="d-flex">
            <Paper className="d-flex headerSearchBox">
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
            {showFilters && (
              <>
                <Box sx={{ ml: 6 }}>
                  <CustomFilter
                    name="agency"
                    menuItems={agencyFilterList}
                    checkedItems={selectedFilter['agency'] || []}
                    handleCheck={(value) => handleCheck(value)}
                    onCancel={(value) => handleOnCancel(value)}
                    onApply={() => handleFilterValue()}
                    filterLabel="Agency"
                    applyButtonDisable={!selectedFilter['agency']}
                  />
                </Box>
                <Box sx={{ ml: 6 }}>
                  <CustomFilter
                    name="status"
                    menuItems={statusFilterList}
                    checkedItems={selectedFilter['status'] || []}
                    handleCheck={(value) => handleCheck(value)}
                    onCancel={(value) => handleOnCancel(value)}
                    onApply={() => handleFilterValue()}
                    filterLabel="Status"
                    applyButtonDisable={!selectedFilter['status']}
                  />
                </Box>
                <Box sx={{ ml: 6 }}>
                  <CustomFilter
                    name="taskType"
                    menuItems={taskDropdown}
                    checkedItems={selectedFilter['taskType'] || []}
                    handleCheck={(value) => handleCheck(value)}
                    onCancel={(value) => handleOnCancel(value)}
                    onApply={() => handleFilterValue()}
                    filterLabel="Task Type"
                    applyButtonDisable={!selectedFilter['taskType']?.length}
                  />
                </Box>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={5} sx={{ mt: 2 }}>
          <Box className="d-flex flex-basic-space-between">
            <Box className="mr-20">
              <TabView view={view} handleViewChange={handleViewChange} />
            </Box>
            <Box className="d-flex">
              <CalendarDropDown
                anchorEl={calendarDropDownProps.anchorEl}
                handleCloseDownDown={calendarDropDownProps.handleCloseDownDown}
                handleMenuClick={calendarDropDownProps.handleMenuClick}
                handleMenuItemClick={calendarDropDownProps.handleMenuItemClick}
                lastSyncedDate={calendarDropDownProps.lastSyncedDate}
              />
              {permissions?.includes('add-tasks') && (
                <button
                  className="AddBtnText ml-20 "
                  type="button"
                  onClick={onAddTaskClick}
                >
                  {t('addTask')}
                </button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2 }}>
          {showFilters && selectedFilterValue?.length > 0 && (
            <FilterSelectedItems
              selectedFilterValue={selectedFilterValue}
              removeElement={removeElement}
              resetFilter={resetFilter}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
