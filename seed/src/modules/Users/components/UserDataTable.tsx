import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tables } from 'src/shared/components/table/Tables';
import { useTranslation } from 'react-i18next';
import MenuView from 'src/shared/components/menu/MenuView';
import { MoreInfoTypes } from 'src/shared/constants/constants';
import { MoreInfoModal } from 'src/modules/common/component/MoreInfoModal';
import { resendInvitation } from '../apis/UserApis';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/index';

const UserDataTable = (props) => {
  //Constants
  const { t } = useTranslation('users');
  const [selectedID, setselectedID] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = React.useState({
    fullName: '',
    email: '',
    onboardedOn: '',
    status: '',
    groups: []
  });
  const [tableActions, setTableActions] = useState([
    {
      id: 0,
      label: t('table.moreInfo'),
      icon: <Box className="icon-info iconStyle" />
    }
  ]);
  const [showMoreInfoModal, setShowMoreInfoModal] = React.useState(false);

  const open = Boolean(anchorEl);
  const INVITED = 'invited';

  //Methods
  const handleClick = (event: React.MouseEvent<HTMLElement>, index) => {
    setAnchorEl(event.currentTarget);
    setselectedID(index);
  };
  const handleSelectedItem = (event: React.MouseEvent<HTMLElement>, index) => {
    setSelectedValue(index);
    // check if status is in invited
    // if it is already have  resend invite tab do nothing
    // put resend invite tab in actions if it is not there
    // else remove resend invite tab

    if (index?.status === INVITED) {
      let tablesActionsList = tableActions?.filter(
        (item) => item?.label === t('moreInfoModal.resendInvite')
      );
      if (tablesActionsList?.length) {
        // do nothing
        return;
      } else {
        let actionList = [...tableActions];
        actionList?.push({
          id: 3,
          label: t('moreInfoModal.resendInvite'),
          icon: <Box className="icon-resend iconStyle" />
        });
        setTableActions(actionList);
      }
    } else {
      let tablesActionsList = tableActions?.filter(
        (item) => item?.label !== t('moreInfoModal.resendInvite')
      );
      setTableActions(tablesActionsList);
    }

    //
  };

  const handleClose = () => {
    setAnchorEl(null);
    setselectedID('');
  };
  const handleMoreInfoModalClose = () => {
    handleClose();
    setShowMoreInfoModal(false);
    setAnchorEl(null);
  };
  const getTableAction = () => {
    let actionList = [];
    setTableActions([...tableActions, ...actionList]);
  };

  const handleResetInvite = async () => {
    try {
      const res = await resendInvitation(selectedValue?.email);
      let sucessMessage = `${t('inviteDescription', { ns: 'onboarding' })} ${
        selectedValue?.fullName
      }`;
      showSuccessMessage(sucessMessage || '', '', {});
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause || error?.message, {});
    }
  };

  useEffect(() => {
    getTableAction();
  }, [props.actions]);

  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        setShowMoreInfoModal(true);
        return;
      case 1:
        return;
      case 2:
        return;
      case 3:
        handleResetInvite();
        return;
      default:
        return;
    }
  };

  const columns: GridColDef[] = [
    {
      field: ' ',
      headerName: '',
      sortable: false,
      type: 'string',
      flex: 0.1
    },
    {
      field: 'fullName',
      headerName: 'FULL NAME',
      sortable: false,
      type: 'string',
      flex: 2.35
    },
    {
      field: 'email',
      headerName: 'EMAIL ID',
      sortable: false,
      type: 'string',
      flex: 2.25
    },
    {
      field: 'groups',
      headerName: 'GROUP NAME',
      sortable: false,
      type: 'string',
      flex: 2.35,
      renderCell: (index) => {
        return <Box>{(index.row.groups[0].groupName ??= '-')}</Box>;
      }
    },
    {
      field: 'groupss',
      headerName: 'ROLE TYPE',
      sortable: false,
      type: 'string',
      flex: 2.35,
      renderCell: (index) => {
        return <Box>{(index.row.groups[0].roleDisplayName ??= '-')}</Box>;
      }
    },
    {
      field: 'ACTIONS',
      sortable: false,
      renderCell: (index) => {
        return (
          <Box>
            <Button
              sx={{ p: 1, minWidth: 0 }}
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => {
                handleClick(e, index.row.id);
                handleSelectedItem(e, index.row);
              }}
              className="more-info-btn"
            >
              <MoreVertOutlinedIcon fontSize="small" />
            </Button>

            <MenuView
              isOpen={open && selectedID == index.row.id}
              menuItemList={tableActions}
              handleClose={handleClose}
              onMenuClick={onMenuClick}
              anchorEl={anchorEl}
            />
          </Box>
        );
      },

      flex: 1
    }
  ];

  return (
    <>
      <Box sx={{ mt: 6 }}>
        <Tables
          rows={props.userList.users}
          className={props?.heightClassName}
          columns={columns}
          pager={props.userList.pager}
          checkboxSelection={false}
          hideFooters={true}
          getNextPaginationData={props.getNextPaginationData}
          loading={props?.apiLoadingFlag}
        />
        <MoreInfoModal
          selectedValue={selectedValue}
          data={{
            orgName: selectedValue.fullName,
            email: selectedValue.email,
            onboardedOn: selectedValue.onboardedOn,
            status: selectedValue.status,
            groups: selectedValue.groups
          }}
          organizationName={props?.organizationName}
          open={showMoreInfoModal}
          moreInfoTypes={MoreInfoTypes.User}
          handleClose={handleMoreInfoModalClose}
          modalTitle={`${t('moreInfoModal.userTitle')}`}
        />
      </Box>
    </>
  );
};

export default UserDataTable;
