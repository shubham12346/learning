import { REGEX } from 'src/shared/constants/constants';

export const sidebaritems = [
  { menu: 'Account Details', id: '1' },
  { menu: 'MFA Setup', id: '2' }
];

export const passwordChecks = [
  'At least one lower case letter (a-z)',
  'At least one upper case letter (A-Z)',
  'At least one number (0-9)',
  'At least one symbol (!@#$%^&*)',
  'Minimum 8 characters'
];

export const checkPasswordValidations = (newPassword) => {
  let passwordValidateArray: any = [];
  if (REGEX.ONE_CHARACTOR.test(newPassword)) {
    passwordValidateArray[0] = passwordChecks[0];
  }
  if (REGEX.ONE_CAPITAL.test(newPassword)) {
    passwordValidateArray[1] = passwordChecks[1];
  }
  if (REGEX.ONE_NUMBER.test(newPassword)) {
    passwordValidateArray[2] = passwordChecks[2];
  }
  if (REGEX.ONE_SYMBOL.test(newPassword)) {
    passwordValidateArray[3] = passwordChecks[3];
  }
  if (newPassword.length >= 8) {
    passwordValidateArray[4] = passwordChecks[4];
  }
  return passwordValidateArray;
};
