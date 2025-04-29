import React, { useEffect, useState } from 'react';
import Typography from 'src/shared/components/typography/Typography';

import { Box, List } from '@mui/material';
import './onBoarding.scss';
import EastIcon from '@mui/icons-material/East';
import { useTranslation } from 'react-i18next';
import SearchRegulations from './RegulationSearch';
import { addZeroAtFrontIfNumIsLessThan10 } from '../utils/utils';

export const RegulatoryOrganization = ({
  regulationList,
  fetchRegulationDetails,
  handleSearchSelected,
  regCountAndNewAdded
}) => {
  const { t } = useTranslation('english');
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    setSelectedItem(regulationList[0]?.id);
  }, [regulationList]);

  const renderCountAndNewAdded = (org) => {
    const reg = regCountAndNewAdded?.get(org?.id);
    return (
      <>
        <Box className="">
          <Typography className="mt-5" variant="body1">
            {t('regulations')}
            <span className="textweight">
              {`: ${addZeroAtFrontIfNumIsLessThan10(
                Number(reg?.totalCount) || 0
              )}`}
            </span>
          </Typography>
        </Box>
        <Box></Box>
        {reg?.newAdded?.length >= 1 && (
          <Box className="newAddedTag w-40 mt-8">
            <Typography variant="body2">
              {`${reg?.newAdded.length} ${t('newAdded', {
                ns: 'onboarding'
              })}`}
            </Typography>
          </Box>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      <Box className="searchRegualtions">
        <SearchRegulations handleSearchSelected={handleSearchSelected} />
      </Box>
      <List
        className={`regulation-detail-screen-scroll `}
        sx={{ width: '100%', p: 0 }}
      >
        {regulationList.map((org, index) => (
          <Box
            key={org.id}
            className={`selectCategory  regulationBoxLeft hr-bottom-line d-flex flex-basic-space-between w-100 
            `}
            onClick={() => {
              setSelectedItem(org.id);
              fetchRegulationDetails(org);
            }}
          >
            <Box
              className="regulationDiv d-flex flex-direction-column w-100"
              sx={{ pl: 4, py: 0.5 }}
            >
              <Box className={'d-flex w-100 textalign'}>
                <Typography className="" variant="subtitle1">
                  {org.name}
                </Typography>
              </Box>
              {renderCountAndNewAdded(org)}
            </Box>
            <Box> </Box>

            {selectedItem === org?.id && (
              <Box sx={{ px: 1 }} className="eastIconHide">
                <Box className="eastIcon flex-basic-center">
                  <EastIcon />
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </List>
    </React.Fragment>
  );
};
