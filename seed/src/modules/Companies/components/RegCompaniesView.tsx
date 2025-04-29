import Box from '@mui/material/Box';
import { HeaderFilter } from './HeaderFilter';
import { useEffect, useState } from 'react';
import {
  addCompany,
  addPartners,
  getCompaniesList,
  getPartnersList,
  PartnerListPayload
} from '../apis/CompaniesApi';
import Typography from 'src/shared/components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { TabView } from '../../../shared/components/tabs/Tabs';
import { AddNewCompanyModal } from 'src/modules/Companies/components/AddNewCompanyModal';

import { useSelector } from 'react-redux';
import { selectCommon } from 'src/modules/common/services/common.service';
import { ORGANIZATION_ROLE_ENUM } from 'src/shared/constants/constants';
import { PartnerTable } from './PartnerTable';
import { ONBOARDER_ON, TableInitialState } from '../utils/constants';
import { CompaniesTable } from './CompaniesTable';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { resendInvitation } from 'src/modules/Users/apis/UserApis';

export const RegCompaniesView = () => {
  const { t } = useTranslation('english');
  const [apiLoadingFlag, setApiLoadingFlag] = useState(false);
  const [showCompnayModal, setShowCompnayModal] = useState(false);
  const [organizationDetail, setOrganizationDetail] =
    useState(TableInitialState);
  const [partnersDetail, setPartnersDetail] = useState(TableInitialState);
  const { userData } = useSelector(selectCommon);
  const [roleType, setRoleType] = useState('');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');

  //methods
  const showAddCompany = () => {
    setShowCompnayModal(true);
  };
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, tabNumber: number) => {
    setTabIndex(tabNumber);
  };
  // Call API here
  useEffect(() => {
    if (tabIndex) {
      getNextPaginationData(partnersDetail.pager);
    } else {
      getNextPaginationData(organizationDetail.pager);
    }
  }, [tabIndex, sortDirection]);

  useEffect(() => {
    setRoleType(userData.authorities[0].role);
  }, []);

  const getNextPaginationData = async (data) => {
    setApiLoadingFlag(true);
    if (tabIndex) {
      let payload: PartnerListPayload = {
        page: data?.currentPage ?? 1,
        limit: data?.limit || 15,
        sortBy: ONBOARDER_ON,
        sortOrder: sortDirection
      };
      const response = await getPartnersList(payload);
      setApiLoadingFlag(false);
      if (response) {
        let idAddedList = { ...response };
        idAddedList.organization = response.organization.map((data) => {
          return { ...data, id: data.orgUid };
        });
        setPartnersDetail(idAddedList);
      }
    } else {
      let payload: PartnerListPayload = {
        page: data?.currentPage ?? 1,
        limit: data?.limit || 15
      };
      const response = await getCompaniesList(payload);
      setApiLoadingFlag(false);
      if (response) {
        let idAdded = { ...response };
        idAdded.organization = response.organization.map((data) => {
          return { ...data, id: data.orgUid };
        });
        setOrganizationDetail(idAdded);
      }
    }
  };

  //sort partners  ranges
  const setDirectionOnChangeSort = (sortDirectionVal) => {
    if (sortDirectionVal === 'none') {
      setSortDirection('ASC');
    } else if (sortDirectionVal === 'ascending') {
      setSortDirection('DESC');
    } else if (sortDirectionVal === 'descending') {
      setSortDirection('ASC');
    }
  };
  async function addNewEntries(data: any, setFieldError) {
    if (tabIndex == 1) {
      try {
        const resPonseData = await addPartners(data);
        setShowCompnayModal(false);
        if (
          resPonseData?.data.message === t('emailInvitationSentSuccessfully')
        ) {
          showSuccessMessage(resPonseData?.data.message, '', {
            position: 'top-right'
          });
        }
        getNextPaginationData(partnersDetail.pager);
      } catch (error) {
        if (error.response.status == 400) {
          if (error.response.data.cause == 'Organization already exists') {
            setFieldError(
              'organizationName',
              t('tenants.errors.organizationExist')
            );
          } else {
            setFieldError('contactPersonEmail', t('tenants.errors.emailExist'));
          }
        }
      }
    } else {
      try {
        const resPonseData = await addCompany(data);
        setShowCompnayModal(false);
        if (resPonseData?.data.message === t('invitationSentSuccessfully')) {
          showSuccessMessage(t('emailInvitationSentSuccessfully'), '', {
            position: 'top-right'
          });
        }
        getNextPaginationData(organizationDetail.pager);
      } catch (error) {
        if (error.response.status == 400) {
          if (error.response.data.cause == 'Organization already exists') {
            setFieldError(
              'organizationName',
              t('tenants.errors.organizationExist')
            );
          } else {
            setFieldError('contactPersonEmail', t('tenants.errors.emailExist'));
          }
        }
      }
    }
  }

  const handleResetInvite = async (selectedValue) => {
    try {
      await resendInvitation(
        selectedValue?.partnerAdminEmail || selectedValue?.primaryAdminEmail
      );
      let sucessMessage = `${t('inviteDescription', { ns: 'onboarding' })} ${
        selectedValue?.orgName
      }`;
      showSuccessMessage(sucessMessage || '', '', {});
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause || error?.message, {});
    }
  };

  return (
    <Box className="mr-30 p-relative">
      <Box className="flex-basic-start w-100 mb-10">
        <Typography variant={'h3'}>
          {roleType === ORGANIZATION_ROLE_ENUM.PARTNER_ADMIN
            ? t('tenants.header.companies')
            : t('tenants.header.entities')}
          (
          {tabIndex == 0
            ? organizationDetail?.pager.totalItems
            : partnersDetail?.pager.totalItems}
          )
        </Typography>
        <Box className="entity-add-org-button">
          <HeaderFilter
            addButtonLabel={
              tabIndex == 0
                ? t('tenants.header.newOrganization')
                : t('tenants.header.addNewPartner')
            }
            showAddCompany={showAddCompany}
            showFilters={false}
          ></HeaderFilter>
        </Box>
      </Box>
      <Box className="w-100">
        <TabView
          tabindex={tabIndex}
          onChange={handleTabChange}
          tablist={[t('tenants.tab.organization'), t('tenants.tab.partners')]}
        />
        <Box className="mt-26">
          {tabIndex == 0 ? (
            <CompaniesTable
              tenantsList={organizationDetail}
              checkboxSelection={false}
              apiLoadingFlag={apiLoadingFlag}
              getNextPaginationData={getNextPaginationData}
              heightClassName={'tenants-revisier-max-height'}
              handleResetInvite={handleResetInvite}
            ></CompaniesTable>
          ) : (
            <PartnerTable
              setDirectionOnChangeSort={setDirectionOnChangeSort}
              organizationDetail={partnersDetail}
              checkboxSelection={false}
              apiLoadingFlag={apiLoadingFlag}
              isPartnerTabActive={tabIndex != 0}
              getNextPaginationData={getNextPaginationData}
              heightClassName={'tenants-revisier-max-height'}
              handleResetInvite={handleResetInvite}
            ></PartnerTable>
          )}
        </Box>
      </Box>
      <AddNewCompanyModal
        selectedValue={''}
        open={showCompnayModal}
        addCompanyEvent={addNewEntries}
        handleClose={() => setShowCompnayModal(false)}
        isPartnerTabActive={tabIndex != 0}
        modalHeaderText={`${
          tabIndex == 0 ? t('addNewCompanyText') : t('addNewPartnerText')
        }`}
      />
    </Box>
  );
};
