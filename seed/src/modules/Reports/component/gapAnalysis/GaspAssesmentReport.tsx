import { TGapAssesmentReport } from '../../model/reportsModel';
import GapAnalysisHeader from './GapAnalysisHeader';
import GapAnalysisList from './GapAnalysisList';

const GaspAssesmentReport = (props: TGapAssesmentReport) => {
  const {
    setSelectedMoreInfo,
    gapOptions,
    handleGapOptions,
    handleGenerateButton,
    listOfAgency,
    listOfRegulations,
    onFilterChange,
    selectedGapOptions,
    gaplReportListData,
    isloader,
    isGenerateButtonDisabled,
    isCustomButtom,
    handleCancel,
    handleSave,
    getNextPaginationData,
    pagerList,
    actions
  } = props;

  return (
    <>
      <GapAnalysisHeader
        handleGenerateButton={handleGenerateButton}
        hideAgency={true}
        isGenerateButtonDisabled={isGenerateButtonDisabled}
        isVisiableGenerateBtn={actions?.includes('add-report')}
        listOfAgency={listOfAgency}
        listOfRegulations={listOfRegulations}
        onFilterChange={onFilterChange}
        showFilters={true}
        showRefreshButton={true}
        gapOptions={gapOptions}
        handleGapOptions={handleGapOptions}
        showGapAssesment={true}
        selectedGapOptions={selectedGapOptions}
      />
      <GapAnalysisList
        setSelectedMoreInfo={setSelectedMoreInfo}
        gaplReportListData={gaplReportListData}
        isloader={isloader}
        isCustomButtom={isCustomButtom}
        handleCancel={handleCancel}
        handleSave={handleSave}
        getNextPaginationData={getNextPaginationData}
        pagerList={pagerList}
      />
    </>
  );
};

export default GaspAssesmentReport;
