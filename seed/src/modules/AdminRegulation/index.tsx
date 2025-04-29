import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabView } from '../../shared/components/tabs/Tabs';
import EvaluateComponent from './component/evaluateTab/EvaluateRegulation';
import LibraryComponent from './component/libraryTab/LibraryRegulation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AdminRegulation = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //Constants

  const { t } = useTranslation('adminRegulation');

  const EVALUATE = 'Evaluate';
  const LIBRARY = 'Reviewed';
  const tablist = [EVALUATE, LIBRARY];

  //states variables
  const [tabIndex, setTabIndex] = useState<number | null>(0);

  //methods
  const handleTabChange = (event, tabNumber: number) => {
    setTabIndex(tabNumber);
  };

  const renderedTabComponent = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return <EvaluateComponent tabIndex={tabIndex} />;

      case 1:
        return <LibraryComponent tabIndex={tabIndex} />;
    }
  };
  return (
    <Box className="regulations">
      <Container maxWidth={'xl'}>
        <Box sx={{ mt: 1 }} className="flex-basic-start w-100">
          <Typography variant={'h3'}>{t('regulation')}</Typography>
        </Box>
        <Box className="w-100" sx={{ mt: 6 }}>
          <TabView
            tabindex={tabIndex}
            onChange={handleTabChange}
            tablist={tablist}
          />
          <Box className="mt-24">{renderedTabComponent(tabIndex)}</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminRegulation;
