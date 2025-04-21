//Built-in Imports
import { useEffect, useState } from 'react';

//External Imports
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

//Internal Imports
import { CompaniesTable } from './CompaniesTable';
import { HeaderFilter } from './HeaderFilter';
import { addCompany, getCompaniesList } from '../apis/CompaniesApi';
import { AddNewCompanyModal } from './AddNewCompanyModal';
import { TableInitialState } from '../utils/constants';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { resendInvitation } from 'src/modules/Users/apis/UserApis';

export const PartnerCompanies = (props) => {
  const { actions } = props;

  const { t } = useTranslation('english');
  const [showCompnayModal, setShowCompnayModal] = useState(false);
  const [apiLoadingFlag, setApiLoadingFlag] = useState(false);
  const [tenantsList, setTenantsList] = useState(TableInitialState);

  // Call API here
  useEffect(() => {
    getNextPaginationData(tenantsList.pager);
  }, []);

  const showAddCompany = () => {
    setShowCompnayModal(true);
  };

  async function addNewCompany(data: any, setFieldError) {
    try {
      const resPonseData = await addCompany(data);
      setShowCompnayModal(false);
      if (resPonseData?.data.message === t('invitationSentSuccessfully')) {
        showSuccessMessage(resPonseData?.data.message, '', {
          position: 'top-right'
        });
      }

      getNextPaginationData(tenantsList.pager);
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
  const getNextPaginationData = async (data) => {
    setApiLoadingFlag(false);
    const response = await getCompaniesList(data);
    setApiLoadingFlag(false);
    if (response) {
      let idAdded = { ...response };
      idAdded.organization = response.organization.map((data) => {
        return { ...data, id: data.orgUid };
      });
      setTenantsList(idAdded);
    }
  };

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
    console.log('selectedValue ::', selectedValue);
  };

  return (
    <Box className="mr-30">
      <Box className="flex-basic-start w-100 mb-10">
        <Typography variant={'h3'}>
          {t('tenants.header.companies')} ({tenantsList.pager.totalItems})
        </Typography>
      </Box>
      <HeaderFilter
        showButton={actions.includes('add-companies')}
        addButtonLabel={t('tenants.header.addNewCompany')}
        showAddCompany={showAddCompany}
        showFilters={false}
      ></HeaderFilter>
      <CompaniesTable
        getNextPaginationData={getNextPaginationData}
        tenantsList={tenantsList}
        checkboxSelection={false}
        heightClassName={'tenants-max-height'}
        apiLoadingFlag={apiLoadingFlag}
        handleResetInvite={handleResetInvite}
      ></CompaniesTable>
      <AddNewCompanyModal
        selectedValue={''}
        open={showCompnayModal}
        addCompanyEvent={addNewCompany}
        handleClose={() => setShowCompnayModal(false)}
        modalHeaderText={`${t('addNewCompanyText')}`}
      />
    </Box>
  );
};
