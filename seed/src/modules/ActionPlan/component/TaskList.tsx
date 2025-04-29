import { Box, Button, Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Tables } from 'src/shared/components/table/Tables';
import { useTranslation } from 'react-i18next';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
  StatusWiseClassSet,
  customInternationDate
} from 'src/shared/utils/utils';
import MenuView from 'src/shared/components/menu/MenuView';
import React from 'react';
import { DeleteTaskModal } from './DeleteTaskModal';

interface TaskListProps {
  taskListData: any;
  pagerData: any;
  actionPlanVersionUid?: string;
  goToViewTask: (selectedTaskItem) => void;
  goToEditTask: (selectedTaskItem) => void;
  getUpdatedActionPlanDetails?: () => void;
  actions: string[];
  taskListLoader?: boolean;
}

const TaskList = ({
  actions,
  pagerData,
  taskListData,
  actionPlanVersionUid,
  goToViewTask,
  goToEditTask,
  getUpdatedActionPlanDetails,
  taskListLoader
}: TaskListProps) => {
  //Constants
  const { t } = useTranslation('english');

  //state variables
  const [selectedTaskItem, setSelectedTaskItem] = React.useState<any>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = React.useState(false);
  const open = Boolean(anchorEl);

  //methods
  const handleClick = (event: React.MouseEvent<HTMLElement>, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskItem(rowData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewTaskDetails = () => {
    goToViewTask(selectedTaskItem);
  };

  const editTaskDetails = () => {
    goToEditTask(selectedTaskItem);
  };

  let table = [
    {
      id: 0,
      label: t('tenants.table.moreInfo'),
      icon: <Box className="icon-info iconStyle" />
    }
  ];

  if (actions.includes('edit-task')) {
    table.push({
      id: 1,
      label: t('tenants.table.edit'),
      icon: <Box className="icon-edit iconStyle" />
    });
  }
  if (actions.includes('delete-task')) {
    table.push({
      id: 2,
      label: t('tenants.table.delete'),
      icon: <Box className="icon-trash iconStyle" />
    });
  }
  const tableActions = table;

  const handleTaskDeleteModalClose = () => {
    setShowDeleteTaskModal(false);
    setAnchorEl(null);
  };

  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        viewTaskDetails();
        return;
      case 1:
        editTaskDetails();
        return;
      case 2:
        setShowDeleteTaskModal(true);
        return;
      default:
        return;
    }
  };

  const columns: GridColDef[] = [
    {
      field: ' ',
      headerName: '',
      sortable: false,
      type: 'string',
      flex: 0.1
    },
    {
      field: 'taskId',
      headerName: 'OWNER',
      sortable: false,
      type: 'string',
      flex: 1.35,
      renderCell: (index) => {
        return (
          <Box className="task" sx={{ height: '50px' }}>
            {index?.row?.owner?.userName}
          </Box>
        );
      }
    },
    {
      field: 'taskName',
      headerName: 'OBLIGATION NAME',
      sortable: false,
      type: 'string',
      flex: 3.25,
      headerClassName: 'cellMinWidthTaskName',
      cellClassName: 'taskName',
      renderCell: (index) => {
        return (
          <Box className="task" sx={{ height: '50px' }}>
            {index?.row?.taskName}
          </Box>
        );
      }
    },
    {
      field: 'taskUid',
      headerName: 'STATUS',
      sortable: false,
      type: 'string',
      flex: 1.2,
      renderCell: (index) => {
        return (
          <Box>
            <Chip
              label={index?.row?.taskStatus?.displayName}
              size="small"
              color={'default'}
              className={`chip-status ${
                StatusWiseClassSet[index?.row?.taskStatus?.displayName]
              } `}
              variant="outlined"
            />
          </Box>
        );
      }
    },
    {
      field: 'cadence',
      headerName: 'CADENCE',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <Box className="task" sx={{ height: '50px' }}>
            {index?.row?.taskCadence?.displayName}
          </Box>
        );
      }
    },
    {
      field: 'taskEnforcementDate',
      headerName: 'TARGET DATE',
      sortable: false,
      type: 'string',
      flex: 1.35,
      renderCell: (index) => {
        return <Box>{customInternationDate(index?.row?.targetDate)}</Box>;
      }
    },
    {
      field: 'ACTIONS',
      sortable: false,
      renderCell: (index) => {
        return (
          <Box>
            <Button
              sx={{ p: 1, minWidth: 0 }}
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => {
                handleClick(e, index?.row);
              }}
              className="more-info-btn"
            >
              <MoreVertOutlinedIcon fontSize="small" />
            </Button>
            <MenuView
              isOpen={open && selectedTaskItem?.id == index?.row?.id}
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

  const dynamicHeightTableRow = Math.min(taskListData?.length * 76 + 10, 80);
  // class name for action plan table will delete  this comment it after testing taskListTable
  return (
    <>
      <Box sx={{ mt: 1, mb: 8 }}>
        <Tables
          rows={taskListData || []}
          rowHeight={dynamicHeightTableRow}
          className={''}
          columns={columns}
          pager={pagerData}
          checkboxSelection={false}
          hideFooters={true}
          getNextPaginationData={''}
          loading={taskListLoader}
          isHidePagination={false}
        />
      </Box>
      <DeleteTaskModal
        selectedItem={selectedTaskItem}
        open={showDeleteTaskModal}
        actionPlanVersionUid={actionPlanVersionUid}
        handleClose={handleTaskDeleteModalClose}
        modalTitle={`${t('deleteTaskTitle')}`}
        getUpdatedActionPlanDetails={getUpdatedActionPlanDetails}
      />
    </>
  );
};

export default TaskList;
