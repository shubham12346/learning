import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import { customInternationDate } from 'src/shared/utils/utils';
import iconEnforcementEmptyState from 'src/assets/svg/iconEnforcementEmptyState.svg';
import { DashboardTaskEnforcementListPropsTypes } from '../model/dashboardModel';

const DashboardTaskEnforcementList = (
  props: DashboardTaskEnforcementListPropsTypes
) => {
  const { t } = useTranslation('dashboard');
  const { dateLabel, enforcementData, isCollapsed } = props;

  return (
    <Box>
      {enforcementData?.length > 0 ? (
        <Box
          sx={{
            height: isCollapsed ? '617px' : '270px',
            overflow: 'hidden'
          }}
          className="enforcementDate"
        >
          {enforcementData?.map((item, index) => (
            <Box key={index}>
              <Box className="flex-basic-space-between">
                <Typography
                  variant="subtitle1"
                  className="flex-basic-start w-90 text-noWarp"
                >
                  <Box> {item?.organization} </Box>
                  <Box sx={{ px: 1 }}> : </Box>
                  <Box className="text-ellipsis w-90">{item?.name}</Box>
                </Typography>
              </Box>
              <Box className="d-flex mt-10">
                <Typography variant={'subtitle2'}>{dateLabel}</Typography>
                <Typography variant={'subtitle2'} className="textweight ml-4">
                  {customInternationDate(item?.detail?.enforcementDate)}
                </Typography>
              </Box>
              <Divider className="divider mt-18 mb-18" />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ px: 4, py: 10 }}>
          <EmptyPlaceholder
            imgWidth={'156'}
            imageUrl={iconEnforcementEmptyState}
            titleText={t('noEnforcementDateYet')}
          />
        </Box>
      )}
    </Box>
  );
};

export default DashboardTaskEnforcementList;
