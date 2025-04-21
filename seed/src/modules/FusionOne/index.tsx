import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
import { Button } from 'src/shared/components/index';
import { callFusionOneAPI, getOrgDetails } from './api/fusionOneAPI';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { FUSIONONE_API_URL } from 'src/shared/constants/constants';
import { selectCommon } from '../common/services/common.service';
import { useSelector } from 'react-redux';
import { getLoggedInUserDetail } from '../Setting/api/settingAPI';
import image1 from '../../assets/images/Fusion1/Toast_image.png';
import image2 from '../../assets/images/Fusion1/Audit_Calendar.png';
import image3 from '../../assets/images/Fusion1/Attestation_Dashboard.png';
import image4 from '../../assets/images/Fusion1/Unified_Dashboard.png';
import image5 from '../../assets/images/Fusion1/CodeOfEthics.png';
import { useState } from 'react';
import ConfirmationCustomModal from 'src/shared/components/modals/confirmationModal/ConfirmationCustomModal';
import SimpleImageSlider from 'react-simple-image-slider';
const FusionOne = () => {
  const { userData } = useSelector(selectCommon);

  const [userNotAvailableModal, setUserNotAvailableModalFlag] = useState(false);

  const loginToFusionOne = async () => {
    let apiStr;
    let respData;
    let requestBody;
    try {
      respData = await getLoggedInUserDetail(userData?.userUid);
      apiStr = `${FUSIONONE_API_URL}${APIEndPoint.fusionOne.getFusionOneToken}`;
      requestBody = {
        EmailId: `${respData?.email}`
      };
      let response = await callFusionOneAPI(apiStr, requestBody);
      if (response != 'Invalid Email') {
        apiStr = `${FUSIONONE_API_URL}${APIEndPoint.fusionOne.loginToFusionOne}${response}`;
        window.open(apiStr, '_blank');
      } else {
        //setUserNotAvailableModalFlag(true);
        let orgDetails = await getOrgDetails(userData.organizationUid);
        if (orgDetails) {
          requestBody = {
            FirmName: orgDetails.orgName,
            FirmAddress: 'Bangalore',
            FirmType: 'RIA',
            Country: 'USA',
            State: 'Alaska',
            UserName: respData.name,
            EmailId: respData.email
          };
          apiStr = `${FUSIONONE_API_URL}${APIEndPoint.fusionOne.createUserAndOrg}`;
          response = await callFusionOneAPI(apiStr, requestBody);
          if (response == 'Success') {
            requestBody = {
              EmailId: `${respData?.email}`
            };
            apiStr = `${FUSIONONE_API_URL}${APIEndPoint.fusionOne.getFusionOneToken}`;
            response = await callFusionOneAPI(apiStr, requestBody);
            if (response != 'Invalid Email') {
              apiStr = `${FUSIONONE_API_URL}${APIEndPoint.fusionOne.loginToFusionOne}${response}`;
              window.open(apiStr, '_blank');
            } else {
              setUserNotAvailableModalFlag(true);
            }
          }
        }
      }
    } catch (error) {
      console.log('Error while switching to Fusion1: ' + error);
      setUserNotAvailableModalFlag(true);
    }
  };

  const images = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image4 },
    { url: image5 }
  ];
  return (
    <Box>
      <Box sx={{ mt: 1 }} className="flex-basic-start w-100">
        <Typography variant={'h3'}>
          {t('fusionOne', { ns: 'english' })}
        </Typography>
      </Box>
      <Box>
        <SimpleImageSlider
          style={{ margin: '0 auto', marginTop: '2%' }}
          width={885}
          height={500}
          images={images}
          showBullets={false}
          showNavs={true}
          autoPlay={true}
        />
      </Box>
      <Box sx={{ mt: 4 }} className="flex-column-center">
        <Button
          type="submit"
          btnText={t('goToFusionOne', { ns: 'english' })}
          onClick={loginToFusionOne}
          variant="contained"
        ></Button>
      </Box>
      <ConfirmationCustomModal
        imageURL={undefined}
        mainTitle={t('errorFusionOne', { ns: 'english' })}
        subTitle1={t('userDoesNotExist', { ns: 'english' })}
        open={userNotAvailableModal}
        handleClose={() => setUserNotAvailableModalFlag(false)}
        btnTitle={t('closeTitle', { ns: 'english' })}
        handleClick={() => setUserNotAvailableModalFlag(false)}
      />
    </Box>
  );
};
export default FusionOne;
