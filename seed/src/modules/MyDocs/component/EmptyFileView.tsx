import { Box } from '@mui/material';
import React from 'react';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import EmptyFile from 'src/assets/svg/EmptyFile.svg';
import { useTranslation } from 'react-i18next';

const EmptyFileView = () => {
  const { t } = useTranslation('mydoc');
  return (
    <Box
      sx={{ py: 17, height: '90%' }}
      className="d-flex justify-content-center align-items-center "
    >
      <EmptyPlaceholder
        imgWidth={'250'}
        imageUrl={EmptyFile}
        titleText={t('emptyFileText')}
      />
    </Box>
  );
};

export default EmptyFileView;
