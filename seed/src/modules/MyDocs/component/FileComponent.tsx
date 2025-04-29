import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteFileModal } from 'src/modules/ActionPlan/component/Files/DeleteFileModal';
import MenuView from 'src/shared/components/menu/MenuView';
import { customInternationDate, getTimeStamp } from 'src/shared/utils/utils';
import { MY_DOCS_CATEGORIES } from '../constants/constants';
import { TfileComponent } from '../model/myDocsTypes';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';

const FileComponent = (props: TfileComponent) => {
  const { t } = useTranslation('mydoc');
  const { actions } = useSelector((state: RootState) => state.myDocs);

  const {
    handleSelected,
    fileName,
    key,
    lastModifiedDate,
    name,
    uploadedAt,
    item,
    selectedItem,
    handleClose,
    handleDeleteFile,
    categoryName
  } = props;

  // options of file to download and delete
  let tableActions = [
    {
      id: 0,
      label: t('download'),
      icon: <Box className="icon-download iconStyle" />
    }
  ];

  if (actions.includes('delete-file')) {
    tableActions.push({
      id: 1,
      label: t('delete'),
      icon: <Box className="icon-trash iconStyle" />
    });
  }
  //removing delete action for gap analysis category
  if (categoryName === MY_DOCS_CATEGORIES.gapAnalysisPolicies) {
    let index = tableActions.findIndex((obj) => obj.id === 1);

    if (index !== -1) {
      tableActions.splice(index, 1);
    }
  }

  // states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = true;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  // close the modal menus
  const handleCloseMenu = () => {
    setAnchorEl(null);
    handleClose();
  };
  // open delete modal when use clicks on delete option
  const handleDeleteModalOpen = () => {
    setOpenDeleteModal(true);
  };

  // close the delete modal
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  // check if file is deleted and close the modal
  const handleDeleteModal = () => {
    const checkIFFileDeletedSuccesful = handleDeleteFile(selectedItem);
    if (checkIFFileDeletedSuccesful) {
      handleCloseMenu();
    }
  };

  //check if file is download
  const handleFileDownload = () => {
    window.open(selectedItem?.downloadUrl, '_blank');
    handleCloseMenu();
  };
  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        handleFileDownload();
        return;
      case 1:
        handleDeleteModalOpen();
        return;
      default:
        return;
    }
  };

  const handleActionsSelected = (
    event: React.MouseEvent<HTMLElement>,
    item
  ) => {
    setAnchorEl(event.currentTarget);
    handleSelected(item);
    event.stopPropagation();
  };

  return (
    <Box
      sx={{ pl: 3, py: 1, width: '200px' }}
      className="fileBox mb-10 mr-10 p-relative "
      key={key}
    >
      <Box
        className="p-absolute"
        sx={{ right: 8, top: 12 }}
        onClick={(e) => {
          handleActionsSelected(e, item);
        }}
      >
        <MoreVertOutlinedIcon fontSize="small" />
      </Box>
      <MenuView
        isOpen={selectedItem?.id && selectedItem?.id === item.id}
        menuItemList={tableActions}
        handleClose={handleCloseMenu}
        onMenuClick={onMenuClick}
        anchorEl={anchorEl}
      />
      <Box>
        {name?.length >= 12 || fileName?.length >= 12 ? (
          <Tooltip title={name || fileName}>
            <Box className="text-font-12 textsemiWeight textPrimaryColor text-ellipsis fileNameWidth w-75">
              {name || fileName}
            </Box>
          </Tooltip>
        ) : (
          <Box className="text-font-12 textsemiWeight textPrimaryColor text-ellipsis fileNameWidth w-75">
            {name || fileName}
          </Box>
        )}
      </Box>

      <Box className="text-font-12">
        {customInternationDate(lastModifiedDate || uploadedAt)},
        {getTimeStamp(lastModifiedDate || uploadedAt)}
      </Box>

      <DeleteFileModal
        selectedItem={selectedItem}
        open={openDeleteModal}
        handleDelete={handleDeleteModal}
        handleClose={handleDeleteModalClose}
        subText={t('removeFileDesc', { ns: 'english' })}
        modalTitle={`${t('removeFile', { ns: 'english' })}`}
        btnPrimaryText={t('removeBtnText', { ns: 'english' })}
      />
    </Box>
  );
};

export default FileComponent;
