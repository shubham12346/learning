import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RegulationElement } from 'src/shared/components/common/autocomplete/AutoCompleteComponent';
import SearchComponent from 'src/shared/components/common/autocomplete/SearchComponent';
import { getAllSearchedRegulation } from '../apis/OnBoardingApi';
import { Box } from '@mui/material';

let debounceTimer = null;

const SearchRegulations = ({ handleSearchSelected }) => {
  const { t } = useTranslation('onboarding');

  const [open, setOpen] = useState(false);
  const [isLoadingOnSearch, setLoadingOnSearch] = useState(false);
  const [searchedList, setSearchedList] = useState<any>([]);

  const handleInputChange = async (event: any) => {
    const searchKeys = event?.target?.value;
    if (searchKeys?.length >= 3 || searchKeys?.length === 0) {
      setLoadingOnSearch(true);
      setOpen(true);
      setSearchedList([]);
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const searchedList = await getAllSearchedRegulation(searchKeys.trim());
        setSearchedList(searchedList.data);
        setLoadingOnSearch(false);
      }, 1000);
    } else {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isOptionEqualToValue = (option, value) => {
    return option?.name === value?.name;
  };
  const getOptionLabel = (option) => {
    if (option) {
      if (option.name && option.organization) {
        return `${option.organization}-${option.name}`;
      }
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <SearchComponent
        placeholder={t('searchRegulationPlaceholder')}
        width="100%"
        handleClose={handleClose}
        getOptionLabel={getOptionLabel}
        handleInputChange={handleInputChange}
        handleOnchange={handleSearchSelected}
        isOptionEqualToValue={isOptionEqualToValue}
        options={searchedList}
        loading={isLoadingOnSearch}
        open={open}
        renderOption={(props, option) => (
          <li {...props} key={option.name}>
            <RegulationElement regulation={option} />
          </li>
        )}
        popper={{ popperHeight: '', popperWidth: '420px', top: 52, left: 0 }}
      />
    </Box>
  );
};

export default SearchRegulations;
