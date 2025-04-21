export const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
export const FUSIONONE_API_URL = process.env.REACT_APP_FUSION_ONE_SERVER_URL;

export const USERPOOL_ID = process.env.REACT_APP_USERPOOL_ID;

export const USERPOOL_WEBCLIENT_ID =
  process.env.REACT_APP_USERPOOL_WEBCLIENT_ID;

export const HEADER_AUTHORIZATION = 'a64bccc5-1648-46ae-ad78-b0f890f1d6c1';

export const AWS_REGION = 'us-west-2';
export const AWS_CONFIG = {
  aws_appsync_graphqlEndpoint:
    process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,

  aws_appsync_region: process.env.REACT_APP_AWS_APPSYNC_REGION,

  aws_appsync_authenticationType: process.env.REACT_APP_AWS_AUTHENTICATIONTYPE,

  aws_appsync_apiKey: process.env.REACT_APP_AWS_APPSYNC_APIKEY
};

//Microsoft oauth and calendar async
export const MicrosoftCalendarSync = {
  clientId: process.env.REACT_APP_MICROSOFT_CLIENT_ID,
  clientSecret: process.env.REACT_APP_MICROSOFT_CLIENT_SECRET,
  scope: process.env.REACT_APP__MICROSOFT_CALENDAR_SCOPE,
  authUrl: process.env.REACT_APP_MICROSOFT_GET_ACCESSTOKEN,
  redirectToApplicationUrl:
    process.env.REACT_APP_MICROSOFT_BASE_APP_REDIRECT_URL,
  tokenUrl: process.env.REACT_APP_MICROSOFT_GET_TOKEN_URL
};

export const CUSTOMFORMWRAPPER = import(
  'src/modules/CustomFormWrapper/CustomFormWrapper'
);
export const LOGIN = import('src/auth/login/LoginContainer');
export const FORGOTPASSWORD = import(
  'src/auth/forgot-password/ForgotPasswordModule'
);
export const SIGNUP = import('src/auth/login/SignUp');
export const ONBOARDING = import('src/modules/OnBoarding/OnboardingIndex');
export const SETPASSWORD = import('src/auth/login/setPassword');
export const ERROR_PAGE = import('src/modules/ErrorPage/ErrorPage');
export const REGULATION = import('src/modules/Regulations');
export const COMPANIES = import('src/modules/Companies');
export const USERS = import('src/modules/Users');
export const TASKS = import('src/modules/Tasks/TaskIndex');
export const ACTION_PLAN = import('src/modules/ActionPlan/ActionPlanIndex');
export const FUSION_ONE = import('src/modules/FusionOne/index');
export const TASK_PLAN = import(
  'src/modules/ActionPlan/component/TaskPlan/TaskEditType'
);
export const REGULATION_POLICIES = import(
  'src/modules/Regulations/components/currentTab/RegulationPolicies'
);
export const AveryAI = import('src/modules/AveryAI/AveryAIModule');
export const REPORTS = import('src/modules/Reports/ReportsModule');
export const NEWS = import('src/modules/News/NewsIndex');
export const DASHBOARD = import('src/modules/Dashboard/DashboardModule');
export const FINES = import('src/modules/Fines/FinesModule');
export const SETTING = import('src/modules/Setting/index');
export const MORE_INFO_TASK = import(
  'src/modules/Tasks/component/tasks/MoreInfoEditView'
);
export const ACTIONPALN_ATTACHMENT = import(
  'src/modules/ActionPlan/component/Files/FileIndex'
);
export const ADMIN_REGULATION = import('src/modules/AdminRegulation/index');
export const MY_DOCS = import('src/modules/MyDocs/MyDocsIndex');
export const GAP_ACTION_PLAN = import(
  'src/modules/GapActionPlan/GapActionModule'
);
export const GAP_ACTIVITY_DETAILED_VIEW = import(
  'src/modules/gapActivityDetailedView/GapActivityDetailedViewModule'
);
export const DATA_COPILOT = import('src/modules/DataCoPilot/DataCoPilotIndex');
export const COMPLETED = 'completed';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';
export const APPROVED = 'approved';

export enum statusLable {
  COMPLETED = 'completed',
  PENDING = 'pending',
  FAILED = 'failed'
}

