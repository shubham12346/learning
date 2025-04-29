import { Box, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import AuditTrailReportHeader from '../AuditTrailReportHeader';
import { Tables } from 'src/shared/components/table/Tables';
import { customInternationDate } from 'src/shared/utils/utils';
import { AuditTrailReportListPropsTypes } from '../../model/reportsModel';

const AnnualReportList = (props: AuditTrailReportListPropsTypes) => {
  //const
  const {
    annualReportData,
    getNextPaginationData,
    pagerList,
    isloader,
    listOfRegulations,
    handleStartDate,
    handleEndDate,
    hanldeFilters,
    isCustomBottom: isCustomButtom,
    handleCancel,
    handleSave,
    isGenerateButtonDisabled,
    handleGenerateButton,
    actions
  } = props;
  const { t } = useTranslation('reports');

  const columns: GridColDef[] = [
    {
      field: 'taskname',
      headerName: 'TASK NAME',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.taskname?.length >= 15 ? (
              <Tooltip title={index?.row?.taskname}>
                <Box className="task">
                  <span>{index?.row?.taskname || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="task">
                <span>{index?.row?.taskname || '-'} </span>
              </Box>
            )}
          </>
        );
      }
    },

    {
      field: 'owner',
      headerName: 'OWNER',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.owner?.length >= 20 ? (
              <Tooltip title={index?.row?.owner}>
                <Box className="task">
                  <span>{index?.row?.owner || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="task">
                <span>{index?.row?.owner || '-'} </span>
              </Box>
            )}
          </>
        );
      }
    },
    {
      field: 'taskDescription',
      headerName: 'TASK DESCRIPTION',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.taskDescription?.length >= 20 ? (
              <Tooltip title={index?.row?.taskDescription}>
                <Box className="task">
                  <span>{index?.row?.taskDescription || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="task">
                <span>{index?.row?.taskDescription || '-'} </span>
              </Box>
            )}
          </>
        );
      }
    },

    {
      field: 'taskModifiedDate',
      headerName: 'MODIFIED DATE',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <Box className="flex-basic-center">
            <Box className="">
              {customInternationDate(index?.row?.taskModifiedDate)}
            </Box>
          </Box>
        );
      }
    },
    {
      field: 'regulationName',
      headerName: t('regulation'),
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.regulationName?.length >= 20 ? (
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
      field: 'controlTest',
      headerName: 'CONTROL TEST',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.controlTest?.length >= 20 ? (
              <Tooltip title={index?.row?.controlTest}>
                <Box className="task">
                  <span>{index?.row?.controlTest || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="flex-basic-center">
                <Box className="">{index?.row?.controlTest || '-'}</Box>
              </Box>
            )}
          </>
        );
      }
    },
    {
      field: 'testingResults',
      headerName: 'TESTING RESULTS',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.testingResults?.length >= 20 ? (
              <Tooltip title={index?.row?.testingResults}>
                <Box className="task">
                  <span>{index?.row?.testingResults || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="flex-basic-center">
                <Box className="">{index?.row?.testingResults || '-'}</Box>
              </Box>
            )}
          </>
        );
      }
    },
    {
      field: 'recommendedChanges',
      headerName: 'RECOMMENDED CHANGES',
      sortable: false,
      type: 'string',
      flex: 1,
      renderCell: (index) => {
        return (
          <>
            {index?.row?.recommendedChanges?.length >= 10 ? (
              <Tooltip title={index?.row?.recommendedChanges}>
                <Box className="task">
                  <span>{index?.row?.recommendedChanges || '-'} </span>
                </Box>
              </Tooltip>
            ) : (
              <Box className="flex-basic-center">
                <Box className="">{index?.row?.recommendedChanges || '-'}</Box>
              </Box>
            )}
          </>
        );
      }
    }
  ];
  return (
    <Box>
      <AuditTrailReportHeader
        listOfRegulations={listOfRegulations}
        showFilters={true}
        onStartDateChange={handleStartDate}
        onEndDateChange={handleEndDate}
        onFilterChange={hanldeFilters}
        hideAgency={false}
        handleGenerateButton={handleGenerateButton}
        isGenerateButtonDisabled={isGenerateButtonDisabled}
        isVisiableGenerateBtn={actions?.includes('add-report') ? true : false}
      />
      <Box sx={{ mt: 6 }}>
        <Tables
          rows={annualReportData || []}
          className={'reportsTableList GapAssessmentList'}
          columns={columns}
          pager={pagerList}
          checkboxSelection={false}
          hideFooters={true}
          getNextPaginationData={getNextPaginationData || []}
          loading={isloader}
          isCustomBottom={isCustomButtom}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      </Box>
    </Box>
  );
};

export default AnnualReportList;
