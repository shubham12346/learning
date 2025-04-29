import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { getChatBotQuestions } from '../api/DataCopilot';
import { useDispatch } from 'react-redux';
import { setSampleQuestions } from '../service/datacopilot.service';
import { ChatBotQuestions } from '../model';

const useSampleQuetions = () => {
  const sampleQuestions: [] | ChatBotQuestions[] = useSelector(
    (state: RootState) => state.dataCopilot.sampleQuestions
  );
  const dispatch = useDispatch<any>();

  const fetchSampleQuestions = async () => {
    const res = await getChatBotQuestions();
    dispatch(setSampleQuestions(res));
  };

  useEffect(() => {
    if (sampleQuestions?.length < 1) {
      fetchSampleQuestions();
    }
  }, []);
};

export default useSampleQuetions;
