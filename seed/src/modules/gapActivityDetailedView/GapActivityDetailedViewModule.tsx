import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gapActivityTabUrl } from 'src/modules/GapActionPlan/service/gapAction.service';
import BreadCrumbComponent from 'src/shared/components/Breadcrum/BreadCrumbComponent';
import { getGapActivityStatusOptions } from '../Regulations/apis/RegulationsApi';
import {
  FilterOptionsType,
  filtersType,
  gapActivityDetailsType,
  gapActivityListViewType,
  gapActvityRegulationsType
} from './models';
import { getAgencyList } from '../Tasks/api/tasksApi';
import GapFilterHeader from './component/GapFilterHeader';
import GapTable from './component/GapTable';
import { gapActivityRegulations } from './api/gapActivityDetailedViewApi';

const GapActivityDetailedViewModule = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [gapActivityDetails, setGapActivityDetails] =
    useState<gapActivityDetailsType>({} as gapActivityDetailsType);
  const [regulationsList, setRegulationsList] = useState<
    gapActvityRegulationsType[]
  >([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [pager, setPager] = useState({
    currentPage: 1,
    limit: 15,
    startIndex: 0,
    totalItems: 0,
    totalPages: 0
  });
  const [agencyFilterOptions, setAgencyFilterOptions] = useState<
    FilterOptionsType[]
  >([]);
  const [statusFilterOptions, setStatusFilterOptions] = useState<
    FilterOptionsType[]
  >([]);
  const [filters, setFilers] = useState<filtersType>({} as filtersType);

  useEffect(() => {
    getAgencyFilterOptions();
    getStatusFilterOptions();
    getRegulationList({});
  }, []);

  //API to get Agency filter options
  const getAgencyFilterOptions = async () => {
    const res = await getAgencyList({});
    const { regulatoryOrganizations } = res;
    const filterListForAgency = regulatoryOrganizations?.map((item) => {
      return {
        ...item,
        label: item?.name,
        id: item?.id,
        value: item?.name
      };
    });
    setAgencyFilterOptions(filterListForAgency);
  };

  //API to fetch status filter options
  const getStatusFilterOptions = async () => {
    const payload = { isMainTabView: false };
    const res = await getGapActivityStatusOptions(payload);

    const modifiedResponse = res?.map((option) => {
      return {
        name: option?.displayName,
        id: option?.id,
        value: option?.id,
        label: option?.displayName
      };
    });

    setStatusFilterOptions(modifiedResponse);
  };

  //API to fetch the regulations list based on gap activity Id
  const getRegulationList = async (filters: gapActivityListViewType) => {
    const payload = { gapAssessmentId: activityId, ...filters };
    setTableLoader(true);
    const res = await gapActivityRegulations(payload);
    if (res?.gapAssessments.length > 0) {
      setGapActivityDetails({
        gapAssessmentId: res?.gapAssessments[0].gapAssessmentId,
        gapAssessmentName: res?.gapAssessments[0].gapAssessmentName
      });
    }
    setIsDisabled(res?.isDisabled);
    setRegulationsList(res?.gapAssessments ?? []);
    setPager(res?.pager);
    setTableLoader(false);
  };

  let breadCrumb = [
    {
      title: 'Regulations ',
      className: ''
    },
    {
      title: ' Gap Assessment ',
      className: ''
    },
    {
      title: `${
        gapActivityDetails?.gapAssessmentName || 'gap Assessment Name'
      }`,
      className: ''
    }
  ];

  const handleRedirectOnBreadCrumb = () => {
    navigate(gapActivityTabUrl);
  };

  const onFilterChange = (filter) => {
    setFilers(filter);
    const filtersInStringFormat = getFiltersInString(filter);

    getRegulationList({
      agency: filtersInStringFormat?.agencies,
      status: filtersInStringFormat?.status,
      limit: pager?.limit || 15,
      page: 1
    });
  };

  const getNextPagination = async (nextPage) => {
    const { currentPage: page, limit } = nextPage;
    let allFiltersApplied = getFiltersInString(filters);

    getRegulationList({
      agency: allFiltersApplied?.agencies,
      status: allFiltersApplied?.status,
      limit: limit,
      page: page
    });
  };

  const getFiltersInString = (filter) => {
    let agencies = filter?.agency?.map((item) => item.value).join(',');
    let status = filter?.status?.map((item) => item.value).join(',');
    return { agencies, status };
  };
  return (
    <Box>
      <BreadCrumbComponent
        breadCrumbMenu={breadCrumb}
        redirect={handleRedirectOnBreadCrumb}
      />
      <GapFilterHeader
        agencyFilterOptions={agencyFilterOptions}
        statusFilterOptions={statusFilterOptions}
        gapActivityDetails={gapActivityDetails}
        onFilterChange={onFilterChange}
        isDisabled={isDisabled}
      />
      <GapTable
        tableList={regulationsList}
        pager={pager}
        tableLoader={tableLoader}
        getNextPagination={getNextPagination}
      />
    </Box>
  );
};

export default GapActivityDetailedViewModule;
