import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  Button,
  SingleOrMultipleUpload,
  Typography
} from 'src/shared/components/index';
import { FilePreviewType } from 'src/shared/components/upload/services/singleOrMultipleUploadInterface';
import { ACCEPTABLE_FILE_FORMAT } from 'src/modules/ActionPlan/component/utils';
import { useTranslation } from 'react-i18next';
import { customInternationDate, getTimeStamp } from 'src/shared/utils/utils';
import { DeleteFileModal } from 'src/modules/ActionPlan/component/Files/DeleteFileModal';

interface UploadProps {
  isMultipleUpload: boolean;
  taskDetails?: any;
  files?: any;
  getNewFilesData?: (file) => void;
  handleDeleteFiles?: (item1, item2, index) => void;
  uploadeFiles?: (file) => void;
}

const Upload = ({
  isMultipleUpload,
  taskDetails,
  files,
  getNewFilesData,
  uploadeFiles,
  handleDeleteFiles
}: UploadProps) => {
  //const
  const { t } = useTranslation('english');

  // State Variables
  const [previousFiles, setPreviousFiles] = useState([] as FilePreviewType[]);
  const [openDeletedModal, setDeleteModal] = useState<boolean>();
  const [itemDetail, setItemDetail] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();

  // Methods
  const handleSelected = (taskDetail, item, index) => {
    setSelectedItem(item);
    setDeleteModal(true);
    setItemDetail({ taskDetail, item, index });
  };

  const setSingleData = (data:FilePreviewType) => {
    getNewFilesData([data])
  };

  const setMultipleData = (
    newFiles: FilePreviewType[],
    oldFiles: FilePreviewType[]
  ) => {
    setPreviousFiles(oldFiles);
    getNewFilesData([...newFiles, ...oldFiles]);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleDelete = () => {
    handleDeleteFiles(
      itemDetail?.taskDetail,
      itemDetail?.item,
      itemDetail?.index
    );
    handleClose();
  };

  return (
    <>
      <Box sx={{ my: 3 }}>
        <SingleOrMultipleUpload
          isMultiple={isMultipleUpload}
          acceptedFileFormat={ACCEPTABLE_FILE_FORMAT}
          uploadedFiles={previousFiles}
          maxFileSize={100000000}
          setMultipleData={setMultipleData}
          setSingleData={setSingleData}
        >
          <Box className="fileUploadContainer cursorPointer">
            <Box sx={{ p: 2 }} className="flex-basic-start">
              <Button
                onClick={() => {}}
                variant="outlined"
                btnText="Click to upload file"
                sx={{ py: '0.62rem', px: '2rem' }}
              />
              <Typography sx={{ ml: 4 }} variant="body2">
                {t('supportFilesTypes')}
              </Typography>
            </Box>
          </Box>
        </SingleOrMultipleUpload>
      </Box>

      <Box sx={{ mt: 4 }}>
        {files?.length > 0 ? (
          <Box className="d-flex flex-wrap">
            {files?.map((item: FilePreviewType, index: number) => (
              <Box
                sx={{ pl: 3, py: 3, pr: 10 }}
                className="fileBox mb-10 mr-10 p-relative"
                key={index}
              >
                <Box
                  className="p-absolute"
                  sx={{ right: 8, top: 12 }}
                  onClick={() => {
                    handleSelected(taskDetails, item, index);
                  }}
                >
                  <span className="icon-close textWeightMedium cursorPointer" />
                </Box>
                <Box className="text-font-12 textsemiWeight textPrimaryColor text-ellipsis fileNameWidth">
                  {item?.name || item?.fileName}
                </Box>
                <Box className="text-font-12">
                  {customInternationDate(
                    item?.lastModifiedDate || item?.uploadedAt
                  )}
                  ,{getTimeStamp(item?.lastModifiedDate || item?.uploadedAt)}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box className="text-font-12">{t('noFileUploaded')}</Box>
        )}
      </Box>

      <DeleteFileModal
        selectedItem={selectedItem}
        open={openDeletedModal}
        handleDelete={handleDelete}
        handleClose={handleClose}
        subText={t('removeFileDesc', { ns: 'english' })}
        modalTitle={`${t('removeFile', { ns: 'english' })}`}
        btnPrimaryText={t('removeBtnText', { ns: 'english' })}
      />
    </>
  );
};

export default Upload;
