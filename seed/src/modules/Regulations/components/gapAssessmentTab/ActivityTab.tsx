import { Box, Button, Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import MenuView from 'src/shared/components/menu/MenuView';
import { Tables } from 'src/shared/components/table/Tables';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { StatusWiseClassSet } from 'src/shared/utils/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ActivityTab = (props) => {
  //const
  const { t } = useTranslation('regulations');
  const { tableListData, pager, getNextPagination, loader } = props;

  //state varibles
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedRowId, setSelectedRowId] = useState('');
  const [isDisabled, setIsDisabled] = useState(null);
  const navigate = useNavigate();

  let table = [
    {
      id: 0,
      label: t('gapAssessmentTab.viewDetails'),
      icon: <Box className="icon-info iconStyle" />
    },
    {
      id: 1,
      label: t('gapAssessmentTab.viewActionPlan'),
      icon: <Box className="icon-eye-open iconStyle" />
    }
    //Todo - for edit activity
    // {
    //   id: 2,
    //   label: 'Edit Name',
    //   icon: <Box className="icon-edit iconStyle" />
    // }
  ];

  const tableActions = table;

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRowId('');
    setSelectedRow('');
    setIsDisabled(null);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    index,
    rowIsDisabled
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(index);
    setIsDisabled(rowIsDisabled);
  };

  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        navigate(`/avery/regulations/gapassessment/viewdetails/${selectedRow?.gapAssessmentId}`);
        return;
      case 1:
        navigate(
          `/avery/regulations/gapActionPlan?gapId=${selectedRow?.gapAssessmentId}`
        );
        return;
      case 2:
        //open edit modal to edit name TODO
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
      field: 'createdAt',
      headerName: t('gapAssessmentTab.dateTime'),
      sortable: false,
      type: 'string',
      flex: 1.3
      //TODO
      //   renderCell: (index) => {
      //     return <Box>{customInternationDate(index?.row?.targetdate)}</Box>;
      //   }
    },
    {
      field: 'activityName',
      headerName: t('gapAssessmentTab.assessmentName'),
      sortable: false,
      type: 'string',
      flex: 2
    },
    {
      field: 'regulatoryOrganizationName',
      headerName: t('gapAssessmentTab.agency'),
      sortable: false,
      type: 'string',
      valueGetter: (params) =>
        params?.row?.regulatoryOrganizationName.join(', '),
      flex: 0.9
    },
    {
      field: 'policyCount',
      headerName: t('gapAssessmentTab.noOfPolicies'),
      sortable: false,
      type: 'string',
      flex: 0.9
    },
    {
      field: 'assessmentStatus',
      headerName: t('gapAssessmentTab.gapAnalysisPolicies'),
      sortable: false,
      type: 'string',
      flex: 1.2,
      renderCell: (index) => {
        return (
          <Box>
            <Chip
              label={index.row?.assessmentStatus}
              size="small"
              color={'default'}
              className={`chip-status 
                     ${StatusWiseClassSet[index.row?.assessmentStatus]}`}
              variant="outlined"
            />
          </Box>
        );
      }
    },
    {
      field: 'action',
      headerName: t('gapAssessmentTab.actions'),
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
                handleClick(e, index.row.id, index.row.isDisabled);
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
              isDisabled={isDisabled}
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
        rowId="gapAssessmentId"
      />
    </Box>
  );
};

export default ActivityTab;
