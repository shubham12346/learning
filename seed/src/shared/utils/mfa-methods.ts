import {
  showErrorMessage,
  showSuccessMessage
} from '../components/toaster/Toast';

import {
  fetchAuthSession,
  fetchMFAPreference,
  getCurrentUser,
  updateMFAPreference,
  verifyTOTPSetup,
  setUpTOTP
} from 'aws-amplify/auth';

// type PreferredMFAType = 'TOTP' | 'SMS' | 'NOMFA';

// get AuthemticatedUser
export const getAuthenticatedUser = async () => {
  const user = await getCurrentUser();
  const { tokens: session } = await fetchAuthSession();

  // Note that session will no longer contain refreshToken and clockDrift
  const idToken = session.idToken.toString();
  return {
    user,
    idToken
  };
};

export async function handleTOTPSetup() {
  try {
    const totpSetupDetails = await setUpTOTP();
    const appName = 'avery';
    const setupUri = totpSetupDetails.getSetupUri(appName);

    return setupUri;
    // Open setupUri with an authenticator APP to retrieve an OTP code
  } catch (error) {
    console.log(error);
  }
}

export async function handleTOTPVerification(totpCode: string) {
  try {
    await verifyTOTPSetup({ code: totpCode });
    await handleUpdateMFAPreference('PREFERRED');
    showSuccessMessage('MFA Type TOTP Activated Succesfully!!!', '', {
      position: 'top-right'
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function handleUpdateMFAPreference(preference) {
  try {
    await updateMFAPreference({ totp: preference });
  } catch (error) {
    showErrorMessage(error.message, {
      position: 'top-right'
    });
  }
}

export async function handleFetchMFAPreference() {
  try {
    const output = await fetchMFAPreference();
    return output.enabled;
  } catch (error) {
    showErrorMessage(error.message, {
      position: 'top-right'
    });
  }
}
