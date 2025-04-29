import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import BreadCrumbComponent from 'src/shared/components/Breadcrum/BreadCrumbComponent';
import { Button } from 'src/shared/components/button/Button';
import {
    showErrorMessage,
    showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { addChatbot, getChatbotList } from '../../api/settingAPI';
import ChatbotForm from './ChatbotForm';

const formatFormData = (data) => {
  return {
    name: data.chatbotName,
    edgeBricksChatbotId: parseInt(data.edgeBricksChatbotId, 10), // Convert to integer
    status: data.status,
    detail: {
      key: data.apiKeyName,
      value: data.apiKeyValue,
      type: 'api_key',
      ip: data.ipAddress
    }
  };
};

const AddChatbotForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('setting');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatbotId = queryParams.get('chatbotId'); 
  

  const [loader, setLoader] = useState<boolean>(false);
  const [formInitialValues, setFormInitialValues] = useState({
    edgeBricksChatbotId: '',
    chatbotName: '',
    ipAddress: '',
    status: '',
    apiKeyName: 'X-ECHATBOT-API-KEY',
    apiKeyValue: ''
  });

  if (chatbotId) {
  }

  let breadCrumb = [
    {
      title: `${t('settingTitle')}`,
      className: ''
    },
    {
      title: `${t('chatbotConfig')}`,
      className: ''
    },
    {
      title: `${chatbotId ? `${t('chatbotFormLabels.editChatbot')}` : `${t('addNewChatbot')}`}`,
      className: ''
    }
  ];

  const getChatbotDataById = async (chatbotId) => {
    setLoader(true);
    const res = await getChatbotList(chatbotId);
    const { name, ip, status, apiKeyName, apiKeyValue, edgeBricksChatbotId } =
      res[0];
    setFormInitialValues({
      edgeBricksChatbotId,
      chatbotName: name,
      ipAddress: ip,
      status,
      apiKeyName,
      apiKeyValue
    });
    setLoader(false);
  };

  const saveChatbot = async (payload) => {
    try {
      const res = await addChatbot(payload);
      showSuccessMessage(res?.message, '', {
        position: 'top-right'
      });
      handleRedirectOnBreadCrumb();
    } catch (err) {
      showErrorMessage(err?.response?.data?.cause, {
        position: 'top-right'
      });
    }
  };

  useEffect(() => {
    if (chatbotId) {
      getChatbotDataById(chatbotId);
    }
  }, [chatbotId]);

  const handleRedirectOnBreadCrumb = () => {
    navigate('/avery/setting?page=chatbotList');
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const formattedData = formatFormData(values);
      saveChatbot(formattedData);
    }
  });
  const { handleSubmit } = formik;
  return (
    <Box>
      <BreadCrumbComponent
        breadCrumbMenu={breadCrumb}
        redirect={handleRedirectOnBreadCrumb}
      />
      <Box className="mt-24">
        <Card>
          <CardHeader
            sx={{ py: 6, px: 8, minHeight: '5.875rem' }}
            title={
              chatbotId
                ? t('chatbotFormLabels.editChatbot')
                : t('addNewChatbot')
            }
          />

          <Divider className="divider" />
          <CardContent sx={{ p: 3 }} className="averyAitaskCardBody ">
            <FormikProvider value={formik}>
              <form >
                <ChatbotForm loader={loader} />
              </form>
            </FormikProvider>
          </CardContent>
          <CardActions>
            <Box
              sx={{ py: 4, px: 4 }}
              className="flex-basic-space-between w-100"
            >
              <Box className="flex-basic-end w-60">
                <Button
                  variant="outlined"
                  type="submit"
                  className="mr-24"
                  btnText={t('btnText.cancel')}
                  onClick={handleRedirectOnBreadCrumb}
                  sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  btnText={t('btnText.save')}
                  disabled={!formik.isValid}
                  onClick={(event: any) => {
                    handleSubmit(event);
                  }}
                  sx={{ py: '0.62rem', px: '2rem', minWidth: '120px' }}
                />
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default AddChatbotForm;
