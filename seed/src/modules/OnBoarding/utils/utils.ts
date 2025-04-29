import { FIELD_TYPE } from 'src/shared/constants/constants';
import { OnboardingFormfields } from '../models';
import * as Yup from 'yup';
import { endOf2099, startOfThisYear } from 'src/shared/utils/utils';

export function updateComplianceDetails(obj) {
  if (
    obj.hasOwnProperty('complianceDetails') &&
    obj.complianceDetails !== null
  ) {
    const complianceDetails = obj.complianceDetails;

    for (const key in complianceDetails) {
      if (obj.hasOwnProperty(key) && obj[key] !== null) {
        complianceDetails[key] = obj[key];
      }
    }
  }
  if (obj.yearEnd === 'other') {
    const date = new Date(obj.yearEndOther);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    const mmddFormat = `${month}/${day}`;
    obj.yearEnd = mmddFormat;
  } else if (obj.yearEnd === 'calenderYear') {
    obj.yearEnd = '12/31';
  }

  return obj;
}
export const getOrganizationProfile = (values: any, businessType: any) => {
  const organizaitonObj = {
    organizationName: values[OnboardingFormfields.businessName],
    businessType: businessType,
    questionList: [
      {
        question: OnboardingFormfields.aum,
        answer: values[OnboardingFormfields.aum]
      },
      {
        question: OnboardingFormfields.totalGrossRevenue,
        answer: values[OnboardingFormfields.totalGrossRevenue]
      }
    ],
    incorporateCountry: values[OnboardingFormfields.incorporateCountry],
    incorporateState: values[OnboardingFormfields.incorporateState],
    totalEmployeeWorkingUnderOrganization:
      +values[OnboardingFormfields.employeeUnderOrg],
    employeeLocation: values[OnboardingFormfields.employeeLocatedState].map(
      () => {
        return {
          country: values[OnboardingFormfields.employeeLocatedCountry],
          state: values[OnboardingFormfields.employeeLocatedState]
        };
      }
    ),
    clientLocation: values[OnboardingFormfields.clientLocatedState].map(() => {
      return {
        country: values[OnboardingFormfields.clientLocatedCountry],
        state: values[OnboardingFormfields.clientLocatedState]
      };
    })
  };
  return organizaitonObj;
};

export enum QUESTION_SECTION {
  BUSINESS_DETAILS = 'bd',
  COMPLIANCE_DETAILS = 'cd'
}

