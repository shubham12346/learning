import { useMemo, useState } from 'react';
import { Box, Button, Chip, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { useTranslation } from 'react-i18next';
import MenuView from 'src/shared/components/menu/MenuView';
import {
  customInternationDate,
  StatusWiseClassSet
} from 'src/shared/utils/utils';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tables } from 'src/shared/components/table/Tables';
import StatusChip from 'src/modules/Reports/component/statusChip/StatusChip';
import { useDispatch } from 'react-redux';
import {
  GapAssessmentScreens,
  setGapAnalysisScreen
} from '../service/gapAction.service';

export type GapActionPlanTasksTableType = {
  gapAssessmentTask: any[];
  loader: boolean;
  handleDeleteTask: (id: string) => void;
  actions?: string[];
};

const GapActionPlanTasksTable = (props: GapActionPlanTasksTableType) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('regulations');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>();
  const { gapAssessmentTask, loader, handleDeleteTask, actions } = props;

  let table = [
    {
      id: 0,
      label: t('tenants.table.moreInfo', { ns: 'english' }),
      icon: <Box className="icon-info iconStyle" />
    }
  ];
  if (actions.includes('edit-task')) {
    table.push({
      id: 1,
      label: t('gapActionPlan.edit'),
      icon: <Box className="icon-edit iconStyle" />
    });
  }

  if (actions.includes('delete-task')) {
    table.push({
      id: 2,
      label: t('gapActionPlan.delete'),
      icon: <Box className="icon-trash iconStyle" />
    });
  }

  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        dispatch(
          setGapAnalysisScreen({
            screen: GapAssessmentScreens.MORE_INFO,
            id: selectedRow?.taskId
          })
        );
        break;
      case 1:
        // edit task;
        dispatch(
          setGapAnalysisScreen({
            screen: GapAssessmentScreens.EDIT_TASK,
            id: selectedRow?.taskId
          })
        );
        break;
      case 2:
        // delete task
        handleDeleteTask(selectedRow?.taskId);
        handleClose();
        break;
      default:
        break;
    }
  };

  const handleMenuClick = (event, rowId) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow('');
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
      field: 'owner',
      headerName: t('gapActionPlan.owner'),
      sortable: false,
      type: 'string',
      flex: 0.8
    },
    {
      field: 'regulation',
      headerName: t('gapActionPlan.regulation'),
      sortable: false,
      type: 'string',
      flex: 1.2,
      renderCell: (index) => {
        return (
          <Tooltip title={index?.row?.regulation}>
            <Box className="task" sx={{ height: '50px' }}>
              {index?.row?.regulation}
            </Box>
          </Tooltip>
        );
      }
    },
    {
      field: 'taskName',
      headerName: t('gapActionPlan.taskName'),
      sortable: false,
      type: 'string',
      flex: 2,
      renderCell: (index) => {
        return (
          <Tooltip title={index?.row?.taskName}>
            <Box className="task" sx={{ height: '50px' }}>
              {index?.row?.taskName}
            </Box>
          </Tooltip>
        );
      }
    },
    {
      field: 'riskLevel',
      headerName: t('gapActionPlan.riskLevel'),
      sortable: false,
      type: 'string',
      flex: 0.9,
      renderCell: (index) => {
        return <StatusChip chipVariant={index?.row?.riskLevel} />;
      }
    },
    {
      field: 'status',
      headerName: t('gapActionPlan.status'),
      sortable: false,
      type: 'string',
      flex: 0.8,
      renderCell: (index) => {
        return (
          <Box>
            <Chip
              label={index.row?.status}
              size="small"
              color={'default'}
              className={`chip-status 
                         ${StatusWiseClassSet[index.row?.status]}`}
              variant="outlined"
            />
          </Box>
        );
      }
    },
    {
      field: 'cadence',
      headerName: t('gapActionPlan.cadence'),
      sortable: false,
      type: 'string',
      flex: 0.8,
      renderCell: (index) => {
        return 'No Recurrence';
      }
    },
    {
      field: 'targetDate',
      headerName: t('gapActionPlan.targetDate'),
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <Box>
            {customInternationDate(
              new Date(index?.row?.targetDate).toISOString()
            )}
          </Box>
        );
      }
    },
    {
      field: 'action',
      headerName: t('gapActionPlan.actions'),
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
                handleMenuClick(e, index.row.id);
              }}
              className="more-info-btn"
            >
              <MoreVertOutlinedIcon fontSize="small" />
            </Button>

            <MenuView
              isOpen={selectedRow?.id === index.row.id}
              menuItemList={table}
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
        rows={gapAssessmentTask}
        className={'gaps-task-max-height'}
        columns={columns}
        checkboxSelection={false}
        hideFooters={true}
        loading={loader}
        rowHeight={30}
        isHidePagination={false}
        getNextPaginationData={() => {}}
        pager={{}}
      />
    </Box>
  );
};

export default GapActionPlanTasksTable;
