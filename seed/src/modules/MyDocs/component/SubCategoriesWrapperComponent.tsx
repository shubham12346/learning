import { Box, Divider, Grid, Typography } from '@mui/material';
import FileUploadComponent from './FileUploadComponent';
import { useEffect, useState } from 'react';
import { SUPPORTED_DOC, SUPPORTED_GAP_ANALYSIS_DOC } from './utils';
import { DeleteFileModal } from 'src/modules/ActionPlan/component/Files/DeleteFileModal';
import { useTranslation } from 'react-i18next';
import {
  deleteAFileInASubCategory,
  deleteNameInASubCategoryFile,
  getAllUploadedFilesOfASubcategory,
  uploadSingleOrMultipleFile
} from '../api/myDocApi';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';
import { MY_DOCS_CATEGORIES } from '../constants/constants';

export type TsubCategories = {
  id: string;
  name: string;
  documents: any[];
};

export type TsubCategoriesWrapperComponent = {
  selectedCategory: any;
  callTheSideNavToUpdate: any;
  newSubCategoryAdded?: any;
  handleSelectedCategory?: (category: any) => void;
};

export type TableHeaderWrapperComponent = {
  selectedCategory: any;
};

export const TableHeader = ({
  selectedCategory
}: TableHeaderWrapperComponent) => {
  const { t } = useTranslation('mydoc');
  return (
    <Grid container sx={{ py: '28px', px: 9 }}>
      <Grid item xs={12} md={12} lg={3} xl={3}>
        <Typography className="documentNameFont">
          {t('documentName')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={9} xl={9}>
        <Typography className="documentNameFont ">
          {t('document')}{' '}
          <span className="documentTypeFont">
            {selectedCategory?.name == MY_DOCS_CATEGORIES.gapAnalysisPolicies
              ? SUPPORTED_GAP_ANALYSIS_DOC
              : SUPPORTED_DOC}
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
};
const SubCategoriesWrapperComponent = ({
  selectedCategory,
  callTheSideNavToUpdate,
  newSubCategoryAdded,
  handleSelectedCategory
}: TsubCategoriesWrapperComponent) => {
  const { t } = useTranslation('mydoc');
  const [allSubCategoryFiles, setAllSubCategoryFiles] =
    useState<TsubCategories[]>();
  const [fileLoader, setFileLoader] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [openDeleteSubCategoryModal, setOpenDeleteSubCategoryModal] =
    useState(false);
  const [selectDeleteItem, setSelectDeleteItem] = useState<any>();

  const allSubCategoryLoader = false;

  useEffect(() => {
    fetchAllUploadedFilesForACategory(selectedCategory?.categoryId);
  }, [selectedCategory]);

  useEffect(() => {
    callSideNavToUpdateAndThenUpdateDocumentList();
  }, [newSubCategoryAdded]);

  const callSideNavToUpdateAndThenUpdateDocumentList = async () => {
    const res: any = await callTheSideNavToUpdate();
    const getSelectedArrayId = res?.filter(
      (item) => item?.name === selectedCategory?.name
    );

    if (handleSelectedCategory) {
      handleSelectedCategory(getSelectedArrayId[0]);
    }
  };

  // delete the file and close the modal
  const hanldleDeleteSubCategoryDocument = async (file: any) => {
    setFileLoader(true);
    try {
      const res = await deleteAFileInASubCategory(file?.id);
      if (res?.message === 'File deleted successfully') {
        showSuccessMessage(res?.message, '', {});
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause, {});
    }

    setFileLoader(false);
    setSelectedSubCategory('');
    callTheSideNavToUpdate(selectedCategory?.categoryId);
    fetchAllUploadedFilesForACategory(selectedCategory?.categoryId);

    return true;
  };
  // upload single or multiple file
  const handleUpload = async (file, subCategory) => {
    setFileLoader(true);
    await saveUploadedFile(file, selectedCategory?.categoryId, subCategory?.id);

    callTheSideNavToUpdate(selectedCategory?.categoryId);
    setFileLoader(false);

    fetchAllUploadedFilesForACategory(selectedCategory?.categoryId);
  };

  // delete a sub category name
  const handleDeleteSubcategoryName = async () => {
    try {
      const res = await deleteNameInASubCategoryFile(selectDeleteItem?.id);
      if (res?.message === 'Deleted successfully') {
        showSuccessMessage(res?.message, '', {});
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause, {});
    }
    callSideNavToUpdateAndThenUpdateDocumentList();
    setOpenDeleteSubCategoryModal(false);
  };

  // open sub category delete  modal
  const handleOpenSubCategoryDeleteModal = async (subCategory) => {
    setOpenDeleteSubCategoryModal(true);
    setSelectDeleteItem(subCategory);
  };

  // close sub category delete modal
  const handleCloseSubCategoryDeleteModal = () => {
    setOpenDeleteSubCategoryModal(false);
  };

  // get all the uploaded files for the selected category
  const fetchAllUploadedFilesForACategory = async (
    categoryId,
    regulatoryOrganizationId = ''
  ) => {
    if (selectedCategory.name === MY_DOCS_CATEGORIES.gapAnalysisPolicies) {
      setAllSubCategoryFiles([]);
    } else {
      const res = await getAllUploadedFilesOfASubcategory(categoryId);
      setAllSubCategoryFiles(res.types);
    }
  };

  const saveUploadedFile = async (
    files,
    categoryId,
    subCategoryId
  ): Promise<boolean> => {
    const formData = new FormData();
    let countUploadedByObject = 0;
    for await (const eachFile of files) {
      if (eachFile?.key) {
        countUploadedByObject++;
      }
      formData.append('files', eachFile);
    }
    if (countUploadedByObject !== files?.length && files?.length >= 1) {
      try {
        const res = await uploadSingleOrMultipleFile(
          formData,
          categoryId,
          subCategoryId
        );
        if (res?.message === 'Files uploaded successfully') {
          showSuccessMessage(res.message, '', {});
        }
      } catch (error) {
        showErrorMessage(error?.response?.data?.cause || '', {
          position: 'top-right'
        });
        return false;
      }
    }
  };
  return (
    <>
      {selectedCategory.name != MY_DOCS_CATEGORIES.gapAnalysisPolicies && (
        <TableHeader selectedCategory={selectedCategory} />
      )}
      <Divider className="divider" />
      <Box>
        {allSubCategoryFiles?.map?.((category) => (
          <Box key={category.id} sx={{ py: 2 }}>
            {allSubCategoryLoader ? (
              <Box className="spinnerWrapper flex-basic-center mt-100 mb-100 ">
                <Box className="spinnerLoading "></Box>
              </Box>
            ) : (
              <Box sx={{ py: 5, px: 9 }}>
                <FileUploadComponent
                  handleDeleteFile={hanldleDeleteSubCategoryDocument}
                  handleUploadFile={handleUpload}
                  subCategory={{ id: category?.id, name: category?.name }}
                  totalFile={category?.documents}
                  category={selectedCategory}
                  key={category.id}
                  fileLoader={fileLoader}
                  selectedSubCategoryTitle={selectedSubCategory}
                  setSelectedSubCategory={setSelectedSubCategory}
                  handleSubCategoryDelete={handleOpenSubCategoryDeleteModal}
                />
              </Box>
            )}
            <Divider className="divider" />
          </Box>
        ))}
      </Box>
      <DeleteFileModal
        selectedItem={{ name: selectDeleteItem?.name }}
        open={openDeleteSubCategoryModal}
        handleDelete={handleDeleteSubcategoryName}
        handleClose={handleCloseSubCategoryDeleteModal}
        subText={t('removeFileDesc', { ns: 'english' })}
        modalTitle={`${t('removeFile', { ns: 'english' })}`}
        btnPrimaryText={t('removeBtnText', { ns: 'english' })}
      />
    </>
  );
};

export default SubCategoriesWrapperComponent;
