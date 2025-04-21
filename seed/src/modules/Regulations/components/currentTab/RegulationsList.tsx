import { Box } from '@mui/material';
import AveryAccordion from 'src/shared/components/accordion/AveryAccordion';
import { RegulatoryList } from '../../model/RegulationsInterface';

export interface RegulationsListProps {
  regulatoryOrganizationsList: RegulatoryList[];
  regulatoryOrganizationsId: (getRegulatoryOrganizationsId: string) => void;
  eachRegulatoryOrganizationsList: any;
  isLoaderShow: boolean;
  isShowEmptyView: boolean;
  getRegulationDetailsByID: (item: any) => void;
  accordionListActiveItem: string;
  filter?: string;
  setExpanded?: any;
  expanded?: string;
}

const RegulationsList = ({
  regulatoryOrganizationsList,
  regulatoryOrganizationsId,
  eachRegulatoryOrganizationsList,
  isLoaderShow,
  accordionListActiveItem,
  getRegulationDetailsByID,
  isShowEmptyView,
  filter,
  expanded,
  setExpanded
}: RegulationsListProps) => {
  //constant
  const handleChange = (accordionId: string) => {
    if (expanded == accordionId) {
      setExpanded('');
    } else {
      setExpanded(accordionId);
    }
    if (expanded !== accordionId) {
      regulatoryOrganizationsId(accordionId);
    }
  };

  //filter organizations data
  const filteredData = regulatoryOrganizationsList?.filter(
    (item) => item?.totalRegulations?.[`${filter}`] > 0
  );

  const tempFilteredOrgData = filter
    ? filteredData
    : regulatoryOrganizationsList;
  return (
    <>
      {isShowEmptyView ? (
        <Box className="flex-basic-center">
          <Box className="spinnerLoading mt-100"></Box>
        </Box>
      ) : (
        <>
          {tempFilteredOrgData?.map((item: any) => (
            <Box key={item.id} sx={{ mb: 4 }}>
              <AveryAccordion
                accordianHeader={{
                  heading1: item.name,
                  sectionNo:
                    item.totalRegulations?.[`${filter}`] ?? item?.totalCount
                }}
                accordianId={item.id}
                accordianImage={true}
                accordianList={eachRegulatoryOrganizationsList}
                expanded={expanded}
                handleChange={handleChange}
                isLoaderShow={isLoaderShow}
                getRegulationDetailsByID={getRegulationDetailsByID}
                accordionListActiveItem={accordionListActiveItem}
              />
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default RegulationsList;
