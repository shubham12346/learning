import React, { useState } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { FormFieldType } from './service/formFieldInterface';
import { FIELD_TYPE, REGEX } from 'src/shared/constants/constants';
import {
  CheckBox,
  Radio,
  Select,
  Autocomplete,
  CheckboxGroup,
  RadioGroup,
  MultiSelect,
  TextField
} from '../index';
import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Switch,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface FormFieldProps {
  fieldProps: FormFieldType;
}

export const FormField = ({ fieldProps }: FormFieldProps) => {
  //Constants
  const { t } = useTranslation(['english']);

  //state
  const [value, setValue] = useState(
    fieldProps?.type === FIELD_TYPE.MULTI_SELECT ? ([] as any[]) : ({} as any)
  );
  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  //methods
  const opeDatePicker = (event: any) => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  //disabled weekends dates
  const disableWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };
  //make this changes only for multi select
  const handleUpdateValue = (updatedVal) => {
    updatedVal.form.setFieldValue(
      updatedVal.fieldVal?.name,
      updatedVal.updatedChips
    );
  };

  const handleOnChange = (event, field, value?, form?) => {
    if (
      fieldProps?.type === FIELD_TYPE.INTEGER_ONLY &&
      !REGEX.NUMBER_INTEGER.test(event?.target?.value)
    ) {
      if (!form.touched[field?.name]) {
        form.setTouched({ [field?.name]: true });
      }
      form?.setFieldError(field?.name, t('validationErrMsg.valid_number_msg'));
      return;
    }
    if (
      fieldProps?.type === FIELD_TYPE.AUTOCOMPLETE ||
      fieldProps?.type === FIELD_TYPE.SWITCH ||
      fieldProps?.type === FIELD_TYPE.DATE
    ) {
      setValue(value);
      form.setFieldValue(field?.name, value);
    }
    field.onChange(event);
    if (fieldProps?.handleFieldChange) {
      fieldProps?.handleFieldChange(event, field, value);
    }
  };

  const validateField = (
    value: string,
    fieldType: string,
    isRequired: boolean,
    fieldLabel: string
  ) => {
    if (!value && isRequired) {
      return t('validationErrMsg.required_err_msg', { fieldLabel });
    } else if (
      fieldProps?.errorMessages?.maxLenghtErrMsg &&
      value?.length > fieldProps?.validations?.maxLength
    ) {
      return fieldProps?.errorMessages?.maxLenghtErrMsg;
    } else if (
      fieldProps?.errorMessages?.minLengthErrMsg &&
      value?.length < fieldProps?.validations?.minLength
    ) {
      return fieldProps?.errorMessages?.minLengthErrMsg;
    } else if (
      fieldType === FIELD_TYPE.CHECKBOX_GROUP &&
      value?.length === 0 &&
      isRequired
    ) {
      return t('validationErrMsg.checkbox_group_err_msg');
    } else if (fieldProps?.validations?.email && !REGEX.EMAIL.test(value)) {
      return t('validationErrMsg.valid_email_err_msg');
    } else if (
      !REGEX.NUMBER_DECIMAL.test(value) &&
      fieldType === FIELD_TYPE.NUMBER_ONLY
    ) {
      return t('validationErrMsg.valid_number_err_msg');
    } else if (
      fieldType === FIELD_TYPE.INTEGER_ONLY &&
      !REGEX.NUMBER_INTEGER.test(value)
    ) {
      return t('validationErrMsg.valid_integer_err_msg');
    } else if (
      (fieldType === FIELD_TYPE.NUMBER_ONLY ||
        fieldType === FIELD_TYPE.INTEGER_ONLY) &&
      fieldProps?.validations?.minValue &&
      Number(value) < fieldProps?.validations?.minValue
    ) {
      return (
        fieldProps?.errorMessages?.minValueErrMsg ||
        t('validationErrMsg.min_value_err_msg', {
          fieldLabel,
          minValue: fieldProps?.validations?.minValue
        })
      );
    } else if (
      (fieldType === FIELD_TYPE.NUMBER_ONLY ||
        fieldType === FIELD_TYPE.INTEGER_ONLY) &&
      fieldProps?.validations?.maxValue &&
      Number(value) > fieldProps?.validations?.maxValue
    ) {
      return (
        fieldProps?.errorMessages?.maxValueErrMsg ||
        t('validationErrMsg.max_value_err_msg', {
          fieldLabel,
          maxValue: fieldProps?.validations?.maxValue
        })
      );
    } else if (
      fieldType === FIELD_TYPE.PASSWORD &&
      fieldProps?.validations?.password &&
      !REGEX.PASSWORD.test(value)
    ) {
      return (
        <List className="passwordRequirementList">
          <ListItem>
            At least one digit
            <code className="passwordRequirement">(0-9)</code>.
          </ListItem>
          <ListItem>
            No
            <code className="passwordRequirement">whitespace characters</code>.
          </ListItem>
          <ListItem>
            Minimum length of
            <code className="passwordRequirement">8 characters</code>.
          </ListItem>
          <ListItem>
            At least one uppercase letter
            <code className="passwordRequirement">(A-Z)</code>.
          </ListItem>
          <ListItem>
            At least one lowercase letter
            <code className="passwordRequirement">(a-z)</code>.
          </ListItem>
          <ListItem>
            At least one special character from the set
            <code className="passwordRequirement">
              !@#$%^&*()-_=+{};:,&lt;.&gt;
            </code>
            .
          </ListItem>
        </List>
      );
    } else if (
      fieldProps?.validations?.regex &&
      !new RegExp(fieldProps?.validations?.regex).test(value)
    ) {
      return (
        fieldProps?.errorMessages?.regexErrMsg ||
        t('validationErrMsg.valid_data_err_msg')
      );
    } else if (
      fieldProps?.validations?.uniqueDataValidation &&
      fieldProps?.uniqueDataKey &&
      value
    ) {
      const result = fieldProps?.uniqueData?.filter((item) =>
        item[fieldProps?.uniqueDataKey]?.includes(value)
      );

      if (result && Object.keys(result)?.length) {
        return t('validationErrMsg.unique_data_err_msg', {
          fieldLabel: fieldLabel.toLowerCase()
        });
      }
    } else if (value && fieldProps?.validations?.json) {
      try {
        JSON.parse(value);
      } catch (error) {
        return fieldProps?.errorMessages?.jsonErrMsg;
      }
    } else if (value && fieldProps?.type === FIELD_TYPE.REGEX) {
      try {
        new RegExp(value);
      } catch (error) {
        return t('validationErrMsg.valid_regex_err_msg');
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getRadioGroup = (formField: any) => {
    const [field] = useField(formField);
    return (
      <>
        <Grid container spacing={8}>
          <Grid
            className="flex-basic-start"
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {fieldProps?.label}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RadioGroup
              {...field}
              name={fieldProps?.name}
              row={fieldProps?.isDirectionRow}
              value={field?.value}
              onChange={(event) => handleOnChange(event, field)}
            >
              {fieldProps?.options?.map((option, index) => (
                <FormControlLabel
                  className="mr-50"
                  key={index}
                  value={option[fieldProps?.itemValueKey]}
                  control={<Radio />}
                  label={option[fieldProps?.itemLabelKey]}
                  disabled={option?.isDisabled || false}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>

        <ErrorMessage
          name={fieldProps?.name}
          component={'div'}
          className="errorState"
        />
      </>
    );
  };

  const renderFormField = (
    field: any,
    meta: any,
    fieldType: string,
    form: any
  ) => {
    switch (fieldType) {
      case FIELD_TYPE.TEXT:
      case FIELD_TYPE.EMAIL:
      case FIELD_TYPE.REGEX:
      case FIELD_TYPE.PASSWORD:
      case FIELD_TYPE.NUMBER_ONLY:
      case FIELD_TYPE.INTEGER_ONLY:
        return (
          <TextField
            {...field}
            fullWidth
            type={
              fieldProps?.type === FIELD_TYPE.PASSWORD && showPassword
                ? FIELD_TYPE.TEXT
                : fieldProps?.type
            }
            autoComplete="off"
            disabled={fieldProps?.isDisabled}
            textareaRows={fieldProps?.textareaRows}
            multiline={fieldProps?.multiline}
            label={fieldProps?.label}
            placeholder={fieldProps?.placeholder}
            showRequired={fieldProps?.showRequired}
            tooltipTitle={fieldProps?.tooltipTitle}
            showInfoIcon={fieldProps?.showInfoIcon}
            error={meta.touched && meta.error !== undefined}
            helperText={(meta.touched && meta.error) || fieldProps?.helperText}
            inputProps={
              !fieldProps?.errorMessages?.maxLenghtErrMsg
                ? {
                    maxLength: fieldProps?.validations?.maxLength,
                    minLength: fieldProps?.validations?.minLength
                  }
                : {}
            }
            InputProps={
              fieldProps?.type === FIELD_TYPE.PASSWORD
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                : {}
            }
            isBold={fieldProps?.isBold}
            onChange={(event) =>
              handleOnChange(event, field, event.target.value, form)
            }
          />
        );

      case FIELD_TYPE.SELECT:
        return (
          <Select
            {...field}
            fullWidth
            label={fieldProps?.label}
            disabled={fieldProps?.isDisabled}
            defaultValue={''}
            value={field?.value || 'none'}
            placeholder={fieldProps?.placeholder || ''}
            options={fieldProps?.options}
            showRequired={fieldProps?.showRequired}
            tooltipTitle={fieldProps?.tooltipTitle}
            showInfoIcon={fieldProps?.showInfoIcon}
            itemValue={fieldProps?.itemValueKey}
            itemText={fieldProps?.itemLabelKey}
            error={meta.touched && meta.error !== undefined}
            helperText={meta.touched && meta.error}
            onChange={(event) => handleOnChange(event, field,fieldProps)}
          />
        );

      case FIELD_TYPE.RADIO:
        return getRadioGroup(field);

      case FIELD_TYPE.CHECKBOX:
        return (
          <FormControlLabel
            {...field}
            control={
              <CheckBox
                checked={field.value}
                onChange={(event) => handleOnChange(event, field)}
              />
            }
            label={fieldProps?.label}
          />
        );

      case FIELD_TYPE.AUTOCOMPLETE:
        return (
          <Autocomplete
            {...field}
            value={value || ''}
            options={fieldProps?.options || []}
            disablePortal={true}
            getOptionLabel={(option) => option[fieldProps?.itemLabelKey] || ''}
            isOptionEqualToValue={(option, value) =>
              option[fieldProps?.itemValueKey] ===
              value[fieldProps?.itemValueKey]
            }
            onChange={(_event, value) =>
              handleOnChange(_event, field, value, form)
            }
            onSelect={() => form.setFieldTouched(field.name, true)}
            renderInput={(params) => (
              <TextField
                label={fieldProps?.label}
                variant="outlined"
                error={meta.touched && meta.error !== undefined}
                helperText={meta.touched && meta.error}
                {...params}
              />
            )}
          />
        );

      case FIELD_TYPE.CHECKBOX_GROUP:
        return (
          <CheckboxGroup
            options={fieldProps?.options}
            field={field}
            legendTitle={fieldProps?.label}
            itemValueKey={fieldProps?.itemValueKey}
            itemLabelKey={fieldProps?.itemLabelKey}
            directionRow={fieldProps?.isDirectionRow}
            helperText={meta?.touched && meta?.error}
          />
        );

      case FIELD_TYPE.SWITCH:
        return (
          <FormControlLabel
            {...field}
            control={
              <Switch
                checked={field.value}
                onChange={(event) => handleOnChange(event, field)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={fieldProps?.label}
            labelPlacement="start"
          />
        );

      case FIELD_TYPE.MULTI_SELECT:
        return (
          <MultiSelect
            {...field}
            fullWidth
            label={fieldProps?.label}
            disabled={fieldProps?.isDisabled}
            isMultiple={fieldProps?.isMultiple}
            defaultValue={''}
            value={field?.value || []}
            options={fieldProps?.options}
            itemValue={fieldProps?.itemValueKey}
            placeholder={fieldProps?.placeholder || ''}
            itemText={fieldProps?.itemLabelKey}
            error={meta.touched && meta.error !== undefined}
            helperText={meta.touched && meta.error}
            onChange={(event) => handleOnChange(event, field)}
            handleUpdateValue={handleUpdateValue}
            form={form}
            fieldVal={field}
          />
        );

      case FIELD_TYPE.DATE:
        const defaultMaxDate = new Date(fieldProps?.maxDate) as unknown;
        const defaultMinDate = new Date(fieldProps?.minDate) as unknown;
        return (
          <Box className="datePickerContainer">
            <Box className="datePickerLabel">
              {field?.value !== null ? '' : 'MMM DD, YYYY'}
            </Box>
            <DatePicker
              inputFormat={fieldProps?.inputFormat} // TODO from parent
              // views={['month', 'day', 'year']}
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
              value={field?.value}
              onChange={(newDate) => {
                handleOnChange(event, field, newDate, form);
              }}
              shouldDisableDate={disableWeekends}
              minDate={defaultMinDate}
              maxDate={defaultMaxDate}
              PopperProps={{
                placement: 'bottom-end',
                anchorEl: anchorEl,
                className: 'datePickerPopover'
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={fieldProps?.label}
                  showRequired={fieldProps?.showRequired}
                  error={meta.touched && meta.error !== undefined}
                  helperText={meta.touched && meta.error}
                  inputProps={{
                    ...params.inputProps,
                    readOnly: fieldProps?.isReadOnly
                  }}
                  InputProps={{
                    placeholder: 'Select a date',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={opeDatePicker}>
                          <Box className="icon-date-picker" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Box>
        );

      case FIELD_TYPE.TEXTAREA:
        return (
          <Box className="w-100 customTextArea">
            <Typography sx={{ mb: 1 }} variant="body2">
              {fieldProps?.label}
            </Typography>
            <textarea
              className="w-100"
              {...field}
              placeholder={fieldProps?.placeholder}
              fullWidth
              rows={fieldProps?.textareaRowsLine}
            ></textarea>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Field
        className="w-100"
        name={fieldProps?.name}
        type={
          fieldProps?.type === FIELD_TYPE.NUMBER_ONLY
            ? FIELD_TYPE.TEXT
            : fieldProps?.type
        }
        validate={(value: string) => {
          return validateField(
            value,
            fieldProps?.type,
            fieldProps?.validations?.required,
            fieldProps?.label
          );
        }}
        value={fieldProps?.value}
      >
        {({ field, meta, form }) =>
          renderFormField(field, meta, fieldProps?.type, form)
        }
      </Field>
      {/* Can be used in future so keeping this as a commented code */}
      {/* <ErrorMessage
        name={fieldProps?.name}
        component={'div'}
        className="errorState"
      /> */}
    </>
  );
};

export default FormField;
