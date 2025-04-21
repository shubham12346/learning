import { Box, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckIcon from 'src/assets/svg/check.svg';
import { passwordValidatorProps } from '../../model/settingModel';

const PasswordValidator = (props: passwordValidatorProps) => {
  const { passwordChecks, passwordValidateArray } = props;
  const { t } = useTranslation('setting');
  return (
    <List className="pl-0 w-100">
      {passwordChecks.map((item, index) => (
        <ListItem key={index} className="d-flex">
          <Box sx={{ flex: 1 }} className="d-flex">
            {passwordValidateArray[index] == item && (
              <img alt='check icon' src={CheckIcon} className="mr-12" />
            )}
            <Typography
              className={
                passwordValidateArray[index] == item
                  ? 'textWeightRegular'
                  : 'bg-password-not-active'
              }
              variant="body2"
            >
              {t(item)}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default PasswordValidator;
