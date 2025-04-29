//Built-in Imports
import { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Internal Imports
import CustomFilter from 'src/modules/common/component/filter/CustomFilter';
import {
  createFlatListByObjectKeys,
  handleCheckUncheck,
  removeFilterElement
} from 'src/modules/common/utils/utils';
import FilterSelectedItems from 'src/shared/components/common/FilterSelectedItems';
import { Button } from 'src/shared/components/button/Button';
import { TextField } from 'src/shared/components/text-field/TextField';
import { DATE_FORMATS } from 'src/shared/constants/constants';
import { auditTrailReportHeaderPropsTypes } from '../model/reportsModel';

const AuditTrailReportHeader = (props: auditTrailReportHeaderPropsTypes) => {
  //const
  const {
    showFilters,
    onFilterChange,
    listOfAgency,
    listOfRegulations,
    onStartDateChange,
    onEndDateChange,
    hideAgency = true,
    isGenerateButtonDisabled = false,
    isVisiableGenerateBtn = false,
    handleGenerateButton,
    CurrentDate
  } = props;
  const { t } = useTranslation('english');
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('lg'));

  // Custom Filter List and object
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState([]);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [isOpenStartDate, setIsOpenStartDate] = useState(false);
  const [isOpenEndDate, setIsOpenEndDate] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //methods
  const openStartDate = (event: any) => {
    setIsOpenStartDate(true);
    setAnchorEl1(event.currentTarget);
  };
  const openEndDate = (event: any) => {
    setIsOpenEndDate(true);
    setAnchorEl2(event.currentTarget);
  };

  const handleOnStartDateChange = (value) => {
    setStartDate(value);
    onStartDateChange(value);
  };

  const handleOnEndDateChange = (value) => {
    setEndDate(value);
    onEndDateChange(value);
  };

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
    setStartDate(null);
    setEndDate(null);
    onEndDateChange(null);
    onStartDateChange(null);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12} xl={9} gap={1}>
        <Box className="flex-column-start ">
          <Box className="d-flex">
            <Box className="datePickerContainer p-relative">
              <DatePicker
                label={
                  startDate || startDate !== null ? '' : 'Select start date'
                }
                open={isOpenStartDate}
                onClose={() => {
                  setIsOpenStartDate(false);
                }}
                maxDate={CurrentDate}
                inputFormat={DATE_FORMATS.MONTH_DATE_YEAR}
                value={startDate}
                autoFocus={true}
                onChange={handleOnStartDateChange}
                PopperProps={{
                  placement: 'bottom-end',
                  anchorEl: anchorEl1,
                  className: 'datePickerPopover'
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={openStartDate}>
                            <Box className="icon-date-picker" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ ml: 6 }} className="datePickerContainer p-relative">
              <DatePicker
                label={endDate || endDate !== null ? '' : 'Select end date'}
                maxDate={CurrentDate}
                open={isOpenEndDate}
                onClose={() => {
                  setIsOpenEndDate(false);
                }}
                inputFormat={DATE_FORMATS.MONTH_DATE_YEAR}
                value={endDate}
                onChange={handleOnEndDateChange}
                PopperProps={{
                  placement: 'bottom-end',
                  anchorEl: anchorEl2,
                  className: 'datePickerPopover'
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={openEndDate}>
                            <Box className="icon-date-picker" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Box>

            {showFilters && (
              <>
                {hideAgency && (
                  <Box sx={{ ml: 6 }}>
                    <CustomFilter
                      name="agency"
                      menuItems={listOfAgency}
                      checkedItems={selectedFilter['agency'] || []}
                      handleCheck={(value) => handleCheck(value)}
                      onCancel={(value) => handleOnCancel(value)}
                      onApply={() => handleFilterValue()}
                      filterLabel="Agency"
                      applyButtonDisable={
                        selectedFilter['agency']?.length >= 1 ? false : true
                      }
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
                    applyButtonDisable={
                      selectedFilter['regulation']?.length >= 1 ? false : true
                    }
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        xl={3}
        className="refreshButtonWrapper "
      >
        <Box className="refreshButton paddingTop">
          <Button
            type="submit"
            variant="outlined"
            className="marginRight"
            btnText={smallDevice ? '' : 'Refresh'}
            onClick={refreshThePage}
            startIcon={
              <Box className="icon-reset-filter  iconStyle textWhiteColor" />
            }
            sx={{ py: '0.5rem', px: '1rem' }}
          ></Button>
          {isVisiableGenerateBtn && (
            <Button
              type="submit"
              variant="contained"
              disabled={isGenerateButtonDisabled}
              btnText={smallDevice ? '' : 'Generate Report'}
              onClick={handleGenerateButton}
              startIcon={
                <Box className="icon-plus  iconStyle textWhiteColor" />
              }
              sx={{ py: '0.5rem', px: '1rem' }}
            ></Button>
          )}
        </Box>
      </Grid>
      <Grid item sm={12} lg={12} xs={12} md={12}>
        {showFilters && selectedFilterValue.length > 0 && (
          <FilterSelectedItems
            selectedFilterValue={selectedFilterValue}
            removeElement={removeElement}
            resetFilter={resetFilter}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default AuditTrailReportHeader;
