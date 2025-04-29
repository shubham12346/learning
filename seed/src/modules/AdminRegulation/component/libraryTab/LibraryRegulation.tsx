import { Box, Grid } from '@mui/material';
import useSearchFile from 'src/modules/Regulations/components/hooks/useSearchFile';
import { RegulationElement } from 'src/shared/components/common/autocomplete/AutoCompleteComponent';
import SearchComponent from 'src/shared/components/common/autocomplete/SearchComponent';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import AveryAccordion from 'src/shared/components/accordion/AveryAccordion';
import NoRegulationsImage from 'src/assets/svg/no-regulation.svg';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import RegulationsList from 'src/modules/Regulations/components/currentTab/RegulationsList';
import {
  fetchRegOrganizationListWithCount,
  fetchRegulationList,
  evaluateRegulation,
  fetchRegulationById,
  REGULATION_LIST,
  REGULATION_BODY,
  fetchOrganizationDropdownOptions
} from '../../service/adminRegulationLibrary.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import RegulationDetailCard from './RegulationDetailCard';

const LibraryRegulation = (tabIndex) => {
  const { t } = useTranslation('adminRegulation');
  const {
    regulatoryOrganization,
    regulationList,
    regulationDetail,
    regulationListBasedOnOrganization,
    regulationBody,
    regOrgLoading
  } = useSelector((state: RootState) => state.adminRegulationReviewed);
  const dispatch = useDispatch<any>();

  // states
  const [noRegulation, setNoRegulation] = useState<boolean>(true);
  const [searchSelected, setSearchSelected] = useState({
    regBodyName: { heading1: 'SEC', sectionNo: 1 },
    regulationList: [{ id: '', name: '' }]
  });
  const [selectedRegulationId, setSelectedRegulationId] = useState('');

  const getRegulationDetailsByID = (regulation) => {
    dispatch(fetchRegulationById(regulation?.id));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getRegulationFromSearchAndSetTheState = (regulation, flag) => {
    let regulationBody = regulatoryOrganization?.filter(
      (item: any) => item?.id === regulation?.organizationId
    );
    let regulationOfAOrg = regulationList.filter(
      (item) => item?.id === regulation?.id
    );
    getRegulationDetailsByID(regulation);
    setSearchSelected({
      regBodyName: {
        heading1: regulationBody[0].name,
        sectionNo: 1
      },
      regulationList: [
        { id: regulationOfAOrg[0]?.id, name: regulationOfAOrg[0]?.name }
      ]
    });
  };

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
    searchedRegulationList,
    setSearchedRegulation
  } = useSearchFile(
    APIEndPoint.adminRegulation.reviewedSearchRegulation,
    getRegulationFromSearchAndSetTheState,
    'searchKeyword'
  );

  // usee Effects
  useEffect(() => {
    fetchAllInitialStates();
  }, [tabIndex]);

  // methods
  const fetchAllInitialStates = () => {
    dispatch(fetchRegulationList('all'));
    dispatch(fetchRegOrganizationListWithCount());
    dispatch(fetchOrganizationDropdownOptions());
  };

  const getListOfEachRegulations = (id) => {
    let regulationOfAOrg = regulationList?.filter(
      (item) => item.organizationId === id
    );
    dispatch(
      evaluateRegulation({ type: REGULATION_LIST, payload: regulationOfAOrg })
    );
  };

  const selectRegulatoryOrgInAccordion = (id: string) => {
    dispatch(
      evaluateRegulation({
        type: REGULATION_BODY,
        payload: id
      })
    );
  };

  useEffect(() => {
    if (regulationList?.length) {
      setNoRegulation(false);
    } else {
      setNoRegulation(true);
    }
    setSearchedRegulation('');
  }, [regulationList]);

  useEffect(() => {
    if (regulationDetail?.regulationId)
      setTimeout(() => {
        setSelectedRegulationId(regulationDetail?.regulationId);
      }, 1000);
  }, [regulationDetail, regulationListBasedOnOrganization]);

  return (
    <Box className=" ">
      <Box className="flex-basic-start width-search-input-box">
        <Box>
          <SearchComponent
            placeholder={t('searchRegulation')}
            width="23.5rem"
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
      </Box>
      <Box sx={{ mt: 6 }}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            {regOrgLoading ? (
              <Box className="flex-basic-center">
                <Box className="spinnerLoading mt-100"></Box>
              </Box>
            ) : (
              <Box>
                {!noRegulation && (
                  <Box className="regulationListScroll">
                    {searchedRegulation
                      ? searchSelected && (
                          <Box className="singleResultAccordionWrapper">
                            <AveryAccordion
                              accordianHeader={searchSelected.regBodyName}
                              accordianId="opened"
                              accordianImage={false}
                              accordianList={searchSelected.regulationList}
                              accordionListActiveItem={
                                searchSelected?.regulationList[0]?.id
                              }
                              expanded="opened"
                              getRegulationDetailsByID={() => {}}
                              handleChange={() => {}}
                              isLoaderShow={false}
                            />
                          </Box>
                        )
                      : regulatoryOrganization && (
                          <RegulationsList
                            regulatoryOrganizationsList={regulatoryOrganization}
                            regulatoryOrganizationsId={getListOfEachRegulations}
                            eachRegulatoryOrganizationsList={
                              regulationListBasedOnOrganization
                            }
                            isLoaderShow={false}
                            getRegulationDetailsByID={getRegulationDetailsByID}
                            isShowEmptyView={false}
                            accordionListActiveItem={
                              selectedRegulationId ??
                              regulationDetail?.regulationId
                            }
                            expanded={regulationBody}
                            setExpanded={selectRegulatoryOrgInAccordion}
                          />
                        )}
                  </Box>
                )}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            {noRegulation ? (
              <Box className="emptyView flex-column-center">
                <EmptyPlaceholder
                  imgWidth={'240'}
                  imageUrl={NoRegulationsImage}
                  titleText={t('NoCurrentRegulationFound')}
                />
              </Box>
            ) : (
              <RegulationDetailCard
                tabType="libraryRegulation"
                searchedRegulation={searchedRegulation}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LibraryRegulation;
