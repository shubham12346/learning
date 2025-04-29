import { Box, Divider, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { uploadSingleOrMultipleFile } from '../api/myDocApi';
import { TexpandCollapseComponent } from '../model/myDocsTypes';
import FileUploadComponent from './FileUploadComponent';
import { GapAnalysisModal } from './GapAnalysisModal';
import { TableHeader } from './SubCategoriesWrapperComponent';

type regulationBodyType = {
  id: string;
  name: string;
  totalRegulationCount: number;
  totalRegulationWithPolicyCount: number;
  types: any[];
};

type categoryDetailsType = {
  categoryId: string;
  name: string;
};
interface MyAccordionProps {
  selectedRegulationBody: regulationBodyType;
  callTheSideNavToUpdate: any;
  index: number;
  categoryDetails: categoryDetailsType;
  updateUploadedFilesCount: () => void;
  handleSelectedCategory: (params: any) => void;
}

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  '&.MuiAccordion-root.MuiAccordion-rounded .MuiCollapse-root.MuiCollapse-vertical .MuiCollapse-wrapper':
    {
      backgroundColor: 'white !important',
      padding: '0px !important',
      maxHeight: '400px !important',
      height: 'auto !important',
      minHeight: '0px !important'
    },
  '&.css-mmbxhx': {
    paddingLeft: '0px !important'
  }
}));

const MyAccordion = (props: MyAccordionProps) => {
  const {
    selectedRegulationBody,
    callTheSideNavToUpdate,
    index,
    categoryDetails,
    updateUploadedFilesCount,
    handleSelectedCategory
  } = props;
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const [fileLoader, setFileLoader] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  // upload single or multiple file
  const handleUpload = async (file, subCategory) => {
    setFileLoader(true);
    await saveUploadedFile(file, categoryDetails?.categoryId, subCategory?.id);
    await callSideNavToUpdateAndThenUpdateDocumentList();
    updateUploadedFilesCount();
    setFileLoader(false);
  };

  const callSideNavToUpdateAndThenUpdateDocumentList = async () => {
    const res: any = await callTheSideNavToUpdate();
    const getSelectedArrayId = res?.filter(
      (item) => item?.name === categoryDetails?.name
    );

    if (handleSelectedCategory) {
      handleSelectedCategory(getSelectedArrayId[0]);
    }
  };

  const saveUploadedFile = async (
    files,
    categoryId,
    subCategoryId
  ): Promise<boolean> => {
    const formData = new FormData();
    let countUploadedByObject = 0;
    for await (const eachFile of files) {
      if (eachFile?.key) {
        countUploadedByObject++;
      }
      formData.append('files', eachFile);
    }
    if (countUploadedByObject !== files?.length && files?.length >= 1) {
      try {
        const res = await uploadSingleOrMultipleFile(
          formData,
          categoryId,
          subCategoryId
        );
        if (res?.message === 'Files uploaded successfully') {
          showSuccessMessage(res.message, '', {});
        }
      } catch (error) {
        showErrorMessage(error?.response?.data?.cause || '', {
          position: 'top-right'
        });
        return false;
      }
    }
  };

  return (
    <CustomAccordion
      expanded={isExpanded}
      onChange={() => {
        setIsExpanded(!isExpanded);
      }}
      sx={{ border: 'none !important' }}
    >
      <AccordionSummary>
        <Box className="flex-basic-space-start w-100">
          <Box className="d-flex">
            <Typography variant="caption" className="mr-7">
              {selectedRegulationBody?.name}
            </Typography>
            <Typography variant="subtitle1">
              {`(${selectedRegulationBody?.totalRegulationWithPolicyCount}/${selectedRegulationBody?.totalRegulationCount} policies uploaded)`}
            </Typography>
          </Box>
          <Box className="myDocsAccordionIcon">
            <Box className="flex-basic-center">
              <Box
                className={
                  isExpanded ? 'icon-dropdown icon-rotate-top' : 'icon-dropdown'
                }
              ></Box>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      {isExpanded && (
        <AccordionDetails>
          <Divider className="divider" />
          <Box>
            {selectedRegulationBody?.types?.map?.((regulation) => (
              <Box key={regulation.id} sx={{ py: 2 }}>
                {
                  <Box sx={{ py: 5, px: 0 }}>
                    <FileUploadComponent
                      handleUploadFile={handleUpload}
                      subCategory={{
                        id: regulation?.id,
                        name: regulation?.name
                      }}
                      totalFile={regulation?.documents}
                      category={categoryDetails}
                      key={regulation.id}
                      fileLoader={fileLoader}
                      selectedSubCategoryTitle={selectedSubCategory}
                      setSelectedSubCategory={setSelectedSubCategory}
                      regulationStatus={regulation.status}
                      isMultiple={false}
                    />
                  </Box>
                }
                <Divider className="divider" />
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      )}
    </CustomAccordion>
  );
};

const ExpandCollapseComponent = ({
  selectedCategory,
  callTheSideNavToUpdate,
  showGapAnalysisModal,
  handleGapAnalysisModal,
  noOfFilesInQueueForGapAnalysis,
  updateUploadedFilesCount,
  handleRunGapAnalysis,
  gapAnalysisCategoryData,
  handleSelectedCategory,
  loader
}: TexpandCollapseComponent) => {
  const categoryDetails: categoryDetailsType = {
    categoryId: selectedCategory.categoryId,
    name: selectedCategory.name
  };

  const regulationBodiesData = selectedCategory?.types?.map((item1) => {
    const matchingItem = gapAnalysisCategoryData.find(
      (item2) => item2.id === item1.id
    );
    return matchingItem ? { ...item1, types: matchingItem.types } : item1;
  });

  const { t } = useTranslation('mydoc');

  return (
    <>
      {loader && (
        <Box className="spinnerWrapper flex-basic-center mt-100 mb-100 ">
          <Box className="spinnerLoading "></Box>
        </Box>
      )}
      {!loader && (
        <Box>
          <TableHeader selectedCategory={categoryDetails} />
          <Box>
            {regulationBodiesData.length > 0 &&
              regulationBodiesData.map((regulationBody, index) => (
                <Box key={regulationBody.id} className="myDocsAccordionList">
                  <MyAccordion
                    index={index}
                    selectedRegulationBody={regulationBody}
                    callTheSideNavToUpdate={callTheSideNavToUpdate}
                    categoryDetails={categoryDetails}
                    updateUploadedFilesCount={updateUploadedFilesCount}
                    handleSelectedCategory={handleSelectedCategory}
                  />
                </Box>
              ))}
          </Box>
          {showGapAnalysisModal && (
            <GapAnalysisModal
              open={showGapAnalysisModal}
              handleRunGapAnalysis={handleRunGapAnalysis}
              handleClose={() => {
                handleGapAnalysisModal(false);
              }}
              subText={t('gapAnalysisModalText', {
                filesCount: noOfFilesInQueueForGapAnalysis
              })}
              modalTitle={t('runGapAnalysisModalTitle')}
              btnPrimaryText={t('continueButtonText')}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default ExpandCollapseComponent;
