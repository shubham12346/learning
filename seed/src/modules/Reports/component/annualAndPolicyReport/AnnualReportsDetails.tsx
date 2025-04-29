import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/shared/components/Breadcrum/Breadcrumb';
import TabView from 'src/shared/components/tabs/Tabs';
import AnnualReportList from './AnnualReportList';
import { AuditTrailReportListPropsTypes } from '../../model/reportsModel';
import { getTasksList } from 'src/modules/Tasks/api/tasksApi';
import GeneratedListTabList from './GeneratedListTabList';
import SaveFileReportModal from '../SaveFileReportModal';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { generateAnualpolicyReport } from '../../api/reportsApi';
import { getTimeStampName } from '../util';

let timer;
const AnnualReportsDetails = (props: AuditTrailReportListPropsTypes) => {
  //const
  const { goBackToReports, listOfRegulations, actions } = props;
  const { t } = useTranslation('reports');

  //hide tab for temporary 't('generatedReports')'
  const tablist = [t('annualReportTab'), t('generatedReports')];

  //states variables
  const [tabIndex, settabIndex] = useState(0);
  const [saveBottomModalOpen, setSaveButtomModalOpen] =
    useState<boolean>(false);
  const [openFileSaveModal, setOpenSaveModal] = useState<boolean>(false);
  const [isloader, setIsLoader] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pagerList, setPagerList] = useState<any>({
    currentPage: 1,
    limit: 15,
    startIndex: 0,
    totalItems: 0,
    totalPages: 0
  });
  const [annualReportData, setAnnualReportData] = useState<any>([]);
  const [generateButtonDisabled, setGenerateButtonDisabled] =
    useState<boolean>(false);
  const [reportFileName, setReportFileName] = useState<string>(
    getTimeStampName('Annual')
  );

  useEffect(() => {
    timer = setTimeout(() => {
      getAllTasksWithFilters(filters);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [startDate, endDate, filters]);
  //methods

  //

  //api get annual reports
  const getTasksListData = async (payload) => {
    setIsLoader(true);
    const res = await getTasksList(payload);
    const finalTableData = res?.taskList.map((item) => {
      return {
        id: item?.taskUid,
        regulationName: item?.regulationName || '-',
        owner: item?.owner?.userName || '-',
        taskname: item?.taskVersion?.[0].title || '-',
        taskModifiedDate: item?.taskModifiedDate || '-',
        taskDescription: item?.taskVersion?.[0].description || '-',
        controlTest: item?.taskVersion?.[0].controlTest || '-',
        testingResults: item?.taskVersion?.[0].testingResult || '-',
        recommendedChanges: item?.taskVersion?.[0].recommendedChanges || '-'
      };
    });
    setAnnualReportData(finalTableData);
    setPagerList(res?.pager);
    setIsLoader(false);
  };

  const handleTabChange = (event, tabNumber: number) => {
    settabIndex(tabNumber);
  };
  // generate report
  const generateReport = async () => {
    // after hit on click
    setGenerateButtonDisabled(true);
    let regulations = filters?.regulation?.map((item) => item.value).join(',');
    let params = {
      page: pagerList?.currentPage || 1,
      limit: pagerList?.limit || 15,
      regulation: regulations || '',
      startDate: startDate || null,
      endDate: endDate || null,
      reportFileName: reportFileName
    };
    try {
      const res = await generateAnualpolicyReport(params);
      showSuccessMessage(res.message, '', {});
      setReportFileName('');
      settabIndex(1);
    } catch (error) {
      showErrorMessage(error.message || '', {});
    } finally {
      handleCancel();
      handleFileCloseModal();
      setReportFileName(getTimeStampName('Annual'));
    }
  };

  // handle buttom save footer
  const handleSave = () => {
    setOpenSaveModal(true);
  };

  // handle buttom cancel footer
  const handleCancel = () => {
    setSaveButtomModalOpen(false);
    setGenerateButtonDisabled(false);
  };

  //
  const handleFileCloseModal = () => {
    setOpenSaveModal(false);
    handleCancel();
  };
  // generate report save
  const handleFileSaveModal = () => {
    generateReport();
  };

  const handleGenerateButton = () => {
    setGenerateButtonDisabled(true);
    setSaveButtomModalOpen(true);
  };

  const handleStartDate = (value) => {
    if (value != 'Invalid Date' || value === null) {
      setStartDate(value);
    }
  };

  const handleEndDate = (value) => {
    if (value != 'Invalid Date' || value === null) {
      setEndDate(value);
    }
  };
  // on selecting filters
  const hanldeFilters = (value) => {
    setFilters(value);
  };
  // get table list data with filters
  const getAllTasksWithFilters = async (filterVal) => {
    let regulations = filterVal?.regulation
      ?.map((item) => item.value)
      .join(',');

    await getTasksListData({
      page: pagerList?.currentPage || 1,
      limit: pagerList?.limit || 15,
      regulation: regulations || '',
      startDate: startDate && endDate ? startDate : null,
      endDate: startDate && endDate ? endDate : null
    });
  };
  // for  pagination change
  const getNextPaginationData = (nextPage) => {
    let regulations = filters?.regulation?.map((item) => item.value).join(',');
    getTasksListData({
      page: nextPage?.currentPage || 1,
      limit: nextPage?.limit || 15,
      regulation: regulations || '',
      startDate: startDate || null,
      endDate: endDate || null
    });
  };

  // file name change
  const handleFileNameChange = (e) => {
    setReportFileName(e.target.value);
  };

  const renderedTabComponent = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return (
          <AnnualReportList
            isloader={isloader}
            pagerList={pagerList}
            getNextPaginationData={getNextPaginationData}
            annualReportData={annualReportData}
            listOfRegulations={listOfRegulations}
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
            hanldeFilters={hanldeFilters}
            isCustomBottom={saveBottomModalOpen}
            handleCancel={handleCancel}
            handleSave={handleSave}
            isGenerateButtonDisabled={generateButtonDisabled}
            handleGenerateButton={handleGenerateButton}
            actions={actions}
          />
        );
      case 1:
        return (
          <Box>
            <GeneratedListTabList />
          </Box>
        );
    }
  };
  return (
    <Container maxWidth={'xl'}>
      <Box className="reportsDetails mt-0">
        <Box className="mb-24 flex-basic-start w-100">
          <Breadcrumb
            parentName={'Reports'}
            childNamePath={'Annual Policy & Procedures Report'}
            goBackToReports={goBackToReports}
          />
        </Box>
        <Box className="w-100">
          <TabView
            tabindex={tabIndex}
            onChange={handleTabChange}
            tablist={tablist}
          />
        </Box>
        <Box className="mt-32">{renderedTabComponent(tabIndex)}</Box>
      </Box>
      <SaveFileReportModal
        handleCancel={handleFileCloseModal}
        handleSave={handleFileSaveModal}
        open={openFileSaveModal}
        text={{
          cancelText: t('cancelText'),
          saveText: t('saveText'),
          description: t('description'),
          title: t('saveNewReport'),
          inputFileTemp: 'this is it'
        }}
        fileName={reportFileName}
        handleOnChange={handleFileNameChange}
      />
    </Container>
  );
};

export default AnnualReportsDetails;
