import React, { useState } from 'react';
import { getListOfRegulationInLibraryTab } from '../../apis/RegulationsApi';

let debouncer;

const useSearchFile = (
  url,
  getRegulationDetailsByID,
  filterParams= {}
) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchOnLoading, setLoadingOnSearch] = useState<boolean>(false);
  const [searchedRegulationList, setSearchedRegulationList] = useState<any[]>([
    {}
  ]);
  const [searchedRegulation, setSearchedRegulation] = useState<any>();

  const handleInputChange = async (event: any) => {
    if (typeof event?.target?.value === 'string') {
      const searchKeys = event?.target?.value?.trim();
      if (searchKeys?.length >= 3) {
        setLoadingOnSearch(true);
        setOpen(true);
        setSearchedRegulationList([]);
        const params = {
          ...filterParams,
          searchKeyword: searchKeys
        };
        clearTimeout(debouncer);
        debouncer = setTimeout(async () => {
          const searchList = await getListOfRegulationInLibraryTab(url, params);
          setSearchedRegulationList(
            searchList?.libraryRegulations ||
              searchList?.data ||
              searchList?.regulations
          );
          setLoadingOnSearch(false);
        }, 500);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  const handleOnchange = async (event: any, value: any) => {
    if (value?.id) {
      setSearchedRegulation(value);
      await getRegulationDetailsByID(value, true);
      handleClose();
    } else {
      setSearchedRegulation('');
    }
  };

  const handelOpen = () => {
    //setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isOptionEqualToValue = (option, value) => {
    return option?.name === value?.name;
  };
  const getOptionLabel = (option) => {
    if (option) {
      if (
        option?.name &&
        (option?.organization || option?.regulatoryOrganizationName)
      ) {
        return `${option?.organization || option?.regulatoryOrganizationName}-${
          option?.name
        }`;
      }
      if (option.name && option.organization) {
        return `${option.organization}-${option.name}`;
      }
      return;
    }
  };

  return {
    handleInputChange,
    handleOnchange,
    handelOpen,
    handleClose,
    isOptionEqualToValue,
    getOptionLabel,
    open,
    searchOnLoading,
    searchedRegulationList,
    searchedRegulation,
    setSearchedRegulation
  };
};

export default useSearchFile;
