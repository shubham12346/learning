import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FormField from 'src/shared/components/form-field/FormField';
import { FormFieldType } from 'src/shared/components/form-field/service/formFieldInterface';

const ChatbotForm = (props) => {
  const { t } = useTranslation('setting');
  const { loader } = props;
  const handleInputChange = () => {};

  const chatbotFields: FormFieldType[] = [
    {
      name: 'chatbotName',
      id: 'chatbotName',
      type: 'text',
      showInfoIcon: false,
      label: `${t('chatbotFormLabels.chatbotLabel')}`,
      placeholder: `${t('chatbotFormLabels.chatbotPlaceholder')}`,
      showRequired: true,
      multiline: false,
      validations: {
        required: true,
        maxLength: 100,
        minLength: 1,
      },
      errorMessages: {
        requiredErrMsg: `${t('chatbotFormLabels.chatbotLabel')} ${t(
          'chatbotFormLabels.requiredError'
        )}`
      },
      handleFieldChange: handleInputChange
    },
    {
      id: 'status',
      name: 'status',
      type: 'select',
      label: `${t('chatbotFormLabels.statusLabel')}`,
      placeholder: `${t('chatbotFormLabels.statusPlaceholder')}`,
      itemValueKey: 'value',
      itemLabelKey: 'item',
      showRequired: true,
      options: [
        { item: 'Offline', value: 'offline' },
        { item: 'Available', value: 'available' },
        { item: 'Busy', value: 'busy' }
      ],
      validations: {
        required: true
      },
      errorMessages: {
        requiredErrMsg: `${t('chatbotFormLabels.statusLabel')} ${t(
          'chatbotFormLabels.requiredError'
        )}`
      },
      handleFieldChange: handleInputChange
    },
    {
      name: 'edgeBricksChatbotId',
      id: 'edgeBricksChatbotId',
      type: 'text',
      showInfoIcon: false,
      label: `${t('chatbotFormLabels.edgeBricksChatbotIdLabel')}`,
      placeholder: `${t('chatbotFormLabels.edgeBricksChatbotIdPlaceholder')}`,
      showRequired: true,
      multiline: false,
      validations: {
        required: true,
        maxLength: 50,
        minLength: 1
      },
      errorMessages: {
        minLengthErrMsg: `${t('chatbotFormLabels.minLengthError')}`
      },
      handleFieldChange: handleInputChange
    },
    {
      id: 'ipAddress',
      name: 'ipAddress',
      type: 'text',
      label: `${t('chatbotFormLabels.ipAddressLabel')}`,
      placeholder: `${t('chatbotFormLabels.ipAddressPlaceholder')}`,
      showRequired: true,
      multiline: false,
      validations: {
        required: true,
        maxLength: 50,
        minLength: 7
      },
      errorMessages: {
        minLengthErrMsg: `${t('chatbotFormLabels.ipAddressMinLengthError')}`
      },
      handleFieldChange: handleInputChange
    },
    {
      id: 'apiKeyName',
      name: 'apiKeyName',
      type: 'text',
      label: `${t('chatbotFormLabels.apiKeyNameLabel')}`,
      placeholder: `${t('chatbotFormLabels.apiKeyNamePlaceholder')}`,
      showRequired: true,
      multiline: false,
      isDisabled: true,
      validations: {
        maxLength: 255,
      },
      errorMessages: {
        minLengthErrMsg: `${t('chatbotFormLabels.minLengthError')}`
      },
      handleFieldChange: handleInputChange
    },
    {
      id: 'apiKeyValue',
      name: 'apiKeyValue',
      type: 'text',
      label: `${t('chatbotFormLabels.apiKeyValueLabel')}`,
      placeholder: `${t('chatbotFormLabels.apiKeyValuePlaceholder')}`,
      showRequired: true,
      multiline: false,
      validations: {
        required: true,
        maxLength: 255,
        minLength: 1
      },
      errorMessages: {
        minLengthErrMsg: `${t('chatbotFormLabels.apiKeyValueMinLengthError')}`
      },
      handleFieldChange: handleInputChange
    }
  ];

  return (
    <>
      {loader && (
        <Box className="spinnerWrapper flex-basic-center mt-100 mb-100 ">
          <Box className="spinnerLoading "></Box>
        </Box>
      )}
      {!loader && (
        <Grid
          container
          spacing={5}
          sx={{ px: 8, pt: 10, pb: 4 }}
          columnSpacing={10}
        >
          {chatbotFields?.map((field, index) => (
            <Grid
              key={`${index}-${field?.name}`}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
            >
              <FormField fieldProps={field} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ChatbotForm;
