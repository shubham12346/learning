import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EnforcementFilters from './EnforcementFilters';
import EnforcementTable from './EnforcementTable';
import { getEnforcementActionsFines, getFineListOptions } from '../api/fineApi';
import { FilterOptions, EnforcementActionAPIArguments } from '../model/fineTypes';

let fineSearchDebounce = null;
const EnforcementHeader = ({ agencyListOptions, yearListOptions }) => {
  //consts
  const yearsArray = yearListOptions.map((obj)=>parseInt(obj.year))
  const defaultYear = `${Math.max(...yearsArray)}`

  //states
  const [fineAmountList, setFineAmountList] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);
  const [filters, setFilters] = useState<any>();
  const [tableLoadData, setTableLoadData] = useState<boolean>();
  const [sortDirection, setSortDirection] = useState('ASC');

  const [tablePager, setTablePager] = useState<any>({
    totalItems: 1,
    currentPage: 1,
    limit: 15,
    startIndex: 0,
    totalPages: 1
  });
  const [tableData, setTableData] = useState([]);
  const [searchedText, setSearchedText] = useState();
  
  //useEffects
  useEffect(() => {
    fetchFineListOptions();
    let allFiltersApplied = getFiltersInString();
    fetchEnforcementTableData({
      searchKeyword: searchedText,
      year: selectedYear,
      agency: allFiltersApplied?.agencies,
      limit: tablePager?.limit || 15,
      page: tablePager?.currentPage,
      sortOrder: sortDirection,
      fineAmount: allFiltersApplied?.fine_amount
    });
  }, [sortDirection]);

  //methods

  const handleSearch = (e) => {
    e.stopPropagation();
    let search = e.target.value;
    setSearchedText(search);
    if (search.length >= 3 || search.length === 0) {
      let allFiltersApplied = getFiltersInString();
      clearTimeout(fineSearchDebounce);
      fineSearchDebounce = setTimeout(() => {
        fetchEnforcementTableData({
          searchKeyword: search,
          year: selectedYear,
          agency: allFiltersApplied.agencies,
          limit: tablePager?.limit || 15,
          sortOrder: sortDirection,
          page: 1,
          fineAmount: allFiltersApplied.fine_amount
        });
      }, 200);
    }
  };

  const handleSelectedYear = (event) => {
    let selectedYear = event.target.value;
    setSelectedYear(event.target.value);
    let allFiltersApplied = getFiltersInString();
    fetchEnforcementTableData({
      searchKeyword: searchedText,
      year: selectedYear,
      agency: allFiltersApplied.agencies,
      limit: tablePager?.limit || 15,
      page: 1,
      sortOrder: sortDirection,
      fineAmount: allFiltersApplied.fine_amount
    });
  };

  const onFilterChange = (filter:FilterOptions,resetFlag=false) => {
    setFilters(filter);
    let agencies = filter?.agency?.map((item) => item.value).join(',');
    let fine_amount = filter?.fineRange?.map((item) => item.value).join(',');
    if(resetFlag) setSelectedYear(defaultYear)
    fetchEnforcementTableData({
      searchKeyword: searchedText,
      year: resetFlag?defaultYear:selectedYear,
      agency: agencies,
      limit: tablePager?.limit || 15,
      page: 1,
      sortOrder: sortDirection,
      fineAmount: fine_amount
    });
  };

  const getNextPagination = async (nextPage) => {
    const { currentPage: page, limit } = nextPage;
    let allFiltersApplied = getFiltersInString();

    fetchEnforcementTableData({
      searchKeyword: searchedText,
      year: selectedYear,
      agency: allFiltersApplied.agencies,
      limit: limit,
      sortOrder: sortDirection,
      page: page,
      fineAmount: allFiltersApplied.fine_amount
    });
  };

  const parseValue = (value) => {
    if (value === 'NA') {
      return 'NA';
    }
    return parseFloat(
      value
        .replace('$', '')
        .replace(/,/g, '')
        .replace(/M/g, 'e6')
        .replace(/K/g, 'e3')
    );
  };
  // fetch enforcement table data
  const fetchEnforcementTableData = async (
    args: EnforcementActionAPIArguments
  ) => {
    setTableLoadData(true);
    const res = await getEnforcementActionsFines({ ...args });
    let count = 0;
    const { data, pager } = res;
    const tableData = data?.map((item) => {
      let fineAmount = parseValue(item?.fineAmount);
      return {
        ...item,
        id: count++,
        fineAmount: fineAmount
      };
    });
    setTableData(tableData);
    setTablePager(pager);
    setTableLoadData(false);
  };

  const fetchFineListOptions = async () => {
    const res = await getFineListOptions();
    let fineRanges = res.map((item) => {
      return {
        id: item?.id,
        label: item?.label,
        value: item?.id
      };
    });
    setFineAmountList(fineRanges);
  };

  const getFiltersInString = () => {
    let agencies = filters?.agency?.map((item) => item.value).join(',');
    let fine_amount = filters?.fineRange?.map((item) => item.value).join(',');
    return { agencies, fine_amount };
  };
 
  //sort fine ranges
  const setDirectionOnChangeSort = (sortDirectionVal) => {
    if (sortDirectionVal === 'none') {
      setSortDirection('ASC');
    } else if (sortDirectionVal === 'ascending') {
      setSortDirection('DESC');
    } else if (sortDirectionVal === 'descending') {
      setSortDirection('ASC');
    }
  };

  return (
    <Box className="enforcementHeader">
      <EnforcementFilters
        agenciesList={agencyListOptions}
        fineAmountList={fineAmountList}
        searchKeyword={searchedText}
        yearList={yearListOptions}
        handleSearch={handleSearch}
        handleSelectedYear={handleSelectedYear}
        selectedYear={selectedYear}
        onFilterChange={onFilterChange}
      />
      <Box>
        <EnforcementTable
          getNextPagination={getNextPagination}
          setDirectionOnChangeSort={setDirectionOnChangeSort}
          loader={tableLoadData}
          pager={tablePager}
          tableListData={tableData}
        />
      </Box>
    </Box>
  );
};

export default EnforcementHeader;