export const PASSWORD_STRENGTH_LABEL_BY_SCORE: Record<number, string> = {
  0: 'weak',
  1: 'weak',
  2: 'fair',
  3: 'good',
  4: 'strong'
};

export const REGEX = {
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NUMBER_DECIMAL:
    /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0{1,2})?|0(?:\.\d{1,2})?)$/,
  NUMBER_INTEGER: /^(?:\d*[1-9]\d*|)$/,
  TEXT_ONLY: /^[a-zA-Z ]*$/,
  PASSWORD:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{8,}$/,
  JSON: /^[\],:{}\s]*$|^"(.|\\[\\"/bfnrt])*"$/,
  ONE_CHARACTOR: /[a-z]/,
  ONE_CAPITAL: /[A-Z]/,
  ONE_NUMBER: /[0-9]/,
  ONE_SYMBOL: /[!@#$%^&*]/
};

export const MEGABYTE_CONVERTER = 1000000;

export const FIELD_TYPE = {
  TEXT: 'text',
  RADIO: 'radio',
  EMAIL: 'email',
  SWITCH: 'switch',
  SELECT: 'select',
  REGEX: 'regex',
  PASSWORD: 'password',
  CHECKBOX: 'checkbox',
  TEXTAREA: 'textarea',
  NUMBER_ONLY: 'number_only',
  INTEGER_ONLY: 'integer_only',
  MULTI_SELECT: 'multi-select',
  AUTOCOMPLETE: 'autocomplete',
  CHECKBOX_GROUP: 'checkbox_group',
  DATE: 'date',
  TEXTAREA_FIELDS: 'textarea_fields'
};

export const TABLE_PAGESIZE = [15, 25, 50];

export const AVERY_HELP_Link = 'https://regverse.zendesk.com/hc/en-us';

export const CURRENT_DATE = new Date();

export enum ORGANIZATION_ROLE_ENUM {
  USER = 'user',
  ADMIN = 'admin',
  GROUP_ADMIN = 'group-amin',
  BUSINESS_SECONDARY_ADMIN = 'business-secondary-admin',
  BUSINESS_PRIMARY_ADMIN = 'business-primary-admin',
  PARTNER_ADMIN = 'partner-admin',
  ADMINISTRATION_ADMIN = 'administration-admin', // Regverse Admin
  // ONLY in case of LoginAs
  REGVERS_ADMIN_LOGIN_AS = 'administration-admin-login-as',
  PARTNER_ADMIN_LOGIN_AS = 'partner-admin-login-as'
}

export enum MoreInfoTypes {
  Organization = 'COMPANY INFO',
  Partner = 'PARTNER INFO',
  User = 'USER INFO'
}

export const MAX_CHAR_LIMIT = {
  BASIC_CHAR_LENGTH: 20,
  CHAR_LENGTH_THIRTY: 30,
  SUMMARY_STRING_LENGTH: 100,
  INVITE_MSG: 200,
  CHAR_LENGTH: 300
};

export const PRIMARY_COLOR = '#31125F';

export const DATE_FORMATS = {
  MONTH_DATE_YEAR: 'MMM dd, yyyy'
};

//times Filter options
export const timeFilterListOptions = [
  {
    value: 'allTime',
    name: 'All Time'
  },
  {
    value: 'thisMonth',
    name: 'This Month'
  },
  {
    value: 'thisQuater',
    name: 'This Quarter'
  },
  {
    value: 'thisYear',
    name: 'This Year'
  }
];

//NewsType
export const NEWSTYPE = {
  LATEST: 'latest',
  LASTREAD: 'last-read',
  BOOKMARK: 'bookmark'
};

export const currencyFormatter = (number) => {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    return 'N/A';
  }
  const formatter = Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD', // Use the USD currency
    notation: 'compact',
    compactDisplay: 'short'
  });
  return formatter.format(number);
};

export const currencyFormatterWithoutDollar = (number) => {
  const formatter = Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(number);
};

export const AGENCY = 'agency';
export const TASK_NAME = 'taskname';
export const NONE = 'None';
export const ACCEPTED = 'accepted';

export const Cadence = Object.freeze({
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  QUARTERLY: "quarterly",
  YEARLY: "yearly",
  NO_RECURRENCE: "no-recurrence",
});
