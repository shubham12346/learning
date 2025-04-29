import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Grid } from '@mui/material';
import './onBoarding.scss';
import {
  deleteRegulationDetails,
  getRegulationDetails,
  getlistofregulatoryOrganization
} from '../apis/OnBoardingApi';

import { RegulatoryOrganization } from './RegulatoryOrganization';
import { RegulationDetailsInfo } from './RegulationDetailsInfo';
import { RegulationDetailsModal } from './RegulationDetailsModal';
import { selectCommon } from 'src/modules/common/services/common.service';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { useTranslation } from 'react-i18next';
import { RegulationAcceptanceStatusEnum } from '../utils/utils';

export const RegulationDetails = ({}) => {
  const { userData } = useSelector(selectCommon);
  const { t } = useTranslation('onboarding');

  const [detailDeleteModalOpenFlag, setDetailDeleteModalOpenFlag] =
    useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailModalFlag, setIsDetailModalFlag] = useState(true);
  const [regulatoryOrganizations, setRegulatoryOrganizations] = useState([]);
  const [regulationDetailsInfo, setRegulationDetailsInfo] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<any>({});
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);


  interface regulationCountAndNewAddedType{
    totalCount :number,
    newAdded? :string[]
  }

  const [regCountAndNewAdded, setRegCountAndNewAdded] = useState<Map<string,regulationCountAndNewAddedType>>(
    JSON.parse(localStorage.getItem('regCountAndNewAdded')) || new Map<string,regulationCountAndNewAddedType>
  );
  useEffect(() => {
    getBasicDetails();
  }, []);

  // Store regulatoryOrganizations
  const getBasicDetails = async () => {
    let resp = await getlistofregulatoryOrganization(
      userData?.organizationUid[0]
    );
    setRegulatoryOrganizations(resp.regulatoryOrganizations ?? []);
    createObjectForSelectedRegulationAndTotalCount(resp.regulatoryOrganizations)
    fetchRegulationDetails(resp.regulatoryOrganizations[0]);
  };

  const fetchRegulationDetails = async (org) => {
    setSelectedOrganizations(org);
    setLoader(true);
    let regulationDetails = await getRegulationDetails(
      userData?.organizationUid[0],
      `?regulatoryOrganizationId=${org.id}`
    );
    setRegulationDetailsInfo(regulationDetails.data ?? []);
    setLoader(false);
  };

  const handleItemClick = (item) => {
    setIsSearched(false);
    setIsDetailModalFlag(true);
    setSelectedItem(item);
    setDetailDeleteModalOpenFlag(true);
  };

  const handleItemRemoveClick = (item) => {
    setIsSearched(false);
    setSelectedItem(item);
    setIsDetailModalFlag(false);
    setDetailDeleteModalOpenFlag(true);
  };

  const removeSelectedItem = async () => {
    if (isSearched) {
      let checkElement = regulationDetailsInfo.filter(
        (regulation) => regulation?.id === selectedItem?.id
      );
      if (checkElement.length >= 1) {
        showErrorMessage(t('alreadyRegualtionPresentMessage'), {});
        setDetailDeleteModalOpenFlag(false);
        setIsSearched(false);
        return;
      }
    }
    const updateStatus = {
      regulationAcceptanceStatusName: isSearched
        ? RegulationAcceptanceStatusEnum.SUGGESTED
        : RegulationAcceptanceStatusEnum.REJECTED
    };

    try {
      const resp = await deleteRegulationDetails(
        userData?.organizationUid[0],
        selectedItem?.id,
        updateStatus
      );
      fetchRegulationDetails(selectedOrganizations);
      if (isSearched) {
          addSelectedElementOnTag(selectedItem)
          setIsSearched(false);
      } else {
          removeSelectedElementOnTag(selectedItem)
      }
      setSelectedItem(null);
      showSuccessMessage(resp?.message, '', {});
    
    } catch (error) {
      let errMsg ;
      if(error?.response?.status === 409){
        errMsg = error?.response?.data?.cause ;
      }else{
        errMsg = error?.message;
      }
      showErrorMessage(errMsg, {});
    }

    setDetailDeleteModalOpenFlag(false);
  };

  const handleClose = (value) => {
    setDetailDeleteModalOpenFlag(false);
    setSelectedValue(value);
    clearSearchSelected();
  };

  const closeDialog = () => {
    setDetailDeleteModalOpenFlag(false);
  };

  const handleSearchSelected = (event: any, value: any) => {
    if (value?.id) {
      setDetailDeleteModalOpenFlag(true);
      setSelectedItem(value);
      setIsSearched(true);
      setIsDetailModalFlag(false);
    }else{
      setIsSearched(false)
    }
  };

  const clearSearchSelected = () => {};

  const addSelectedElementOnTag = (selectedItem)=>{
    let regCount  = regCountAndNewAdded;
    if(regCountAndNewAdded.has(selectedItem?.organizationId)){
      let previous= regCountAndNewAdded.get(selectedItem?.organizationId);
      let prevAdded:string[] = previous.newAdded;
        regCount.set(selectedItem?.organizationId,{totalCount :Number(previous.totalCount)+1,newAdded :[...prevAdded ,selectedItem?.id] })
        setRegCountAndNewAdded(regCount);
        localStorage.setItem('regCountAndNewAdded',JSON.stringify(regCount))
    }else{
      regCount.set(selectedItem?.organizationId,{totalCount :1,newAdded :[selectedItem?.id] })
      setRegulatoryOrganizations([...regulatoryOrganizations ,{id:selectedItem?.organizationId,name:selectedItem?.organization}])

    }
}

