import { useState } from 'react';
import { Box, Button } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { GridColDef } from '@mui/x-data-grid';
import MenuView from 'src/shared/components/menu/MenuView';
import { Tables } from 'src/shared/components/table/Tables';

const GapTable = ({ tableList, pager, tableLoader, getNextPagination }) => {
  //state variables
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedRowId, setSelectedRowId] = useState('');

  let table = [
    {
      id: 0,
      label: 'View Analysis',
      icon: <Box className="icon-eye-open iconStyle" />
    }
  ];

  const tableActions = table;

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRowId('');
    setSelectedRow('');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index) => {
    // setAnchorEl(event.currentTarget);
    // setSelectedRowId(index);
  };

  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        //TODO : to navigate to view analysis of policies
        // navigate(
        //   `/avery/regulations/gapassessment/viewdetails/${selectedRow?.gapAssessmentId}`
        // );
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
      flex: 0.2
    },
    {
      field: 'agency',
      headerName: 'AGENCY',
      sortable: false,
      type: 'string',
      flex: 0.8
    },
    {
      field: 'regulationName',
      headerName: 'REGULATION',
      sortable: false,
      type: 'string',
      flex: 2.9
    },
    {
      field: 'version',
      headerName: 'VERSION',
      sortable: false,
      type: 'string',
      flex: 0.7
    },
    {
      field: 'dateOfAnalysis',
      headerName: 'DATE OF ANALYSIS',
      sortable: false,
      type: 'string',
      flex: 0.9
    },

    {
      field: 'gapStatus',
      headerName: 'GAP ANALYSIS',
      sortable: false,
      type: 'string',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'ACTIONS',
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
        rows={tableList || []}
        className={'tenants-max-height tasktable'}
        columns={columns}
        pager={pager}
        checkboxSelection={false}
        hideFooters={true}
        getNextPaginationData={getNextPagination}
        loading={tableLoader}
        rowHeight={30}
        rowId="businessRegulationPolicyId"
      />
    </Box>
  );
};

export default GapTable;
