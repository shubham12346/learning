//Built-in Imports
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

//Internal Imports
import SidebarLayout from 'src/core/layout/SidebarLayout';
import BaseLayout from 'src/core';
import { GuardedRoute } from './guarded-routes';
import {
  LOGIN,
  SIGNUP,
  ERROR_PAGE,
  ONBOARDING,
  FORGOTPASSWORD,
  SETPASSWORD,
  COMPANIES,
  USERS,
  REGULATION,
  TASKS,
  ACTION_PLAN,
  TASK_PLAN,
  SETTING,
  NEWS,
  DASHBOARD,
  REPORTS,
  AveryAI,
  FINES,
  MORE_INFO_TASK,
  ACTIONPALN_ATTACHMENT,
  REGULATION_POLICIES,
  MY_DOCS,
  FUSION_ONE,
  ADMIN_REGULATION,
  GAP_ACTION_PLAN,
  GAP_ACTIVITY_DETAILED_VIEW,
  DATA_COPILOT
} from './../shared/constants/constants';

import * as ROUTES from '../shared/constants/routes';
import { Loader, OnboardingLoader } from './SuspenseLoader';
import ErrorBoundary from 'src/shared/components/errorComponent/ErrorBoundary';
import ReceiveTokenModule from 'src/modules/ReceiveToken/ReceiveTokenModule';
import AddChatbotForm from 'src/modules/Setting/component/accountDetail/AddChatbotForm';
import AveryAIModule from 'src/modules/AveryAI/AveryAIModule';
import { SampleQuestionProvider } from 'src/modules/DataCoPilot/component/SampleQuestionContext';

// Pages
// Common pages
const ErrorPage = Loader(lazy(() => ERROR_PAGE));
//FusionOne
const FusionOne = Loader(lazy(() => FUSION_ONE));
// Auth
const Login = Loader(lazy(() => LOGIN));
const ForgotPassword = Loader(lazy(() => FORGOTPASSWORD));
const SignUp = Loader(lazy(() => SIGNUP));
const SetPassword = Loader(lazy(() => SETPASSWORD));

// Onboarding
const Onboarding = OnboardingLoader(lazy(() => ONBOARDING));

// COMPANIES
const Companies = Loader(lazy(() => COMPANIES));

// Users
const Users = Loader(lazy(() => USERS));

// Regulations
const Regulation = Loader(lazy(() => REGULATION));

// Tasks
const Tasks = Loader(lazy(() => TASKS));

const ActionPlan = Loader(lazy(() => ACTION_PLAN));
const ActionPlanAttachment = Loader(lazy(() => ACTIONPALN_ATTACHMENT));
const TaskOperations = Loader(lazy(() => TASK_PLAN));
const RegulationPolicies = Loader(lazy(() => REGULATION_POLICIES));

// News
const News = Loader(lazy(() => NEWS));

// Dashboard
const Dashboard = Loader(lazy(() => DASHBOARD));

//setting
const Setting = Loader(lazy(() => SETTING));

// Avery AI
const Averyai = Loader(lazy(() => AveryAI));

// Avery AI
const Reports = Loader(lazy(() => REPORTS));

// Fines
const Fines = Loader(lazy(() => FINES));

// More info task
const MoreInfoTasks = Loader(lazy(() => MORE_INFO_TASK));

// my docs

const MyDocs = Loader(lazy(() => MY_DOCS));

// Admin Regulation
const AdminRegulation = Loader(lazy(() => ADMIN_REGULATION));

// Gap Action plan
const GapActionPlan = Loader(lazy(() => GAP_ACTION_PLAN));

//GapActivityDetailedView
const GapActivityDetailedView = Loader(lazy(() => GAP_ACTIVITY_DETAILED_VIEW));

// Data Co pilot
const DataCoPilot = Loader(lazy(() => DATA_COPILOT));
const router = createBrowserRouter([
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />
      },
      {
        path: ROUTES.SSO_VALIDATION,
        element: <ReceiveTokenModule />
      },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'set-password', element: <SetPassword /> }
    ]
  },
  {
    path: ROUTES.BASEPATH,
    element: <SidebarLayout />,
    children: [
      {
        path: ROUTES.COMPANIES,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.COMPANIES} component={Companies} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.FUSIONONE,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.FUSIONONE} component={FusionOne} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.USERS,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.USERS} component={Users} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.TASKS,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.TASKS} component={Tasks} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.REGULATION,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.REGULATION} component={Regulation} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.SELECTED_REGULATION,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              path={ROUTES.SELECTED_REGULATION}
              component={Regulation}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.ACTION_PLAN,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              path={ROUTES.SELECTED_REGULATION}
              component={ActionPlan}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.SELECTED_ACTION_PLAN,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              path={ROUTES.SELECTED_ACTION_PLAN}
              component={ActionPlan}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.REGULATION_POLICIES,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              path={ROUTES.REGULATION_POLICIES}
              component={RegulationPolicies}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.ACTIONPLAN_ATTACHMENT,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              path={ROUTES.ACTIONPLAN_ATTACHMENT}
              component={ActionPlanAttachment}
            />
          </ErrorBoundary>
        )
      },

      {
        path: ROUTES.ADD_TASK,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.ADD_TASK} component={TaskOperations} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.NEWS,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.NEWS} component={News} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.DASHBOARD,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.DASHBOARD} component={Dashboard} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.SETTING,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.SETTING} component={Setting} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.AVERYAI,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.AVERYAI} component={Averyai} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.REPORTS,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.REPORTS} component={Reports} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.FINES,
        element: (
          <ErrorBoundary>
            <GuardedRoute path={ROUTES.FINES} component={Fines} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.TASK_MORE_INFO,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              path={ROUTES.TASK_MORE_INFO}
              component={MoreInfoTasks}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.TASK_EDIT_TASK,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              path={ROUTES.TASK_EDIT_TASK}
              component={MoreInfoTasks}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.MY_DOCS,
        element: (
          <ErrorBoundary>
            <GuardedRoute component={MyDocs} path={ROUTES.MY_DOCS} />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.ADMIN_REGULATION,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              component={AdminRegulation}
              path={ROUTES.ADMIN_REGULATION}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.GAP_ACTION_PLAN_PATH,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              component={GapActionPlan}
              path={ROUTES.GAP_ACTION_PLAN_PATH}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.GAP_ASSESSMENT,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              component={GapActivityDetailedView}
              path={ROUTES.GAP_ASSESSMENT}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.ADD_EDIT_CHATBOT,
        element: (
          <ErrorBoundary>
            <GuardedRoute
              path={ROUTES.ADD_EDIT_CHATBOT}
              component={AddChatbotForm}
            />
          </ErrorBoundary>
        )
      },
      {
        path: ROUTES.DATA_COPILOT,
        element: (
          <ErrorBoundary>
            <SampleQuestionProvider>
              <GuardedRoute
                path={ROUTES.DATA_COPILOT}
                component={DataCoPilot}
              />
            </SampleQuestionProvider>
          </ErrorBoundary>
        )
      }
    ]
  },
  {
    path: ROUTES.ONBOARDING,
    element: (
      <ErrorBoundary>
        <GuardedRoute path={ROUTES.ONBOARDING} component={Onboarding} />
      </ErrorBoundary>
    )
  },
  {
    path: ROUTES.ERROR_PAGE,
    element: <ErrorPage />
  }
]);

export default router;
