import { Box, Grid, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { ACCEPTABLE_FILE_FORMAT } from 'src/modules/ActionPlan/component/utils';
import {
  Button,
  SingleOrMultipleUpload,
  Typography
} from 'src/shared/components/index';
import { FilePreviewType } from 'src/shared/components/upload/services/singleOrMultipleUploadInterface';
import FileComponent from './FileComponent';
import { TfileUploadComponent } from '../model/myDocsTypes';
import ShowAllFileModal from './ShowAllFileModal';
import { useTranslation } from 'react-i18next';
import { MY_DOCS_CATEGORIES, REGULATION_STATUS } from '../constants/constants';
import { GapAnalysisModal } from './GapAnalysisModal';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';

//Function to get icon class and tooltip based on regulation status
const getStatusClass = (regulationStatus, t) => {
  switch (regulationStatus) {
    case REGULATION_STATUS.GAP_ASSESSMENT_DONE:
      return {
        className: 'icon-ic_check-selected-3 green-color',
        tooltipText: t('regulationStatusTooltip.gapAssessmentDone')
      };
    case REGULATION_STATUS.GAP_ASSESSMENT_IN_PROGRESS:
      return {
        className: 'icon-status-loading',
        tooltipText: t('regulationStatusTooltip.gapAssessmentInProgress')
      };
    case REGULATION_STATUS.FILE_UPLOADED:
      return {
        className: 'icon-ic_check-selected-3',
        tooltipText: t('regulationStatusTooltip.fileUploaded')
      };
    case REGULATION_STATUS.FILE_NOT_UPLOADED:
      return {
        className: 'icon-ic_not-selected-4',
        tooltipText: t('regulationStatusTooltip.fileNotUploaded')
      };
    default:
      return { className: 'default-class', tooltipText: 'status' };
  }
};

//Function to manage the icon for gap analysis and other categories
const classNameForRegulationStatus = ({
  category,
  totalFile,
  regulationStatus,
  t
}) => {
  let regulationStatusClassName;
  if (category.name === MY_DOCS_CATEGORIES.gapAnalysisPolicies) {
    regulationStatusClassName = getStatusClass(regulationStatus, t);
  } else if (totalFile?.length >= 1) {
    regulationStatusClassName = getStatusClass(
      REGULATION_STATUS.FILE_UPLOADED,
      t
    );
  } else {
    regulationStatusClassName = getStatusClass(
      REGULATION_STATUS.FILE_NOT_UPLOADED,
      t
    );
  }

  return regulationStatusClassName;
};

const FileUploadComponent = (props: TfileUploadComponent) => {
  const {
    handleDeleteFile,
    handleUploadFile,
    subCategory = { name: 'xyz', id: 'djf' },
    totalFile,
    category,
    fileLoader,
    selectedSubCategoryTitle,
    setSelectedSubCategory,
    handleSubCategoryDelete,
    regulationStatus,
    isMultiple = true
  } = props;

  const { t } = useTranslation('mydoc');
  const { actions } = useSelector((state: RootState) => state.myDocs);
  const [previousFiles, setPreviousFiles] = useState([] as FilePreviewType[]);
  const [selectedItem, setSelectedItem] = useState<any>('');
  const [openPlusMoreModal, setOpenPlusMoreModal] = useState<boolean>(false);
  const [isUploadDisabled, setIsUploadDisabled] = useState<boolean>(false);
  const [showReplaceFileModal, setShowReplaceFileModal] =
    useState<boolean>(false);
  const [latestUploadedFile, setLatestUploadedFile] = useState<
    FilePreviewType[]
  >([]);

  useEffect(() => {
    if (regulationStatus === REGULATION_STATUS.GAP_ASSESSMENT_IN_PROGRESS) {
      setIsUploadDisabled(true);
    }
  }, [regulationStatus]);

  const setSingleData = (data: FilePreviewType) => {
    setLatestUploadedFile([data]);
    if (
      totalFile?.length >= 1 &&
      category?.name?.toLowerCase() ===
        MY_DOCS_CATEGORIES.gapAnalysisPolicies?.toLowerCase()
    ) {
      setShowReplaceFileModal(true);
    }
    if (
      category?.name?.toLowerCase() !==
        MY_DOCS_CATEGORIES.gapAnalysisPolicies?.toLowerCase() ||
      totalFile?.length === 0
    ) {
      handleUploadFile([data], subCategory);
    }
  };

  const setMultipleData = (
    newFiles: FilePreviewType[],
    oldFiles: FilePreviewType[]
  ) => {
    setLatestUploadedFile([...newFiles]);
    setPreviousFiles(oldFiles);
    if (
      totalFile?.length >= 1 &&
      category?.name?.toLowerCase() ===
        MY_DOCS_CATEGORIES.gapAnalysisPolicies?.toLowerCase()
    ) {
      setShowReplaceFileModal(true);
    }
    if (
      category?.name?.toLowerCase() !==
        MY_DOCS_CATEGORIES.gapAnalysisPolicies?.toLowerCase() ||
      totalFile?.length === 0
    ) {
      handleUploadFile([...newFiles, ...oldFiles], subCategory);
    }
  };

  const handleRunGapAnalysis = () => {
    setShowReplaceFileModal(false);
    handleUploadFile(latestUploadedFile, subCategory);
  };

  const handleReplaceFileModalClose = () => {
    setLatestUploadedFile([]);
    setShowReplaceFileModal(false);
  };
  const handleSelected = (item) => {
    setSelectedItem(item);
    setSelectedSubCategory(subCategory.name);
  };
  const handleClose = () => {
    setSelectedItem('');
  };

  //  call back to call and delete file from parents
  const handleDeleteInASubCategory = (item) => {
    return handleDeleteFile(item);
  };

  //  display only 5 file
  const displayFile = totalFile?.slice(0, 5);

  //

  const handleShowMoreFileButton = () => {
    setOpenPlusMoreModal(true);
  };

  const handlePlusMoreCloseModal = () => {
    setOpenPlusMoreModal(false);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={3} xl={3}>
        <Box className=" d-flex justify-content-start align-items-center w-100">
          <Box className="mr-16 mt-0">
            <Tooltip
              sx={{ zIndex: 2 }}
              title={
                classNameForRegulationStatus({
                  category,
                  totalFile,
                  regulationStatus,
                  t
                }).tooltipText
              }
            >
              <Box
                sx={{ height: '24px', widows: '24px', fontSize: '22px' }}
                className={
                  classNameForRegulationStatus({
                    category,
                    totalFile,
                    regulationStatus,
                    t
                  }).className
                }
              />
            </Tooltip>
          </Box>
          <Typography className=" subCategoryHeadTitle w-80 textWrap">
            {subCategory.name}
          </Typography>
        </Box>
      </Grid>

      {totalFile?.length >= 1 && (
        <Grid item xs={12} md={12} lg={7} xl={7}>
          <>
            {openPlusMoreModal ? (
              <ShowAllFileModal
                files={totalFile}
                handleClose={handleClose}
                open={openPlusMoreModal}
                handleDeleteInASubCategory={handleDeleteInASubCategory}
                handleSelected={handleSelected}
                selectedItem={selectedItem}
                handleCloseDeleteModal={handlePlusMoreCloseModal}
                fileLoader={fileLoader}
              />
            ) : (
              <>
                {fileLoader && selectedSubCategoryTitle === subCategory.name ? (
                  <Box className="spinnerWrapper flex-basic-center  ">
                    <Box className="spinnerLoading "></Box>
                  </Box>
                ) : (
                  <Box className="d-flex flex-wrap fileList cursorPointer fileAttachment">
                    <>
                      {displayFile?.map(
                        (item: FilePreviewType, index: number) => (
                          <FileComponent
                            handleSelected={handleSelected}
                            fileName={item?.fileName || item?.name}
                            item={item}
                            key={item?.id}
                            lastModifiedDate={item?.lastModifiedDate}
                            name={item.name}
                            uploadedAt={item?.uploadedAt}
                            selectedItem={selectedItem}
                            handleClose={handleClose}
                            handleDeleteFile={handleDeleteInASubCategory}
                            categoryName={category?.name}
                          />
                        )
                      )}
                      {totalFile?.length > 5 && (
                        <Box className="text-font-15 textsemiWeight textPrimaryColor">
                          <Button
                            className="btnFont mt-5"
                            variant="contained"
                            type="submit"
                            size={'small'}
                            btnText={`+ ${Number(totalFile?.length) - 5} more`}
                            onClick={handleShowMoreFileButton}
                            sx={{ py: '5px', px: '24px' }}
                          />
                        </Box>
                      )}
                    </>
                  </Box>
                )}
              </>
            )}
          </>
        </Grid>
      )}

      {actions?.includes('add-policy') && (
        <Grid
          item
          xs={12}
          md={12}
          lg={totalFile?.length >= 1 ? 2 : 9}
          xl={totalFile?.length >= 1 ? 2 : 9}
          sx={{ pl: totalFile?.length >= 1 ? 2 : 0 }}
        >
          <Box className="flex-basic-space-between uploadBtnContainer  w-100 cursorPointer">
            <SingleOrMultipleUpload
              isMultiple={isMultiple}
              acceptedFileFormat={ACCEPTABLE_FILE_FORMAT}
              uploadedFiles={previousFiles}
              maxFileSize={100000000}
              setMultipleData={setMultipleData}
              setSingleData={setSingleData}
              maxFilesToUpload={100}
              isUploadDisabled={isUploadDisabled}
            >
              <Tooltip
                title={
                  isUploadDisabled
                    ? t('uploadFileDisabledTooltip')
                    : t('uploadFileTooltip')
                }
              >
                <Box className="fileUploadContainer cursorDisabled">
                  <Box className="flex-basic-start">
                    <Button
                      onClick={handleSelected}
                      variant="outlined"
                      btnText={t('upload')}
                      sx={{
                        width: '127px',
                        height: '32px',
                        padding: '6px 24px',
                        borderRadius: '2px'
                      }}
                      disabled={isUploadDisabled}
                      btnClass="uploadFileButton"
                      startIcon={
                        <Box
                          sx={{
                            color: 'black',
                            opacity: `${isUploadDisabled ? 0.5 : 1}`
                          }}
                          className="icon-Icon-Stroke iconStyle"
                        />
                      }
                    />
                  </Box>
                </Box>
              </Tooltip>
            </SingleOrMultipleUpload>
            {category?.name === 'Other' && (
              <Box
                className="cursorPointer"
                onClick={() => {
                  handleSubCategoryDelete(subCategory);
                }}
              >
                <Tooltip title={t('delete')}>
                  <Box className="icon-trash iconStyle" />
                </Tooltip>
              </Box>
            )}
          </Box>
        </Grid>
      )}
      <GapAnalysisModal
        open={showReplaceFileModal}
        handleRunGapAnalysis={handleRunGapAnalysis}
        handleClose={handleReplaceFileModalClose}
        subText={t('replaceModalDescription')}
        modalTitle={t('uploadModalTitle')}
        btnPrimaryText={t('replacebtn')}
      />
    </Grid>
  );
};

export default FileUploadComponent;
