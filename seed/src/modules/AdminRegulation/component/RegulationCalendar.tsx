import { Box, Grid } from '@mui/material';
import EnforcementDetails from 'src/modules/Regulations/components/EnforcementDetails';
import { RegulationCalendarType } from '../model';
import { useTranslation } from 'react-i18next';
import SourceUrlInput from './SourceUrlInput';
import { customInternationDate } from 'src/shared/utils/utils';

const RegulationCalendar = ({
  errorObj,
  handleDateChange,
  sourceUrlLink,
  handleOnChange,
  dates,
  isFieldEditable = true
}: RegulationCalendarType) => {
  const { t } = useTranslation('adminRegulation');
  return (
    <Box className="regulationCalendarPadding">
      <Grid container spacing={3}>
        <Grid item sm={12} md={12} lg={6} xl={4}>
          <EnforcementDetails
            dateError={errorObj?.dateOfEnforcement}
            iconClassName="icon-date iconStyle"
            enforcementLabel={t('dateOfEnforcement')}
            isEditable={isFieldEditable}
            enforcementDateProps={{
              inputName: 'dateOfEnforcement',
              enforcementDate: dates.dateOfEnforcement,
              handleEnforcementDate: handleDateChange
            }}
            enforcementValue={customInternationDate(dates.dateOfEnforcement?.toString())}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          lg={6}
          xl={4}
          className="hideBackgroundColor"
        >
          <EnforcementDetails
            dateError={errorObj?.dateOfRegulationNotice}
            iconClassName="icon-date iconStyle"
            enforcementLabel={t('dateOFregulationNotice')}
            isEditable={isFieldEditable}
            enforcementDateProps={{
              inputName: 'dateOfRegulationNotice',
              enforcementDate: dates.dateOfRegulationNotice,
              handleEnforcementDate: handleDateChange
            }}
            enforcementValue={customInternationDate(dates.dateOfRegulationNotice?.toString())}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={4}
          className="hideBackgroundColor"
        >
          <SourceUrlInput
            errorText={errorObj?.sourceUrlLink}
            handleOnChange={handleOnChange}
            inputName="sourceUrlLink"
            iconClassName="icon-source-link iconStyle"
            value={sourceUrlLink || ''}
            isFieldEditable={isFieldEditable}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegulationCalendar;
