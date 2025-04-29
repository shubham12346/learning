import { useEffect, useState } from 'react';
import { regulationListDropdown } from '../api/gapActionPlanApi';

const useRegulationList = (gapId: string) => {
  const [regulationList, setRegulationList] = useState([]);

  useEffect(() => {
    fetchRegulation(gapId);
  }, []);

  const fetchRegulation = async (gapId) => {
    const res = await regulationListDropdown(gapId);
    const regulations = res?.regulations?.map?.((reg) => {
      return {
        id: reg?.regulationId,
        value: reg?.regulationName,
        label: reg?.regulationName
      };
    });
    setRegulationList(regulations);
  };
  return regulationList || [];
};

export default useRegulationList;
