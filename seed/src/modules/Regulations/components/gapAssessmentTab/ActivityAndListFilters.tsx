import { InputBase, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/shared/components/button/Button';
import { Select } from 'src/shared/components/select/Select';
import TabView from './TabView';

const ActivityAndListFilters = ({
  handleSearch,
  searchKeyword,
  handleViewChange,
  view,
  handleUploadPolicy,
  toogleButtonsList,
  statusDropdownOptions,
  handleStatus,
  selectedStatus
}: any) => {
  const { t } = useTranslation('regulations');

  return (
    <Box className="d-flex flex-basic-space-between w-100 flex-wrap">
      <Box className="d-flex flex-basic-center flex-wrap">
        <Box sx={{ width: '21.5 rem' }}>
          <Paper className="d-flex headerSearchBox">
            <Box className="icon-search flex-basic-center" sx={{ pl: 5 }}></Box>
            <InputBase
              sx={{ ml: 4 }}
              className="bg-color-search w-100"
              placeholder={t('gapAssessmentTab.search')}
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={handleSearch}
              value={searchKeyword}
            />
          </Paper>
        </Box>

        <Box sx={{ ml: 6 }}>
          <Box className='filterSelect' sx={{height:'60px'}}>
            <Select
              label={''}
              placeholder={t('gapAssessmentTab.selectStatus')}
              value={selectedStatus || 'none'}
              options={statusDropdownOptions}
              itemValue={'id'}
              itemText={'displayName'}
              onChange={handleStatus}
            />
          </Box>
        </Box>
      </Box>
      <Box
        className="d-flex flex-basic-center flex-wrap pr-30"
      >
        {/* todo : uncomment to add tab switch for list and activity view
        <Box className="mr-20">
          <TabView
            toogleButtonsList={toogleButtonsList}
            view={view}
            handleViewChange={handleViewChange}
          />
        </Box> */}
        <Box className="flex-basic-start">
          <Button
            onClick={handleUploadPolicy}
            variant="contained"
            btnText={t('gapAssessmentTab.uploadPolicy')}
            sx={{
              borderRadius: '2px'
            }}
            disabled={false}
            btnClass="uploadFileButton"
            startIcon={
              <Box
                sx={{
                  color: 'white'
                }}
                className="icon-ic_upload-policy"
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityAndListFilters;
