import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Calender from 'src/shared/components/common/calender/Calender';
import AllEvents from 'src/shared/components/common/calender/events';
import { Container, Typography } from '@mui/material';
import TaskHeader from './Taskheader';
import {
  calenderEvents,
  tabsType,
  getTasks,
  Pager,
  filters
} from '../model/taskModel';
import ListView from './ListView';
import {
  deleteTask,
  getCalendarSyncStatus,
  getCalendarTimezoneList,
  getTasksList,
  saveSelectedTimeZoneOption,
  sendAuthCodeToBackend,
  syncCalendarWithOutlook
} from '../api/tasksApi';
import { useNavigate } from 'react-router';
import { DeleteTaskModal } from './tasks/DeleteTaskModel';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import useQuery from 'src/shared/components/hooks/useQuery';
import { MicrosoftCalendarSync } from 'src/shared/constants/constants';
import TimezoneModal from './tasks/TimezoneModal';
import useTaskTypesOptions from '../hooks/useTaskTypesOptions';
import ErrorBoundary from 'src/shared/components/errorComponent/ErrorBoundary';
import { GAP_ANALYSIS } from 'src/modules/GapActionPlan/component/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { flatTaskForCalendarComponent, formatTasksAndVersions } from './util';

let taskSearchDebounce = null;

