//  Routes
// Auth Routes
export const LOGIN = '/';
export const SETPASSWORD = 'set-password';
export const FORGETPASSWORD = 'forgot-password';

// Error Routes
export const ERROR_PAGE = '/not-found';

// Common Routes / URLS
export const BASEPATH = 'avery';
export const DASHBOARD = 'dashboard';
export const CUSTOMFORM = 'customform';
export const ONBOARDING = 'onboarding';
export const COMPANIES = 'companies';
export const USERS = 'users';
export const AVERY_AI = 'avery-ai';
export const REPORTS = 'reports';
export const FUSIONONE = 'fusion-one';
export const SSO_VALIDATION = 'sso-validation';

//regulations
export const REGULATION = 'regulations';
export const TASKS = 'tasks';
export const SELECTED_REGULATION = 'regulations/:regId';
export const ACTION = 'action-plan';
export const ACTION_PLAN = `regulations/:regId/${ACTION}`;
export const SELECTED_ACTION_PLAN = `regulations/:regId/${ACTION}/:actionId`;
export const ACTIONPLAN_ATTACHMENT = `regulations/:regId/${ACTION}/:actionId/attachment`;
export const ADD_TASK = `${SELECTED_ACTION_PLAN}/task/:taskMode`;
export const VIEW_TASK = `${SELECTED_ACTION_PLAN}/task/:taskid/:isEdit`;
export const REGULATION_POLICIES = `regulations/:regId/regulation-policies`;
export const GAP_ASSESSMENT = `regulations/gapassessment/viewdetails/:activityId`;

export const TASK_MORE_INFO = 'tasks/:taskId';
export const TASK_EDIT_TASK = 'tasks/edit/:taskId';
// news
export const NEWS = 'news';

//setting
export const SETTING = 'setting';

//edit or add chatbot
export const ADD_EDIT_CHATBOT = 'setting/chatbot';

//
export const FINES = 'fines';
//Avery AI
export const AVERYAI = 'avery-ai';

// My docs

export const MY_DOCS = 'mydoc';

// Admin regulation
export const ADMIN_REGULATION = 'admin/regulation';

// User Gap Action plan
export const GAP_ACTION_PLAN_PATH = 'regulations/gapActionPlan';

//view gap assessment activity details
export const GAP_ASSESSMENT_ACTIVITY_VIEW_DETAILS = '';

// Data CoPilot

export const DATA_COPILOT = 'data-copilot';
