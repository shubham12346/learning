import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabView } from '../../shared/components/tabs/Tabs';
import CurrentRegulations from './components/currentTab/CurrentRegulations';
import ProposedRegulations from './components/currentTab/ProposedRegulations';
import LibraryContainerWrapper from './components/libraryTab/LibrarayContainerWrapper';
import GapAssessment from './components/gapAssessmentTab/GapAssessment';
import { useLocation } from 'react-router-dom';

const Regulations = (props) => {
  //Constants
  const { actions } = props;

  const { t } = useTranslation('regulations');
  const location = useLocation();
  const tablist = ['Current', 'Proposed', 'Library', 'Gap Assessment'];
  const params = new URLSearchParams(location?.search);
  const tab = params?.get('tab');

  //states variables
  const [tabIndex, setTabIndex] = useState<number | null>(0);
  const [libraryRegId, setLibraryRegId] = useState<string | null>(null);

  const updateCategoryBasedOnUrl = () => {
    if (tab === 'gapAssessment') {
      setTabIndex(3);
    }
  };

  useEffect(() => {
    updateCategoryBasedOnUrl();
  }, [location]);

  //methods
  const handleTabChange = (event, tabNumber: number) => {
    setTabIndex(tabNumber);
    setLibraryRegId(null);
  };

  const handleSelectedRegulation = (
    regulationId: any,
    tabIndex: number = 0
  ) => {
    setTabIndex(tabIndex);
    setLibraryRegId(regulationId);
  };
  const renderedTabComponent = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return (
          <CurrentRegulations
            tabIndex={tabIndex}
            libraryRegId={libraryRegId}
            actions={actions}
          />
        );

      case 1:
        return <ProposedRegulations actions={actions} />;

      case 2:
        return (
          <LibraryContainerWrapper
            handleSelectedRegulation={handleSelectedRegulation}
            actions={actions}
          />
        );

      case 3:
        return <GapAssessment />;

      default:
        return (
          <CurrentRegulations
            tabIndex={tabIndex}
            actions={actions}
            libraryRegId={libraryRegId}
          />
        );
    }
  };

  return (
    <Box className="regulations">
      <Container maxWidth={'xl'}>
        <Box sx={{ mt: 1 }} className="flex-basic-start w-100">
          <Typography variant={'h3'}>{t('regulationsHeaderTex')}</Typography>
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

export default Regulations;