function removeSelectedElementOnTag(selectedItem) {
  let regCount  = regCountAndNewAdded;
  if (regCount.has(selectedItem?.organizationId)) {
    const orgData = regCount.get(selectedItem?.organizationId);
    const prevNewAdded = orgData.newAdded;
    const latestNewAdded  = prevNewAdded?.filter((id:string)=> id !==selectedItem?.id) ;
      regCount.set(selectedItem?.organizationId,{ totalCount :Number(orgData.totalCount) - 1,newAdded :[...latestNewAdded]})
      setRegCountAndNewAdded(regCount)
      localStorage.setItem('regCountAndNewAdded',JSON.stringify(regCount))
  }   

}

  const createObjectForSelectedRegulationAndTotalCount = (regOrganizationList)=>{
    let regOrgAndCount = new Map<string ,regulationCountAndNewAddedType>();
     regOrganizationList?.forEach(element => {
      regOrgAndCount.set(element.id,{ totalCount :element?.totalRegulations?.suggested,newAdded :[] ,})
    });
    setRegCountAndNewAdded(regOrgAndCount)
  }
 
  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={3} md={3} lg={4} xl={4.6}>
          <Card
            sx={{
              backgroundColor: '#fff',
              borderRadius: '1.25rem',
              padding: 0
            }}
            className="regulation-detail-screen"
          >
            <RegulatoryOrganization
              regulationList={regulatoryOrganizations}
              fetchRegulationDetails={fetchRegulationDetails}
              handleSearchSelected={handleSearchSelected}
              regCountAndNewAdded ={regCountAndNewAdded}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={8} xl={7.4}>
          <Card
            sx={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: '1.25rem'
            }}
            className="regulation-detail-screen"
          >
            {loader ? (
                <Box className="flex-basic-center mt-100  mb-100">
                  <Box className="spinnerLoading mt-100"></Box>
                </Box>
            ) : (
                <RegulationDetailsInfo
                  regulationDetailsList={regulationDetailsInfo}
                  handleItemClick={handleItemClick}
                  handleItemRemoveClick={handleItemRemoveClick}
                  selectedOrganizations={selectedOrganizations}
                />
            )}
          </Card>
        </Grid>
      </Grid>
      <RegulationDetailsModal
        selectedItem={selectedItem}
        selectedValue={selectedValue}
        open={detailDeleteModalOpenFlag}
        handleClose={handleClose}
        closeDialog={closeDialog}
        isDetailModal={isDetailModalFlag}
        removeSelectedItem={removeSelectedItem}
        actionslabel={isSearched ? 'Add' : 'Remove'}
      />
    </React.Fragment>
  );
};
