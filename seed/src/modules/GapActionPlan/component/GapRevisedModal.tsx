import { SimpleDialog } from 'src/shared/components/modals/SimpleDialog';
import { Button } from 'src/shared/components/button/Button';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { REVISED_POLICY_TITLE } from './constants';

export type GapRevisedModalType = {
  openModal: boolean;
  value: string;
  id?: string;
  textConfig: {
    save: string;
    cancel: string;
    title: string;
    terms?: string;
  };
  disabledSave?: boolean;
  disabledCancel?: boolean;
  handleSave: (id) => void;
  handleClose: () => void;
};

const GapRevisedModal = (props: GapRevisedModalType) => {
  const {
    handleClose,
    handleSave,
    openModal,
    textConfig,
    value,
    disabledCancel,
    disabledSave,
  } = props;
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  const [modalText,setModalText]=useState<string>('')

  useEffect(()=>{
    setModalText(value)
  },[value])

  return (
    <SimpleDialog
      model_title={
        <Box
          className="mb-32"
          sx={{
            maxWidth: smallDevice ? '360px' : '747px'
          }}
        >
          <Box className="flex-basic-center">
            <Box>
              <Typography variant="h3" className="mb-10 textweight">
                {textConfig.title}
              </Typography>
            </Box>
          </Box>
        </Box>
      }
      model_content={
        <Box
          className={`d-flex flex-direction-column flex-basic-center modalBg  `}
          sx={{ width: smallDevice ? '360px' : '747px' }}
        >
          {textConfig?.title === REVISED_POLICY_TITLE ? (
            <Box className="w-100 customTextArea">
              <textarea
                className="w-100"
                rows={15}
                placeholder={textConfig?.title}
                value={modalText}
                onChange={(event) => {
                  setModalText(event?.target?.value)
                }}
              />
            </Box>
          ) : (
            <Box
              className="w-100 textBox"
              sx={{
                py: 3,
                px: 5,
                maxHeight: smallDevice ? '200px' : '400px'
              }}
            >
              <Typography variant="body1">{modalText}</Typography>
            </Box>
          )}
        </Box>
      }
      model_actions={
        <Box
          className="w-100 "
          sx={{
            maxWidth: smallDevice ? '360px' : '747px',
            mt: 5
          }}
        >
          <Box className="flex-basic-center  p-10">
            <Box sx={{ mr: 6 }}>
              <Button
                variant={'outlined'}
                btnText={textConfig.cancel}
                onClick={(e) => handleClose()}
                disabled={disabledCancel}
                sx={{ py: '0.62rem', px: '2rem', minWidth: '125px' }}
              />
            </Box>
            {textConfig?.title === REVISED_POLICY_TITLE && (
              <Box>
                <Button
                  variant={'contained'}
                  btnText={textConfig.save}
                  onClick={(e) => handleSave(modalText)}
                  disabled={disabledSave}
                  sx={{ py: '0.62rem', px: '2rem', minWidth: '125px' }}
                />
              </Box>
            )}
          </Box>
        </Box>
      }
      open={openModal}
      modelSize={'lg'}
    />
  );
};

export default GapRevisedModal;
