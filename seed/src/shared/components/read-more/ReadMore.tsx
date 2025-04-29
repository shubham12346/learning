import React, { useState } from 'react';
import { MAX_CHAR_LIMIT } from '../../constants/constants';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddLineBreak from 'src/modules/Regulations/components/currentTab/AddLineBreak';

interface ReadMoreProps {
  text: string;
  maxCharacters?: number;
  charsToShow?: number;
  typographyVariant?: any;
  showDialog?: boolean;
  onClickReadMore?: () => void;
}

export const ReadMore = ({
  text,
  maxCharacters = MAX_CHAR_LIMIT.CHAR_LENGTH,
  charsToShow = 200,
  typographyVariant = 'body2',
  showDialog = false,
  onClickReadMore
}: ReadMoreProps) => {
  const { t } = useTranslation('english');
  // state variables
  const [isReadMore, setIsReadMore] = useState(true);

  // methods
  const toggleReadMore = () => {
    if (showDialog) {
      onClickReadMore();
    } else {
      setIsReadMore(!isReadMore);
    }
  };
  return (
    <>
      {text?.length < maxCharacters ? (
        <Typography variant={typographyVariant} className="textWeightRegular">
          {text}
        </Typography>
      ) : (
        <>
          <Typography
            sx={{ lineHeight: 'inherit' }}
            variant={typographyVariant}
            className="textWeightRegular"
          >
            {isReadMore ? (
              <AddLineBreak text={text?.slice(0, charsToShow) || ''} />
            ) : (
              <AddLineBreak text={text || ''} />
            )}
            <span
              onClick={toggleReadMore}
              className="cursorPointer readMoreText"
            >
              {isReadMore ? t('readMoreText') : t('showLessText')}
            </span>
          </Typography>
        </>
      )}
    </>
  );
};

export default ReadMore;
