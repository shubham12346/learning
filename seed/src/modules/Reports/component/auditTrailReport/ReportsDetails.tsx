import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/shared/components/Breadcrum/Breadcrumb';
import TabView from 'src/shared/components/tabs/Tabs';
import AuditTrailReportList from './AuditTrailReportList';
import AuditGeneratedReportList from './AuditGeneratedReportList';

const ReportsDetails = (props) => {
  //const
  const { goBackToReports, listOfRegulations, listOfAgency, actions } = props;
  const { t } = useTranslation('reports');

  //hide tab for temporary 't('generatedReports')'
  const tablist = [t('auditTrailReport'), t('generatedReports')];

  //states variables
  const [tabIndex, settabIndex] = useState(0);

  // handle tabs change
  const handleTabChange = (event, tabNumber: number) => {
    settabIndex(tabNumber);
  };

  const renderedTabComponent = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return (
          <AuditTrailReportList
            listOfAgency={listOfAgency}
            listOfRegulations={listOfRegulations}
            handleTabChange={settabIndex}
            actions={actions}
          />
        );
      case 1:
        return <AuditGeneratedReportList />;
    }
  };
  return (
    <Container maxWidth={'xl'}>
      <Box className="reportsDetails mt-0">
        <Box className="mb-24 flex-basic-start w-100">
          <Breadcrumb
            parentName={'Reports'}
            childNamePath={'Audit Trail Report'}
            goBackToReports={goBackToReports}
          />
        </Box>
        <Box className="w-100">
          <TabView
            tabindex={tabIndex}
            onChange={handleTabChange}
            tablist={tablist}
          />
        </Box>
        <Box className="mt-32">{renderedTabComponent(tabIndex)}</Box>
      </Box>
    </Container>
  );
};

export default ReportsDetails;
