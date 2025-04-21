import { Box, Typography } from '@mui/material';
import { Button } from '../button/Button';

interface EmptyPlaceholderProps {
  imageUrl?: string;
  titleText?: string;
  subText?: string | any;
  imgWidth?: string;
  buttonText?: string;
  avatarText?: string;
  goToRoute?: (e: any) => void;
  isStartIcon?: boolean;
  startIcon?: React.ReactChild;
  disabledButton?: boolean;
}

const EmptyPlaceholder = ({
  imageUrl,
  titleText,
  imgWidth = '138',
  buttonText,
  subText,
  avatarText,
  goToRoute,
  isStartIcon = false,
  startIcon,
  disabledButton = false
}: EmptyPlaceholderProps) => {
  return (
    <Box className="flex-column-center">
      {avatarText ? (
        <Box sx={{ mb: 7 }} className="flex-basic-center emptyAvatarBox">
          <Typography
            sx={{ color: '#3F4159' }}
            variant="h5"
            className="textweight"
          >
            {avatarText}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mb: 7, minHeight: imgWidth }}>
          <img src={imageUrl} alt="EmptyPlaceholder" width={imgWidth} />
        </Box>
      )}
      <Box className="flex-column-center">
        <Typography variant="h5" className="textweight text-center">
          {titleText}
        </Typography>
        {subText && (
          <Typography
            sx={{ px: 4 }}
            variant="subtitle2"
            className="textWeightMedium mt-8 text-center"
          >
            {subText}
          </Typography>
        )}
        {buttonText && (
          <Button
            variant="contained"
            type="submit"
            size={'small'}
            btnText={buttonText}
            onClick={goToRoute}
            startIcon={isStartIcon && startIcon}
            className="mt-21"
            sx={{ py: '0.375rem', px: '2rem' }}
            disabled={disabledButton}
          />
        )}
      </Box>
    </Box>
  );
};

export default EmptyPlaceholder;