const TaskAndCalendarView = () => {
  // check permitted actions
  const { permissions: actions } = useSelector(
    (state: RootState) => state.tasks
  );
  const query = useQuery();
  const isCalendarViewActive = query.get('isCalendarView') || '';

  //Constants
  const { t } = useTranslation('task');
  //state variables
  const [view, setView] = useState<tabsType>(
    isCalendarViewActive == 'true' ? 'Calender' : 'List'
  );
  const [filters, setFilters] = useState<filters>({
    agency: [],
    status: []
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pager, setPager] = useState<Pager>({
    currentPage: 1,
    limit: 15,
    startIndex: 0,
    totalItems: 0,
    totalPages: 0
  });
  const [tableListData, setTableData] = useState<any>([]);
  const [tableListLoader, setTableListLoader] = useState<boolean>();
  const [event, setEvents] = useState<any>(AllEvents);
  const [deleteTaskId, setDeleteTaskId] = useState('');
  const [openDeletedModal, setDeleteModalOpen] = useState<boolean>();
  const [selectedRowData, setSelectedRowData] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [lastSyncedDate, setLastSyncedDate] = useState<any>();

  // time zone states
  const [openTimeZoneModal, setOpenTimeZoneModal] = useState<boolean>(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState<null>();
  const [timeZoneOptions, setTimeZoneOptions] = useState<any[]>();

  useEffect(() => {
    getTasks(filters, pager, searchKeyword, false);
  }, [deleteTaskId, view]);

  useTaskTypesOptions();
  useEffect(() => {
    handleRedirect();
  }, []);

  // calendar sync methods
  const handleTimeZoneModalOpen = () => {
    setOpenTimeZoneModal(true);
  };
  const saveTimeZone = () => {
    if (selectedTimeZone) {
      handleTimeZoneModalClose();
      syncTaskWithOutlookCalendar();
    }
  };
  const fetchTimeZoneList = async () => {
    const res = await getCalendarTimezoneList();
    setTimeZoneOptions([...res]);
  };

  const handleTimeZoneModalClose = () => {
    setOpenTimeZoneModal(false);
  };

  const handleTimeZoneSelected = (event) => {
    setSelectedTimeZone(event?.target?.value);
  };

  // timezone methods

  // get the user authenticated
  const handleRedirect = async () => {
    const code = new URLSearchParams(window.location.search)?.get('code');
    const userStatus = await setCalendarSyncStatusOfUser();
    if (code && !userStatus?.lastSyncAt) {
      try {
        await sendAuthCodeToBackend(code);
        handleTimeZoneModalOpen();
        fetchTimeZoneList();
      } catch (error) {
        handleTimeZoneModalClose();
        console.error(error);
      }
    }
  };


  const handleAuthenticate = async () => {
    let url =
      `${MicrosoftCalendarSync.authUrl}` +
      `?client_id=${MicrosoftCalendarSync.clientId}` +
      '&response_type=code' +
      `&redirect_uri=${MicrosoftCalendarSync.redirectToApplicationUrl}` +
      '&response_mode=query' +
      `&scope=${MicrosoftCalendarSync.scope} ` +
      '&prompt=consent';
    window.location.href = url;
  };

  const syncTaskWithOutlookCalendar = async () => {
    try {
      await saveSelectedTimeZoneOption(selectedTimeZone);
      const res = await syncCalendarWithOutlook();
      showSuccessMessage(res?.message, '', {});
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause, {});
    } finally {
      setTimeout(() => {
        setCalendarSyncStatusOfUser();
      }, 5000);
    }
  };

  const setCalendarSyncStatusOfUser = async () => {
    const res = await getCalendarSyncStatus();
    setLastSyncedDate(res);
    return res;
  };

  // Tasks methods
  const getTasks: getTasks = async (
    filters,
    pager,
    searchKeyword,
    isFilter = false
  ) => {
    // view === 'Calender' ? null : pager?.limit,
    setTableListLoader(true);
    let filtersApplied = convertFiltersArrayToString(filters);
    let payload = {
      page: view === 'Calender' ? null : isFilter ? 1 : pager?.currentPage,
      limit: view === 'Calender' ? null : pager?.limit,
      searchKeyword: searchKeyword,
      agency: filtersApplied?.agency,
      taskStatusName: filtersApplied?.status,
      taskType: filtersApplied?.taskType
    };
    const res = await getTasksList(payload);
    if (view === 'Calender') {
      let Calevents = flatTaskForCalendarComponent(res?.taskList, '');
      setEvents(Calevents);
      setTableListLoader(false);
    } else {
      setAllTheStatesOfTable(res);
    }
  };

  const getNextPagination = async (pageData) => {
    setTableListLoader(true);
    getTasks(filters, pageData, searchKeyword, false);
  };

  // setting states of table pager and table
  const setAllTheStatesOfTable = (res) => {
    const { taskList, pager } = res;
    setPager(pager);
    const tableData = formatTasksAndVersions(taskList);
    console.log('tableData',tableData)
    setTableData(tableData);
    setTableListLoader(false);
  };

  //calling applying after hitting filter
  const handelFilters = async (filter) => {
    setTableListLoader(true);
    setFilters(filter);
    getTasks(filter, pager, searchKeyword, true);
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
      setTableListLoader(true);
      clearTimeout(taskSearchDebounce);
      taskSearchDebounce = setTimeout(async () => {
        getTasks(filters, pager, searchKeys.trim(), true);
      }, 500);
    }
  };

  //
  const handleUpdateDeleteId = (taskUid: string) => {
    setDeleteTaskId(taskUid);
  };
  // handling  the tabs calender ,list , task
  const handleViewOrientation = (event, value): void => {
    setView((value ??= (prev) => prev));
  };

  // calender methods

  const navigate = useNavigate();

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  const handleEdit = (e, event: any) => {
    e.stopPropagation();

    const taskId = event?.taskType === GAP_ANALYSIS ? event.taskId : event?.id;
    const queryParams = new URLSearchParams({
      taskType: event?.taskType,
      regulation: event?.regulation ?? truncateText(event?.eventTitle, 40),
      gapId: event?.gapAssessmentId,
      isCalendarView: view === 'Calender' ? 'true' : 'false',
      taskOccurrenceId: event?.taskOccurrenceId
    }).toString();
    console.log(
      'cadence',
      'query params of calendar view for edit',
      queryParams
    );
    navigate(`/avery/tasks/edit/${taskId}?${queryParams}`);
  };

  const handleDelete = (e, event: any) => {
    e.stopPropagation();
    setSelectedRowData(event);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  //delete Task
  const deleteSelectedTask = async () => {
    closeDeleteModal();
    try {
      const res = await deleteTask(
        selectedRowData?.id,
        selectedRowData?.taskOccurrenceId,
        true
      );
      showSuccessMessage(res?.message, '', {});
      handleUpdateDeleteId(selectedRowData?.id);
    } catch (error) {
      showErrorMessage(error?.message ?? error, {});
    }
    await setCalendarSyncStatusOfUser();
  };

  const deleteSingelTask = (value: any) => {
    setSelectedRowData(value);
    setDeleteModalOpen(true);
  };

  const renderComponent = (tabs: tabsType) => {
    switch (tabs) {
      case 'Calender':
        return (
          <Calender
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            events={event}
            actions={actions}
            loader={tableListLoader}
          />
        );
      case 'List':
        return (
          <ListView
            actions={actions}
            getNextPagination={getNextPagination}
            loader={tableListLoader}
            pager={pager}
            tableListData={tableListData}
            handleUpdateDeleteId={handleUpdateDeleteId}
            deleteSingelTask={deleteSingelTask}
            view={view}
          />
        );
    }
  };

  const convertArrayTostring = (filterArray) => {
    return filterArray?.map((item) => item.value).join(',');
  };
  const convertFiltersArrayToString = (filters) => {
    let agency = convertArrayTostring(filters?.agency);
    let status = convertArrayTostring(filters?.status);
    let taskType = convertArrayTostring(filters?.taskType);

    return {
      agency,
      status,
      taskType
    };
  };

  const handleCloseDownDown = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    if (!lastSyncedDate?.lastSyncAt) {
      handleAuthenticate();
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ErrorBoundary>
      <Box className="taskWrapper ">
        <Container maxWidth={'xl'}>
          <Box className="mb-24">
            <Typography variant="h3">{t('taskTitle')} </Typography>
          </Box>
          <TaskHeader
            view={view}
            handleViewChange={handleViewOrientation}
            handelFilters={handelFilters}
            handleSearch={handleSearch}
            searchKeyword={searchKeyword}
            calendarDropDownProps={{
              anchorEl: anchorEl,
              handleCloseDownDown: handleCloseDownDown,
              handleMenuItemClick: handleMenuItemClick,
              handleMenuClick: handleMenuClick,
              lastSyncedDate: lastSyncedDate
            }}
          />

          <Box>{renderComponent(view)}</Box>
        </Container>

        <DeleteTaskModal
          //cadence : modal needs to be updated for handling single and multiple instances
          handleClose={closeDeleteModal}
          handleDelete={deleteSelectedTask}
          open={openDeletedModal}
          selectedRow={selectedRowData}
        />
        <TimezoneModal
          disableSaveButton={!selectedTimeZone}
          selectedTimeZone={selectedTimeZone}
          handleOnChange={handleTimeZoneSelected}
          options={timeZoneOptions}
          handleCancel={handleTimeZoneModalClose}
          handleSave={saveTimeZone}
          open={openTimeZoneModal}
          text={{
            cancelText: 'Cancel',
            saveText: 'Save',
            title: 'Time Zone',
            description: 'Select your timezone?'
          }}
          widthClass="w-60"
        />
      </Box>
    </ErrorBoundary>
  );
};

export default TaskAndCalendarView;
