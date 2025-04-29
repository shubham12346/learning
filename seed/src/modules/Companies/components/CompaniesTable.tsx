import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tables } from 'src/shared/components/table/Tables';
import { useTranslation } from 'react-i18next';
import MenuView from 'src/shared/components/menu/MenuView';
import { MoreInfoTypes } from 'src/shared/constants/constants';
import { LoginAs } from './LoginAs';
import {
  impersonate,
  selectCommon
} from 'src/modules/common/services/common.service';
import { useSelector, useDispatch } from 'react-redux';
import { MoreInfoModal } from 'src/modules/common/component/MoreInfoModal';
import { TcompanyTableComponent } from '../models/companyTypes';

export const CompaniesTable = (props: TcompanyTableComponent) => {
  //constant
  const { t } = useTranslation('english');
  const [selectedId, setSelectedId] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = React.useState({
    orgName: '',
    status: '',
    orgType: '',
    onboardedOn: '',
    primaryAdmin: '',
    primaryAdminEmail: ''
  });
  const [showMoreInfoModal, setShowMoreInfoModal] = React.useState(false);
  const [showLoginAsModal, setShowLoginAsModal] = React.useState(false);
  const [selectedOrganization, setSelectedOrganization] = React.useState<any>(
    {}
  );
  const { userData } = useSelector(selectCommon);
  const dispatch = useDispatch<any>();
  const open = Boolean(anchorEl);
  const INVITED = 'invited';
  const actions = [
    {
      id: 0,
      label: t('tenants.table.moreInfo'),
      icon: <Box className="icon-info iconStyle" />
    }
  ];
  const [tableActions, setTableActions] = useState(actions);
  //methods
  const handleClick = (event: React.MouseEvent<HTMLElement>, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(index);
  };

  const handleSelectedItem = (event: React.MouseEvent<HTMLElement>, index) => {
    setSelectedValue(index);
    if (index?.onboardingStatus === INVITED) {
      let tablesActionsList = tableActions?.filter(
        (item) => item?.label === t('tenants.moreInfoModal.resendInvite')
      );
      if (tablesActionsList?.length) {
        // do nothing
        return;
      } else {
        let actionList = [...tableActions];
        actionList?.push({
          id: 3,
          label: t('tenants.moreInfoModal.resendInvite'),
          icon: <Box className="icon-resend iconStyle" />
        });
        setTableActions(actionList);
      }
    } else {
      let tablesActionsList = tableActions?.filter(
        (item) => item?.label !== t('tenants.moreInfoModal.resendInvite')
      );
      setTableActions(tablesActionsList);
    }
  };

  const handleMoreInfoModalClose = () => {
    setShowMoreInfoModal(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginAs = (row) => {
    setShowLoginAsModal(true);
    setSelectedOrganization(row);
  };

  const handleSubmit = () => {
    // Call API

    // payload
    const payload = {
      organizationUid: selectedOrganization?.orgUid,
      parentOrganizationUid: userData?.organizationUid[0]
    };

    dispatch(impersonate(payload));
    setShowLoginAsModal(false);
  };

  const handleResendInviteOfCompany = async () => {
    handleClose();
    console.log('props', props);
    props?.handleResetInvite(selectedValue);
  };

  const handleShowMoreInfoModel = () => {
    setShowMoreInfoModal(true);
    handleClose();
  };

  const onMenuClick = (index) => {
    switch (index) {
      case 0:
        handleShowMoreInfoModel();
        return;
      case 1:
        return;
      case 2:
        return;
      case 3:
        handleResendInviteOfCompany();
        return;
      default:
        return;
    }
  };

  const columns: GridColDef[] = [
    {
      field: ' ',
      headerName: ' ',
      sortable: false,
      type: 'string',
      flex: 0.1
    },
    {
      field: 'orgName',
      headerName: 'COMPANY NAME',
      sortable: false,
      type: 'string',
      flex: 2.35
    },
    {
      field: 'primaryAdmin',
      headerName: 'PRIMARY ADMIN',
      sortable: false,
      type: 'string',
      flex: 2.25
    },
    {
      field: 'primaryAdminEmail',
      headerName: 'PRIMARY ADMIN EMAIL',
      sortable: false,
      type: 'string',
      flex: 2.35
    },
    {
      field: 'LOGIN AS',
      sortable: false,
      renderCell: (index) => {
        return (
          <Tooltip title="View" arrow>
            <IconButton
              aria-label="editorder"
              className="RecentOrderEditButton"
              color="default"
              size="small"
              disabled={index.row?.onboardingStatus == 'invited'}
              onClick={(e) => {
                handleLoginAs(index.row);
              }}
            >
              <Box
                className="icon-eye-open"
                sx={{
                  color:
                    index.row?.onboardingStatus == 'invited' ? '#b4b5c0' : ''
                }}
              />
            </IconButton>
          </Tooltip>
        );
      },

      flex: 1
    },
    {
      field: 'ACTIONS',
      sortable: false,

      renderCell: (index) => {
        return (
          <div>
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
              isOpen={open && selectedId == index.row.id}
              menuItemList={tableActions}
              handleClose={handleClose}
              onMenuClick={onMenuClick}
              anchorEl={anchorEl}
            />
          </div>
        );
      },

      flex: 1
    }
  ];
  return (
    <React.Fragment>
      <Box className="mt-24">
        <Tables
          rows={props.tenantsList.organization}
          className={props?.heightClassName}
          columns={columns}
          pager={props.tenantsList.pager}
          checkboxSelection={false}
          hideFooters={true}
          getNextPaginationData={props.getNextPaginationData}
          loading={props?.apiLoadingFlag}
        />
      </Box>
      <MoreInfoModal
        selectedValue={selectedValue}
        data={{
          orgName: selectedValue?.orgName,
          status: selectedValue?.status,
          orgType: selectedValue?.orgType,
          onboardedOn: selectedValue?.onboardedOn,
          name: selectedValue?.primaryAdmin,
          email: selectedValue?.primaryAdminEmail
        }}
        open={showMoreInfoModal}
        moreInfoTypes={MoreInfoTypes.Organization}
        handleClose={handleMoreInfoModalClose}
        modalTitle={`${t('tenants.moreInfoModal.companyTitle')}`}
      />
      <LoginAs
        modalTitle={'LOGIN AS'}
        isPartner={false}
        selectedValue={selectedOrganization}
        open={showLoginAsModal}
        handleClose={() => setShowLoginAsModal(false)}
        handleSubmit={() => handleSubmit()}
      />
    </React.Fragment>
  );
};
