import { Box } from '@mui/material';
import { Button } from 'src/shared/components/button/Button';
import { regulationBottomActionsType } from '../model';
import { useTranslation } from 'react-i18next';

const RegulationBottomActions = (props: regulationBottomActionsType) => {
  const { t } = useTranslation('adminRegulation');
  const {
    handleButtonActions,
    editRegulationField,
    buttons,
    regulationDetail
  } = props;

  return (
    <Box className="w-100  flex-basic-space-between" sx={{ py: 4, px: 4 }}>
      <Button
        variant="outlined"
        type="submit"
        className={` ${buttons?.prevButton?.isShow ? '' : 'displayHidden'}`}
        btnText={t('gotToPrev')}
        onClick={(e) => {
          handleButtonActions(
            e,
            buttons?.prevButton?.buttonType,
            regulationDetail,
            editRegulationField
          );
        }}
        sx={{
          py: '0.62rem',
          px: '2rem',
          minWidth: '125px'
        }}
        disabled={buttons?.prevButton?.isDisable}
      />

      <Box className="flex-basic-even-space w-50 ">
        <Button
          variant="outlined"
          type="submit"
          btnText={t('saveProgress')}
          onClick={(e) => {
            handleButtonActions(
              e,
              buttons?.onUpdate?.buttonType,
              regulationDetail,
              editRegulationField
            );
          }}
          sx={{
            py: '0.62rem',
            px: '2rem',
            minWidth: '120px'
          }}
          disabled={buttons?.onUpdate?.isDisable}
        />
        <Button
          className=""
          variant="contained"
          type="submit"
          btnText="SUBMIT"
          onClick={(e) => {
            handleButtonActions(
              e,
              buttons?.submitButton?.buttonType,
              regulationDetail,
              editRegulationField
            );
          }}
          sx={{
            py: '0.62rem',
            px: '2rem',
            minWidth: '120px'
          }}
          disabled={buttons?.submitButton?.isDisable}
        />
      </Box>
      <Button
        variant="outlined"
        type="submit"
        className={` ${buttons?.nextButton?.isShow ? '' : 'displayHidden'}`}
        btnText={t('goToNext')}
        onClick={(e) => {
          handleButtonActions(
            e,
            buttons?.nextButton?.buttonType,
            regulationDetail,
            editRegulationField
          );
        }}
        sx={{
          py: '0.62rem',
          px: '2rem',
          minWidth: '125px'
        }}
        disabled={buttons?.nextButton?.isDisable}
      />
    </Box>
  );
};

export default RegulationBottomActions;
