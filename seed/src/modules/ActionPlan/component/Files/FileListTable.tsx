import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import MenuView from 'src/shared/components/menu/MenuView';
import { Tables } from 'src/shared/components/table/Tables';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { tableFilterData } from './fileModel';
import { useTranslation } from 'react-i18next';
import { customInternationDate } from 'src/shared/utils/utils';
import { DeleteFileModal } from './DeleteFileModal';

const ListView = (props: tableFilterData) => {
  //const
  const { t } = useTranslation(['task', 'englsih']);
  const {
    tableListData,
    pager,
    getNextPagination,
    loader,
    handleDeleteAttachment,
    actions
  } = props;

  //state varibles
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedRowId, setSelectedRowId] = useState('');
  const [openDeletedModal, setOpenDeletedModal] = useState<boolean>();

  let table = [
    {
      id: 0,
      label: t('download'),
      icon: <Box className="icon-download iconStyle" />
    }
  ];

  if (actions.includes('edit-task')) {
    table.push({
      id: 1,
      label: t('delete'),
      icon: <Box className="icon-trash iconStyle" />
    });
  }

  const tableActions = table;

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRowId('');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedRowId(index);
  };

  const downloadFile = () => {
    window.open(selectedRow?.link, '_blank');
  };

  const setOpenModal = () => {
    setOpenDeletedModal(true);
    handleClose();
  };

  const handleDelete = () => {
    handleDeleteAttachment(selectedRow);
    setOpenDeletedModal(false);
  };

  const setCloseModal = () => {
    setOpenDeletedModal(false);
  };

  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        downloadFile();
        return;
      case 1:
        setOpenModal();
        return;
      default:
        return;
    }
  };

  const columns: GridColDef[] = [
    {
      field: ' ',
      headerName: ' ',
      sortable: false,
      type: 'string',
      flex: 0.1
    },
    {
      field: 'fileName',
      headerName: t('fileNAME'),
      sortable: false,
      type: 'string',
      flex: 1.8
    },
    {
      field: 'uploadedAt',
      headerName: t('uploadedDate'),
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return <Box>{customInternationDate(index?.row?.uploadedAt)}</Box>;
      }
    },
    {
      field: 'uploadedBy',
      headerName: t('uploadedBY'),
      sortable: false,
      type: 'string',
      flex: 1
    },
    {
      field: 'taskName',
      headerName: t('taskname'),
      sortable: false,
      type: 'string',
      flex: 1.8,
      renderCell: (index) => {
        return <Box>{index.row.taskName ? index.row.taskName : '-'} </Box>;
      }
    },

    {
      field: 'action',
      headerName: t('action'),
      sortable: false,
      renderCell: (index) => {
        return (
          <Box className="d-flex justify-content-center">
            <Button
              sx={{ p: 1, minWidth: 0 }}
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => {
                setSelectedRow(index.row);
                handleClick(e, index.row.id);
              }}
              className="more-info-btn"
            >
              <MoreVertOutlinedIcon fontSize="small" />
            </Button>

            <MenuView
              isOpen={open && selectedRowId == index.row.id}
              menuItemList={tableActions}
              handleClose={handleClose}
              onMenuClick={onMenuClick}
              anchorEl={anchorEl}
            />
          </Box>
        );
      },

      flex: 1
    }
  ];

  return (
    <Box>
      <Tables
        rows={tableListData}
        className={'tenants-max-height tasktable'}
        columns={columns}
        pager={pager}
        checkboxSelection={false}
        hideFooters={true}
        getNextPaginationData={getNextPagination}
        loading={loader}
        rowHeight={30}
      />

      <DeleteFileModal
        selectedItem={selectedRow}
        open={openDeletedModal}
        handleDelete={handleDelete}
        handleClose={setCloseModal}
        subText={t('deleteFileMessage', { ns: 'english' })}
        modalTitle={`${t('deleteFile', { ns: 'english' })}`}
        btnPrimaryText={t('deleteBtnText', { ns: 'english' })}
      />
    </Box>
  );
};

export default ListView;
