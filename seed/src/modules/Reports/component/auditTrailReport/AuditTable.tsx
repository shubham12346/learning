import { Tables } from 'src/shared/components/table/Tables';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Tooltip } from '@mui/material';
import { customInternationDate, getTimeStamp } from 'src/shared/utils/utils';
import { useTranslation } from 'react-i18next';

const AuditTable = ({
  auditTrailReportData,
  getNextPaginationData,
  isloader,
  saveBottomModalOpen,
  handleCancel,
  handleSave
}) => {
  const { t } = useTranslation('reports');

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: t('dateTime'),
      sortable: false,
      type: 'string',
      flex: 2.25,
      renderCell: (index) => {
        return (
          <Box className="flex-basic-center">
            <Box className="">{customInternationDate(index?.row?.date)}</Box>
            <Box> |</Box>
            <Box sx={{ pl: 2 }} className="text-ellipsis w-50">
              {getTimeStamp(index?.row?.date)}
            </Box>
          </Box>
        );
      }
    },
    {
      field: 'username',
      headerName: t('user'),
      sortable: false,
      type: 'string',
      flex: 1.25
    },
    {
      field: 'agencyname',
      headerName: t('agency'),
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <>
            <Box className="text-ellipsis w-100">
              {index?.row?.agencyname || '-'}
            </Box>
          </>
        );
      }
    },
    {
      field: 'regulationname',
      headerName: t('regulation'),
      sortable: false,
      type: 'string',
      flex: 1.85,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.regulationname?.length >= 100 ? (
              <Tooltip title={index?.row?.regulationname}>
                <Box className="task">
                  <span>{index?.row?.regulationname || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="task">
                <span>{index?.row?.regulationname || '-'} </span>
              </Box>
            )}
          </>
        );
      }
    },
    {
      field: 'actionlog',
      headerName: t('actions'),
      sortable: false,
      type: 'string',
      flex: 2.35,
      cellClassName: 'task',
      renderCell: (index) => {
        return (
          <>
            {index?.row?.actionlog?.length >= 100 ? (
              <Tooltip title={index?.row?.actionlog}>
                <Box className="task">
                  <span>{index?.row?.actionlog || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="task">
                <span>{index?.row?.actionlog || '-'} </span>
              </Box>
            )}
          </>
        );
      }
    }
  ];

  return (
    <>
      {auditTrailReportData?.pager ? (
        <Tables
          rows={auditTrailReportData?.data || []}
          className={'reportsTableList GapAssessmentList'}
          columns={columns}
          pager={auditTrailReportData?.pager}
          checkboxSelection={false}
          hideFooters={true}
          getNextPaginationData={getNextPaginationData}
          loading={isloader}
          isCustomBottom={saveBottomModalOpen}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      ) : (
        <Box className="flex-basic-center mt-100  mb-100">
          <Box className="spinnerLoading mt-70"></Box>
        </Box>
      )}
    </>
  );
};

export default AuditTable;
