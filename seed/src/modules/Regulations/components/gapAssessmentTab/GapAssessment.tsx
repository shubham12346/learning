import { Box } from '@mui/material';
import TaskHeader from './Taskheader';
import { useEffect, useState } from 'react';
import {
  getGapActivityStatusOptions,
  getGapAssessmentActivityTableData
} from '../../apis/RegulationsApi';
import ListTab from './ListTab';
import ActivityTab from './ActivityTab';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const GapAssessment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('regulations');
  const [tabSelected, setTabSelected] = useState<string>('activity');
  const [loader, setLoader] = useState<boolean>(true);
  const [activityStatusDropdownOptions, setActivityStatusDropdownOptions] =
    useState<any>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState();
  const [pager, setPager] = useState({
    currentPage: 1,
    limit: 15,
    startIndex: 0,
    totalItems: 0,
    totalPages: 0
  });
  const [activityTableData, setActivityTableData] = useState<any>([]);
  const toogleButtonsList = [
    {
      content: t('gapAssessmentTab.activity'),
      value: 'activity'
    }
    //Todo : Uncomment when list view is available
    // {
    //   content: t('gapAssessmentTab.list'),
    //   value: 'list'
    // }
  ];
  let taskSearchDebounce = null;

  //useEffect to get status options data
  useEffect(() => {
    getActivityStatusDropdownOptions();
  }, []);

  //useEffect to get activity table data
  useEffect(() => {
    getGapAssessmentActivityData({
      ...pager,
      statusId: selectedStatus === 'all' ? null : selectedStatus,
      searchByActivityName: searchKeyword
    });
  }, [tabSelected, selectedStatus]);

  const getActivityStatusDropdownOptions = async () => {
    const payload = { isMainTabView: true };
    const res = await getGapActivityStatusOptions(payload);
    setActivityStatusDropdownOptions(res);
  };

  //fetch table data based on filters
  const getGapAssessmentActivityData = async (filters) => {
    setLoader(true);
    const {
      currentPage: page,
      limit,
      searchByActivityName,
      statusId
    } = filters;
    const res = await getGapAssessmentActivityTableData({
      page,
      limit,
      searchByActivityName,
      statusId
    });
    setLoader(false);
    setPager(res?.pager);
    setActivityTableData(res?.gapAssessments);
  };

  //toogle tab view
  const toggleTabSelected = () => {
    setTabSelected((prevTab) => (prevTab === 'activity' ? 'list' : 'activity'));
  };

  // calling api on search
  const handleSearch = async (e) => {
    let searchKeys = e.target.value;
    let validatedSearch = searchKeys.trim();
    let removeWhiteSpace = '';
    if (validatedSearch !== '') {
      removeWhiteSpace = searchKeys.replace(/\s+/g, ' ');
      setSearchKeyword(removeWhiteSpace);
    } else {
      setSearchKeyword('');
    }
    if (removeWhiteSpace.length >= 3 || removeWhiteSpace.length === 0) {
      setLoader(true);
      clearTimeout(taskSearchDebounce);
      taskSearchDebounce = setTimeout(async () => {
        getGapAssessmentActivityData({
          ...pager,
          statusId: selectedStatus === 'all' ? null : selectedStatus,
          searchByActivityName: searchKeys.trim()
        });
      }, 500);
    }
  };

  //handle status filter
  const handleStatusFilter = (e) => {
    setSelectedStatus(e?.target?.value);
  };

  //On clicking of upload policy button navigate to gap analysis in my docs
  const handleUploadPolicy = () => {
    navigate('/avery/mydoc?tour=gapanalysis');
  };

  return (
    <Box>
      <TaskHeader
        view={tabSelected}
        handleViewChange={toggleTabSelected}
        handleStatus={handleStatusFilter}
        selectedStatus={selectedStatus}
        handleSearch={handleSearch}
        searchKeyword={searchKeyword}
        statusDropdownOptions={activityStatusDropdownOptions}
        handleUploadPolicy={handleUploadPolicy}
        toogleButtonsList={toogleButtonsList}
      />
      {tabSelected === 'list' ? (
        <ListTab />
      ) : (
        <ActivityTab
          tableListData={activityTableData}
          pager={pager}
          getNextPagination={getGapAssessmentActivityData}
          loader={loader}
        />
      )}
    </Box>
  );
};

export default GapAssessment;
