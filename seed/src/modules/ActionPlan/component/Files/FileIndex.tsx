import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Typography
} from '@mui/material';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoChatAveryAI from 'src/assets/svg/noFilesSvg.svg';
import { useTranslation } from 'react-i18next';
import FilesFilters from './FilesFilters';
import FileListTable from './FileListTable';
import {
  Button,
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/index';
import { useEffect, useState } from 'react';
import {
  deleteAttachmentForATask,
  getActionFilesAttachment,
  getFileTypeDropOptions,
  getGenerateActionPlanForRegulation
} from '../../api/actionplanApi';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  REGULATION_PATH,
  getRegulationPath
} from 'src/modules/Regulations/components/Utils';
import { UploadFileModel } from './UploadFileModel';
import { uploadNewFile } from 'src/modules/Users/apis/UserApis';
import AddIcon from '@mui/icons-material/Add';

let attachmentSearch = null;
const FileIndex = (props) => {
  //const
  const { t } = useTranslation('regulations');
  const { actions } = props;
  let { regId, actionId } = useParams();

  // states
  const navigate = useNavigate();
  const [actionPlanDetail, setActionPlanDetail] = useState<any>();
  const [fileTypeList, setFileTypeList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');
  const [attachmentList, setAttachmentList] = useState([]);
  const [attachmentLoading, setAttachmentLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [files, setFiles] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActionPlan] = useState<boolean>(true);

  const [pager, setPager] = useState({
    totalItems: 1,
    currentPage: 1,
    limit: 15,
    startIndex: 0,
    totalPages: 1
  });

  useEffect(() => {
    fetchFileListType();
    getDetailsOfGenerateActionPlan(regId);
  }, []);

  useEffect(() => {
    if (files?.length > 0) {
      saveUploadedFile();
    }
  }, [files]);

  useEffect(() => {
    let payload = {
      fileType: selectedFileType || '',
      fileName: searchKeyword,
      page: pager?.currentPage,
      limit: pager?.limit
    };

    fetchActionPlanAttachments(payload);
  }, [selectedFileType, isDeleted]);

  // fetch file list type
  const fetchFileListType = async () => {
    const res = await getFileTypeDropOptions();
    let files = res?.map((item) => {
      return {
        name: item?.name,
        id: item?.name,
        label: item?.displayName,
        value: item?.name,
        key: item?.name
      };
    });
    setFileTypeList(files);
  };

  // fetch attachments of the action plan

  const fetchActionPlanAttachments = async (payload) => {
    try {
      setAttachmentLoading(true);
      const res = await getActionFilesAttachment(actionId, payload);
      const { pager: pageData, attachments } = res;
      let count = 0;
      let attachmentWithId = attachments?.map((item) => {
        return {
          ...item,
          id: count++
        };
      });
      setAttachmentList(attachmentWithId);
      setPager(pageData);
      setAttachmentLoading(false);
    } catch (error) {
      if (error?.response?.data?.statusCode === 412) {
        showErrorMessage(t('selectedActionPlanExpiredText'), {});
      }
      setAttachmentLoading(false);
    }
  };

  // handle search

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
      clearTimeout(attachmentSearch);
      attachmentSearch = setTimeout(async () => {
        let payload = {
          fileType: selectedFileType,
          fileName: removeWhiteSpace,
          page: pager?.currentPage,
          limit: pager?.limit
        };
        fetchActionPlanAttachments(payload);
      }, 500);
    }
  };

  // applying file type filter
  const handleFilterChange = (selectedFileType) => {
    let fileTypeString = convertFileTypeArrayToString(selectedFileType);
    setSelectedFileType(fileTypeString);
  };

  // get next pagination
  const getNextPagination = async (pageData) => {
    let payload = {
      fileType: selectedFileType || '',
      fileName: searchKeyword,
      page: pageData?.currentPage,
      limit: pageData?.limit
    };
    fetchActionPlanAttachments(payload);
  };

  // convert file type array to string
  const convertFileTypeArrayToString = (filters) => {
    let fileType = filters?.fileTypeList?.map((item) => item.value).join(',');
    return fileType;
  };

  const goBack = () => {
    const path = getRegulationPath(REGULATION_PATH.ACTION_PALN_VIEW, {
      regId,
      actionId
    });
    navigate(path);
  };

  // get information of back button ,
  const getDetailsOfGenerateActionPlan = async (regulationId) => {
    let respData = await getGenerateActionPlanForRegulation(regulationId);

    setActionPlanDetail(respData);
  };

  const handleDeleteAttachment = async (item) => {
    try {
      let payload = {
        keys: [item?.key]
      };
      const res = await deleteAttachmentForATask(item?.uid, payload);
      showSuccessMessage(res?.message, '', {
        position: 'top-right'
      });
      setIsDeleted(item?.key);
    } catch (error) {
      showErrorMessage(error?.message ?? error, {});
    }
  };

  //getCallFileUploadModel
  const getCallToFileUploadModel = () => {
    setOpenModal(true);
  };

  const setCloseModal = () => {
    setOpenModal(false);
  };

  const uploadedFiles = (files) => {
    setFiles(files);
  };

  //file upload for the action plan
  const saveUploadedFile = async () => {
    const formData = new FormData();
    let countUploadedByObject = 0;
    for await (const eachFile of files) {
      if (eachFile?.key) {
        countUploadedByObject++;
      }
      formData.append('files', eachFile || eachFile.File);
    }
    if (countUploadedByObject !== files?.length && files?.length >= 1) {
      try {
        setIsLoading(true);
        const res = await uploadNewFile(actionId, formData, isActionPlan);
        showSuccessMessage(res?.message, '', {});
        fetchActionPlanAttachments('');
        setCloseModal();
        setIsLoading(false);
      } catch (error) {
        showErrorMessage(error.response.data.cause, {
          position: 'top-right'
        });
      }
    }
  };

  return (
    <Box>
      <Box className="flex-basic-space-between mb-26">
        <Box className="flex-basic-start w-100">
          <Box
            onClick={goBack}
            className="mr-16 d-flex iconArrowBack flex-basic-center cursorPointer"
          >
            <ArrowBackIcon sx={{ color: '#fff' }} />
          </Box>
          <Typography
            variant="h4"
            className="textWeightMedium flex-basic-start text-ellipsis customWidth100"
          >
            <Box>{actionPlanDetail?.regulationInfo?.regulatoryBody}</Box>
            <Box sx={{ pr: 1 }}> : </Box>
            <Box className="text-ellipsis">
              {actionPlanDetail?.regulationInfo?.regulationName}
            </Box>
            <Box className="d-flex">
              <Box
                sx={{ mx: 1 }}
                className="icon-dropdown icon-rotate-273 iconStyle"
              ></Box>
            </Box>
            <Box className="textWeightMedium flex-basic-start text-ellipsis customWidth100">
              {t('actionPlanSectionText.actionPlanText')}
            </Box>
            <Box className="d-flex">
              <Box
                sx={{ mx: 1 }}
                className="icon-dropdown icon-rotate-273 iconStyle"
              ></Box>
            </Box>
            <Box className="textweight textPrimaryColor">{t('files')}</Box>
          </Typography>
        </Box>
      </Box>
      <Box className="actionFiles">
        {!selectedFileType &&
        !searchKeyword &&
        !attachmentLoading &&
        attachmentList?.length <= 0 ? (
          <Card className="flex-basic-center emptyFileCardHeight">
            <Box className="flex-direction-column">
              <EmptyPlaceholder
                imgWidth={'260'}
                imageUrl={NoChatAveryAI}
                titleText={t('noFileUploaded')}
              />
              <Box sx={{ mt: 10 }}>
                {actions?.includes('edit-task') && (
                  <Button
                    sx={{ padding: '0.75rem 2rem' }}
                    variant="contained"
                    btnText={'ADD NEW FILE'}
                    onClick={getCallToFileUploadModel}
                    className="w-100"
                    startIcon={<AddIcon />}
                  ></Button>
                )}
              </Box>
            </Box>
          </Card>
        ) : (
          <Box className="fileListView">
            <Container maxWidth={'xl'}>
              <Box className="mt-40">
                <FilesFilters
                  fileTypeList={fileTypeList}
                  handleSearch={handleSearch}
                  searchKeyword={searchKeyword}
                  onFilterChange={handleFilterChange}
                  getCallToFileUploadModel={getCallToFileUploadModel}
                  showFilters={true}
                  actions={actions}
                />
              </Box>
              <Box className="mt-16">
                <FileListTable
                  tableListData={attachmentList}
                  pager={pager}
                  getNextPagination={getNextPagination}
                  loader={attachmentLoading}
                  handleDeleteAttachment={handleDeleteAttachment}
                  actions={actions}
                />
              </Box>
            </Container>
          </Box>
        )}
      </Box>
      <UploadFileModel
        open={openModal}
        uploadedFiles={uploadedFiles}
        handleClose={setCloseModal}
        modalTitle={`${t('uploadFilesForAction', { ns: 'english' })}`}
      />
      <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default FileIndex;
