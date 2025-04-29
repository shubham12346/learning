import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { TextAreaWithReadMoreProps } from '../model';
import ErrorHelperText from 'src/shared/components/common/ErrorHelperText';
import { useTranslation } from 'react-i18next';

const TextAreaWithReadMore = (props: TextAreaWithReadMoreProps) => {
  const {
    value,
    title,
    limit,
    text,
    textAreaRows = 5,
    handleOnChange,
    handleReadMore,
    inputName,
    errorText,
    regulationDetail,
    placeholder = 'Enter description'
  } = props;

  const { t } = useTranslation('adminRegulation');
  const renderText = () => {
    if (text?.split(' ')?.length > limit) {
      const truncatedText = text?.split(' ')?.slice(0, limit).join(' ');
      return (
        <Box>
          {truncatedText}...{' '}
          <button
            className="readMoreText"
            onClick={() => {
              handleReadMore(inputName, title, regulationDetail);
            }}
          >
            {t('readmore')}
          </button>
        </Box>
      );
    } else {
      return (
        <Box className="w-100 customTextArea">
          <textarea
            name={inputName}
            className="w-100"
            rows={textAreaRows}
            placeholder={placeholder}
            value={value}
            onChange={(event) => {
              handleOnChange(event, inputName);
            }}
          >
            {Text}
          </textarea>
          <ErrorHelperText message={errorText} />
        </Box>
      );
    }
  };

  return (
    <Box sx={{ pb: '24px' }} className="textAreaWithReadMore">
      <Typography variant="h4" className="mb-14">
        {title}
      </Typography>
      <Box>{renderText()}</Box>
    </Box>
  );
};

export default TextAreaWithReadMore;
