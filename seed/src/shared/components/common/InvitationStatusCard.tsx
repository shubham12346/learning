import { Box, Card, Typography, useTheme } from '@mui/material';
import { Button } from '../button/Button';

interface SetPasswordProps {
  titleText: string;
  subText: string;
  imgUrl: string;
  buttonText: string;
  onClickBtn: any;
  subText2?: string;
  customStyle?: boolean;
}

export const InvitationStatusCard = ({
  titleText,
  subText,
  imgUrl,
  buttonText,
  subText2,
  onClickBtn,
  customStyle
}: SetPasswordProps) => {
  const theme = useTheme();

  return (
    <Card
      className="flex-column-center"
      sx={{
        [theme.breakpoints.up('md')]: {
          padding: customStyle ? '77px 160px!important' : '60px!important'
        },
        [theme.breakpoints.down('md')]: {
          padding: '20px'
        }
      }}
    >
      <Box sx={{ mb: customStyle ? 3 : 8 }}>
        <img src={imgUrl} width={292} />
      </Box>
      <Box sx={{ mb: customStyle ? 2 : 4 }}>
        <Typography className="textsemiWeight" variant="h2">
          {titleText}
        </Typography>
      </Box>
      <Box>
        <Typography className="textWeightMedium" variant="h5">
          {subText}
        </Typography>
        {subText2 && (
          <Typography className="textWeightMedium" variant="h5">
            {subText2}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 8 }} className="flex-basic-start">
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          btnText={buttonText}
          onClick={onClickBtn}
        ></Button>
      </Box>
    </Card>
  );
};

export default InvitationStatusCard;
