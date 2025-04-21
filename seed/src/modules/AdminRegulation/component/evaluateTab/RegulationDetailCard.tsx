import { useEffect } from 'react';
import EditRegulationDetail from './EditRegulationDetail';
import useRegulation, { ModalTypes } from '../../hooks/useRegulation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { Box } from '@mui/material';
import EditRegulationModal from '../EditRegulationModal';
import SubmitModal from '../SubmitModal';
import {
  REGULATION_BODY,
  REGULATION_LIST,
  evaluateRegulation,
  fetchRegulationById
} from '../../service/adminRegulation.service';
import { useTranslation } from 'react-i18next';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoRegulationsImage from 'src/assets/svg/no-regulation.svg';

const RegulationDetailCard = ({
  searchedRegulation,
  selectedRegulationType,
  setRegulationId,
  regulationId
}) => {
  const { t } = useTranslation('adminRegulation');
  const {
    regulationDetail,
    regulationOrgDropdown,
    regulationList,
    regulatoryOrganization
  } = useSelector((state: RootState) => state.adminRegulation);
  const dispatch = useDispatch<any>();

  const {
    editRegulationField,
    editRegModal,
    modals,
    regulationObligations,
    setRegulationObligations,
    setButtons,
    buttons,
    handleButtonActions,
    dates,
    setDates,
    isRegulationUpdate,
    setIsRegulationUpdate,
    handleSubmit,
    handleModalChange,
    handleReadMore,
    handleDateChange,
    handleObligationAdd,
    handleObligationChange,
    handleObligationDelete,
    handleOnChange,
    setEditRegulationField,
    errorObj
  } = useRegulation();

  useEffect(() => {
    if (regulationDetail?.regulationName) {
      setEditRegulationField({
        regulationPolicy: regulationDetail.averyPolicy || '',
        regulationProcedure: regulationDetail.averyProcedure || '',
        regulationSummary: regulationDetail.summary || '',
        sourceUrlLink: regulationDetail.sourceDocumentLink || '',
        regulatoryBody: regulationDetail.regulatoryBody || ''
      });
      setRegulationObligations(regulationDetail.tasks);
      setDates({
        dateOfEnforcement: regulationDetail.regulationEnforcementDate,
        dateOfRegulationNotice: regulationDetail.regulationNoticeDate
      });
    }
  }, [regulationDetail]);

  useEffect(() => {
    let flag = !searchedRegulation;
    setButtons((prev) => ({
      ...prev,
      prevButton: { ...prev.prevButton, isShow: flag },
      nextButton: { ...prev.nextButton, isShow: flag }
    }));
  }, [searchedRegulation]);

  useEffect(() => {
    if (regulationList?.length > 0 && regulatoryOrganization?.length > 0) {
      findRegulationAfterFilter(
        regulationList,
        regulatoryOrganization,
        isRegulationUpdate
      );
    }
  }, [regulationList, isRegulationUpdate]);

  useEffect(() => {
    setIsRegulationUpdate({
      regulationId: '',
      regulatoryOrganizationId: '',
      organizationName: ''
    });
  }, [selectedRegulationType]);

  useEffect(() => {
    if (regulationId) {
      dispatch(fetchRegulationById(regulationId));
    }
  }, [regulationId]);

  const findRegulationAfterFilter = (
    regulationList,
    regulatoryOrganization,
    isRegulationUpdate
  ) => {
    if (isRegulationUpdate?.regulationId) {
      setUpdatedRegulationAndSetRegBody(isRegulationUpdate);
      return;
    }
    let regulationOfAOrg = regulationList?.filter(
      (item) => item?.organizationId === regulatoryOrganization[0]?.id
    );
    if (regulationOfAOrg[0]?.id) {
      dispatch(
        evaluateRegulation({
          type: REGULATION_BODY,
          payload: regulatoryOrganization[0]?.id
        })
      );
      dispatch(
        evaluateRegulation({ type: REGULATION_LIST, payload: regulationOfAOrg })
      );
      setRegulationId(regulationOfAOrg[0]?.id);
    } else {
      dispatch(
        evaluateRegulation({
          type: REGULATION_BODY,
          payload: regulationList[0]?.organizationId
        })
      );
      let regulationOfAvailableRegulatoryBody = regulationList?.filter(
        (item) => item?.organizationId === regulationList[0]?.organizationId
      );
      dispatch(
        evaluateRegulation({
          type: REGULATION_LIST,
          payload: regulationOfAvailableRegulatoryBody
        })
      );
      setRegulationId(regulationOfAvailableRegulatoryBody[0]?.id);
    }
  };

  const setUpdatedRegulationAndSetRegBody = ({
    regulationId,
    regulatoryOrganizationId
  }) => {
    let regulationOfAOrg = regulationList.filter(
      (item) => item.organizationId === regulatoryOrganizationId
    );
    dispatch(
      evaluateRegulation({
        type: REGULATION_BODY,
        payload: regulatoryOrganizationId
      })
    );
    dispatch(
      evaluateRegulation({ type: REGULATION_LIST, payload: regulationOfAOrg })
    );
    setRegulationId(regulationId);
  };
  return (
    <Box>
      {regulationDetail ? (
        <EditRegulationDetail
          buttons={buttons}
          selectRegulationOrg={{
            handleRegulatoryBodyChange: handleOnChange,
            selectedRegBody: editRegulationField.regulatoryBody,
            selectOptions: regulationOrgDropdown
          }}
          regulationObligations={regulationObligations}
          dates={dates}
          regulationDetail={regulationDetail}
          editRegulationField={editRegulationField}
          errorObj={errorObj}
          handleDateChange={handleDateChange}
          handleOnChange={handleOnChange}
          handleButtonActions={handleButtonActions}
          handleReadMore={handleReadMore}
          handleObligation={{
            handleObligationDelete: handleObligationDelete,
            handleObligationChange: handleObligationChange,
            handleObligationAdd: handleObligationAdd
          }}
          handleModalChange={handleModalChange}
        />
      ) : (
        <Box className="emptyView flex-column-center">
          <EmptyPlaceholder
            imgWidth={'240'}
            imageUrl={NoRegulationsImage}
            titleText={t('NoCurrentRegulationFound')}
          />
        </Box>
      )}

      <Box className="modals ">
        <EditRegulationModal
          RegulationName={editRegModal?.RegulationName || ''}
          RegulatoryBody={editRegModal?.RegulatoryBody || ''}
          inputName={editRegModal?.inputName || ''}
          openModal={editRegModal?.openModal || false}
          text={editRegulationField[editRegModal?.inputName] || ''}
          title={editRegModal?.title || ''}
          regulationDetail={regulationDetail}
          handleOnChange={handleOnChange}
          handleSave={handleButtonActions}
          handleModalClose={handleModalChange}
        />

        <SubmitModal
          handleSubmit={() => {
            handleSubmit(regulationDetail, modals?.submitModal);
          }}
          handleClose={() => {
            handleModalChange(ModalTypes.CLOSE_SUBMIT);
          }}
          cancelText={t('cancel')}
          submitText={t('submitSaveText')}
          description1={t('confirmSubmitMessage')}
          description2={t('submitDescription')}
          title={t('submitTitle')}
          showModal={modals?.submitModal}
        />
      </Box>
    </Box>
  );
};

export default RegulationDetailCard;
