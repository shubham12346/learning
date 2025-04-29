import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import { CustomFormType } from './service/customFormInterface';
import { Grid } from '@mui/material';
import FormField from '../form-field/FormField';
import { Button } from '../button/Button';

export const CustomForm = ({
  formFields,
  initialValues,
  submitBtnText = 'Submit',
  cancelBtnText = 'Cancel',
  submitBtnHandler,
  cancelBtnHandler
}: CustomFormType) => {
  //Form constants
  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      submitBtnHandler(values);
    }
  });

  const { isValid, handleSubmit } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <form>
          {formFields?.map((field, index) => (
            <Grid key={index} container direction="row">
              <Grid sx={{ m: 1 }} item xs={12} md={12} lg={12} xl={12}>
                <FormField fieldProps={field} />
              </Grid>
            </Grid>
          ))}
          <Grid container direction={'row-reverse'}>
            <Grid item xs={12} sm={6} md={1} lg={1} xl={1}>
              <Button
                btnText={submitBtnText}
                fullWidth
                type="submit"
                variant="contained"
                disabled={!isValid}
                onClick={(event: any) => handleSubmit(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1} lg={1} xl={1}>
              <Button
                fullWidth
                btnText={cancelBtnText}
                variant="text"
                onClick={cancelBtnHandler}
              />
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </>
  );
};

export default CustomForm;
