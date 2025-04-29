import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, Button, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuView from 'src/shared/components/menu/MenuView';
import { Tables } from 'src/shared/components/table/Tables';

const GapAnalysisList = ({
  setSelectedMoreInfo,
  gaplReportListData,
  isloader,
  isCustomButtom,
  handleSave,
  handleCancel,
  getNextPaginationData,
  pagerList
}) => {
  const { t } = useTranslation('reports');
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedID, setSelectedID] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  let tableActions = [
    {
      id: 0,
      label: t('moreInfo'),
      icon: <Box className="icon-info iconStyle" />
    }
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedID(index);
  };

  const onMenuClick = (index) => {
    handleClose();
    setSelectedMoreInfo(selectedRow);
  };

  const handleSelectedItem = (event: React.MouseEvent<HTMLElement>, index) => {
    setSelectedRow(index);
  };

  const columns: GridColDef[] = [
    {
      field: 'agency',
      headerName: t('agency'),
      sortable: false,
      type: 'string',
      flex: 1.25,
      renderCell: (index) => {
        return (
          <Box className="flex-basic-center">
            <Box className="">{index?.row?.agency}</Box>
          </Box>
        );
      }
    },
    {
      field: 'regulationName',
      headerName: t('regulation'),
      sortable: false,
      type: 'string',
      flex: 2,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.regulationName?.length >= 40 ? (
              <Tooltip title={index?.row?.regulationName}>
                <Box className="task">
                  <span>{index?.row?.regulationName || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="task">
                <span>{index?.row?.regulationName || '-'} </span>
              </Box>
            )}
          </>
        );
      }
    },
    {
      field: 'averyPolicy',
      headerName: t('averyPolicy'),
      sortable: false,
      type: 'string',
      flex: 1.25
    },
    {
      field: 'firmPolicy',
      headerName: t('firmPolicy'),
      sortable: false,
      type: 'string',
      flex: 1.25
    },
    {
      field: 'gapAnalysis',
      headerName: t('gapAnalysis'),
      sortable: false,
      type: 'string',
      flex: 1.25
    },
    {
      field: 'action',
      headerName: t('actions'),
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
                handleSelectedItem(e, index.row);
                handleClick(e, index.row.id);
              }}
              className="more-info-btn"
            >
              <MoreVertOutlinedIcon fontSize="small" />
            </Button>
            <MenuView
              isOpen={open && selectedID == index.row.id}
              menuItemList={tableActions}
              handleClose={handleClose}
              onMenuClick={onMenuClick}
              anchorEl={anchorEl}
            />
          </Box>
        );
      },

      flex: 0.75
    }
  ];
  return (
    <Box sx={{ mt: 6 }} className="">
      <Tables
        rows={gaplReportListData || []}
        className={'GapAssessmentList '}
        columns={columns}
        pager={pagerList || {}}
        checkboxSelection={false}
        hideFooters={true}
        getNextPaginationData={getNextPaginationData}
        loading={isloader}
        isCustomBottom={isCustomButtom}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default GapAnalysisList;
