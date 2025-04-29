import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuView from 'src/shared/components/menu/MenuView';
import { Tables } from 'src/shared/components/table/Tables';
import { currencyFormatter } from 'src/shared/constants/constants';
import { customInternationDate } from 'src/shared/utils/utils';
import { EnforcementTablePropsTypes } from '../model/fineTypes';
import EnforcementTaskModel from './EnforcementTaskModel';

const EnforcementTable = (props: EnforcementTablePropsTypes) => {
  //const
  const { t } = useTranslation('fines');
  const {
    getNextPagination,
    loader,
    pager,
    tableListData,
    setDirectionOnChangeSort
  } = props;

  //state varibles
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedID, setSelectedID] = useState(false);
  const [tableActions] = useState([
    {
      id: 0,
      label: t('moreInfo'),
      icon: <Box className="icon-info iconStyle" />
    }
  ]);

  const open = Boolean(anchorEl);

  //methods
  const handleCloseModel = () => {
    setOpenModel(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedID(index);
  };

  const onMenuClick = (index) => {
    setOpenModel(true);
    handleClose();
  };

  const toggleSortDirection = () => {
    const idColumnHeader = document.querySelector('.fineAmount[aria-sort]');
    const ariaSortVal = idColumnHeader.getAttribute('aria-sort');
    setDirectionOnChangeSort(ariaSortVal);
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
      field: 'agency',
      headerName: t('agency'),
      sortable: false,
      type: 'string',
      flex: 0.8,
      hideSortIcons: false
    },
    {
      field: 'description',
      headerName: t('description'),
      sortable: false,
      type: 'string',
      flex: 1.8
    },
    {
      field: 'fineAmount',
      sortable: true,
      type: 'number',
      headerClassName: 'fineAmount',
      flex: 1.4,
      cellClassName: 'fineAmount',
      renderHeader: (prams) => {
        return (
          <Box className="d-flex align-items-center mb-3 tableSortIcon">
            <Typography variant="body2" className="textweight">
              {t('estFineAmount')}
            </Typography>
            <Box
              onClick={toggleSortDirection}
              className="flex-column-start p-relative"
            >
              <Box className="arrowUpDown ml-7"></Box>
            </Box>
          </Box>
        );
      },
      renderCell: (index) => {
        return (
          <Box className=" flex-column-star align-items-start">
            <Box>
              {index?.row?.fineAmount !== 'NA'
                ? currencyFormatter(index?.row?.fineAmount)
                : 'NA'}
            </Box>
          </Box>
        );
      }
    },
    {
      field: 'date',
      headerName: t('date'),
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return <Box>{customInternationDate(index?.row?.date)}</Box>;
      }
    },
    {
      field: 'sourceLink',
      headerName: t('sourceLink'),
      sortable: false,
      type: 'string',
      flex: 0.8,
      renderCell: (index) => {
        return (
          <Box className="icon-box">
            <Tooltip title={index?.row?.sourceLink} arrow>
              <Box
                className="icon-source-link font-24 cursorPointer"
                onClick={() => {
                  window.open(index?.row?.sourceLink, '_blank');
                }}
              ></Box>
            </Tooltip>
          </Box>
        );
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

      flex: 0.5
    }
  ];

  const handleSelectedItem = (event: React.MouseEvent<HTMLElement>, index) => {
    setSelectedRow(index);
  };

  return (
    <Box className="enforcementTableWrapper">
      <Tables
        rows={tableListData}
        className={'tenants-max-height'}
        columns={columns}
        pager={pager}
        checkboxSelection={false}
        hideFooters={true}
        getNextPaginationData={getNextPagination}
        loading={loader}
        rowHeight={30}
      />
      <EnforcementTaskModel
        handleClose={handleCloseModel}
        open={openModel}
        selectedRow={selectedRow}
      />
    </Box>
  );
};

export default EnforcementTable;
