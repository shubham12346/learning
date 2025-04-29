import { Dispatch, SetStateAction } from 'react';

export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}

export type UserData = {
  name: string;
  avatar: string;
};

export enum BusinessTypeKey {
  totalGrossRevenue = 'totalGrossRevenue',
  aum = 'aum'
}

export const OnboardingFormfields = {
  businessName: 'businessName',
  businessType: 'businessType',
  totalGrossRevenue: 'totalGrossRevenue',
  aum: 'aum',
  incorporateCountry: 'incorporateCountry',
  incorporateState: 'incorporateState',
  employeeUnderOrg: 'employeeUnderOrg',
  employeeLocatedCountry: 'employeeLocatedCountry',
  employeeLocatedState: 'employeeLocatedState',
  clientLocatedCountry: 'clientLocatedCountry',
  clientLocatedState: 'clientLocatedState'
};

export type crdPropType = {
  setStep: (value) => void;
  saveOnboardingCrdEntry: (value: string) => void;
};
