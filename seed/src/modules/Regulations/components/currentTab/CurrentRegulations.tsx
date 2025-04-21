import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RegulationsList from './RegulationsList';
import { useParams } from 'react-router-dom';
import {
  getAllListofRegulatoryAccepted,
  getListOfEachRegulatoryAct,
  getRegulationDetails
} from '../../apis/RegulationsApi';

import { RegulatoryList } from '../../model/RegulationsInterface';
import RegulationSummary from './RegulationSummary';
import { RegulationElement } from 'src/shared/components/common/autocomplete/AutoCompleteComponent';
import SearchComponent from 'src/shared/components/common/autocomplete/SearchComponent';
import AveryAccordion from 'src/shared/components/accordion/AveryAccordion';
import useSearchFile from '../hooks/useSearchFile';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoRegulationsImage from 'src/assets/svg/no-regulation.svg';

interface CurrentRegulationsProps {
  tabIndex?: number;
  libraryRegId?: string;
  actions: string[];
}

const CurrentRegulations = ({
  tabIndex,
  libraryRegId,
  actions
}: CurrentRegulationsProps) => {
  //constant
  const { t } = useTranslation('regulations');
  let { regId } = useParams();
  //state variables
  const [regulatoryOrganizationsList, setRegulatoryOrganizationsList] =
    useState([] as RegulatoryList[]);
  const [eachRegulatoryOrganizationsList, setEachRegulatoryOrganizationsList] =
    useState([] as any[]);
  const [regulationDetails, setRegulationDetails] = useState<any>({});
  const [isLoaderShow, setIsLoaderShow] = useState(true);
  const [isShowEmptyView, setIsShowEmptyView] = useState(true);
  const [accordionListActiveItem, setAccordionListActiveItem] = useState('');
  const [selectedRegulation, setSelectedRegulation] = useState<{
    accordianHeader: { heading1: string; sectionNo: number };
    accordianList: { id: number | string; name: string }[];
  }>();
  const [expanded, setExpanded] = useState<string>('');

  //useEffect

  useEffect(() => {
    if (libraryRegId || regId) {
      onRefresh(libraryRegId || regId);
    } else {
      getListOfRegulations();
    }
  }, [regId, libraryRegId]);
  //methods

  const getListOfRegulations = async () => {
    setIsShowEmptyView(true);
    const params = {
      regulationAcceptanceStatus: 'accepted'
    };
    let respData = await getAllListofRegulatoryAccepted(params);
    setRegulatoryOrganizationsList(respData.regulatoryOrganizations);
    if (!regId && !libraryRegId)
      getListOfEachRegulations(respData.regulatoryOrganizations[0]?.id);
    setIsShowEmptyView(false);
  };

  const getListOfEachRegulations = async (
    regulatoryOrganizationId: string,
    isSearched = false
  ) => {
    setIsLoaderShow(true);
    const params = {
      regulationAcceptanceStatus: 'accepted',
      regulatoryOrganizationId: regulatoryOrganizationId
    };
    let respData = await getListOfEachRegulatoryAct(params);
    setEachRegulatoryOrganizationsList(respData.data);
    if (!regId && !libraryRegId && !isSearched) {
      getRegulationDetailsByID(respData.data[0]);
    }

    setIsLoaderShow(false);
  };

  const getRegulationDetailsByID = async (
    regulationItem: any,
    searchedRegulation = false
  ) => {
    let regulationId = regulationItem.id || regulationItem?.regulationId;
    let respData = await getRegulationDetails(regulationId);
    setRegulationDetails(respData);
    setAccordionListActiveItem(regulationId);
    setExpanded(respData?.regulatoryOrganizationId);
    if (searchedRegulation) {
      setSearchedAccordionList(respData);
      getListOfEachRegulations(respData?.regulatoryOrganizationId, true);
    }
  };

  //---- search states  //
  const {
    getOptionLabel,
    handelOpen,
    handleClose,
    handleInputChange,
    handleOnchange,
    isOptionEqualToValue,
    open,
    searchOnLoading,
    searchedRegulation,
    searchedRegulationList
  } = useSearchFile(
    APIEndPoint.currentRegulations.searchRegulation,
    getRegulationDetailsByID,
    {regulationAcceptanceStatus:'accepted'}
  );

  const onRefresh = async (id: string) => {
    let respData = await getRegulationDetails(id);
    getListOfRegulations();
    getListOfEachRegulations(respData?.regulatoryOrganizationId);
    setRegulationDetails(respData);

    if (searchedRegulation) {
      setSearchedAccordionList(respData);
    } else {
      setAccordionListActiveItem(id);
      setExpanded(respData?.regulatoryOrganizationId);
    }
  };

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

  const handleAccordian = (item) => {};
  const checkIfCurrentRegulationIsPresent = () => {
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
          handelOpen={handelOpen}
          handleClose={handleClose}
          getOptionLabel={getOptionLabel}
          handleInputChange={handleInputChange}
          handleOnchange={handleOnchange}
          isOptionEqualToValue={isOptionEqualToValue}
          options={searchedRegulationList}
          loading={searchOnLoading}
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
              {searchedRegulation ? (
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
                  filter={'accepted'}
                  isLoaderShow={isLoaderShow}
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
            {checkIfCurrentRegulationIsPresent() ? (
              <RegulationSummary
                regulationDetail={regulationDetails}
                showPolicies={true}
                showActionPlan
                isProposed={false}
                actions={actions}
              />
            ) : (
              <Box className="emptyView flex-column-center">
                <EmptyPlaceholder
                  imgWidth={'240'}
                  imageUrl={NoRegulationsImage}
                  titleText={t('NoCurrentRegulationFound')}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CurrentRegulations;
