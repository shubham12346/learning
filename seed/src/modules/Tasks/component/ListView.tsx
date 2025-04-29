import { Box, Button, Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import MenuView from 'src/shared/components/menu/MenuView';
import { Tables } from 'src/shared/components/table/Tables';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { tableFilterData } from '../model/taskModel';
import {
  StatusWiseClassSet,
  customInternationDate
} from 'src/shared/utils/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  GAP_ANALYSIS,
  REGULATION
} from 'src/modules/GapActionPlan/component/constants';
import { ExpandableTable } from 'src/shared/components/expandableTable/ExpandableTable';
import { ExpandableTableColumn } from 'src/shared/components/expandableTable/services/expandableTableInterface';

const ListView = (props: tableFilterData) => {
  //const
  const { t } = useTranslation('task');
  const {
    tableListData,
    pager,
    getNextPagination,
    loader,
    actions,
    deleteSingelTask,
    view
  } = props;

  //state varibles
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedRowId, setSelectedRowId] = useState('');
  const navigate = useNavigate();

  let table = [
    {
      id: 0,
      label: t('moreinfo'),
      icon: <Box className="icon-info iconStyle" />
    }
  ];

  if (actions.includes('edit-tasks')) {
    table.push({
      id: 1,
      label: t('edit'),
      icon: <Box className="icon-edit iconStyle" />
    });
  }
  if (actions.includes('edit-tasks')) {
    table.push({
      id: 2,
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
    setAnchorEl(event.currentTarget);
    setSelectedRowId(index);
  };

  const callDeleteModal = () => {
    deleteSingelTask(selectedRow);
    handleClose();
  };
  const onMenuClick = (index) => {
    const taskId =
      selectedRow.taskType === GAP_ANALYSIS
        ? selectedRow.taskId
        : selectedRow?.id;
    const queryParams = new URLSearchParams({
      taskType: selectedRow?.taskType,
      regulation: selectedRow?.regulation,
      gapId: selectedRow?.gapAssessmentId,
      taskOccurrenceId: selectedRow?.taskOccurrenceId,
      isCalendarView: view === 'Calender' ? 'true' : 'false'
    }).toString();
    switch (index) {
      case 0:
        navigate(`/avery/tasks/${taskId}?${queryParams}`);
        return;
      case 1:
        navigate(`/avery/tasks/edit/${taskId}?${queryParams}`);
        return;
      case 2:
        callDeleteModal();
        return;
      default:
        return;
    }
  };

  const tableColumns: ExpandableTableColumn[] = [
    {
      field: 'agency',
      headerName: t('agency'),
      minWidth: 140,
      sortable: false
    },
    {
      field: 'regulation',
      headerName: t('regulation'),
      minWidth: 180,
      sortable: false
    },
    {
      field: 'taskTitle',
      headerName: t('taskname'),
      minWidth: 240,
      sortable: false
    }
  ];

  // Column definitions for nested table
  const nestedColumns: ExpandableTableColumn[] = [
    {
      field: ' ',
      headerName: ' ',
      width: 50
    },
    {
      field: 'taskname',
      headerName: t('taskname'),
      width: 220
    },
    {
      field: 'owner',
      headerName: t('owner'),
      width: 130
    },
    {
      field: 'status',
      headerName: t('status'),
      width: 120,
      renderCell: (index) => (
        <Box>
          <Chip
            label={index.row?.status}
            size="small"
            color="default"
            className={`chip-status ${StatusWiseClassSet[index.row?.status]}`}
            variant="outlined"
          />
        </Box>
      )
    },
    {
      field: 'taskCadence',
      headerName: t('cadence'),
      width: 120
    },
    {
      field: 'targetdate',
      headerName: t('targetdate'),
      width: 130,
      renderCell: (index) => (
        <Box>{customInternationDate(index?.row?.targetdate)}</Box>
      )
    },
    {
      field: 'action',
      headerName: t('action'),
      width: 80,
      renderCell: (index) => (
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
      )
    }
  ];

  const getNestedRows = (parentRow) => {
    return tableListData?.nestedRowsMap[parentRow.id] || [];
  };

  return (
    <Box>
      <ExpandableTable
        rows={tableListData?.mainRows || []}
        columns={tableColumns}
        nestedColumns={nestedColumns}
        getNestedRows={getNestedRows}
        className="user-management-table"
        getNextPaginationData={getNextPagination}
        pager={pager}
        loading={loader}
        rowHeight={60}
        isHidePagination={true}
        isCustomBottom={false}
        rowId="id"
      />
    </Box>
  );
};

export default ListView;
