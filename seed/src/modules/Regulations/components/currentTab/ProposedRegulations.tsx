import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RegulationsList from './RegulationsList';
import {
  getAllListofRegulatoryAccepted,
  getAllListProposeRegulations,
  getProposedRegulationDetails,
  getAllSearchedProposedRegulation
} from '../../apis/RegulationsApi';

import { RegulatoryList } from '../../model/RegulationsInterface';
import RegulationSummary from './RegulationSummary';
import { RegulationElement } from 'src/shared/components/common/autocomplete/AutoCompleteComponent';
import SearchComponent from 'src/shared/components/common/autocomplete/SearchComponent';
import AveryAccordion from 'src/shared/components/accordion/AveryAccordion';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoRegulationsImage from 'src/assets/svg/no-regulation.svg';

const ProposedRegulations = ({ actions }) => {
  //constant
  const { t } = useTranslation('regulations');
  //state variables
  const [regulatoryOrganizationsList, setRegulatoryOrganizationsList] =
    useState([] as RegulatoryList[]);
  const [eachRegulatoryOrganizationsList, setEachRegulatoryOrganizationsList] =
    useState([] as any[]);
  const [regulationDetails, setRegulationDetails] = useState<any>(null);
  const [isLoaderShow, setIsLoaderShow] = useState(true);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isShowEmptyView, setIsShowEmptyView] = useState(true);
  const [accordionListActiveItem, setAccordionListActiveItem] = useState(
    {} as any
  );
  //searched states
  const [searchedRegulationList, setSearchedRegulationList] = useState<any>();
  const [open, setOpen] = useState(false);
  const [isLoadingOnSearch, setIsLoadingOnSearch] = useState(false);
  const [searchedSelected, setSearchedSelected] = useState<boolean>(false);
  const [selectedRegulation, setSelectedRegulation] = useState<{
    accordianHeader: { heading1: string; sectionNo: number };
    accordianList: { id: number | string; name: string }[];
  }>();
  const [expanded, setExpanded] = useState<string>('');

  //useEffect
  useEffect(() => {
    getListOfRegulations();
  }, []);

  //methods
  const getListOfRegulations = async () => {
    setIsShowEmptyView(true);
    let respData = await getAllListofRegulatoryAccepted();
    setRegulatoryOrganizationsList(respData?.regulatoryOrganizations);
    const regOrg = checkIfRegulationOrgHaveProposedRegulation(
      respData?.regulatoryOrganizations
    );
    getListOfEachRegulations(regOrg?.id);
    setIsShowEmptyView(false);
  };

  const checkIfRegulationOrgHaveProposedRegulation = (organizations) => {
    for (let index = 0; index < organizations?.length; index++) {
      if (organizations[index]?.totalRegulations?.proposed >= 1) {
        return organizations[index];
      }
    }
    return organizations[0];
  };

  const getListOfEachRegulations = async (regulatoryOrganizationId: string) => {
    setIsLoaderShow(true);
    setEachRegulatoryOrganizationsList([]);
    const params = {
      regulatoryOrganizationId: regulatoryOrganizationId
    };
    let respData = await getAllListProposeRegulations(params);
    setEachRegulatoryOrganizationsList(respData.proposeRegulations);
    getRegulationDetailsByID(respData.proposeRegulations[0]);
    setIsLoaderShow(false);
  };

  const getRegulationDetailsByID = async (
    regulationItem: any,
    isSearched = false
  ) => {
    setIsLoaderActive(true);
    try {
      let respData = await getProposedRegulationDetails(regulationItem.id);
      setAccordionListActiveItem(regulationItem.id);
      setRegulationDetails(respData);
      setExpanded(respData?.regulatoryOrganizationId);
      if (isSearched) {
        setSearchedAccordionList(respData);
      }
    } catch (error) {
    } finally {
      setIsLoaderActive(false);
    }
  };

  // set single accordion values

  const setSearchedAccordionList = (respData) => {
    let accordianHeader = {
      heading1: respData.regulatoryBody,
      sectionNo: 1
    };
    let accordianList: {
      id: number | string;
      name: string;
    }[] = [{ id: 'opened', name: respData.regulationName }];

    setSelectedRegulation({
      accordianHeader,
      accordianList
    });
  };

  //---- seacrh functions //
  const getSearchedRegulattion = async (searchKeyword: string) => {
    const params = {
      searchRegulation: searchKeyword
    };
    const seacrhedList = await getAllSearchedProposedRegulation(params);
    return seacrhedList;
  };

  const handleInputChange = async (event: any) => {
    const searchKeys = event?.target?.value?.trim();
    if (searchKeys?.length >= 3) {
      setIsLoadingOnSearch(true);
      setOpen(true);
      setSearchedRegulationList([]);
      const seacrhedList = await getSearchedRegulattion(searchKeys);
      setSearchedRegulationList(seacrhedList?.proposeRegulations);
      setIsLoadingOnSearch(false);
    } else {
      setOpen(false);
    }
  };

  const handleOnchange = async (event: any, value: any) => {
    if (value?.id) {
      setSearchedSelected(true);
      await getRegulationDetailsByID(value, true);
      handleClose();
    } else {
      setSearchedSelected(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isOptionEqualToValue = (option, value) => {
    return option?.name === value?.name;
  };
  const getOptionLabel = (option) => {
    if (option) {
      if (
        option?.name &&
        (option?.organization || option?.regulatoryOrganizationName)
      ) {
        return `${option?.organization || option?.regulatoryOrganizationName}-${
          option?.name
        }`;
      }
    }
  };

  const handleAccordian = (item) => {};

  const checkIfItHasRegulation = () => {
    if (selectedRegulation?.accordianList?.length >= 1 && regulationDetails) {
      return true;
    }

    if (eachRegulatoryOrganizationsList?.length >= 1 && regulationDetails) {
      return true;
    }
    return false;
  };

  return (
    <Box className="current">
      <Box className="flex-basic-start width-search-input-box ">
        <SearchComponent
          placeholder={t('searchbyregulationAgencyPlaceholder')}
          width="21.5rem"
          handelOpen={() => {}}
          handleClose={handleClose}
          getOptionLabel={getOptionLabel}
          handleInputChange={handleInputChange}
          handleOnchange={handleOnchange}
          isOptionEqualToValue={isOptionEqualToValue}
          options={searchedRegulationList}
          loading={isLoadingOnSearch}
          open={open}
          renderOption={(props, option) => (
            <li {...props} key={option.name}>
              <RegulationElement regulation={option} />
            </li>
          )}
        />
      </Box>
      <Box sx={{ mt: 6 }}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Box className="regulationListScroll">
              {searchedSelected ? (
                selectedRegulation?.accordianList?.length && (
                  <Box className="singleResultAccordionWrapper">
                    <AveryAccordion
                      accordianHeader={selectedRegulation?.accordianHeader}
                      accordianId="opened"
                      accordianImage={false}
                      accordianList={selectedRegulation?.accordianList}
                      accordionListActiveItem="opened"
                      expanded="opened"
                      getRegulationDetailsByID={handleAccordian}
                      handleChange={handleAccordian}
                      isLoaderShow={false}
                    />
                  </Box>
                )
              ) : (
                <RegulationsList
                  regulatoryOrganizationsList={regulatoryOrganizationsList}
                  regulatoryOrganizationsId={getListOfEachRegulations}
                  eachRegulatoryOrganizationsList={
                    eachRegulatoryOrganizationsList
                  }
                  isLoaderShow={isLoaderShow}
                  filter={'proposed'}
                  getRegulationDetailsByID={getRegulationDetailsByID}
                  isShowEmptyView={isShowEmptyView}
                  accordionListActiveItem={accordionListActiveItem}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9}>
            {isLoaderActive && !checkIfItHasRegulation() && (
              <Box sx={{ pt: 10 }} className="flex-basic-center">
                <Box className="spinnerLoading mt-100"></Box>
              </Box>
            )}
            {!isLoaderActive && checkIfItHasRegulation() && (
              <RegulationSummary
                isProposed={true}
                regulationDetail={regulationDetails}
                showPolicies={false}
                showActionPlan={false}
                showCommentDate
                actions={actions}
              />
            )}
            {!isLoaderActive && !checkIfItHasRegulation() && (
              <Box className="emptyView flex-column-center">
                <EmptyPlaceholder
                  imgWidth={'240'}
                  imageUrl={NoRegulationsImage}
                  titleText={t('NoProposedRegulationFound')}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProposedRegulations;
