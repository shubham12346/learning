import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  getFineAmountForBarGraph,
  getFineDeatilsForDonutGrap
} from '../api/fineApi';
import {
  BarGraph,
  DonutGraphDataTypes
} from '../model/fineTypes';
import FineGraphs from './FineGraphs';
import FineHeaderFilters from './FineHeaderFilters';

const FineHeader = ({ agencyListOptions, yearListOptions }) => {
  //const
  const yearsArray = yearListOptions.map((obj)=>parseInt(obj.year))
  const defaultYear = `${Math.max(...yearsArray)}`
  const [selectedAgency, setSelectedAgency] = useState('');
  const [agencyLabel, setAgencyLabel] = useState('');

  const [selectedYear, setSelecteYear] = useState(defaultYear);
  const [selectedSection, setSelectedSection] = useState<any>();
  const [donutGraphData, setDonutGraphData] = useState<DonutGraphDataTypes>();
  const [barGraphData, setBarGraphData] = useState<any>();
  const [donutloader, setDonutLoader] = useState<boolean>();
  const [barGraphLoader, setBarGraphloader] = useState<boolean>();

  //set donut graph data after filters
  useEffect(() => {
    let agency = selectedAgency === 'ALL' ? null : selectedAgency;
    fetchFineAmountForBarGraph({
      agency: agency,
      year: selectedYear || defaultYear
    });
    fetchFineDetailsForDonutGraph({
      agency: agency,
      year: selectedYear || defaultYear
    });
  }, [selectedYear, selectedAgency]);

  const handleSelectedYear = (e) => {
    if (e.target.value) {
      setSelecteYear(e.target.value);
      setSelectedSection({
        seriesPoint: 'none',
        dataIndex: 'none',
        labelName: 'null'
      });
    }
  };

  const handleSelectedAgency = (e) => {
    if (e.target.value === 'ALL') {
      setSelectedSection({
        seriesPoint: 'none',
        dataIndex: 'none',
        labelName: 'null'
      });
    }
    setSelectedAgency(e.target.value);
    setAgencyLabel(e.target.value);
  };

  const handleSelectedDonutSection = (seriesPoint, labelName, dataIndex) => {
    setSelectedSection({
      seriesPoint: seriesPoint,
      dataIndex: dataIndex,
      labelName: labelName
    });
    setAgencyLabel(labelName);
  };

  // get Fine Amount data for bar graph
  const fetchFineAmountForBarGraph = async (payload?: BarGraph) => {
    setBarGraphloader(true);
    const res = await getFineAmountForBarGraph(payload);
    const { regulatoryOrganization, maxFine } = res;
    let labels = [];
    let series = [];

    regulatoryOrganization?.forEach((item) => {
      if (item?.fineAmount > 0) {
        labels.push(item?.regulatoryOrganizationName);
        series.push(item?.fineAmount);
      }
    });
    const logValues = series.map((value) => Math.log10(Number(value) + 1)); // Adding 1 to handle log(0)

    setBarGraphData({ labelName: labels, seriesData: logValues, maxFine });
    setBarGraphloader(false);
  };

  // get Fine Details for donut graph on
  const fetchFineDetailsForDonutGraph = async (payload?: BarGraph) => {
    setDonutLoader(true);
    const res = await getFineDeatilsForDonutGrap(payload);
    const {
      regulatoryOrganization,
      allAgencyFine,
      averageFine,
      totalEnforcementAction
    } = res;
    let seriesData = [];
    regulatoryOrganization?.forEach((item) => {
      let percentage =
        (Number(item?.totalEnforcementAction) / totalEnforcementAction) * 100;
      seriesData.push(Math.round(percentage));
    });
    const labelsName = regulatoryOrganization?.map(
      (item) => item?.regulatoryOrganizationName
    );
    const graphsCardData = {
      allAgencyFine,
      averageFine,
      totalEnforcementAction
    };

    setDonutGraphData({ seriesData, labelsName, graphsCardData });
    setDonutLoader(false);
  };

  return (
    <Box className="fineheader mb-20">
      <Box className="fineheaderFilters mb-20">
        <FineHeaderFilters
          agencyOptions={agencyListOptions}
          handleSelectedAgency={handleSelectedAgency}
          selectedAgency={selectedAgency}
          handleSelectedYear={handleSelectedYear}
          selectedYear={selectedYear}
          yearOptions={yearListOptions}
        />
      </Box>
      <Box className="fineGraphs">
        <FineGraphs
          donutGraphData={donutGraphData}
          horizonatlGraphData={barGraphData}
          donutGraphLoader={donutloader}
          barGraphLoader={barGraphLoader}
          handleSelectedDonutSection={handleSelectedDonutSection}
          selectedSection={selectedSection}
          selectedAgency={agencyLabel}
        />
      </Box>
    </Box>
  );
};

export default FineHeader;
