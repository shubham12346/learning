import { Box } from '@mui/material';
import { Button } from 'src/shared/components/index';
import { origialToken } from 'src/modules/common/services/common.service';
import { useDispatch } from 'react-redux';
import { ROLE_LIST } from '../TopNavBar';
import { AVERY_HELP_Link } from 'src/shared/constants/constants';

const HeaderButtons = (props) => {
  const { userData } = props;
  const dispatch = useDispatch<any>();
  return (
    <Box display="flex">
      {ROLE_LIST.includes(userData.role) && (
        <Button
          sx={{ mr: 2 }}
          btnText="Back to My Account"
          onClick={() => dispatch(origialToken())}
        ></Button>
      )}
      <a href={AVERY_HELP_Link} target="_blank" rel="noreferrer">
        <Box className="icon-help topNavBar-icon d-flex align-items-center mr-24"></Box>
      </a>
      {/* <HeaderNotifications /> */}
    </Box>
  );
};

export default HeaderButtons;
