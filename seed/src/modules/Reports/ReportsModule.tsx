import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import ReportsDetails from './component/auditTrailReport/ReportsDetails';
import ReportsDefaultView from './component/ReportsDefaultView';
import { getlistofregulatoryOrganization } from '../OnBoarding/apis/OnBoardingApi';
import { getListOfRegulations } from './api/reportsApi';
import AnnualReportsDetails from './component/annualAndPolicyReport/AnnualReportsDetails';
import GapAnalysisReport from './component/gapAnalysis/GapAnalysisReportContainer';
const ReportsModule = (props) => {
  //const
  const { t } = useTranslation('reports');
  const { actions } = props;
  //state var
  const [isOnReportDefault, setIsOnReportDefault] = useState<boolean>(true);
  const [isReportNameView, setReportNameView] = useState<string>('');
  const [listOfAgency, setListOfAgency] = useState<any>([]);
  const [listOfRegulations, setListOfRegulations] = useState<any>([]);

  //useEffects
  useEffect(() => {
    fetchListofAgency();
    fetchListOfRegulations();
  }, []);

  //methods

  //get list of regulatoryOrganization
  const fetchListofAgency = async () => {
    const respData = await getlistofregulatoryOrganization('NA');
    const agencyListData = respData?.regulatoryOrganizations.map((item) => {
      return {
        label: item.name,
        id: item.id,
        value: item.name
      };
    });
    setListOfAgency(agencyListData);
  };

  //get list of regulations
  const fetchListOfRegulations = async () => {
    const respData = await getListOfRegulations();
    const regulationsListData = respData?.data.map((item) => {
      return {
        label: item.name,
        id: item.id,
        value: item.name
      };
    });
    setListOfRegulations(regulationsListData);
  };

  const toggleReportView = (isActive, reportName) => {
    setIsOnReportDefault(isActive);
    setReportNameView(reportName);
  };
  const renderComponent = (isReportNameView) => {
    switch (isReportNameView) {
      case 'Audit Trail Report':
        return (
          <ReportsDetails
            goBackToReports={toggleReportView}
            listOfAgency={listOfAgency}
            listOfRegulations={listOfRegulations}
            actions={actions}
          />
        );
      case 'Annual Report':
        return (
          <AnnualReportsDetails
            goBackToReports={toggleReportView}
            listOfRegulations={listOfRegulations}
            actions={actions}
          />
        );
      case 'Gap Report':
        return (
          <GapAnalysisReport
            goBackToReports={toggleReportView}
            listOfAgency={listOfAgency}
            listOfRegulations={listOfRegulations}
            actions={actions}
          />
        );
      default:
        return <ReportsDefaultView goToReportDetails={toggleReportView} />;
    }
  };

  return (
    <Container maxWidth={'xl'}>
      <Box className="reports mt-0">
        {isOnReportDefault && (
          <Box sx={{ mt: 1 }} className="flex-basic-start w-100">
            <Typography variant={'h3'}>{t('reports')}</Typography>
          </Box>
        )}
        <Box className="w-100" sx={{ mt: 6 }}>
          {renderComponent(isReportNameView)}
        </Box>
      </Box>
    </Container>
  );
};

export default ReportsModule;
