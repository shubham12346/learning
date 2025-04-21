import { Box, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabView from 'src/shared/components/tabs/Tabs';
import DashboardTaskEnforcementList from './DashboardTaskEnforcementList';
import { Select } from 'src/shared/components/select/Select';
import DashboardTaskPriorityList from './DashboardTaskPriorityList';
import { useNavigate } from 'react-router';
import { BASEPATH, TASKS } from 'src/shared/constants/routes';
import { DashboardPriorityTasksEnforcementPropsTypes } from '../model/dashboardModel';

const DashboardPriorityTasksEnforcement = (
  props: DashboardPriorityTasksEnforcementPropsTypes
) => {
  //const
  const {
    listofRegulatoryOrganization,
    enforcementData,
    taskPriorityData,
    isCollapsed
  } = props;
  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');
  const tablist = [t('priorityTasks')];

  //states variables
  const [tabIndex, setTabIndex] = useState(0);
  const [taskEnforcementData, setTaskEnforcementData] = useState<any>();
  const [taskListData, setTaskListData] = useState<any>();
  const [selectedAgency, setSelectedAgency] = useState<any>();

  //useEffects
  useEffect(() => {
    setTaskEnforcementData(enforcementData);
  }, [enforcementData]);

  useEffect(() => {
    setTaskListData(taskPriorityData);
  }, [taskPriorityData]);

  useEffect(() => {
    if (selectedAgency) {
      filteredData(selectedAgency);
    }
  }, [tabIndex]);

  //methods
  const handleTabChange = (event, tabNumber: number) => {
    setTabIndex(tabNumber);
  };

  //agency filter
  const agencyOptionChange = (event) => {
    setSelectedAgency(event?.target?.value);
    filteredData(event?.target?.value);
  };

  //filterdata
  const filteredData = (optionVal) => {
    if (optionVal === 'All') {
      if (tabIndex === 0) {
        setTaskListData(taskPriorityData);
      } else if (tabIndex === 1) {
        setTaskEnforcementData(enforcementData);
      }
    } else {
      if (tabIndex === 0) {
        const selectedAgency = taskPriorityData?.filter(
          (item) => item.regulatoryBody === optionVal
        );
        setTaskListData(selectedAgency);
      } else if (tabIndex === 1) {
        const selectedAgency = enforcementData?.filter(
          (item) => item.organization === optionVal
        );
        setTaskEnforcementData(selectedAgency);
      }
    }
  };
  const gotTaskList = () => {
    navigate(`/${BASEPATH}/${TASKS}`);
  };

  const renderedTabComponent = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return (
          <DashboardTaskPriorityList
            taskListData={taskListData}
            dateLabel={t('dueDate')}
            isCollapsed={isCollapsed}
            gotTaskList={gotTaskList}
          />
        );
      case 1:
        return (
          <DashboardTaskEnforcementList
            isCollapsed={isCollapsed}
            enforcementData={taskEnforcementData}
            dateLabel={t('enforcementDate')}
          />
        );
    }
  };

  return (
    <Card sx={{ p: 5 }}>
      <Box className="w-100 flex-basic-start tabScroll">
        <TabView
          tabindex={tabIndex}
          onChange={handleTabChange}
          tablist={tablist}
        />
        <Box className="filterSelect taskEnforcementView">
          <Select
            label={''}
            placeholder="Agencies"
            value={selectedAgency || 'none'}
            options={listofRegulatoryOrganization || []}
            itemValue={'name'}
            itemText={'name'}
            onChange={(e) => agencyOptionChange(e)}
          />
        </Box>
      </Box>

      <Box className="mt-32" sx={{ minHeight: '270px' }}>
        {renderedTabComponent(tabIndex)}
      </Box>
    </Card>
  );
};

export default DashboardPriorityTasksEnforcement;
