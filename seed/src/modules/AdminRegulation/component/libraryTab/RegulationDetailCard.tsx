import { useEffect } from 'react';
import EditRegulationDetail from './EditRegulationDetail';
import useRegulationReviewed, {
  ModalTypes
} from '../../hooks/useRegulationReviewed';
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
} from '../../service/adminRegulationLibrary.service';
import { useTranslation } from 'react-i18next';

let deBouncer;

type TabTypeI = 'evaluateRegulation' | 'libraryRegulation';
type RegulationDetailCardType = {
  tabType: TabTypeI;
  searchedRegulation: boolean;
};
const RegulationDetailCard = (props: RegulationDetailCardType) => {
  const {
    tabType = 'evaluateRegulation',
    searchedRegulation = false
  }: RegulationDetailCardType = props;
  const { t } = useTranslation('adminRegulation');
  const {
    regulationDetail,
    regulationOrgDropdown,
    regulationList,
    regulatoryOrganization
  } = useSelector((state: RootState) => state.adminRegulationReviewed);
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
  } = useRegulationReviewed();

  useEffect(() => {
    if (regulationDetail) {
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
    setButtons((prev) => ({
      ...prev,
      prevButton: { ...prev.prevButton, isShow: !searchedRegulation },
      nextButton: { ...prev.nextButton, isShow: !searchedRegulation }
    }));
  }, [searchedRegulation]);

  useEffect(() => {
    clearTimeout(deBouncer);
    deBouncer = setTimeout(() => {
      if (isRegulationUpdate?.regulationId) {
        setUpdatedRegulationAndSetRegBody(isRegulationUpdate);
      } else {
        setInitialRegulation(regulationList, regulatoryOrganization);
      }
    }, 500);
  }, [regulationList, isRegulationUpdate]);

  const setInitialRegulation = (regulationList, regulatoryOrganization) => {
    let regulationOfAOrg = regulationList?.filter(
      (item) => item?.organizationId === regulatoryOrganization[0]?.id
    );
    dispatch(
      evaluateRegulation({
        type: REGULATION_BODY,
        payload: regulatoryOrganization[0]?.id
      })
    );
    dispatch(
      evaluateRegulation({ type: REGULATION_LIST, payload: regulationOfAOrg })
    );
    dispatch(fetchRegulationById(regulationOfAOrg[0]?.id));
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
    dispatch(fetchRegulationById(regulationId));
  };
  return (
    <Box>
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
        tabType={tabType}
      />

      <Box className="modals ">
        {editRegModal && (
          <EditRegulationModal
            RegulationName={editRegModal.RegulationName}
            RegulatoryBody={editRegModal.RegulatoryBody}
            inputName={editRegModal.inputName}
            openModal={editRegModal.openModal}
            text={editRegulationField[editRegModal.inputName]}
            title={editRegModal.title}
            regulationDetail={regulationDetail}
            handleOnChange={handleOnChange}
            handleSave={handleButtonActions}
            handleModalClose={handleModalChange}
          />
        )}

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
          description2={''}
          title={t('submitTitle')}
          showModal={modals?.submitModal}
        />
      </Box>
    </Box>
  );
};

export default RegulationDetailCard;
