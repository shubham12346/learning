import { Grid, Box, Card } from '@mui/material';
import { FormField } from 'src/shared/components/index';
import Typography from 'src/shared/components/typography/Typography';

export const BusinessDetails = ({
  businessDetailsDefaultQuestion,
  businessDetailsQuestions,
  yearEndOther
}) => {
  return (
    <Card sx={{ flexShrink: 0 }} className="w-100">
      <Box className="wrapper-onbarding onbarding-business-details w-100">
        <Grid
          container
          columns={12}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          spacing={4}
          sx={{ pt: 10, pl: 10, pb: 8 }}
        >
          {businessDetailsDefaultQuestion?.map((field, index) => (
            <Grid key={index} container columns={12}>
              <Grid sx={{ pb: 7, pr: 8 }} item xs={6}>
                <FormField fieldProps={field} />
              </Grid>
            </Grid>
          ))}

          {businessDetailsQuestions?.map((field, index) => {
            if (field?.type === 'location') {
              return <LocationComponent field={field} index={index + 10} />;
            }
            if (field.type == 'radio') {
              return (
                <RadioComponent
                  field={field}
                  index={index + 20}
                  yearEndOther={yearEndOther}
                />
              );
            }
            return (
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

export const LocationComponent = ({ field, index }) => {
  return (
    <Grid spacing={8} container>
      <Grid key={index} item xs={12} md={12} lg={12} xl={12}>
        <Box className="locationSection mb-20 mr-32">
          <Typography
            className="mb-16"
            variant="body2"
            sx={{ fontWeight: 700 }}
            align="left"
          >
            {field.label}
          </Typography>
          <Box className="innerr">
            <Grid spacing={8} container>
              {field?.locationDetails.map((field, index) => (
                <Grid key={index} item xs={12} md={6} lg={6} xl={6}>
                  <Box key={field.id} sx={{ m: 1 }}>
                    <FormField fieldProps={field} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export const RadioComponent = ({ field, index, yearEndOther }) => {
  return (
    <Box className="radioSection mt-20 mb-20 w-100" key={index}>
      <FormField fieldProps={field} />
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box className="flex-basic-end mr-40 endYearText">
            {field?.name == 'yearEnd' &&
              yearEndOther &&
              field?.textField.map((field, index) => (
                <FormField key={index} fieldProps={field} />
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export const FormComponent = ({ field, index }) => {
  return (
    <Grid key={index} sx={{ pb: 7 }} item xs={field.formWidth}>
      <FormField fieldProps={field} />
    </Grid>
  );
};
