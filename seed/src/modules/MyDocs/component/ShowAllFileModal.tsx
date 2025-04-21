import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SimpleDialog } from 'src/shared/components/modals/SimpleDialog';
import { FilePreviewType } from 'src/shared/components/upload/services/singleOrMultipleUploadInterface';
import FileComponent from './FileComponent';

export type TshowLimitedFileModal = {
  handleClose: any;
  open: boolean;
  files: any[];
  selectedItem: any;
  handleSelected: any;
  handleDeleteInASubCategory: any;
  handleCloseDeleteModal: any;
  fileLoader: boolean;
};
const ShowLimitedFileModal = (props: TshowLimitedFileModal) => {
  const {
    handleClose,
    open,
    files,
    handleDeleteInASubCategory,
    handleSelected,
    selectedItem,
    handleCloseDeleteModal,
    fileLoader
  } = props;
  const { t } = useTranslation('mydoc');
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box className="">
      <SimpleDialog
        model_title={
          <Box className="w-100 ">
            <Box className="d-flex flex-basic-space-between">
              <Box>
                <Typography variant="h3" className="mb-10 textweight">
                  {t('file')}
                </Typography>
              </Box>
              <Box className="flex-basic-space-between align-items-center">
                <Box className="fineModelClose">
                  <Tooltip title={t('closeTitle')} arrow>
                    <IconButton
                      aria-label="close"
                      onClick={handleCloseDeleteModal}
                      className="close-icon-modal "
                      disableRipple={true}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ backgroundColor: 'rgba(180, 181, 192, 0.5)' }} />
          </Box>
        }
        model_content={
          <Box
            className="fileModalContent"
            sx={{
              minWidth: smallDevice ? '' : '634px'
            }}
          >
            {fileLoader ? (
              <Box className="spinnerWrapper flex-basic-center mt-100 ">
                <Box className="spinnerLoading "></Box>
              </Box>
            ) : (
              <Box className="d-flex flex-wrap fileList fileAttachment  cursorPointer mt-18 ml-18">
                {files?.map((item: FilePreviewType, index: number) => (
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
                  />
                ))}
              </Box>
            )}
          </Box>
        }
        open={open}
        modelSize={smallDevice ? 'sm' : 'md'}
      />
    </Box>
  );
};

export default ShowLimitedFileModal;
