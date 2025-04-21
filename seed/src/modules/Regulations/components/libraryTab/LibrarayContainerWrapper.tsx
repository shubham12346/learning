import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AveryAccordion from 'src/shared/components/accordion/AveryAccordion';
import SearchComponent from 'src/shared/components/common/autocomplete/SearchComponent';
import RegulationsList from '../currentTab/RegulationsList';
import RegulationSummary from '../currentTab/RegulationSummary';
import useSearchFile from '../hooks/useSearchFile';
import { RegulationElement } from 'src/shared/components/common/autocomplete/AutoCompleteComponent';
import { useTranslation } from 'react-i18next';
import { RegulatoryList } from '../../model/RegulationsInterface';
import {
  addRegulationFromLibrayToCurrentRegulation,
  geListOfRegulatoryOrganizationInLibraryTab,
  getDetailOfAParticularRegulationInLibraryTab,
  getListOfRegulationInLibraryTab
} from '../../apis/RegulationsApi';
import { useNavigate } from 'react-router-dom';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { DeleteFileModal as AddCurrentRegulationModal } from 'src/modules/ActionPlan/component/Files/DeleteFileModal';
import NoRegulationsImage from 'src/assets/svg/no-regulation.svg';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';

export type TLibraryContainerWrapperType = {
  handleSelectedRegulation: (regulation: any, tabIndex: number) => void;
};

const LibraryContainerWrapper = ({ handleSelectedRegulation, actions }) => {
  const { t } = useTranslation('regulations');
  const navigate = useNavigate();
  const [selectedRegulation, setSelectedRegulation] = useState<any>();
  const [isLoaderActive, setIsLoaderActive] = useState<boolean>(false);
  const [isLoaderShow, setIsLoaderShow] = useState(false);
  const [regulatoryOrganizationsList, setRegulatoryOrganizationsList] =
    useState([] as RegulatoryList[]);
  const [eachRegulatoryOrganizationsList, setEachRegulatoryOrganizationsList] =
    useState([] as any[]);
  const [accordionListActiveItem, setAccordionListActiveItem] = useState(
    {} as any
  );
  const [isShowEmptyView, setisShowEmptyView] = useState(true);
  const [regulationDetail, setRegulationDetail] = useState<any>(null);
  const [addRegulation, setAddRegulation] = useState<any>();
  const [openAddRegnModal, setOpenAddRegModal] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string>('');

  const getRegulationDetailsByID = async (regulationItem: any) => {
    try {
      setIsLoaderActive(true);
      const regulationId = regulationItem?.id || regulationItem.regulationId;

      let respData = await getDetailOfAParticularRegulationInLibraryTab(
        regulationId
      );
      setExpanded(respData?.regulatoryOrganizationId);
      setAccordionListActiveItem(regulationId);
      setRegulationDetail(respData);
      setTheSingleSearchedAccordionList(respData);
    } catch (error) {
    } finally {
      setIsLoaderActive(false);
    }
  };

  const setTheSingleSearchedAccordionList = (respData) => {
    let accordianHeader = {
      heading1: respData?.pager?.totalItems,
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

  const {
    getOptionLabel,
    handelOpen,
    handleClose,
    handleInputChange,
    handleOnchange,
    isOptionEqualToValue,
    open,
    searchOnLoading,
    searchedRegulationList,
    searchedRegulation
  } = useSearchFile(
    `${APIEndPoint.libraryRegulations.searchRegulationInLibrary}`,
    getRegulationDetailsByID
  );

  const handleAccordian = () => {};

  // use effects
  useEffect(() => {
    getListOfRegulations();
  }, []);

  //methods
  const getListOfRegulations = async () => {
    setisShowEmptyView(true);
    let respData = await geListOfRegulatoryOrganizationInLibraryTab({});
    setRegulatoryOrganizationsList(respData?.regulatoryOrganizations);
    const regOrgWithLibraryRegulation =
      checkIfRegulationOrgHaveLibraryRegulation(
        respData?.regulatoryOrganizations
      );
    getListOfEachRegulations(regOrgWithLibraryRegulation?.id);
    setisShowEmptyView(false);
  };
  const checkIfRegulationOrgHaveLibraryRegulation = (organizations) => {
    for (let index = 0; index < organizations?.length; index++) {
      if (organizations[index]?.totalRegulations?.proposed >= 1) {
        return organizations[index];
      }
    }
    return organizations[0];
  };

  const getListOfEachRegulations = async (regulatoryOrganizationId: string) => {
    setIsLoaderShow(true);
    const params = {
      regulatoryOrganizationId: regulatoryOrganizationId
    };
    let respData = await getListOfRegulationInLibraryTab(
      APIEndPoint.libraryRegulations.searchRegulationInLibrary,
      params
    );
    setEachRegulatoryOrganizationsList(respData.libraryRegulations);
    getRegulationDetailsByID(respData.libraryRegulations[0]);
    setIsLoaderShow(false);
  };

  const addRegulationInCurrentTab = async () => {
    if (addRegulation?.regulationId) {
      try {
        const res = await addRegulationFromLibrayToCurrentRegulation(
          addRegulation?.regulationId
        );
        await getRegulationDetailsByID(addRegulation);
        showSuccessMessage(res?.message, '', {});
      } catch (error) {
        showErrorMessage(error?.response.data?.cause, {});
      }
    }
    handleCloseAddRegModal();
  };

  const handleAddRegulation = (regulation) => {
    setAddRegulation(regulation);
    setOpenAddRegModal(true);
  };

  const handleCloseAddRegModal = () => {
    setOpenAddRegModal(false);
  };

  const navigateBackToCurrentReg = (regulation) => {
    handleSelectedRegulation(regulation?.regulationId, 0);
  };

  const checkIfLibraryRegulationIsPresent = () => {
    if (eachRegulatoryOrganizationsList?.length >= 1 && regulationDetail) {
      return true;
    }
    if (selectedRegulation?.accordianList?.length >= 1 && regulationDetail) {
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
                  isLoaderShow={isLoaderShow}
                  filter={'library'}
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
            {isLoaderActive ? (
              <>
                <Box sx={{ pt: 10 }} className="flex-basic-center">
                  <Box className="spinnerLoading mt-100"></Box>
                </Box>
              </>
            ) : (
              <>
                {checkIfLibraryRegulationIsPresent() ? (
                  <RegulationSummary
                    isProposed={true}
                    regulationDetail={regulationDetail}
                    library={{
                      addRegulationToCurrentOrRedirectToCurrentRegulation:
                        regulationDetail?.isCurrentRegulation
                          ? navigateBackToCurrentReg
                          : handleAddRegulation,
                      isLibrary: true
                    }}
                    showActionPlan={false}
                    showCommentDate={false}
                    showPolicies={false}
                    actions={actions}
                  />
                ) : (
                  <Box className="emptyView flex-column-center">
                    <EmptyPlaceholder
                      imgWidth={'240'}
                      imageUrl={NoRegulationsImage}
                      titleText={t('NoLibraryRegulationFound')}
                    />
                  </Box>
                )}

                <AddCurrentRegulationModal
                  selectedItem={{ name: addRegulation?.regulationName }}
                  open={openAddRegnModal}
                  handleDelete={addRegulationInCurrentTab}
                  handleClose={handleCloseAddRegModal}
                  subText={t('addregulationDescriptionStart')}
                  subTextEnd={t('addregulationDescriptionEnd')}
                  modalTitle={`${t('addRegulation')}`}
                  btnPrimaryText={t('add')}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LibraryContainerWrapper;
