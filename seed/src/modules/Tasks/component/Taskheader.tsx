import { Box } from '@mui/material';
import { taskHeaderProps } from '../model/taskModel';
import Filters from './Filters';

const TaskHeader = (props: taskHeaderProps) => {
  const {
    handleViewChange,
    view,
    handelFilters,
    handleSearch,
    searchKeyword,
    calendarDropDownProps
  } = props;

  return (
    <Box className="flex-basic-space-between align-items-center mb-16">
      <Filters
        onFilterChange={handelFilters}
        showFilters={true}
        handleSearch={handleSearch}
        searchKeyword={searchKeyword}
        view={view}
        handleViewChange={handleViewChange}
        calendarDropDownProps={calendarDropDownProps}
      />
    </Box>
  );
};

export default TaskHeader;
