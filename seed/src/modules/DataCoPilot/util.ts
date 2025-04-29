import { PRIMARY_COLOR } from 'src/shared/constants/constants';
import { getInitials } from 'src/shared/utils/utils';
//Avatar initials
export const stringAvatar = (name: string = 'User Name') => {
  return {
    sx: {
      bgcolor: PRIMARY_COLOR
    },
    children: getInitials(name)
  };
};
