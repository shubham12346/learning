import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tables } from 'src/shared/components/table/Tables';
import { useTranslation } from 'react-i18next';
import { MoreInfoTypes } from 'src/shared/constants/constants';
import MenuView from 'src/shared/components/menu/MenuView';
import { MoreInfoModal } from 'src/modules/common/component/MoreInfoModal';
import { LoginAs } from './LoginAs';
import { impersonate } from 'src/modules/common/services/common.service';
import { useDispatch } from 'react-redux';
import { customInternationDate } from 'src/shared/utils/utils';

export const PartnerTable = (props) => {
  //constants
  const { t } = useTranslation('english');
  const [selectedId, setSelectedId] = React.useState(false);
  const [showLoginAsModal, setShowLoginAsModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = React.useState({
    orgName: '',
    status: '',
    orgType: '',
    onboardedOn: '',
    partnerAdminName: '',
    partnerAdminEmail: '',
    businessOrganizationsUnderIt: []
  });
  const [selectedOrganization, setSelectedOrganization] = React.useState<any>(
    {}
  );
  const [selectedBusiness, setSelectedBusiness] = React.useState<any>('none');

  //stats variables
  const [showMoreInfoModal, setShowMoreInfoModal] = React.useState(false);
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

  //Methods
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

  const handleLoginAsClose = () => {
    setShowLoginAsModal(false);
    setSelectedBusiness('none');
  };
  const handleLoginAs = (row) => {
    setShowLoginAsModal(true);
    row.businessOrganizationsUnderIt.forEach(
      (ele) =>
        (ele.disabled = ele.onboardingStatus != 'completed' ? true : false)
    );
    setSelectedOrganization(row);
  };

  const onOrgChange = (event) => {
    setSelectedBusiness(event.target.value);
  };
  const handleSubmit = () => {
    const row = selectedOrganization.businessOrganizationsUnderIt.filter(
      (ele) => ele.orgUid == selectedBusiness
    )[0];

    // payload
    const payload = {
      organizationUid: row?.orgUid,
      parentOrganizationUid: selectedOrganization?.orgUid
    };

    dispatch(impersonate(payload));
    setShowLoginAsModal(false);
    setSelectedBusiness('none');
  };
  const handleResendInviteOfPartner = async () => {
    handleClose();
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
        handleResendInviteOfPartner();
        return;
      default:
        return;
    }
  };

  const toggleSortDirection = () => {
    const idColumnHeader = document.querySelector('.fineAmount[aria-sort]');
    const ariaSortVal = idColumnHeader.getAttribute('aria-sort');
    props?.setDirectionOnChangeSort(ariaSortVal);
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
      flex: 2
    },
    {
      field: 'partnerAdminName',
      headerName: 'CONTACT PERSON',
      sortable: false,
      type: 'string',
      flex: 2
    },
    {
      field: 'partnerAdminEmail',
      headerName: 'CONTACT PERSON EMAIL',
      sortable: false,
      type: 'string',
      flex: 2
    },
    {
      field: 'noOfBusinessOrganizationsUnderIt',
      headerName: 'COMPANIES',
      sortable: false,
      type: 'string',
      flex: 1
    },
    {
      field: 'recentlyOnboard.onboardedOn',
      headerName: 'RECENTLY ONBOARDED',
      sortable: true,
      headerClassName: 'fineAmount recentOnboard',
      type: 'string',
      flex: 2.7,
      renderHeader: () => {
        return (
          <Box
            className="d-flex align-items-center mb-3 tableSortIcon"
            onClick={toggleSortDirection}
          >
            <Typography variant="body2" className="textweight">
              {'RECENTLY ONBOARDED'}
            </Typography>
            <Box className="flex-column-start p-relative">
              <Box className="arrowUpDown ml-7"></Box>
            </Box>
          </Box>
        );
      },
      renderCell: (index) => (
        <Box className="flex-direction-column">
          <Box>
            {index.row?.recentlyOnboard?.onboardedOn
              ? customInternationDate(index.row.recentlyOnboard.onboardedOn)
              : '-'}
          </Box>
          <Tooltip title={index.row?.recentlyOnboard?.orgName} arrow>
            <Box className="text-ellipsis-oneline w-100">
              {index.row?.recentlyOnboard?.orgName}
            </Box>
          </Tooltip>
        </Box>
      )
    },
    {
      field: 'LOGIN AS',
      sortable: false,
      renderCell: (index) => {
        return (
          <>
            <Tooltip title="View" arrow>
              <IconButton
                aria-label="editorder"
                className="RecentOrderEditButton"
                color="inherit"
                size="small"
                disabled={!index.row?.businessOrganizationsUnderIt.length}
                onClick={(e) => {
                  handleLoginAs(index.row);
                }}
              >
                <Box
                  className="icon-eye-open"
                  sx={{
                    color: !index.row?.businessOrganizationsUnderIt.length
                      ? '#b4b5c0'
                      : ''
                  }}
                />
              </IconButton>
            </Tooltip>
          </>
        );
      },

      flex: 1
    },
    {
      field: 'ACTIONS',
      sortable: false,
      renderCell: (index) => {
        return (
          <>
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
          </>
        );
      },

      flex: 1
    }
  ];
  return (
    <React.Fragment>
      <Box className="mt-24">
        <Box className="fineAmount">
          <Tables
            rows={props.organizationDetail.organization}
            className={props?.heightClassName}
            columns={columns}
            pager={props.organizationDetail.pager}
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
            name: selectedValue?.partnerAdminName,
            email: selectedValue?.partnerAdminEmail,
            organizationsUnderIt: selectedValue?.businessOrganizationsUnderIt
          }}
          open={showMoreInfoModal}
          moreInfoTypes={MoreInfoTypes.Partner}
          handleClose={handleMoreInfoModalClose}
          modalTitle={`${t('tenants.moreInfoModal.partnerTitle')}`}
          isPartnerTabActive={props.isPartnerTabActive}
        />
      </Box>
      <LoginAs
        modalTitle={'LOGIN AS'}
        isPartner={true}
        selectedBusiness={selectedBusiness}
        selectedValue={selectedOrganization}
        open={showLoginAsModal}
        onChange={onOrgChange}
        handleClose={() => handleLoginAsClose()}
        handleSubmit={() => handleSubmit()}
      />
    </React.Fragment>
  );
};
