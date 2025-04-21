import Typography from 'src/shared/components/typography/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button, SimpleDialog } from 'src/shared/components/index';
import { useNavigate } from 'react-router';

interface DeleteTaskModalProps {
  handleClose?: () => void;
  handleDelete?: () => void;
  open?: boolean;
}

export const DeleteFileModal = ({
  handleClose,
  open
}: DeleteTaskModalProps) => {
  //constant
  const theme = useTheme();
  const { t } = useTranslation('english');
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  //methods
  const handleNavigate = () => {
    navigate('/avery/mydoc?gapAnalysis="djdfkj"');
  };

  return (
    <SimpleDialog
      className="tourComponent "
      model_content={
        <Typography className="textItalic overlayFont ">
          {
            'To complete your on-boarding, upload your regulatory policies on My Docs to conduct a Gap Analysis.'
          }
        </Typography>
      }
      model_actions={
        <Box className=" mt-20 ">
          <Button
            onClick={handleClose}
            variant="outlined"
            btnText="Cancel"
            sx={{ py: '0.62rem', px: '2rem' }}
            className="mr-20"
          />
          <Button
            onClick={handleNavigate}
            variant="contained"
            btnText="Go to My Docs"
            sx={{ py: '0.62rem', px: '2rem' }}
          />
        </Box>
      }
      open={open}
      modelSize={smallDevice ? 'sm' : 'md'}
    />
  );
};
