import Typography from 'src/shared/components/typography/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Button, SimpleDialog } from 'src/shared/components/index';
import Upload from 'src/modules/common/customUpload/Upload';
import { useEffect, useState } from 'react';
import { deleteAttachmentForATask } from '../../api/actionplanApi';

interface DeleteTaskModalProps {
  handleClose: () => void;
  uploadedFiles: (e) => void;
  modalTitle?: string;
  open?: boolean;
}

export const UploadFileModel = ({
  handleClose,
  uploadedFiles,
  modalTitle,
  open
}: DeleteTaskModalProps) => {
  //constant
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  //sate variables
  const [files, setFiles] = useState([] as any[]);

  //useEffects
  useEffect(() => {
    setFiles([]);
  }, [open]);

  // Methods

  const attachedFiles = async (file: any) => {
    setFiles([...files, ...file]);
  };

  const getNewFilesData = (data: any) => {
    attachedFiles(data);
  };

  const closeModal = () => {
    setFiles([]);
    handleClose();
  };

  // delete attachment for a file
  const handleDeleteAttachment = async (taskDetails, item) => {
    if (item?.key) {
      try {
        let payload = {
          keys: [item?.key]
        };
        await deleteAttachmentForATask(taskDetails?.taskUid, payload);
      } catch (error) {
        let updatedFiles = files?.filter(
          (attachment) => attachment?.name !== item?.name
        );
        setFiles(updatedFiles);
      }
    } else {
      let updatedFiles = files?.filter(
        (attachment) => attachment?.name !== item?.name
      );
      setFiles(updatedFiles);
    }
  };

  const handleDeleteFiles = (taskDetail, item) => {
    handleDeleteAttachment(taskDetail, item);
  };

  return (
    <>
      <SimpleDialog
        model_title={
          <Box sx={{ mb: '1.25rem' }} className="w-100">
            <Box className="textalign">
              <Typography variant="h3" className="textweight">
                {modalTitle}
              </Typography>
            </Box>
          </Box>
        }
        model_content={
          <Box
            sx={{
              px: 8,
              pb: 8,
              minWidth: smallDevice ? '360px' : '670px'
            }}
            className="flex-basic-start fileAttachment "
          >
            <Box sx={{ mb: 4 }} className="browseFile w-100">
              <Upload
                files={files}
                isMultipleUpload={true}
                handleDeleteFiles={handleDeleteFiles}
                getNewFilesData={getNewFilesData}
              />
            </Box>
          </Box>
        }
        model_actions={
          <Box className="flex-basic-center w-100 mt-20">
            <Button
              onClick={closeModal}
              variant="outlined"
              btnText="Cancel"
              sx={{ py: '0.62rem', px: '2rem' }}
            />

            <Button
              onClick={() => {
                uploadedFiles(files);
              }}
              variant="contained"
              disabled={files?.length === 0}
              btnText="Upload File"
              sx={{ py: '0.62rem', px: '2rem', ml: 6 }}
            />
          </Box>
        }
        open={open}
        modelSize={smallDevice ? 'sm' : 'md'}
      ></SimpleDialog>
    </>
  );
};
