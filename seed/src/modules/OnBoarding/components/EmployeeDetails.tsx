import { Grid, Box, Card } from '@mui/material';
import {
  FormComponent,
  LocationComponent,
  RadioComponent
} from './BusinessDetails';

const initialValues = {
  businessName: '',
  businessType: '',
  totalGrossRevenue: '',
  aum: '',
  incorporateCountry: '',
  incorporateState: ''
};
export const EmployeeDetails = ({
  yearEndOther,
  complinaceDetailsQuestions
}) => {
  return (
    <Card sx={{ flexShrink: 0 }} className="w-100">
      <Box className="wrapper-onbarding onbarding-business-details w-100">
        <Grid
          container
          columns={12}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          spacing={4}
          sx={{ pt: 11, pl: 11 }}
        >
          {complinaceDetailsQuestions?.map((field, index) => {
            if (field.type == 'location') {
              return (
                <LocationComponent
                  key={`${index - field?.name}`}
                  field={field}
                  index={index + 10}
                />
              );
            }
            return field.type == 'radio' ? (
              <RadioComponent
                field={field}
                index={index + 20}
                yearEndOther={yearEndOther}
              />
            ) : (
              <Grid key={index} spacing={4} container columns={12}>
                <Grid sx={{ pr: 8 }} item xs={6} md={6} lg={6} xl={6}>
                  <FormComponent field={field} index={index + 30} />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
};
