import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAgenciesList, getYearListOptions } from './api/fineApi';
import EnforcementHeader from './component/EnforcementHeader';
import FineHeader from './component/FineHeader';

const FinesModule = () => {
  //const
  const [agencyListOptionsForGraph, setAgencyListOptionsForGraph] = useState(
    []
  );
  const [agencyListOptionsForTable, setAgencyListOptionsForTable] = useState(
    []
  );

  //state variables
  const [yearListOptions, setYearListOptions] = useState([]);

  //methods
  const fetchYearListOptions = async () => {
    const res = await getYearListOptions();
    setYearListOptions(res);
    return res;
  };

  const fetchAgencyList = async () => {
    const res = await getAgenciesList();
    const { regulatoryOrganizations } = res;
    const agencies = regulatoryOrganizations?.map((item) => {
      return {
        name: item.name,
        id: item.id,
        value: item.name,
        label: item.name
      };
    });
    setAgencyListOptionsForGraph([
      { name: 'ALL', id: 1, value: 'ALL' },
      ...agencies
    ]);
    setAgencyListOptionsForTable(agencies);
  };

  //useEffect
  useEffect(() => {
    fetchYearListOptions();
    fetchAgencyList();
  }, []);
  
  const { t } = useTranslation('fines');
  return (
    <Container maxWidth={'xl'}>
      {yearListOptions.length > 0 && (
        <Box sx={{ ml: 6 }} className="fines">
          <Box className="mb-35">
            <Typography variant="h3">{t('fines')}</Typography>
          </Box>
          <FineHeader
            agencyListOptions={agencyListOptionsForGraph}
            yearListOptions={yearListOptions}
          />
          <EnforcementHeader
            agencyListOptions={agencyListOptionsForTable}
            yearListOptions={yearListOptions}
          />
        </Box>
      )}
    </Container>
  );
};

export default FinesModule;
