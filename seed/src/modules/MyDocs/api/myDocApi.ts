import { apiDelete, apiGet, apiPost } from 'src/shared/utils/api-request';
import { APIEndPoint } from 'src/shared/constants/api-endpoint';
import { TYPE, UPLOAD } from '../component/utils';
import { MY_DOCS_CATEGORIES } from '../constants/constants';

export const getAllCategory = async () => {
  const res = await apiGet(`${APIEndPoint.myDoc.categories}`);
  const data = res.data ?? [];

  // Sort the main array by displayOrder
  data.sort((a, b) => a.displayOrder - b.displayOrder);

  // Sort the types array within each object by displayOrder
  data.forEach((category) => {
    if (category.name !== MY_DOCS_CATEGORIES.gapAnalysisPolicies) {
      category.types.sort((a, b) => a.displayOrder - b.displayOrder);
    }
  });
  return data ?? [];
};

export const getAllUploadedFilesOfASubcategory = async (
  categoryId,
  regulatoryOrganizationId = ''
) => {
  const queryParams = new URLSearchParams();

  if (regulatoryOrganizationId) {
    queryParams.append('regulatoryOrganizationId', regulatoryOrganizationId);
  }

  const rest = await apiGet(
    `${APIEndPoint.myDoc.categories}/${categoryId}?${queryParams.toString()}`
  );
  return rest.data ?? [];
};

export const uploadSingleOrMultipleFile = async (
  files: any,
  categoryId: string,
  typeId: string
) => {
  const res = await apiPost(
    `${APIEndPoint.myDoc.categories}/${categoryId}/${TYPE}/${typeId}/${UPLOAD}`,
    files
  );
  return res.data ?? [];
};

export const deleteAFileInASubCategory = async (documentId: string) => {
  const res = await apiDelete(`${APIEndPoint.myDoc.deleteFile}${documentId}`);
  return res.data ?? [];
};

export const createNewNameOfASubCategory = async (
  categoryId: string,
  subCategoryName: string
) => {
  let encodeURl = encodeURIComponent(subCategoryName);
  const res = await apiPost(
    `${APIEndPoint.myDoc.categories}/${categoryId}/${encodeURl}`
  );
  return res.data ?? [];
};

export const deleteNameInASubCategoryFile = async (typeId: string) => {
  const res = await apiDelete(`${APIEndPoint.myDoc.deleteName}${typeId}`);
  return res?.data || [];
};

export const getRegulationListOfRegulationBody = async () => {
  const res = await apiGet(APIEndPoint.myDoc.regulations);
  return res?.data || [];
};

export const getFilesCountReadyForGapAnalysis = async () => {
  const res = await apiGet(`${APIEndPoint.myDoc.fileUploadsCount}`);
  return res?.data;
};

//Run gap analysis
export const runGapAnalysis = async () => {
  const res = await apiPost(
    `${APIEndPoint.regulations.gapAssessment.runGapAnalysis}`
  );
  return res?.data;
};
