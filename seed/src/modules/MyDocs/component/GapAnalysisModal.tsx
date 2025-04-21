import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Button, SimpleDialog } from 'src/shared/components/index';
import Typography from 'src/shared/components/typography/Typography';

interface GapAnalysisModalProps {
  handleClose: () => void;
  handleRunGapAnalysis: () => void;
  modalTitle: string;
  open: boolean;
  subText?: string;
  subTextEnd?: string;
  btnPrimaryText?: string;
}

export const GapAnalysisModal = ({
  handleClose,
  handleRunGapAnalysis,
  modalTitle,
  open,
  subText,
  btnPrimaryText,
  subTextEnd
}: GapAnalysisModalProps) => {
  //constant
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  //methods
  const handleGapAnalysis = () => {
    handleRunGapAnalysis();
  };

  return (
      <SimpleDialog
        model_title={
          <Box sx={{ mb: '1.25rem' }} className="w-100">
            <Box className="textalign">
              <Typography variant="h3" className="textweight">
                {modalTitle}
              </Typography>
            </Box>
          </Box>
        }
        model_content={
          <Box
            sx={{
              p: 8,
              minWidth: smallDevice ? '360px' : '670px'
            }}
            className="flex-basic-center"
          >
            <Typography variant="h4" className="textItalic text-center d-flex">
              <Box className="">
                <label>{subText}</label>
              </Box>
            </Typography>
          </Box>
        }
        model_actions={
          <Box className="flex-basic-center w-100 mt-20">
            <Button
              onClick={handleClose}
              variant="outlined"
              btnText="Cancel"
              sx={{ py: '0.62rem', px: '2rem' }}
            />

            <Button
              onClick={handleGapAnalysis}
              variant="contained"
              btnText={btnPrimaryText}
              sx={{ py: '0.62rem', px: '2rem', ml: 6 }}
            />
          </Box>
        }
        open={open}
        modelSize={smallDevice ? 'sm' : 'md'}
      />
  );
};
