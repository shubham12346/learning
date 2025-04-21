import { Box, Button } from '@mui/material';
import { Tables } from 'src/shared/components/table/Tables';
import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { customInternationDate } from 'src/shared/utils/utils';
import MenuView from 'src/shared/components/menu/MenuView';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { getlistOfGeneartedReportList } from '../../api/reportsApi';

const AuditGeneratedReportList = () => {
  const { t } = useTranslation('reports');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>();
  const [allReportsList, setAllReportList] = useState<any>([]);
  const [pager, setPager] = useState<any>({
    limit: 15,
    currentPage: 1,
    startIndex: 0,
    totalItems: 0,
    totalPages: 0
  });
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [selectedID, setselectedID] = useState('');
  const [selectedRow, setSelectedRow] = useState<any>();

  const [tableActions, setTableActions] = useState([
    {
      id: 0,
      label: t('download'),
      icon: <Box className="icon-download iconStyle" />
    }
  ]);

  //useEffect

  useEffect(() => {
    setIsLoader(true);
    fetchAllGeneratedReportsList({ page: 1, limit: 15 });
  }, []);

  // fetch all generated reports list
  const fetchAllGeneratedReportsList = async (params) => {
    const res = await getlistOfGeneartedReportList(params);
    setAllReportList(res.reports);
    setPager(res.pager);
    setIsLoader(false);
  };

  // fetch next page details
  const getNextPaginationData = (nextPage) => {
    setIsLoader(true);
    let payLoad = {
      page: nextPage.currentPage || 1,
      limit: nextPage.limit || 15
    };
    fetchAllGeneratedReportsList(payLoad);
  };

  //methods
  const handleSelectedItem = (e, selectedIndex) => {
    setOpen(true);
    setSelectedRow(selectedIndex);
  };

  const handleDownload = () => {
    window.open(selectedRow?.downloadUrl, '_blank');
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setselectedID('');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index) => {
    setAnchorEl(event.currentTarget);
    setselectedID(index);
  };

  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        handleDownload();
        return;
      case 1:
        return;
      default:
        return;
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'createdAt',
      headerName: 'CREATED DATE',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <Box className="flex-basic-center">
            <Box className="">
              {customInternationDate(index?.row?.createdAt) || '-'}
            </Box>
          </Box>
        );
      }
    },
    {
      field: 'fileName',
      headerName: t('reportTitle'),
      sortable: false,
      type: 'string',
      flex: 1.55
    },
    {
      field: 'userName',
      headerName: t('createdBy'),
      sortable: false,
      type: 'string',
      flex: 1.55
    },
    {
      field: 'startDate',
      headerName: t('startDate'),
      sortable: false,
      type: 'string',
      flex: 1.3,
      renderCell: (index) => {
        return (
          <Box className="flex-basic-center">
            <Box className="">
              {index?.row?.startDate === null
                ? '-'
                : customInternationDate(index?.row?.startDate)}
            </Box>
          </Box>
        );
      }
    },
    {
      field: 'endDate',
      headerName: t('endDate'),
      sortable: false,
      type: 'string',
      flex: 1.3,
      renderCell: (index) => {
        return (
          <Box className="flex-basic-center">
            <Box className="">
              {index?.row?.endDate === null
                ? '-'
                : customInternationDate(index?.row?.endDate)}
            </Box>
          </Box>
        );
      }
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

      flex: 1
    }
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Tables
        rows={allReportsList || []}
        className={'GapAssessmentList'}
        columns={columns}
        pager={pager}
        checkboxSelection={false}
        hideFooters={true}
        getNextPaginationData={getNextPaginationData || []}
        loading={isLoader}
      />
    </Box>
  );
};

export default AuditGeneratedReportList;
