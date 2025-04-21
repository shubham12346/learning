import { Box, Button, Chip } from '@mui/material';
import React, { useState } from 'react';
import MenuView from 'src/shared/components/menu/MenuView';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
  StatusWiseClassSet,
  customInternationDate
} from 'src/shared/utils/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GAP_ANALYSIS,
  REGULATION
} from 'src/modules/GapActionPlan/component/constants';
import { ExpandableTable } from 'src/shared/components/expandableTable/ExpandableTable';
import { ExpandableTableColumn } from 'src/shared/components/expandableTable/services/expandableTableInterface';
import { tableFilterData } from 'src/modules/Tasks/model/taskModel';
import { getRegulationPath, REGULATION_PATH } from '../Utils';
import DiscardModal from 'src/modules/common/component/DiscardModel';
import { deleteTask } from 'src/modules/ActionPlan/api/actionplanApi';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';

const RegulationTable = (props: tableFilterData) => {
  //const
  let { regId, actionId } = useParams();
  console.log('regId', regId, 'actionId', actionId);
  const { t } = useTranslation('regulations');
  const {
    tableListData,
    pager,
    getNextPagination,
    loader,
    actions,
    deleteSingelTask,
    view,
    regulationInfo
  } = props;

  //state varibles
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedRowId, setSelectedRowId] = useState('');
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  console.log('regulationInfo', regulationInfo);

  let table = [
    {
      id: 0,
      label: t('moreInfo'),
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

  const handleActionModalClose = () => {
    setAnchorEl(null);
    setSelectedRowId('');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(index);
  };

  const onMenuClick = (index) => {
    console.log('selectedRow', selectedRow);
    switch (index) {
      case 0:
        goToViewTask(selectedRow);
        return;
      case 1:
        goToEditTask(selectedRow);
        return;
      case 2:
        handleDeleteClose();
        return;
      default:
        return;
    }
  };

  const goToViewTask = (selectedTaskItem) => {
    console.log('selectedTaskItem', selectedTaskItem);
    const taskType = selectedTaskItem?.taskType;
    let query = '';
    if (taskType === GAP_ANALYSIS) {
      let gapId = selectedTaskItem?.gapAssessmentId;
      query = `taskId=${selectedTaskItem.taskId}&agency=${regulationInfo?.regulatoryBody}&regulation=${regulationInfo?.regulationName}&taskType=${taskType}&gapId=${selectedTaskItem.gapAssessmentId}&&taskOccurrenceId${selectedTaskItem.id}`;
    } else {
      query = `taskUid=${selectedTaskItem.taskUid}&&taskDisplayId=${selectedTaskItem.status}&taskType=${selectedTaskItem.taskType}&&taskOccurrenceId=${selectedTaskItem.id}`;
    }
    const path = getRegulationPath(
      REGULATION_PATH.VIEWTASK,
      { regId, actionId },
      query
    );
    navigate(path);
  };
  const goToEditTask = (selectedTaskItem) => {
    const taskType = selectedTaskItem?.taskType;
    let query = '';
    if (taskType === GAP_ANALYSIS) {
      query = `taskId=${selectedTaskItem.taskId}&agency=${regulationInfo?.regulatoryBody}&regulation=${regulationInfo?.regulationName}&taskType=${taskType}&gapId=${selectedTaskItem.gapAssessmentId}`;
    } else {
      query = `taskUid=${selectedTaskItem.taskUid}&taskDisplayId=${selectedTaskItem.taskDisplayId}&taskType=${taskType}&&taskOccurrenceId=${selectedTaskItem.id}`;
    }
    const path = getRegulationPath(
      REGULATION_PATH.EDIT_TASK,
      { regId, actionId },
      query
    );
    navigate(path);
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
      field: 'owner',
      headerName: t('owner'),
      width: 160
    },
    {
      field: 'status',
      headerName: t('status'),
      width: 140,
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
      width: 140
    },
    {
      field: 'targetdate',
      headerName: t('targetdate'),
      width: 160,
      renderCell: (index) => (
        <Box>{customInternationDate(index?.row?.targetdate)}</Box>
      )
    },
    {
      field: 'action',
      headerName: t('action'),
      width: 100,
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
            handleClose={handleActionModalClose}
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

  const handleDeleteClose = () => {
    setDeleteModal((prev) => !prev);
  };

  const taskEditForAllInstances = () => {
    if (selectedRow?.taskType === GAP_ANALYSIS) {
      deleteGapTask();
    } else {
      deleteRegulationTask(true);
    }
    handleActionModalClose();
  };

  const taskEditForSingleInstance = () => {
    if (selectedRow?.taskType === GAP_ANALYSIS) {
      deleteGapTask();
    } else {
      deleteRegulationTask(true);
    }
    handleActionModalClose();
  };

  const deleteRegulationTask = async (deleteAllInstance) => {
    try {
      const respData = await deleteTask(
        actionPlanVersionUid,
        selectedItem?.taskUid,
        deleteAllInstance
      );
      if (respData?.message == t('taskDeletedSuccess')) {
        handleActionModalClose();
        showSuccessMessage(respData?.message, '', {
          position: 'top-right'
        });
      }
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
    } finally {
      handleDeleteClose();
    }
  };

  const deleteGapTask = async () => {
    try {
      const respData = await deleteTask(
        actionPlanVersionUid,
        selectedItem?.taskUid,
        deleteAllInstance
      );
      if (respData?.message == t('taskDeletedSuccess')) {
        handleActionModalClose();
        showSuccessMessage(respData?.message, '', {
          position: 'top-right'
        });
      }
    } catch (error) {
      showErrorMessage(error.response.data.cause, {
        position: 'top-right'
      });
    }
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
        isHidePagination={false}
        isCustomBottom={false}
        rowId="id"
        disableScroll
      />
      <DiscardModal
        handleLeavePage={taskEditForSingleInstance}
        handleStayPage={taskEditForAllInstances}
        open={deleteModal}
        text={
          selectedRow?.taskType === GAP_ANALYSIS
            ? {
                acceptTitle: t('yes'),
                discardTitle: t('no'),
                description: t('deleteDesc'),
                title: t('deleteTitle')
              }
            : {
                acceptTitle: t('yes'),
                discardTitle: t('no'),
                description: t('editForAllDesc'),
                title: t('editForAllTitle')
              }
        }
        handleClose={handleDeleteClose}
        showCloseButton={selectedRow?.taskType === REGULATION}
      />
    </Box>
  );
};

export default RegulationTable;
