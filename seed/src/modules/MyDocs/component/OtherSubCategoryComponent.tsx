import { Box, Divider } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyFile from 'src/assets/svg/EmptyFile.svg';
import CreateNewSubCategoryModal from 'src/modules/Reports/component/SaveFileReportModal';
import { checkLengthOfAText } from 'src/modules/Reports/component/util';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { createNewNameOfASubCategory } from '../api/myDocApi';
import FileContainerHeader from './FileContainerHeader';
import SubCategoriesWrapperComponent from './SubCategoriesWrapperComponent';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';

const OtherSubCategoryComponent = ({
  selectedCategory,
  callTheSideNavToUpdate,
  handleSelectedCategory
}) => {
  const { actions } = useSelector((state: RootState) => state.myDocs);
  const { t } = useTranslation('mydoc');
  const [openCreateNewFileModal, setOpenCreateNewFileModal] =
    useState<boolean>(false);
  const [createCategoryName, setCreateCategoryName] = useState<string>('');
  const [newSubCategoryAdded, setNewSubCategoryAdded] = useState<string>('');
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(false);

  const addNewNameLoader = false;
  const handleSaveCategory = async () => {
    setIsSaveButtonDisabled(true);
    if (createCategoryName.length) {
      // call the api and save the name
      try {
        const res = await createNewNameOfASubCategory(
          selectedCategory?.categoryId,
          createCategoryName
        );
        if (res?.message?.includes('added successfully')) {
          showSuccessMessage(res?.message, '', {});
        }
      } catch (error) {
        showErrorMessage(error?.response?.data?.cause, {});
      } finally {
        setNewSubCategoryAdded(createCategoryName);
        setCreateCategoryName('');
      }
    } else {
      showErrorMessage('Name cannot be blank', {});
    }
    setOpenCreateNewFileModal(false);
  };

  const closeFileModal = () => {
    setOpenCreateNewFileModal(false);
  };

  const creteNewSubCategory = () => {
    setNewSubCategoryAdded('');
    setIsSaveButtonDisabled(false);
    setOpenCreateNewFileModal(true);
  };

  const handleCreateNamChange = (event) => {
    const inputValue = event?.target?.value;
    let trimmedValue = inputValue?.trim();
    let updatedValue = '';
    if (trimmedValue !== '') {
      updatedValue = event?.target?.value?.replace(/\s+/g, ' ');
      setCreateCategoryName(updatedValue);
      if (updatedValue?.length >= 50 || updatedValue?.length <= 2) {
        setIsSaveButtonDisabled(true);
      } else {
        setIsSaveButtonDisabled(false);
      }
    } else {
      setCreateCategoryName('');
    }
  };

  const handleOpenCreateNewNameModal = () => {
    setOpenCreateNewFileModal(true);
    setIsSaveButtonDisabled(false);
    setCreateCategoryName('');
  };

  return (
    <>
      <Box sx={{ py: 5, px: 5 }}>
        <FileContainerHeader
          title={selectedCategory?.name}
          isCreateNewButoon={selectedCategory?.types?.length >= 1}
          handleCreateNewName={handleOpenCreateNewNameModal}
          createNewCategoryButtonDisable={!actions.includes('run-gap-analysis')}
        />
      </Box>
      <Divider className="divider" />
      <Box>
        {addNewNameLoader ? (
          <Box className="flex-basic-center mt-100  mb-100">
            <Box className="spinnerLoading mt-70"></Box>
          </Box>
        ) : (
          <SubCategoriesWrapperComponent
            selectedCategory={selectedCategory}
            callTheSideNavToUpdate={callTheSideNavToUpdate}
            newSubCategoryAdded={newSubCategoryAdded}
            handleSelectedCategory={handleSelectedCategory}
          />
        )}
      </Box>
      <Box>
        {selectedCategory?.types?.length === 0 && (
          <Box sx={{ py: 17 }}>
            <EmptyPlaceholder
              imgWidth={'250'}
              imageUrl={EmptyFile}
              titleText={t('createNewName')}
              subText={
                <Box>
                  <Box> {t('subTitleOfCreateNewNam1')}</Box>
                  <Box> {t('subTitleOfCreateNewNam2')}</Box>
                </Box>
              }
              goToRoute={creteNewSubCategory}
              buttonText={t('createNewName')}
              isStartIcon={true}
              disabledButton={!actions.includes('run-gap-analysis')}
              startIcon={
                <Box sx={{ color: 'white' }} className="icon-plus iconStyle" />
              }
            />
          </Box>
        )}
      </Box>

      <CreateNewSubCategoryModal
        handleCancel={closeFileModal}
        handleSave={handleSaveCategory}
        open={openCreateNewFileModal}
        text={{
          title: t('createNewModalHeading'),
          description: t('createNewModalDescription'),
          cancelText: 'Cancel',
          saveText: 'Save',
          inputFileTemp: ''
        }}
        handleOnChange={handleCreateNamChange}
        fileName={createCategoryName}
        widthClass="w-70"
        disableSaveButton={isSaveButtonDisabled}
        checkLengthOfAText={checkLengthOfAText}
        showErrorMessage={true}
        placeHolder="Enter Document
        Name"
      />
    </>
  );
};

export default OtherSubCategoryComponent;
