import { Badge as MuiBadge } from '@mui/material';
import { BadgeProps } from './services/badgeInterface';

export const Badge = ({
  className,
  badgeContent,
  color,
  anchorOrigin,
  ...props
}: BadgeProps) => {
  return (
    <>
      <MuiBadge
        className={className}
        badgeContent={badgeContent}
        color={color}
        anchorOrigin={anchorOrigin}
      ></MuiBadge>
    </>
  );
};
