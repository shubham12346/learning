import * as React from 'react';
import {
  Box,
  Card,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Collapse,
  Tooltip
} from '@mui/material';
import Typography from '../typography/Typography';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TABLE_PAGESIZE } from 'src/shared/constants/constants';
import { Button } from '../button/Button';
import { makeStyles } from '@mui/styles';
import {
  ExpandableTableProps,
  ExpandableRowProps
} from './services/expandableTableInterface';

const useStyles = makeStyles({
  nestedTable: {
    '& tr:last-child td': {
      borderBottom: 'none'
    }
  },
  tableContainer: {},
  tableContainerWithScroll: {
    maxHeight: '500px'
  },
  tableContainerNoScroll: {
    maxHeight: 'none',
    overflow: 'visible'
  },
  table: {
    minWidth: 650
  },
  tableCell: {
    '&:focus-within': {
      outline: 'none !important'
    },
    padding: '8px 16px',
    height: 'auto',
    maxHeight: '64px',
    verticalAlign: 'top'
  },
  tableCellContent: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.2em',
    maxHeight: '2.4em' // 2 lines at 1.2em line height
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    height: 'auto !important',
    maxHeight: '64px'
  },
  loadingOverlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  expandCell: {
    width: '48px',
    padding: '0 0 0 16px',
    verticalAlign: 'middle'
  },
  nestedTableContainer: {
    paddingBottom: 0,
    paddingTop: 0,
    maxHeight: '200px', // Smaller max height for nested tables
    overflow: 'auto'
  },
  nestedTableContainerNoScroll: {
    paddingBottom: 0,
    paddingTop: 0,
    maxHeight: 'none',
    overflow: 'visible'
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 10,
    borderBottom: '2px solid #e0e0e0'
  },
  nonStickyHeader: {
    backgroundColor: '#fff',
    borderBottom: '2px solid #e0e0e0'
  }
});

