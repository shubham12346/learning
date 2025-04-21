import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RoleInfoDetails = (props) => {
  //Constants
  const { t } = useTranslation('users');
  return (
    <>
      <Box className="tooltipInfoDetails" sx={{ py: 7, px: 6 }}>
        {props?.groupRoleList &&
          props?.groupRoleList?.map((item, index) => (
            <Box className="items" key={index} sx={{ mb: 8 }}>
              <Typography
                className="textweight"
                variant="body1"
                sx={{
                  mb: 1
                }}
              >
                {item?.displayName || item?.groupName || ''}
              </Typography>
              <Typography variant="body2">
                {item?.description || item?.groupDetails?.description || ''}
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
};
export default RoleInfoDetails;
