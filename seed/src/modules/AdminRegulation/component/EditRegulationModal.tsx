import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { memo } from 'react';
import { SimpleDialog } from 'src/shared/components/modals/SimpleDialog';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'src/shared/components/button/Button';
import { EditRegulationModalPropsType } from '../model';
import { ModalTypes, UPDATE } from '../hooks/useRegulation';
import { useTranslation } from 'react-i18next';

const EditRegulationModal = (props: EditRegulationModalPropsType) => {
  const {
    openModal,
    RegulationName,
    RegulatoryBody,
    handleOnChange,
    handleSave,
    text,
    title,
    inputName,
    regulationDetail,
    handleModalClose
  } = props;
  const { t } = useTranslation('adminRegulation');
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      <SimpleDialog
        model_title={
          <Box className="w-100 mb-32" sx={{ width: '747px' }}>
            <Box className="d-flex flex-basic-space-between">
              <Box>
                <Typography variant="h3" className="mb-10 textweight">
                  {title}
                </Typography>
                <Typography variant="h5" className="textWeightRegular textWrap">
                  {`${RegulatoryBody} : `}
                  <span>{RegulationName}</span>
                </Typography>
              </Box>
              <Box className="flex-basic-space-between align-items-center">
                <Box className="fineModelClose">
                  <Tooltip title={t('closeTitle')} arrow>
                    <IconButton
                      aria-label="close"
                      onClick={() => {
                        handleModalClose(ModalTypes.CLOSE_EDIT);
                      }}
                      className="close-icon-modal "
                      disableRipple={true}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>
        }
        model_content={
          <Box
            className={`d-flex flex-direction-column  ${
              smallDevice ? '' : 'modalWidth'
            }`}
          >
            <Box className="w-100 customTextArea">
              <textarea
                name={inputName}
                className="w-100"
                rows={15}
                placeholder={`Enter ${title}`}
                value={text}
                onChange={(event) => {
                  handleOnChange(event, inputName);
                }}
              />
            </Box>
            <Box className="flex-basic-center  p-10">
              <Button
                variant={'contained'}
                btnText={t('save')}
                onClick={(e) => handleSave(e, UPDATE, regulationDetail)}
                disabled={!text}
              />
            </Box>
          </Box>
        }
        open={openModal}
        modelSize={'lg'}
      />
    </Box>
  );
};

export default memo(EditRegulationModal);
