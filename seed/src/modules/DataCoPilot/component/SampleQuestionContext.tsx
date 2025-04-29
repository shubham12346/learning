import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface question {
  id: string;
  question: string;
}

interface SampleQuestion {
  selectedSampleQuestion: question;
  handleSampleQuestion: (selectedSampleQuestion: question) => void;
  lastSampleQuestionAsked: question;
  setLastSampleQuestionAsked: Dispatch<SetStateAction<question>>;
}
const SampleQuestionContext = createContext<SampleQuestion>(null);

export default SampleQuestionContext;

export const SampleQuestionProvider = ({ children }) => {
  const [selectedSampleQuestion, setSelectedSampleQuestion] =
    useState<question>(null);
  const [lastSampleQuestionAsked, setLastSampleQuestionAsked] =
    useState<question>(null);

  const handleSampleQuestion = (inputValue: {
    id: string;
    question: string;
  }) => {
    setSelectedSampleQuestion(inputValue);
  };

  return (
    <SampleQuestionContext.Provider
      value={{
        selectedSampleQuestion,
        handleSampleQuestion,
        lastSampleQuestionAsked,
        setLastSampleQuestionAsked
      }}
    >
      {children}
    </SampleQuestionContext.Provider>
  );
};

export const useSampleContext = (): SampleQuestion => {
  return useContext(SampleQuestionContext);
};
