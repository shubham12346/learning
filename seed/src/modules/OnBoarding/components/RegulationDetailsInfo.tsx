import React from 'react';
import Typography from 'src/shared/components/typography/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Divider, List, ListItem, Tooltip } from '@mui/material';
import './onBoarding.scss';
import { useTranslation } from 'react-i18next';

export const RegulationDetailsInfo = ({
  regulationDetailsList,
  handleItemClick,
  handleItemRemoveClick,
  selectedOrganizations
}) => {
  const { t } = useTranslation('english');
  return (
    <React.Fragment>
      <Box
        className="regulationDetlsHeader"
        sx={{ height: '98px', py: 5, px: 6 }}
      >
        {selectedOrganizations?.name && (
          <Typography variant="h3" sx={{ ml: 1 }}>
            {selectedOrganizations?.name}
          </Typography>
        )}
        <Box className="flex-basic-start align-items-start ">
          <Box className="align-items-start">
            <InfoOutlinedIcon
              sx={{ pt: 0.5, height: '16px', color: '#B4B5C0' }}
            />
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ fontSize: '0.75rem', opacity: 0.9 }}
            >
              {t('regulationNotesText')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ pl: 5, pt: 2 }}>
          {t('regulations')}
        </Typography>
        <Box className="d-flex flex-direction-column" sx={{ gap: 2 }}>
          <List
            className="regulation-detail-screen-scroll"
            sx={{ width: '100%' }}
          >
            {regulationDetailsList.map((item, index) => (
              <React.Fragment key={`${item.id}-${index}`}>
                <ListItem
                  key={item.id}
                  className="hr-bottom-line d-flex"
                  sx={{
                    display: 'flex',
                    gap: 2,
                    marginBottom: '5px',
                    '&:hover': {
                      color: '#4E2788',
                      fontWeight: '700'
                    }
                  }}
                >
                  <Box className="d-flex align-items-center">
                    <FiberManualRecordIcon sx={{ height: '10px' }} />
                  </Box>
                  <Box sx={{ flex: 1 }} onClick={() => handleItemClick(item)}>
                    <Typography
                      variant="body2"
                      sx={{
                        '&:hover': {
                          color: '#4E2788',
                          fontWeight: '700'
                        }
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.75rem',
                        opacity: 0.800000011920929
                      }}
                    >
                      {item.shortSummary}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onClick={() => handleItemRemoveClick(item)}
                  >
                    <Tooltip title={'Delete'} arrow>
                      <RemoveIcon
                        sx={{
                          backgroundColor: '#E9E9F8',
                          borderRadius: '24px'
                        }}
                        fontSize={'small'}
                      />
                    </Tooltip>
                  </Box>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </React.Fragment>
  );
};
