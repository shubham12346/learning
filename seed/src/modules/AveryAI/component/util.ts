export function transformSessions(inputObject) {
  const today = new Date();
  const sessions = inputObject.session;

  const history = sessions?.reduce((result, session) => {
    const updatedAt = new Date(session.updatedAt);
    const diffInDays = Math.floor(
      (today.getTime() -
        updatedAt.getTime() +
        today.getTimezoneOffset() * 60 * 1000) /
        (1000 * 60 * 60 * 24)
    );

    let title;
    if (diffInDays <= 0) {
      title = 'Today';
    } else if (diffInDays === 1 || (diffInDays >= 0 && diffInDays <= 1)) {
      title = 'Yesterday';
    } else if (diffInDays > 1 && diffInDays <= 7) {
      title = 'Previous 7 days';
    } else if (diffInDays > 7 && diffInDays <= 30) {
      title = 'Previous 30 days';
    } else if (
      diffInDays > 30 &&
      today.getFullYear() === updatedAt.getFullYear()
    ) {
      title = updatedAt.toLocaleString('en-us', { month: 'long' });
    } else if (
      diffInDays >= 60 &&
      today.getFullYear() !== updatedAt.getFullYear()
    ) {
      title = `${today.toLocaleString('en-us', {
        month: 'long'
      })} ${updatedAt.getFullYear()}`;
    }

    const index = result.findIndex((item) => item.title === title);

    if (index === -1) {
      result.push({
        title,
        list: [{ sessionTitle: session.title, id: session.id }]
      });
    } else {
      result[index]?.list?.push({
        sessionTitle: session.title,
        id: session.id
      });
    }

    return result;
  }, []);

  return history;
}

export const DISABLE_ADD_TASK_BUTTON_KEYS = [
  'out of my regulatory landscape scope'
];

export const ERROR_MESSAGE_OF_INAPPROPRIATE_QUESTION = [
  'Unfortunately, it looks like this question is out of my regulatory landscape scope I can respond to. For further information please contact support@regverse.com'
];

export const CHATBOTS_ARE_BUSY = [
  'All chatbots are busy. Your request is in the queue. Check back later'
];
export const getChatResponseStringInToObject = (citationString) => {
  if (citationString.includes(ERROR_MESSAGE_OF_INAPPROPRIATE_QUESTION)) {
    const [_, parsedCitationData] = citationString.split('$$$citations$$$:');
    const finraData = JSON.parse(parsedCitationData);
    const outputText = finraData.output;

    const finraObject = {
      output: outputText
    };
    return finraObject;
  }
  const regex = /\$\$\$citations\$\$\$:/g;
  let onlyObjectKeysString = citationString.replace(regex, '');
  let citationObject = JSON.parse(onlyObjectKeysString);
  return citationObject;
};

export function convertChatbOtAnswerStringToObject(jsonString) {
  const parsedData = JSON.parse(jsonString);
  const output = parsedData.output;

  if (!output || output.includes(ERROR_MESSAGE_OF_INAPPROPRIATE_QUESTION[0])) {
    return ERROR_MESSAGE_OF_INAPPROPRIATE_QUESTION[0];
  }

  if (!jsonString.includes('$$$citations$$$:')) {
    const citationData = JSON.parse(jsonString);
    const outputText = citationData.output;
    const sources = citationData.sources;
    const responseTime = citationData.response_time;
    return {
      output: outputText,
      sources: sources,
      responseTime: responseTime
    };
  }

  const [_, parsedCitationData] = output.split('$$$citations$$$:');

  const finraData = JSON.parse(parsedCitationData);

  const outputText = finraData.output;
  const sources = finraData.sources;
  const responseTime = finraData.response_time;

  const finraObject = {
    output: outputText,
    sources: sources,
    responseTime: responseTime
  };

  return finraObject;
}

export enum CHATBOT_RESPONSE {
  PENDING = 'pending',
  FAILED = 'failed'
}

export const TimeInSeconds = 30000;
