export const APIEndPoint = {
  auth: {
    tokenExchange: 'auth/token-exchange',
    tokenStatus: 'user/status/',
    impersonet: 'auth/impersonate',
    originalToken: 'auth/impersonate/original-token'
  },
  onboarding: {
    businessType: 'business-type',
    businessTypeDetail: 'question/business-type/',
    country: 'country',
    state: '/state',
    organization: {
      startwith: 'organization/',
      endWith: '/t/business/profile',
      onboardingState: '/onboarding-state'
    },
    verifyCrd: 'organization/crd/',
    verify: 'verify',
    cancelCrd: {
      startWith: 'organization/',
      endWith: '/business/profile'
    }
  },
  regulations: {
    organization: 'organization/',
    listOfRegulatoryOrganization: 'regulatory-organization',
    regulationDetails: '/regulation',
    regulationDetailsGet: 'regulation',
    gapAssessment: {
      getActivityStatusDropdown: 'business-regulation/gap-assessment/status',
      getGapAssessmentActivityList:
        'business-regulation/gap-assessment/activity-tab-list',
      runGapAnalysis: 'business-regulation/gap-analysis'
    }
  },
  tenants: {
    listOfCompanies: 'organization/t/business',
    addCompany: 'organization/t/business',
    partnersList: 'organization/t/partner',
    addPartner: 'organization/t/partner'
  },
  user: {
    getAllUsers: {
      startwith: 'organization/user'
    },
    getAllGroup: {
      startwith: 'organization/group'
    },
    resendOrganization: 'organization/user/',
    resendInvitation: 'resend-invitation'
  },

  //CurrentRegulations
  currentRegulations: {
    organization: 'organization',
    listOfRegulatoryBody: '/regulatory-organization',
    regulation: '/regulation',
    regulationDetail: '/regulation-detail/',
    searchRegulation: 'organization/regulation'
  },

  //ProposedRegulations
  //https://dev.regverse.com/api/v1/regulation/proposed-regulation/{regulationId}
  proposedRegulations: {
    regulation: 'regulation/',
    proposed: 'proposed',
    proposedRegulation: 'proposed-regulation/'
  },
  //library Regulations

  libraryRegulations: {
    listOfRegulationOrganization: 'organization/regulatory-organization',
    addRegulationToCurrent: 'organization/library-regulation/',
    searchRegulationInLibrary: 'regulation/library',
    particularRegulation: 'regulation/library-regulation/'
  },

  //actionPlans
  generateActionPlan: {
    actionPlan: 'action-plan/',
    generate: 'generate/',
    fileTypeList: 'action-plan/attachment/type',
    attachment: 'attachment'
  },

  getGeneratedActionPlan: {
    organization: 'organization/',
    regulation: 'regulation/',
    actionPlan: '/action-plan',
    accept: 'accept'
  },

  // geTaskStatusList
  geTaskStatusList: {
    task: 'task/',
    status: 'status'
  },

  taskApi: {
    taskById: 'task/', // Task UID EDIT DELETE
    addTask: 'action-plan/task',
    deleteTaskById: 'task',
    taskRecurenceId: '/task-occurrence/'
  },

  //view task
  getTaskDetails: {
    actionPlan: 'action-plan/',
    task: '/task/'
  },

  //delete task
  deleteTask: {
    actionPlan: 'action-plan',
    task: '/task'
  },
  //dashboard

  dashboard: {
    organization: 'organization/',
    dashboard: 'dashboard/',
    regulation: 'regulation',
    task: 'task',
    complianceScore: 'compliance-score',
    regulatoryEvent: 'regulatory-event'
  },
  task: {
    task: 'task',
    organization: 'organization/',
    regulatoryOrg: 'regulatory-organization',
    taskStatus: 'task/status',
    taskTypeDropDownOptions: 'task/types',
    createTask: 'action-plan/task',
    cadenceDropDownOptions: 'task/cadence/status',
    taskOccurrence: 'task-occurrence'
  },

  calendarSync: {
    sendAuthCodeToBackendUrl: 'auth/microsoft/access-token',
    calendarSyncStatus: 'task/calendar-sync/status',
    syncCalendarTask: 'task/calendar-sync',
    timezoneList: 'task/calendar/timezone',
    selectedTimezone: 'task/calendar/timezone'
  },
  newsFeed: {
    news: 'news/',
    bookmark: 'bookmark/',
    lastRead: 'last-read/',
    agency: 'agency',
    category: 'category'
  },
  //obot
  chatBot: {
    chatBot: 'chatbot',
    session: 'chatbot/session',
    chat: 'chatbot/chats',
    chatBotStreamResponse: 'chatbot/stream',
    chatBotFeedback: 'chatbot/access-history/',
    feedback: 'feedback'
  },

  //fines
  fines: {
    agencyList: 'enforcement-action/regulatory-organization',
    fine_Amount: 'fine-amount',
    enforcement_action: 'enforcement-action',
    fine: 'fine',
    year: '/year',
    fine_range: '/fine-range'
  },

  //reports
  reports: {
    activityLog: 'activity-log/',
    auditTrail: 'audit-trail',
    annualPolicy: 'report/annual-policy?',
    gapAssesmentReport: 'organization/regulation',
    generateGapAssessmentReport: 'report/gap-analysis',
    generateAuditTrailReport: 'report/audit-trail'
  },
  settings: {
    user: 'user/',
    detail: '/detail',
    chatbot: 'chatbot/',
    chatbotConfig: 'list/instance',
    chatbotInstance: 'instance'
  },
  mfa: {
    updateMfa: 'user/auth/mfa-preference',
    getMfa: 'user/mfa-preference/'
  },

  //upload file
  uploadFile: {
    task: '/task/',
    attachment: '/attachment/',
    upload: 'upload',
    actionPlan: '/action-plan/'
  },

  //Delete file
  deleteFile: {
    attachment: 'attachment/',
    remove: '/remove',
    actionPlan: '/action-plan/'
  },

  //regulation Policy
  regulationPolicy: {
    businessRegulation: 'business-regulation',
    policy: '/policy',
    gap: '/gap'
  },
  // my docs

  myDoc: {
    categories: 'my-docs/category',
    deleteFile: 'my-docs/',
    deleteName: 'my-docs/category/type/',
    regulations: 'my-docs/gap-analysis/uploads',
    fileUploadsCount: 'my-docs/gap-analysis/file-upload-count'
  },
  //admin regulation

  adminRegulation: {
    regBodyOrganizationsCount:
      'regulation/evaluate/regulatory-organization-count',
    searchRegulation: 'regulation/evaluate/all',
    regulationList: 'regulation/evaluate',
    regulation: 'regulation',
    evaluate: 'evaluate',
    regulationType: 'regulation/type',
    regulationOrganizations: 'regulation/evaluate/regulatory-organizations/all',
    reviewedSearchRegulation: 'regulation',
    reviewedregBodyOrganizationsCount:
      'library-regulation/evaluate/regulatory-organization-count',
    reviewedRegulationList: 'regulation',
    reviewedRegulationById: 'regulation',
    reviewedRegulationSave: 'library-regulation'
  },
  tour: {
    getTourComponent: 'tour/components',
    tour: 'tour',
    status: 'status',
    changeTourStatus: 'tour/set/status/'
  },
  //fusion-one
  fusionOne: {
    getFusionOneToken: '/Login/GetLoginTokenPost',
    loginToFusionOne: '/Login/LoginWithToken?token=',
    createUserAndOrg: '/Login/CreateOrgNUser'
  },

  detailedGapActivityView: {
    gapActivity: 'business-regulation/gap-assessment',
    gapActivityListView: '/list-view'
  },
  // gap action plan under regulations
  gapActionPlan: {
    riskLevelStatusDropdown: 'risk-level',
    gap: '/gap',
    gapAssessmentOverview: { gap: 'gap-assessment/', overview: '/overview' },
    regulationDropdown: { gap: 'gap-assessment/', reg: '/regulation' },
    tasksList: { gap: 'gap-assessment/tasks/', detail: '/detail' },
    saveActionPlan: {
      gap: 'gap-assessment-action-plan/accept/'
    },
    deleteTask: { gap: 'gap-assessment/', task: '/task/' }
  },
  dataCopilot: {
    chat: 'chatbot/aydaq/query',
    categoryQuestions: 'chatbot/help-desk/category'
  }
};
