import React from 'react';
import Typography from 'src/shared/components/typography/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Button, SimpleDialog } from 'src/shared/components/index';

export const ConfirmationCustomModal = ({
  imageURL,
  mainTitle,
  subTitle1,
  open,
  handleClose,
  handleClick,
  btnTitle
}) => {
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <React.Fragment>
      <SimpleDialog
        model_content={
          <>
            <Box sx={{ mb: 5 }} className="flex-column-center">
              <img alt="image" width={144} src={imageURL} />
            </Box>
            <Box className="flex-column-center">
              <Box>
                <Typography
                  sx={{ mb: 4 }}
                  className="textsemiWeight"
                  variant="h2"
                >
                  {mainTitle}
                </Typography>
              </Box>
              <Box sx={{ mb: 14 }}>
                <Typography variant="h4">{subTitle1}</Typography>
              </Box>
            </Box>
          </>
        }
        model_actions={
          <Box className="flex-basic-center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 0.25 }}
              btnText={btnTitle}
              onClick={handleClick}
            ></Button>
          </Box>
        }
        open={open}
        onClose={handleClose}
        modelSize={smallDevice ? 'sm' : 'md'}
      />
    </React.Fragment>
  );
};
export default ConfirmationCustomModal;
