import { Box } from '@mui/material';
import ActivityAndListFilters from './ActivityAndListFilters';

const TaskHeader = (props) => {
  const {
    handleViewChange,
    view,
    handleSearch,
    searchKeyword,
    handleUploadPolicy,
    toogleButtonsList,
    statusDropdownOptions,
    handleStatus,
    selectedStatus,
  } = props;

  return (
    <Box className="flex-basic-space-between align-items-center pb-16">
      <ActivityAndListFilters
        statusDropdownOptions={statusDropdownOptions}
        handleStatus={handleStatus}
        selectedStatus={selectedStatus}
        handleSearch={handleSearch}
        searchKeyword={searchKeyword}
        view={view}
        handleViewChange={handleViewChange}
        handleUploadPolicy={handleUploadPolicy}
        toogleButtonsList={toogleButtonsList}
      />
    </Box>
  );
};

export default TaskHeader;
