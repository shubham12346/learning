import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import UserDataTable from './components/UserDataTable';
import { AddUser } from './components/AddUser';
import { showSuccessMessage } from 'src/shared/components/toaster/Toast';
import { HeaderFilter } from '../Companies/components/HeaderFilter';
import { UserInitialState, groupData } from './model/userInterface';
import { addNewUserApi, getGroup, getUserList } from './apis/UserApis';

const Users = (props) => {
  // check permitted actions
  const { actions } = props;
  //Constants
  const { t } = useTranslation('users');

  //State Variables
  const [userList, setUserList] = useState(UserInitialState);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
  const [groupList, setGroupList] = useState({} as groupData);
  const [filters, setFilters] = useState();

  //Methods
  const addNewUser = () => {
    setShowAddNewUserModal(true);
  };

  async function addNewEntry(data: any, setFieldError) {
    const errorMessageStatusText = {
      mailSentText: 'User with email: ' + data?.email + ' already exists',
      toastSubText: 'An activation link has been sent to ' + data?.email
    };
    try {
      const resp = await addNewUserApi(getAddUserDetails(data));
      if (resp.message === t('emailInviteSentText')) {
        showSuccessMessage(
          'Invite Sent!',
          errorMessageStatusText.toastSubText,
          {
            position: 'top-right'
          }
        );
        getAllUserList(userList?.pager);
        setShowAddNewUserModal(false);
      }
    } catch (error) {
      setShowAddNewUserModal(true);
      if (error.response.status == 400) {
        if (error.response.data.cause == errorMessageStatusText.mailSentText) {
          setFieldError('email', t('userEmailIdError'));
        }
      }
    }
  }

  const getAddUserDetails = (values: any) => {
    const addUserObj = {
      fullname: values.fullname,
      email: values.email,
      groups: [
        {
          groupId: values.groupName,
          roleName: values.roleType
        }
      ]
    };
    return addUserObj;
  };

  //get all user list
  const getAllUserList = async (data) => {
    setLoadingFlag(true);
    let filtersApplied = getFiltersArrayIntoString(filters);
    let payload = {
      page: data?.currentPage || 1,
      limit: data.limit,
      groupName: filtersApplied.groupName,
      roleType: filtersApplied.role
    };
    const userListData = await getUserList(payload);
    setLoadingFlag(false);
    setOrganizationName(userListData?.organization?.name);
    if (userListData) {
      let idAdded = { ...userListData };
      idAdded.users = userListData?.users?.map((data) => {
        return {
          ...data,
          id: data.userUid,
          email: data.email || '-',
          fullName: data?.fullName || '-',
          groups: data.groups,
          onboardedOn: data?.onboardedOn || '-',
          status: data.status || '-'
        };
      });
      setUserList(idAdded);
    }
  };

  //get all groups list
  const getAllGroupData = async () => {
    const groupData = await getGroup();
    setGroupList(groupData);
  };

  const handleMoreInfoModalClose = () => {
    setShowAddNewUserModal(false);
  };

  // On Filter change
  const onFilterChange = async (selectedFilter) => {
    setFilters(selectedFilter);
    let filtersApplied = getFiltersArrayIntoString(selectedFilter);
    let payload = {
      page: 1,
      limit: userList?.pager?.limit,
      groupName: filtersApplied.groupName,
      roleType: filtersApplied.role
    };

    setLoadingFlag(true);
    const userListData = await getUserList(payload);
    setOrganizationName(userListData?.organization?.name);
    if (userListData) {
      let idAdded = { ...userListData };
      idAdded.users = userListData?.users?.map((data) => {
        return {
          ...data,
          id: data.userUid
        };
      });
      setUserList(idAdded);
    }
    setLoadingFlag(false);
  };

  //useEffect
  useEffect(() => {
    getAllUserList(userList?.pager);
    getAllGroupData();
  }, []);

  //
  const getFiltersArrayIntoString = (selectedFilters) => {
    let groupName = selectedFilters?.group?.map((item) => item.value).join(',');
    let role = selectedFilters?.role?.map((item) => item.value).join(',');
    return { groupName, role };
  };

  return (
    <>
      <Container maxWidth={'xl'}>
        <Box className="mr-30">
          <Box sx={{ mb: 6 }} className="flex-basic-start w-100">
            <Typography variant={'h3'}>
              {t('userPageTitle')} ({userList?.pager?.totalItems || 0})
            </Typography>
          </Box>

          <HeaderFilter
            showButton={actions.includes('add-users')}
            addButtonLabel={t('addNewUserBtn')}
            onFilterChange={onFilterChange}
            showAddCompany={addNewUser}
            showFilters={true}
            filterList1={groupList}
          ></HeaderFilter>

          <UserDataTable
            userList={userList}
            actions={actions}
            getNextPaginationData={getAllUserList}
            checkboxSelection={true}
            heightClassName={'tenants-max-height'}
            apiLoadingFlag={loadingFlag}
            organizationName={organizationName}
          ></UserDataTable>

          <AddUser
            open={showAddNewUserModal}
            addCompanyEvent={addNewEntry}
            handleClose={handleMoreInfoModalClose}
          />
        </Box>
      </Container>
    </>
  );
};

export default Users;
