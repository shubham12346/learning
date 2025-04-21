import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import FileContainerHeader from './FileContainerHeader';
import ExpandCollapseComponent from './ExpandCollapseComponent';
import SubCategoriesWrapperComponent from './SubCategoriesWrapperComponent';
import { MY_DOCS_CATEGORIES } from '../constants/constants';
import {
  getFilesCountReadyForGapAnalysis,
  getRegulationListOfRegulationBody,
  runGapAnalysis
} from '../api/myDocApi';
import { useNavigate } from 'react-router';
import { showSuccessMessage } from 'src/shared/components/toaster/Toast';

const AllSubCategoryComponent = ({
  selectedCategory,
  callTheSideNavToUpdate,
  handleSelectedCategory
}) => {
  const navigate = useNavigate();
  const [showGapAnalysisModal, setShowGapAnalysisModal] =
    useState<boolean>(false);
  const [noOfFilesInQueueForGapAnalysis, setNoOfFilesInQueueForGapAnalysis] =
    useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [gapAnalysisCategoryData, setGapAnalysisCategoryData] = useState([]);

  useEffect(() => {
    if (selectedCategory?.name === MY_DOCS_CATEGORIES.gapAnalysisPolicies) {
      updateUploadedFilesCount();
      getGapAnalysisCategoryData();
    }
  }, [selectedCategory]);

  const getGapAnalysisCategoryData = async () => {
    setLoader(true);
    const res = await getRegulationListOfRegulationBody();
    setGapAnalysisCategoryData(res?.regulatoryOrganization);
    setLoader(false);
  };

  const handleGapAnalysisModal = (value: boolean) => {
    if (value) {
      updateUploadedFilesCount();
    }
    setShowGapAnalysisModal(value);
  };

  const updateUploadedFilesCount = async () => {
    const res = await getFilesCountReadyForGapAnalysis();
    setNoOfFilesInQueueForGapAnalysis(res?.data?.filesUploaded);
  };

  const handleRunGapAnalysis = async () => {
    handleGapAnalysisModal(false);
    const runGapAnalysisAPI = runGapAnalysis()
    await new Promise(resolve => setTimeout(resolve, 1000));
    await getGapAnalysisCategoryData()
    const res = await runGapAnalysisAPI
    await getGapAnalysisCategoryData()
    await updateUploadedFilesCount();
    showSuccessMessage(res?.message, '', {
      position: 'top-right'
    });
  };

  const hasGapAssessmentInProgress = gapAnalysisCategoryData.some((item) => {
    const isAssessmentInProgress = item?.types?.some((type) => type?.status === 'gapAssessmentInProgress')
    const isGapRun = item?.types?.some(
      (type) => type?.isGapRun === false && type?.status === 'fileUploaded'
    );
    return isAssessmentInProgress && !isGapRun;
  });

  const handleNavigate = () => {
    navigate('/avery/regulations?tab=gapAssessment');
  };

  return (
    <>
      <Box sx={{ py: 5, px: 5 }}>
        <FileContainerHeader
          title={selectedCategory?.name}
          isCreateNewButoon={false}
          isViewGapAssessmentButton={
            selectedCategory?.name === MY_DOCS_CATEGORIES?.gapAnalysisPolicies
          }
          isRunGapAnalysisButton={
            selectedCategory?.name === MY_DOCS_CATEGORIES?.gapAnalysisPolicies
          }
          handleRunGapAnalysis={handleGapAnalysisModal}
          isRunGapAnalysisButtonDisabled={noOfFilesInQueueForGapAnalysis <= 0 || hasGapAssessmentInProgress}
          handleViewGapAssessment={handleNavigate}
        />
      </Box>
      <Divider className="divider" />
      {selectedCategory?.name === MY_DOCS_CATEGORIES.gapAnalysisPolicies ? (
        <ExpandCollapseComponent
          selectedCategory={selectedCategory}
          callTheSideNavToUpdate={callTheSideNavToUpdate}
          showGapAnalysisModal={showGapAnalysisModal}
          handleGapAnalysisModal={handleGapAnalysisModal}
          noOfFilesInQueueForGapAnalysis={noOfFilesInQueueForGapAnalysis}
          updateUploadedFilesCount={updateUploadedFilesCount}
          handleRunGapAnalysis={handleRunGapAnalysis}
          gapAnalysisCategoryData={gapAnalysisCategoryData}
          handleSelectedCategory={handleSelectedCategory}
          loader={loader}
        />
      ) : (
        <SubCategoriesWrapperComponent
          selectedCategory={selectedCategory}
          callTheSideNavToUpdate={callTheSideNavToUpdate}
        />
      )}
    </>
  );
};

export default AllSubCategoryComponent;