// !PLEASE DO NOT CHANGE ANYTHING!
// Generate Default Questions
export const generateDefaultQuestion = ({
  t,
  businessTypeList,
  handleInputChange,
  handleBusinessTypeChange
}) => {
  return [
    {
      name: 'organizationName',
      id: 'organizationName',
      type: 'text',
      label: t('nameofBusiness'),
      placeholder: 'Enter name of business',
      validations: {
        required: true,
        maxLength: 50,
        minLength: 3
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'businessType',
      id: 'businessType',
      type: 'select',
      label: t('businessType'),
      options: businessTypeList,
      itemValueKey: 'name',
      itemLabelKey: 'displayName',
      placeholder: 'Select type of business',
      validations: {
        required: true
      },
      handleFieldChange: handleBusinessTypeChange
    }
  ];
};

// generate inital value
export const generateInitialValueForFormik = (data, countryList = []) => {
  const initialNameObject = {};
  const initialRequiredObject = {};
  data.forEach((item) => {
    if (item.hasOwnProperty('name')) {
      if (item.type == 'location') {
        item.options.forEach((ele) => {
          if (ele.id == 'country') {
            initialNameObject[`${item.name}Country`] = countryList[0]?.id || '';
          }
          if (ele.id == 'state') {
            initialNameObject[`${item.name}State`] = '';
          }
        });
      } else {
        if (item.hasOwnProperty('name')) {
          initialNameObject[item.name] = '';
        }
      }
    }
  });

  const requriedFields = data.filter((item) => item.isRequired == true);
  requriedFields.forEach((item) => {
    if (item.hasOwnProperty('name')) {
      if (item.type == 'location') {
        item.options.forEach((ele) => {
          if (ele.id == 'country') {
            initialRequiredObject[`${item.name}Country`] =
              countryList[0]?.id || '';
          }
          if (ele.id == 'state') {
            initialRequiredObject[`${item.name}State`] = '';
          }
        });
      } else {
        if (item.hasOwnProperty('name')) {
          initialRequiredObject[item.name] = '';
        }
      }
    }
    // if (item.hasOwnProperty('name')) {
    //   initialRequiredObject[item.name] = '';
    // }
  });
  return { initialNameObject, initialRequiredObject };
};

// Check formfiled Type
export const formFiledType = ({
  handleInputChange,
  handleLocationChange,
  handleRadioChange,
  countryList,
  stateList,
  field
}) => {
  switch (field.type) {
    case FIELD_TYPE.RADIO:
      return generateRadioFormObject({
        handleInputChange,
        handleRadioChange,
        field
      });
    case 'location':
      return generateLocationFormObject({
        handleLocationChange,
        countryList,
        stateList,
        field
      });
    case FIELD_TYPE.TEXT:
    case FIELD_TYPE.INTEGER_ONLY:
      return generateIntegerOnlyFormObject({
        field
      });
    case FIELD_TYPE.MULTI_SELECT:
    case FIELD_TYPE.SELECT:
      return generateSelectFormObject({
        field
      });
    default:
      return null;
  }
};

// Create Dyanamic form
export const generateDynamicForm = ({
  handleInputChange,
  handleLocationChange,
  handleRadioChange,
  countryList,
  stateList,
  businessDetailsResp
}: any) => {
  const a = businessDetailsResp.map((field) => {
    return formFiledType({
      handleInputChange,
      handleLocationChange,
      handleRadioChange,
      countryList,
      stateList,
      field
    });
  });
  return a;
};

export const generateSelectFormObject = ({ field }) => {
  return {
    ...field,
    itemValueKey: 'id',
    itemLabelKey: 'label',
    formWidth: 12,
    isDirectionRow: true,
    validations: {
      required: field.isRequired ?? false
    }
  };
};

export const generateRadioFormObject = ({
  handleInputChange,
  handleRadioChange,
  field
}) => {
  return {
    ...field,
    itemValueKey: 'id',
    itemLabelKey: 'label',
    formWidth: 12,
    isDirectionRow: true,
    showTextField: false,
    textField: [
      {
        name: `${field.name}Other`,
        id: `${field.name}Other`,
        inputFormat: 'MM/dd',
        type: 'date',
        isReadOnly: true,
        label: '',
        minDate: startOfThisYear,
        maxDate: endOf2099,
        placeholder: 'Select calendar end-year format MM/DD',
        showRequired: false,
        validations: {
          required: true
        },
        handleFieldChange: handleInputChange
      }
      // {

      //   type: 'text',
      //   hasChildQuestions: false,
      //   isRequired: true,
      //   label: '',
      //   formWidth: 12,
      //   helperText: 'Date must be in the format MM/DD',
      //   placeholder: 'Select calendar end-year format MM/DD',
      //   handleFieldChange: handleInputChange,
      //   validations: {
      //     required: true
      //   }
      // }
    ],
    handleFieldChange: handleRadioChange,
    validations: {
      required: field.isRequired ?? false
    }
  };
};

export const generateIntegerOnlyFormObject = ({ field }) => {
  return {
    ...field,
    formWidth: 12,
    validations: {
      required: field.isRequired ?? false,
      maxLength: field.maxlength ?? 6
    }
  };
};

// !PLEASE DO NOT CHANGE ANYTHING!
export const generateLocationFormObject = ({
  handleLocationChange,
  countryList,
  stateList,
  field
}) => {
  let locationDetails = [];
  field.options.forEach((ele) => {
    if (ele.id == 'country') {
      locationDetails.push({
        name: `${field.name}Country`,
        id: `${field.name}Country`,
        type: ele.value,
        hasChildQuestions: ele.hasChildQuestions,
        isRequired: ele.isRequired ?? true,
        label: 'Country',
        options: countryList,
        itemValueKey: 'id',
        itemLabelKey: 'name',
        formWidth: 12,
        placeholder: 'Select Country',
        validations: {
          required: ele.isRequired ?? true
        },
        handleFieldChange: handleLocationChange,
        isDisabled: !!countryList[0]
      });
    }
    if (ele.id == 'state') {
      locationDetails.push({
        name: `${field.name}State`,
        id: `${field.name}State`,
        type: ele.value,
        hasChildQuestions: ele.hasChildQuestions,
        isRequired: ele.isRequired ?? true,
        label: 'State',
        options: stateList || [],
        itemValueKey: 'id',
        itemLabelKey: 'name',
        formWidth: 12,
        placeholder: 'Select State',
        validations: {
          required: ele.isRequired ?? true
        }
      });
    }
  });

  return {
    ...field,
    itemValueKey: 'id',
    itemLabelKey: 'label',
    formWidth: 12,
    locationDetails: locationDetails,
    validations: {
      required: field.isRequired ?? false
    }
  };
};

// !PLEASE DO NOT CHANGE ANYTHING!
// find Object from Array and update
export const updateStateInQuestion = async (questionObject) => {
  const questionObjectIndex = await questionObject.questions.findIndex(
    (obj) => obj['name'] == questionObject['key']
  );

  if (questionObjectIndex !== -1) {
    let countryObjectIndex = questionObject.questions[
      questionObjectIndex
    ].locationDetails.findIndex((obj) =>
      obj.name.includes(`${questionObject.key}State`)
    );
    if (countryObjectIndex !== -1) {
      questionObject.questions[questionObjectIndex].locationDetails[
        countryObjectIndex
      ].options = questionObject.statelist;
    }
  }

  return questionObject.questions;
};

// !PLEASE DO NOT CHANGE ANYTHING!
export const getCountryKeys = (data) => {
  const countryKeys = {};

  for (const key in data) {
    if (key.endsWith('Country')) {
      countryKeys[key] = data[key];
    }
  }
  return countryKeys;
};

export const generateSchemaValidation = (fields) => {
  const requiredText = 'This Field is required';
  const schema = {};

  fields.forEach((field) => {
    switch (field.type) {
      case 'integer_only':
        schema[field.name] = Yup.number().integer().required(requiredText);
        break;
      case 'text':
        if (
          'crdOrSecFilingNo'.toLocaleLowerCase() ===
          field.name.toLocaleLowerCase()
        ) {
          schema[field.name] = Yup.string().required(requiredText);
        } else {
          schema[field.name] = Yup.string()
            // to be removed
            //.matches(
            //   /^[a-zA-Z0-9\s]+$/,
            //   'Input cannot contain special characters'
            // )
            .test(
              'not-white-spaces',
              'Input cannot be only white spaces',
              (value) => !/^\s+$/.test(value)
            )
            .test(
              'not-only-numbers',
              'Input cannot be only numbers',
              (value) => !/^\d+$/.test(value.trim())
            )
            .required(requiredText);
        }
        break;
      case 'location':
        field.locationDetails.forEach((field) => {
          if (field.type != 'multi-select') {
            schema[field.name] = Yup.string().required(requiredText);
          } else {
            if (field.isRequired) {
              schema[field.name] = Yup.array()
                .min(1, 'Select at least one element')
                .of(Yup.string().required(requiredText));
            }
          }
        });
        break;
      case 'select':
        schema[field.name] = Yup.string().required(requiredText);
        break;
      case 'multi-select':
        schema[field.name] = Yup.array().of(
          Yup.string().required(requiredText)
        );
        break;
      case 'radio':
        schema[field.name] = Yup.string().required(requiredText);
        break;
      default:
        break;
    }
  });

  return {
    businessType: Yup.string().required('Type of Business is required'),
    organizationName: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must not exceed 50 characters')
      // to be removed
      // .matches(/^[a-zA-Z0-9\s]+$/, 'Input cannot contain special characters')
      .test(
        'not-white-spaces',
        'Input cannot be only white spaces',
        (value) => !/^\s+$/.test(value)
      )
      .test(
        'not-only-numbers',
        'Input cannot be only numbers',
        (value) => !/^\d+$/.test(value.trim())
      )
      .required(requiredText),

    ...schema
  };
};

export enum RegulationAcceptanceStatusEnum {
  SUGGESTED = 'suggested',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  SELECTED = 'selected'
}

export const addZeroAtFrontIfNumIsLessThan10 = (num: number): string => {
  if (num <= 9 && num >= 0) {
    return `0${num}`;
  }
  return `${num}`;
};
