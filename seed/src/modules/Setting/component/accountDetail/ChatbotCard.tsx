import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { grey as muiGrey } from '@mui/material/colors';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { chatbotStatus } from 'src/shared/utils/utils';
import chatbotImage from './../../../../assets/images/chatbotImage.png';

const ChatbotCard = ({ chatbot, handleDelete, handleEdit }) => {
  const {
    id,
    name,
    status,
    ip,
    apiKeyName,
    apiKeyValue,
    lastAssignedJob,
    statusAtEdgeBricks
  } = chatbot;
  const { t } = useTranslation('setting');
  const [isApiKeyHovered, setIsApiKeyHovered] = useState(false);

  function maskString(str) {
    if (str.length <= 4) {
      return str;
    }

    const maskedPart = '*'.repeat(str.length - 4);
    const visiblePart = str.slice(-4);
    return maskedPart + visiblePart;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: 2,
        marginBottom: 2,
        position: 'relative',
        marginTop: 5
      }}
    >
      <Card
        variant="outlined"
        sx={{
          flex: 1,
          borderRadius: 2,
          boxShadow: 2,
          padding: 2,
          position: 'relative',
          overflow: 'hidden',
          height: '180px'
        }}
      >
        {/* Background Image on the right side */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 1,
            width: '20%',
            height: '60%',
            backgroundImage: `url(${chatbotImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            opacity: '0.06'
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            display: 'flex',
            alignItems: 'center',
            zIndex: 2
          }}
        >
          <Box className="buttonControl">
            <Box className="d-flex">
              <Box
                className="flex-basic-center cursorPointer"
                onClick={() => {
                  handleEdit(id);
                }}
                sx={{ mr: 4 }}
              >
                <span className="icon-ic_edit_chat iconStyle"></span>
              </Box>
              <Box
                className="flex-basic-center cursorPointer"
                onClick={(event) => {
                  handleDelete(id);
                }}
              >
                <span className="icon-trash iconStyle"></span>
              </Box>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ zIndex: 2 }}>
          <Box className="d-flex align-items-end" sx={{ width: '50%' }}>
            <Typography variant="h6" fontWeight="bold">
              {name}
            </Typography>
            <Box className="pl-15">
              <Chip
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                size="small"
                color={'default'}
                className={`chip-status 
                     ${chatbotStatus[status.toLowerCase()]}`}
                variant="outlined"
              />
            </Box>
          </Box>
          <Divider sx={{ marginY: 2 }} />
          {/* Chatbot Details */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color={muiGrey[700]}>
                <strong>{t('chatbotFormLabels.ipAddress')}:</strong> {ip}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color={muiGrey[700]}>
                <strong>{t('chatbotFormLabels.statusAtEdgeBricks')}:</strong> {statusAtEdgeBricks}
              </Typography>
            </Grid>

            {apiKeyName && (
              <Grid item xs={6}>
                <Typography variant="body2" color={muiGrey[700]}>
                  <strong>{t('chatbotFormLabels.apiKeyName')}:</strong> {apiKeyName}
                </Typography>
              </Grid>
            )}

            <Grid item xs={6}>
              <Typography variant="body2" color={muiGrey[700]}>
                <strong>{t('chatbotFormLabels.lastAssignedJob')}:</strong>{' '}
                {moment(lastAssignedJob).isValid()
                  ? moment(lastAssignedJob).format('MMM DD, YYYY')
                  : 'NA'}
              </Typography>
            </Grid>

            {apiKeyValue && (
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  color={muiGrey[700]}
                  onMouseEnter={() => setIsApiKeyHovered(true)}
                  onMouseLeave={() => setIsApiKeyHovered(false)}
                >
                  <strong>{t('chatbotFormLabels.apiKeyValue')}:</strong>
                  {isApiKeyHovered ? apiKeyValue : maskString(apiKeyValue)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChatbotCard;
