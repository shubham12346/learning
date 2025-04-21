import { Grid, Tooltip, Typography, Box } from '@mui/material';
import { Select } from 'src/shared/components/select/Select';
import { regulationTitleHeaderType } from '../model';
import { RegulationTypeWiseClassSet } from 'src/shared/utils/utils';
import { Button } from 'src/shared/components/button/Button';
import { useTranslation } from 'react-i18next';

const RegulationTitleHeader = (props: regulationTitleHeaderType) => {
  const {
    regulationName,
    regulationType,
    regulatoryBodyName,
    selectRegulation,
    inputName,
    tabType = 'evaluateRegulation',
    handleEditFields = () => {},
    isFieldEditable = true,
  } = props;

  const { t } = useTranslation('adminRegulation');

  const truncateText = (text: string, maxLength: number) => {
    if (text && text?.length > maxLength) {
      return text?.slice(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <Grid container alignItems="center" spacing="2">
      <Grid item xs="auto">
        <Typography noWrap className="textsemiWeight" variant="h3">
          <label htmlFor="">{regulatoryBodyName} </label>
          <span style={{ paddingInline: '20px' }}>:</span>
        </Typography>
      </Grid>
      <Grid item xs={4} md={6} lg={7} xl={5}>
        <Tooltip title={regulationName}>
          <Typography variant="h3" noWrap>
            {truncateText(regulationName, 40)}
          </Typography>
        </Tooltip>
      </Grid>
      <Grid item xs={'auto'}>
        <Typography
          className={`customRegulationTag ${RegulationTypeWiseClassSet[regulationType]}`}
        >
          {regulationType}
        </Typography>
      </Grid>
      <Grid item xs={3} md={3} lg={3} xl={2}>
        <Box className="filterSelect">
          <Select
            className="w-100"
            disabled={!isFieldEditable}
            defaultValue={selectRegulation.selectOptions[0]?.id}
            label={''}
            placeholder="Regulation Type"
            value={selectRegulation.selectedRegBody}
            options={selectRegulation?.selectOptions || []}
            itemValue={'name'}
            itemText={'name'}
            onChange={(e) =>
              selectRegulation.handleRegulatoryBodyChange(e, inputName)
            }
          />
        </Box>
      </Grid>
      <Grid item xs={3} md={3} lg={3} xl={2}>
        {tabType === 'libraryRegulation' && (
          <Button
            variant={'outlined'}
            btnText={isFieldEditable ? t('cancel') : t('edit')}
            onClick={() => {
              handleEditFields();
            }}
            sx={{ mx: 3 }}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default RegulationTitleHeader;
