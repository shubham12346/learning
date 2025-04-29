import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TabView } from '../../shared/components/tabs/Tabs';
import DashboardRegulationsView from './component/DashboardRegulationsView';
import DashboardTaskView from './component/DashboardTaskView';
import DashboardRegulatoryEvents from './component/DashboardRegulatoryEvents';
import DashboardCurrentScore from './component/DashboardCurrentScore';
import DashboardPriorityTasksEnforcement from './component/DashboardPriorityTasksEnforcement';
import { Select } from 'src/shared/components/select/Select';
import { getlistofregulatoryOrganization } from '../OnBoarding/apis/OnBoardingApi';
import {
  getAllRegulationDetails,
  getAllRegulatoryEventDetails,
  getAllTaskDetails,
  getComplianceScoreDetails,
  getEnforcementDateWiseRegulationsDetails,
  getTaskPriorityWiseRegulationsDetails
} from './api/dashboardApi';
import { timeFilterListOptions } from 'src/shared/constants/constants';
import { useNavigate } from 'react-router';
import { setUserDataToLocalStore } from 'src/auth/RBAC/utils';
import { useDispatch } from 'react-redux';
import {
  setUserData,
  setFusionOneUserData
} from '../common/services/common.service';

const DashboardModule = () => {
  //const
  const { t } = useTranslation('dashboard');
  const tablist = [t('regulationsText'), t('task')];
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();

  //states variables
  const [tabIndex, setTabIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [listofRegulatoryOrganization, setListofRegulatoryOrganization] =
    useState<any>();
  const [selectedRegulatoryOrganization, setSelectedRegulatoryOrganization] =
    useState<any>();
  const [constRegulationsDetails, setConstRegulationsDetails] = useState<any>();
  const [regulationsDetails, setRegulationsDetails] = useState<any>();
  const [constTaskDetails, setConstTaskDetails] = useState<any>();
  const [taskDetails, setTaskDetails] = useState<any>();
  const [enforcementData, setEnforcementData] = useState<any>();
  const [taskPriorityData, setTaskPriorityData] = useState<any>();
  const [complianceScore, setComplianceScore] = useState<any>();
  const [selectedTimesOptions, setSelectedTimesOptions] = useState<string>();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [regulatoryEventDetails, setRegulatoryEventDetails] = useState<any>();
  const [selectedTimesOptionVal, setSelectedTimesOptionVal] =
    useState<string>(null);
  const [loaderActive, setIsLoaderActive] = useState<boolean>(false);

  //useEffect
  useEffect(() => {
    getListofRegulatoryOrganization();
    getDetailsOfRegulation('');
    getDetailsOfTask('');
    fetchEnforcementData();
    fetchTaskPriorityData();
    fetchComplianceCcore();
    getRegulatoryEventDetails();
  }, []);

  useEffect(() => {
    if (selectedRegulatoryOrganization) {
      agencyFilterData(selectedRegulatoryOrganization);
    }
    if (selectedTimesOptions) {
      timeFilterChanged(selectedTimesOptions);
    }
  }, [tabIndex]);

  useEffect(() => {
    if (selectedTimesOptionVal !== null) {
      getRegulatoryEventDetails();
    }
  }, [selectedTimesOptionVal]);

  useEffect(() => {
    if (selectedRegulatoryOrganization) {
      agencyFilterData(selectedRegulatoryOrganization);
    }
  }, [regulationsDetails, taskDetails]);

  //methods

  //get list of regulatoryOrganization
  const getListofRegulatoryOrganization = async () => {
    const respData = await getlistofregulatoryOrganization('NA');
    const allOptionData = [
      { id: '0', name: 'All' },
      ...respData?.regulatoryOrganizations
    ];
    setListofRegulatoryOrganization(allOptionData);
  };

  //get regulation details
  const getDetailsOfRegulation = async (selectedVal) => {
    setShowLoader(true);
    const time = { time: selectedVal };
    const respData = await getAllRegulationDetails(selectedVal && time);
    setConstRegulationsDetails(respData);
    setRegulationsDetails(respData);
    setShowLoader(false);
  };

  //get regulatory Event Details
  const getRegulatoryEventDetails = async () => {
    setIsLoaderActive(true);
    const params = { time: selectedTimesOptionVal };
    const respData = await getAllRegulatoryEventDetails(params);
    setRegulatoryEventDetails(respData);
    setIsLoaderActive(false);
  };

  //get task details
  const getDetailsOfTask = async (selectedVal) => {
    setShowLoader(true);
    const time = { time: selectedVal };
    const respData = await getAllTaskDetails(selectedVal && time);
    setConstTaskDetails(respData);
    setTaskDetails(respData);
    setShowLoader(false);
  };

  //click on tab
  const handleTabChange = (event, tabNumber: number) => {
    setTabIndex(tabNumber);
  };

  //agency filter
  const agencyOptionChange = (event) => {
    setSelectedRegulatoryOrganization(event?.target?.value);
    agencyFilterData(event?.target?.value);
  };

  const agencyFilterData = (eventVal) => {
    if (eventVal === 'All') {
      if (tabIndex === 0) {
        setRegulationsDetails(constRegulationsDetails);
      } else if (tabIndex === 1) {
        setTaskDetails(constTaskDetails);
      }
    } else {
      const detailsObject =
        tabIndex === 0 ? constRegulationsDetails : constTaskDetails;
      const selectedAgency = detailsObject?.regulatoryOrganization?.find(
        (item) => item.regulatoryOrganizationName === eventVal
      );
      if (tabIndex === 0) {
        setRegulationsDetails(selectedAgency);
      } else {
        setTaskDetails(selectedAgency);
      }
    }
  };

  //times filter
  const timeFilterOptionChange = (event) => {
    setSelectedTimesOptions(event?.target?.value);
    timeFilterChanged(event?.target?.value);
  };

  //timeFilterChanged
  const timeFilterChanged = (eventVal) => {
    if (tabIndex === 0) {
      getDetailsOfRegulation(eventVal);
    } else if (tabIndex === 1) {
      getDetailsOfTask(eventVal);
    }
  };

  //getEnforcementDateWiseRegulationsDetails
  const fetchEnforcementData = async () => {
    const respData = await getEnforcementDateWiseRegulationsDetails();
    setEnforcementData(respData?.data);
  };

  //getTaskPriorityWiseRegulationsDetails
  const fetchTaskPriorityData = async () => {
    const respData = await getTaskPriorityWiseRegulationsDetails();
    setTaskPriorityData(respData?.taskList);
  };

  //getComplianceCcore
  const fetchComplianceCcore = async () => {
    const respData = await getComplianceScoreDetails();
    setComplianceScore(respData);
  };

  //tab change component
  const renderedTabComponent = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return (
          <DashboardRegulationsView regulationsDetails={regulationsDetails} />
        );
      case 1:
        return <DashboardTaskView taskDetails={taskDetails} />;
    }
  };

  const getCollapseOrNot = (val) => {
    setIsCollapsed(val);
  };

  const selectedTimesOptionsVal = (val) => {
    setSelectedTimesOptionVal(val);
  };

  return (
    <Box className="dashboard">
      <Container maxWidth={'xl'}>
        <Box sx={{ mt: 1 }} className="flex-basic-start w-100">
          <Typography variant={'h3'}>{t('dashboardHeaderText')}</Typography>
        </Box>
        <Box className="w-100" sx={{ mt: 6 }}>
          <Grid container>
            <Grid sx={{ pr: 4 }} item xs={12} sm={12} md={12} lg={8} xl={8}>
              <Box className="mb-30">
                <Card className=" " sx={{ p: 4 }}>
                  <Box className="flex-basic-space-between flex-wrap">
                    <Box className="w-50">
                      <TabView
                        tabindex={tabIndex}
                        onChange={handleTabChange}
                        tablist={tablist}
                      />
                    </Box>
                    <Box className="flex-basic-center flex-wrap">
                      <Box className="filterSelect regDetails">
                        <Select
                          label={''}
                          placeholder="Select Time"
                          value={selectedTimesOptions || 'none'}
                          options={timeFilterListOptions || []}
                          itemValue={'value'}
                          itemText={'name'}
                          onChange={(e) => timeFilterOptionChange(e)}
                        />
                      </Box>
                      <Box className="filterSelect regDetails" sx={{ ml: 6 }}>
                        <Select
                          label={''}
                          placeholder="Select Agency"
                          value={selectedRegulatoryOrganization || 'none'}
                          options={listofRegulatoryOrganization || []}
                          itemValue={'name'}
                          itemText={'name'}
                          onChange={(e) => agencyOptionChange(e)}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box className="mt-27 mb-4">
                    {showLoader ? (
                      <Box
                        sx={{ minHeight: '280px', height: '280px' }}
                        className="flex-basic-center"
                      >
                        <Box className="spinnerLoading"></Box>
                      </Box>
                    ) : (
                      <>{renderedTabComponent(tabIndex)}</>
                    )}
                  </Box>
                </Card>
              </Box>
              <Box>
                <DashboardRegulatoryEvents
                  isLoaderActive={loaderActive}
                  selectedTimesOptionsValue={selectedTimesOptionsVal}
                  regulatoryEventDetails={regulatoryEventDetails}
                />
              </Box>
            </Grid>
            <Grid
              sx={{ pl: smallDevice ? '' : 4 }}
              item
              xs={12}
              sm={12}
              md={12}
              lg={4}
              xl={4}
            >
              <Box className="mb-30">
                <DashboardPriorityTasksEnforcement
                  enforcementData={enforcementData}
                  taskPriorityData={taskPriorityData}
                  listofRegulatoryOrganization={listofRegulatoryOrganization}
                  isCollapsed={isCollapsed}
                />
              </Box>
              <Box>
                <DashboardCurrentScore
                  getCollapseOrNot={getCollapseOrNot}
                  complianceScore={complianceScore}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardModule;
