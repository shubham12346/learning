import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuditTrailReportHeader from '../AuditTrailReportHeader';
import {
  AuditTrailReportListPropsTypes,
  TauditGenerateReportPayload
} from '../../model/reportsModel';
import SaveFileReportModal from '../SaveFileReportModal';
import { checkLengthOfAText, getTimeStampName } from '../util';
import { useEffect, useState } from 'react';
import {
  genrerateAuditTrailReport,
  getAllAuditTrailReportsDetails
} from '../../api/reportsApi';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import AuditTable from './AuditTable';
import { CURRENT_DATE } from 'src/shared/constants/constants';

let debounce;
const AuditTrailReportList = (props: AuditTrailReportListPropsTypes) => {
  //const
  const { listOfAgency, listOfRegulations, handleTabChange, actions } = props;
  const { t } = useTranslation('reports');

  // local states
  const [reportFileName, setReportFileName] = useState<string>(
    getTimeStampName('Audit')
  );
  const [isSaveButtonDisabled, setIsSaveButtonDisable] =
    useState<boolean>(false);
  const [auditTrailReportData, setAuditTrailReportData] = useState<any>({});
  const [isFilterApplied, setIsFilterApplied] = useState<any>([]);
  const [pagerList, setPager] = useState<any>([]);
  const [isloader, setIsLoader] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageLimitCount, setPageLimitCount] = useState<number>(15);
  const [saveBottomModalOpen, setSaveButtomModalOpen] =
    useState<boolean>(false);
  const [openSaveFileModal, setOpenSaveFileModal] = useState<boolean>(false);
  const [isGenerateButtonDisabled, setGenerateButtonDisabled] =
    useState<boolean>();

  useEffect(() => {
    debounce = setTimeout(() => {
      onFilterChange(filters);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [startDate, endDate]);

  //methods

  //get Audit Trail Reports
  const fetchAllAuditTrailReportsDetails = async (payload?) => {
    try {
      setIsLoader(true);
      const respData = await getAllAuditTrailReportsDetails(payload);
      setIsLoader(false);
      setAuditTrailReportData({
        data: respData?.reports,
        pager: respData?.pager
      });
      // respData?.reports);
      //setPager(respData?.pager);
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
      setIsLoader(false);
    }
  };

  //getNextPaginationData
  const getNextPaginationData = async (nextPage) => {
    setIsLoader(true);
    let agencies = isFilterApplied?.agency?.map((item) => item.value).join(',');
    let regulations = isFilterApplied?.regulation
      ?.map((item) => item.value)
      .join(',');

    const payload: any = {
      page: nextPage.currentPage,
      limit: nextPage.limit,
      startDate: startDate,
      endDate: endDate,
      agency: agencies,
      regulation: regulations
    };
    const res: any = await getAllAuditTrailReportsDetails(payload);
    setIsLoader(false);
    setAuditTrailReportData({
      data: res?.reports,
      pager: res?.pager
    });
  };

  const handleStartDate = (value) => {
    if (value != 'Invalid Date') {
      setStartDate(value);
    }
  };

  const handleEndDate = (value) => {
    if (value != 'Invalid Date') {
      setEndDate(value);
    }
  };
  const hanldeFilters = (value) => {
    setFilters(value);
    onFilterChange(value);
  };

  const onFilterChange = (filterVal) => {
    setIsFilterApplied(filterVal);
    let agencies = filterVal?.agency?.map((item) => item.value).join(',');
    let regulations = filterVal?.regulation
      ?.map((item) => item.value)
      .join(',');
    fetchAllAuditTrailReportsDetails({
      page: 1,
      limit: auditTrailReportData?.pager?.limit || 15,
      startDate: startDate,
      endDate: endDate,
      agency: agencies,
      regulation: regulations
    });
  };

  const handleSave = () => {
    setOpenSaveFileModal(true);
  };

  // handle buttom cancel footer
  const handleCancel = () => {
    setGenerateButtonDisabled(false);
    setSaveButtomModalOpen(false);
  };

  const handleGenerateButton = () => {
    setGenerateButtonDisabled(true);
    setSaveButtomModalOpen(true);
  };
  // handle file name changed
  const handleFileNameChange = (event) => {
    const inputValue = event?.target?.value;
    let trimmedValue = inputValue?.trim();
    let updatedValue = '';
    if (trimmedValue !== '') {
      updatedValue = event?.target?.value?.replace(/\s+/g, ' ');
      setReportFileName(updatedValue);
      if (updatedValue?.length >= 50 || updatedValue?.length <= 2) {
        setIsSaveButtonDisable(true);
      } else {
        setIsSaveButtonDisable(false);
      }
    } else {
      setReportFileName('');
    }
  };

  // save file modal
  const handleFileSaveModal = async () => {
    let agencies = isFilterApplied?.agency?.map((item) => item.value).join(',');
    let regulations = isFilterApplied?.regulation
      ?.map((item) => item.value)
      .join(',');
    let payload: TauditGenerateReportPayload = {
      agency: agencies || '',
      regulation: regulations || '',
      startDate: startDate || '',
      endDate: startDate && endDate ? endDate : '',
      reportFileName: reportFileName
    };

    try {
      const res = await genrerateAuditTrailReport(payload);
      showSuccessMessage(res?.message, '', {});
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause || error?.message, {});
    }
    handleFileCloseModal();
    handleTabChange(1);
  };

  const handleFileCloseModal = () => {
    setOpenSaveFileModal(false);
    setGenerateButtonDisabled(false);
  };

  return (
    <Box>
      <AuditTrailReportHeader
        listOfRegulations={listOfRegulations}
        listOfAgency={listOfAgency}
        showFilters={true}
        onStartDateChange={handleStartDate}
        onEndDateChange={handleEndDate}
        onFilterChange={hanldeFilters}
        isVisiableGenerateBtn={actions?.includes('add-report') ? true : false}
        handleGenerateButton={handleGenerateButton}
        isGenerateButtonDisabled={isGenerateButtonDisabled}
        CurrentDate={CURRENT_DATE}
      />

      <Box sx={{ mt: 6 }}>
        <AuditTable
          auditTrailReportData={auditTrailReportData}
          getNextPaginationData={getNextPaginationData}
          handleCancel={handleCancel}
          handleSave={handleSave}
          isloader={isloader}
          saveBottomModalOpen={saveBottomModalOpen}
        />
      </Box>

      <SaveFileReportModal
        handleCancel={handleFileCloseModal}
        handleSave={handleFileSaveModal}
        open={openSaveFileModal}
        text={{
          cancelText: t('cancelText'),
          saveText: t('saveText'),
          description: t('description'),
          title: t('saveNewReport'),
          inputFileTemp: 'this is it'
        }}
        fileName={reportFileName}
        handleOnChange={handleFileNameChange}
        checkLengthOfAText={checkLengthOfAText}
        placeHolder="Enter report name"
        showErrorMessage={true}
        disableSaveButton={isSaveButtonDisabled}
        widthClass="w-50"
      />
    </Box>
  );
};

export default AuditTrailReportList;