// Render cell content with tooltip if content is truncated
const CellWithTooltip = ({ content, classes }) => {
  const textRef = React.useRef(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    if (textRef.current) {
      // Check if content is being truncated
      setShowTooltip(
        textRef.current.scrollHeight > textRef.current.clientHeight ||
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [content]);

  return (
    <Tooltip title={showTooltip ? content : ''} arrow placement="top">
      <div ref={textRef} className={classes.tableCellContent}>
        {content}
      </div>
    </Tooltip>
  );
};

// Row component with expand/collapse functionality
const ExpandableRow = ({
  row,
  columns,
  nestedColumns,
  getNestedRows,
  rowId,
  classes,
  rowHeight,
  disableScroll
}: ExpandableRowProps & { disableScroll?: boolean }) => {
  const [open, setOpen] = React.useState(false);
  const nestedRows = getNestedRows(row);

  const handleRowClick = (e) => {
    // Only toggle if clicking on the row but not on interactive elements
    if (
      !e.target.closest('button') &&
      !e.target.closest('a') &&
      !e.target.closest('.MuiTableSortLabel-root')
    ) {
      setOpen(!open);
    }
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <TableRow
        hover
        className={`${classes.tableRow} cursorPointer`}
        sx={{ height: rowHeight }}
        onClick={handleRowClick}
      >
        <TableCell className={classes.expandCell}>
          <ExpandMoreIcon
            className={`expandMoreIcon cursorPointer mr-5 ml-5 ${
              open ? 'icon-rotate-180' : 'icon-rotate-360'
            }`}
            onClick={handleExpandClick}
          />
        </TableCell>
        {columns.map((column) => {
          const value = row[column.field];
          return (
            <TableCell
              key={column.field}
              align={column.align || 'left'}
              className={classes.tableCell}
            >
              {column.renderCell ? (
                column.renderCell({ row, value })
              ) : (
                <CellWithTooltip content={value} classes={classes} />
              )}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow className={`${classes.table} ${classes.nestedTable}`}>
        <TableCell
          className={`${disableScroll ? classes.nestedTableContainerNoScroll : classes.nestedTableContainer} pb-0 pt-0`}
          colSpan={columns.length + 1}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table className={classes.table} aria-label="nested table">
                <TableHead>
                  <TableRow sx={{ height: rowHeight }}>
                    {nestedColumns.map((column) => (
                      <TableCell
                        key={column.field}
                        align={column.align || 'left'}
                        style={{
                          minWidth: column.minWidth || 'auto',
                          width: column.width,
                          ...(column.headerClassName
                            ? { className: column.headerClassName }
                            : {})
                        }}
                      >
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nestedRows.length > 0 ? (
                    nestedRows.map((nestedRow, index) => (
                      <TableRow
                        key={`${row[rowId]}-nested-${index}`}
                        className={classes.tableRow}
                        sx={{ height: rowHeight }}
                      >
                        {nestedColumns.map((column) => {
                          const value = nestedRow[column.field];
                          return (
                            <TableCell
                              key={column.field}
                              align={column.align || 'left'}
                              className={classes.tableCell}
                            >
                              {column.renderCell ? (
                                column.renderCell({ row: nestedRow, value })
                              ) : (
                                <CellWithTooltip content={value} classes={classes} />
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={nestedColumns.length} align="center">
                        No nested records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const ExpandableTable = ({
  rows,
  columns,
  className,
  getNextPaginationData,
  pager,
  loading,
  rowHeight = 52,
  isHidePagination = true,
  isCustomBottom = false,
  handleCancel,
  handleSave,
  rowId = 'id',
  nestedColumns = [],
  getNestedRows,
  disableScroll = false
}: ExpandableTableProps & { disableScroll?: boolean }) => {
  const { t } = useTranslation('english');
  const classes = useStyles();
  const noOfRowPerPage = TABLE_PAGESIZE;

  const [selectOpen, setSelectOpen] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Methods
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    getNextPaginationData({ ...pager, currentPage: value });
  };

  function pageSizeChangeEvent(size: number) {
    getNextPaginationData({ ...pager, limit: size, currentPage: 1 });
  }

  const handleIconClick = () => {
    setSelectOpen(true);
  };

  const handleClose = () => {
    setSelectOpen(false);
  };

  const handleSort = (column: any) => {
    if (!column.sortable) return;

    let direction: 'asc' | 'desc' = 'asc';

    if (
      sortConfig &&
      sortConfig.key === column.field &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }

    setSortConfig({ key: column.field, direction });
  };

  const sortedRows = React.useMemo(() => {
    if (!sortConfig) return rows;

    return [...rows].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [rows, sortConfig]);

  return (
    <>
      <Card className="tablestyle">
        <TableContainer
          className={`${classes.tableContainer} ${
            disableScroll ? classes.tableContainerNoScroll : `${classes.tableContainerWithScroll} commonListScroll`
          }`}
        >
          <Table
            className={`${classes.table} ${className}`}
            aria-label="custom table"
          >
            <TableHead>
              <TableRow
                sx={{ height: rowHeight }}
                className={disableScroll ? classes.nonStickyHeader : classes.stickyHeader}
              >
                {/* Expand/Collapse column header */}
                <TableCell className={classes.expandCell} />
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align || 'left'}
                    style={{
                      minWidth: column.minWidth || 'auto',
                      width: column.width,
                      ...(column.headerClassName
                        ? { className: column.headerClassName }
                        : {})
                    }}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={sortConfig?.key === column.field}
                        direction={
                          sortConfig?.key === column.field
                            ? sortConfig.direction
                            : 'asc'
                        }
                        onClick={() => handleSort(column)}
                      >
                        {column.headerName}
                      </TableSortLabel>
                    ) : (
                      column.headerName
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow sx={{ height: '400px' }}>
                  <TableCell
                    colSpan={columns.length + 1}
                    className={classes.loadingOverlay}
                  >
                    <Box className="spinnerWrapper flex-basic-center mt-40">
                      <Box className="spinnerLoading "></Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                sortedRows.map((row) => (
                  <ExpandableRow
                    key={row[rowId]}
                    row={row}
                    columns={columns}
                    nestedColumns={nestedColumns}
                    getNestedRows={getNestedRows}
                    rowId={rowId}
                    classes={classes}
                    rowHeight={rowHeight}
                    disableScroll={disableScroll}
                  />
                ))
              )}
              {rows.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {isCustomBottom && (
          <Box className="flex-basic-center p-25 customTableFooter">
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
          <Box className="flex-basic-start">
            <Typography className="mr-10" variant={'body2'}>
              {t('tenants.table.view')}
            </Typography>
            <Select
              value={pager?.limit || 15}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              className="table-page-dropdown"
              open={selectOpen}
              onClose={handleClose}
              onOpen={() => setSelectOpen(true)}
              IconComponent={() => (
                <ExpandMoreIcon
                  className="expandMoreIcon cursorPointer"
                  onClick={handleIconClick}
                />
              )}
              onChange={(e) =>
                pageSizeChangeEvent(+(e?.target?.value as string))
              }
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