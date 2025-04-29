export interface ChatBotResponsePropsTypes {
  output: string;
  response_time: any;
  sources: SourcesTypes;
  isCollapsed: boolean;
  answers: string;
  isChecking: boolean;
  isTaskAdded: boolean;
}

export interface SourcesTypes {
  Source_URL: string;
  name: string;
}
