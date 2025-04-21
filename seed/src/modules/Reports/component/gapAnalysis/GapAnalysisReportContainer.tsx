import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/shared/components/Breadcrum/Breadcrumb';
import TabView from 'src/shared/components/tabs/Tabs';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import {
  generateGapAssesmentReoprt,
  getListOfGapAssesment
} from '../../api/reportsApi';
import { TgapGenerateReportPayload } from '../../model/reportsModel';
import SaveFileReportModal from '../SaveFileReportModal';
import { GAP_OPTIONS, checkLengthOfAText, getTimeStampName } from '../util';
import GapGeneratedReport from './GapGeneratedReport';
import GaspAssesmentReport from './GaspAssesmentReport';
import ViewRegulationPolicy from './ViewRegulationPolicy';

let timer;

const GapAnalysisReport = (props) => {
  const { goBackToReports, listOfRegulations, listOfAgency, actions } = props;
  const { t } = useTranslation('reports');

  //hide tab for temporary 't('generatedReports')'
  const tablist = [t('gapReport'), t('generatedReports')];

  //states variables
  const [tabIndex, setTabIndex] = useState(0);
  const [saveBottomModalOpen, setSaveBottomModalOpen] =
    useState<boolean>(false);
  const [openFileSaveModal, setOpenFileSaveModal] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>();
  const [pagerList, setPagerList] = useState<any>({
    currentPage: 1,
    limit: 15,
    startIndex: 0,
    totalItems: 0,
    totalPages: 0
  });
  const [selectedGapOptions, setSelectedGapOptions] = useState();
  const [gapReportListData, setGapReportListData] = useState<any>([]);
  const [generateButtonDisabled, setGenerateButtonDisabled] =
    useState<boolean>(false);
  const [reportFileName, setReportFileName] = useState<string>(
    getTimeStampName('Gap')
  );
  const [selectedMoreInfo, setSelectedMoreInfo] = useState<any>();
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    timer = setTimeout(() => {
      getAllTasksWithFilters(filters);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filters, selectedGapOptions]);
  //methods

  //

  //api get annual reports
  const getGapListData = async (payload) => {
    setIsLoader(true);
    const res = await getListOfGapAssesment(payload);
    const finalTableData = res?.data?.map((item) => {
      return {
        ...item,
        regulationName: item?.name || '-',
        agency: item?.organization || '-',
        averyPolicy:
          item?.policy?.averyPolicy?.length >= 1 ? 'Present' : 'Absent',
        firmPolicy:
          item?.policy?.firmPolicy?.length >= 1 ? 'Present' : 'Absent',
        gapAnalysis:
          item?.policy?.gapAnalysis?.length >= 1 ? 'Present' : 'Absent'
      };
    });
    setGapReportListData(finalTableData);
    setPagerList(res?.pager);
    setIsLoader(false);
  };

  const handleTabChange = (event, tabNumber: number) => {
    setTabIndex(tabNumber);
  };
  // generate report
  const generateReport = async () => {
    setGenerateButtonDisabled(true);
    let regulations = filters?.regulation?.map((item) => item.value).join(',');
    let agency = filters?.agency?.map((item) => item.value).join(',');

    let params: TgapGenerateReportPayload = {
      page: pagerList?.currentPage || 1,
      limit: pagerList?.limit || 15,
      regulation: regulations || '',
      agency: agency || '',
      reportFileName: reportFileName,
      isGapPresent: selectedGapOptions ?? null
    };
    try {
      const res = await generateGapAssesmentReoprt(params);
      showSuccessMessage(res.message, '', {});
      setReportFileName('');
      setTabIndex(1);
    } catch (error) {
      showErrorMessage(error.message || '', {});
    } finally {
      handleCancel();
      handleFileCloseModal();
      setReportFileName(getTimeStampName('Gap'));
    }
  };

  // handle buttom save footer
  const handleSave = () => {
    setOpenFileSaveModal(true);
  };

  // handle buttom cancel footer
  const handleCancel = () => {
    setSaveBottomModalOpen(false);
    setGenerateButtonDisabled(false);
  };

  //
  const handleFileCloseModal = () => {
    setOpenFileSaveModal(false);
    handleCancel();
  };
  // generate report save
  const handleFileSaveModal = () => {
    generateReport();
  };

  const handleGenerateButton = () => {
    setGenerateButtonDisabled(true);
    setSaveBottomModalOpen(true);
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
    let agency = filterVal?.agency?.map((item) => item.value).join(',');

    await getGapListData({
      page: 1,
      limit: pagerList?.limit || 15,
      regulation: regulations || '',
      isGapPresent: selectedGapOptions ?? '',
      agency: agency || ''
    });
  };

  // for  pagination change
  const getNextPaginationData = (nextPage) => {
    let regulations = filters?.regulation?.map((item) => item.value).join(',');
    let agency = filters?.agency?.map((item) => item.value).join(',');

    getGapListData({
      page: nextPage?.currentPage || 1,
      limit: nextPage?.limit || 15,
      regulation: regulations || '',
      isGapPresent: selectedGapOptions ?? '',
      agency: agency || ''
    });
  };

  // file name change
  const handleFileNameChange = (event) => {
    const inputValue = event?.target?.value;
    let trimmedValue = inputValue?.trim();
    let updatedValue = '';
    if (trimmedValue !== '') {
      updatedValue = event?.target?.value?.replace(/\s+/g, ' ');
      setReportFileName(updatedValue);
      if (updatedValue?.length >= 50 || updatedValue?.length <= 2) {
        setIsSaveButtonDisabled(true);
      } else {
        setIsSaveButtonDisabled(false);
      }
    } else {
      setReportFileName('');
    }
  };
  // handle gap option change
  const handleGapOptions = (event) => {
    let selectedGapOptions = event?.target?.value || '';
    setSelectedGapOptions(selectedGapOptions);
  };

  const renderedTabComponent = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return (
          <GaspAssesmentReport
            actions={actions}
            setSelectedMoreInfo={setSelectedMoreInfo}
            gapOptions={GAP_OPTIONS}
            handleGapOptions={handleGapOptions}
            handleGenerateButton={handleGenerateButton}
            listOfAgency={listOfAgency}
            listOfRegulations={listOfRegulations}
            selectedGapOptions={selectedGapOptions}
            onFilterChange={hanldeFilters}
            gaplReportListData={gapReportListData}
            isloader={isLoader}
            isGenerateButtonDisabled={generateButtonDisabled}
            isCustomButtom={saveBottomModalOpen}
            handleCancel={handleCancel}
            handleSave={handleSave}
            getNextPaginationData={getNextPaginationData}
            pagerList={pagerList}
          />
        );
      case 1:
        return <GapGeneratedReport />;
    }
  };
  return (
    <Container maxWidth={'xl'}>
      {selectedMoreInfo ? (
        <ViewRegulationPolicy
          setSelectedMoreInfo={setSelectedMoreInfo}
          selectedMoreInfo={selectedMoreInfo}
        />
      ) : (
        <Box className="reportsDetails mt-0">
          <Box className="mb-24 flex-basic-start w-100">
            <Breadcrumb
              parentName={'Reports'}
              childNamePath={t('gapReport')}
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
      )}

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
        checkLengthOfAText={checkLengthOfAText}
        placeHolder="Enter report name"
        showErrorMessage={true}
        disableSaveButton={isSaveButtonDisabled}
        widthClass="w-50"
      />
    </Container>
  );
};

export default GapAnalysisReport;
