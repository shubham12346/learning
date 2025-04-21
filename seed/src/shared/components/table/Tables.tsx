import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { Box, Card, MenuItem, Pagination, Select } from '@mui/material';
import Typography from '../typography/Typography';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TABLE_PAGESIZE } from 'src/shared/constants/constants';
import { Button } from '../button/Button';
const useStyles = makeStyles({
  datatable: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
      outline: 'none !important'
    }
  }
});

interface TablesProps {
  rows: any;
  columns: any;
  checkboxSelection: boolean;
  className: string;
  hideFooters: boolean;
  getNextPaginationData: any;
  pager: any;
  loading: boolean;
  isHidePagination?: boolean;
  rowHeight?: number;
  isCustomBottom?: boolean;
  handleCancel?: () => void;
  handleSave?: () => void;
  rowId?:string

  // tried for sorting
  // onSortModelChange?:any
  // sortModel?:any
}

export const Tables = ({
  rows,
  columns,
  checkboxSelection,
  className,
  hideFooters,
  getNextPaginationData,
  pager,
  loading,
  rowHeight,
  isHidePagination = true,
  isCustomBottom = false,
  handleCancel,
  handleSave,
  rowId='id'
}: TablesProps) => {
  //const
  const { t } = useTranslation('english');
  const classes = useStyles();
  const noOfRowPerPage = TABLE_PAGESIZE;

  const [open, setOpen] = React.useState(false);

  //methods
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    getNextPaginationData({ ...pager, currentPage: value });
  };

  function pageSizeChangeEvent(size) {
    getNextPaginationData({ ...pager, limit: size, currentPage: 1 });
  }

  const handleIconClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card className="tablestyle">
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={checkboxSelection}
          disableColumnFilter={true}
          pageSizeOptions={noOfRowPerPage}
          disableColumnMenu
          autoHeight={true}
          rowHeight={rowHeight}
          className={'table ' + className}
          disableRowSelectionOnClick={true}
          disableDensitySelector={true}
          classes={{ root: classes.datatable }}
          hideFooter={hideFooters ?? true}
          loading={loading}
          getRowId={(row) => row[rowId]}
        />
        {isCustomBottom && (
          <Box className="flex-basic-center  p-25 customTableFooter">
            <Button
              variant="outlined"
              type="submit"
              className="mr-24"
              btnText="Cancel"
              onClick={handleCancel}
              sx={{
                py: '0.62rem',
                px: '2rem',
                minWidth: '125px'
              }}
            />
            <Button
              variant="contained"
              type="submit"
              btnText="Save"
              onClick={handleSave}
              sx={{
                py: '0.62rem',
                px: '2rem',
                minWidth: '120px'
              }}
            />
          </Box>
        )}
      </Card>
      {isHidePagination && (
        <Box className="flex-basic-space-between mt-24 paginationWrapper">
          <Box className="flex-basic-start ">
            <Typography className="mr-10" variant={'body2'}>
              {t('tenants.table.view')}
            </Typography>
            <Select
              value={pager?.limit || 15}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              className="table-page-dropdown"
              open={open}
              onClose={handleClose}
              onOpen={() => setOpen(true)}
              IconComponent={() => (
                <ExpandMoreIcon
                  className="expandMoreIcon cursorPointer"
                  onClick={handleIconClick}
                />
              )}
              onChange={(e) => pageSizeChangeEvent(+e?.target?.value)}
            >
              {noOfRowPerPage.map((data) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
            <Typography className="ml-10" variant={'body2'}>
              {t('tenants.table.perPage')}
            </Typography>
          </Box>
          <Pagination
            className="pagination-class"
            count={pager?.totalPages}
            shape="rounded"
            boundaryCount={1}
            siblingCount={0}
            onChange={handleChange}
            page={pager?.currentPage}
          />
        </Box>
      )}
    </>
  );
};
