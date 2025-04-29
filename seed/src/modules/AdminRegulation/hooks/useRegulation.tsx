import { useCallback, useEffect, useState } from 'react';
import {
  UIButtonComponent,
  editRegStateType,
  editRegulationFormDetailsType,
  handleButtonActionsType,
  editRegulationFormErrorType,
  handleObligationChangeType,
  handleObligationDeleteType,
  regulationObligationType
} from '../model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import {
  REGULATION_BODY,
  REGULATION_LIST,
  evaluateRegulation,
  fetchRegOrganizationListWithCount,
  fetchRegulationById,
  fetchRegulationList
} from '../service/adminRegulation.service';
import {
  updateOrSubmitAParticularRegulation,
  updateOrSubmitAParticularRegulationType
} from '../api/AdminRegulationApi';
import {
  showErrorMessage,
  showSuccessMessage
} from 'src/shared/components/toaster/Toast';

export const SUBMIT = 'SUBMIT';
export const UPDATE = 'UPDATE';
export const PREV = 'PREV';
export const NEXT = 'NEXT';

export const ModalTypes = {
  CLOSE_EDIT: 'CLOSE_EDIT',
  OPEN_SUBMIT: 'OPEN_SUBMIT',
  CLOSE_SUBMIT: 'CLOSE_SUBMIT'
} as const;
export type ModalType = keyof typeof ModalTypes;

export type submitModalType = {
  submitModal: boolean;
};
export type regulationUpdated = {
  regulationId: string;
  regulatoryOrganizationId: string;
  organizationName?: string;
};

const useRegulation = () => {
  const {
    regulatoryOrganization,
    regulationList,
    regulationListBasedOnOrganization,
    regulationDetail
  } = useSelector((state: RootState) => state.adminRegulation);
  const dispatch = useDispatch<any>();

  const [editRegulationField, setEditRegulationField] =
    useState<editRegulationFormDetailsType>({
      regulationPolicy: '',
      regulationProcedure: '',
      regulationSummary: '',
      sourceUrlLink: '',
      regulatoryBody: ''
    });
  const [regulationObligations, setRegulationObligations] = useState<
    regulationObligationType[]
  >([]);

  const [dates, setDates] = useState({
    dateOfEnforcement: null,
    dateOfRegulationNotice: null
  });

  const [buttons, setButtons] = useState<UIButtonComponent>({
    prevButton: { isShow: true, isDisable: true, buttonType: PREV },
    nextButton: { isShow: true, isDisable: false, buttonType: NEXT },
    submitButton: { isShow: true, isDisable: true, buttonType: SUBMIT },
    onUpdate: { isShow: true, isDisable: true, buttonType: UPDATE }
  });

  const [editRegModal, setEditRegModal] = useState<editRegStateType>();
  const [modals, setModals] = useState<submitModalType>({
    submitModal: false
  });
  const [isRegulationUpdate, setIsRegulationUpdate] =
    useState<regulationUpdated>({
      regulationId: '',
      regulatoryOrganizationId: ''
    });

  const [errorObj, setErrorObj] = useState<editRegulationFormErrorType>({
    dateOfEnforcement: '',
    dateOfRegulationNotice: '',
    regulationSummary: '',
    regulationPolicy: '',
    regulationProcedure: '',
    sourceUrlLink: ''
  });

  useEffect(() => {
    if (regulationDetail) {
      let isReachAtEndFlag = isReachedAtEnd();
      let isAtInitialFlag = isAtIntialRegulation();
      let isModifiedFlag = isDetailModified();

      setButtons((prev) => ({
        ...prev,
        prevButton: { ...prev.prevButton, isDisable: isAtInitialFlag },
        nextButton: { ...prev.nextButton, isDisable: isReachAtEndFlag },
        onUpdate: { ...prev.onUpdate, isDisable: !isModifiedFlag }
      }));
    }
    enableSubmitButton();
  }, [editRegulationField, regulationObligations, dates, regulationDetail]);

  const enableSubmitButton = () => {
    const allTextFieldsFilled = Object?.values(editRegulationField)?.every(
      (value) => value
    );

    const dateFieldsFilled = Object?.values(dates)?.every((value) => value);
    const obligationListFilled =
      regulationObligations.length > 0 &&
      regulationObligations.every((regulation) => {
        return Object?.keys(regulation)?.every((key) => {
          return key === 'id' || regulation[key];
        });
      });

    const allFieldsFilled =
      allTextFieldsFilled && obligationListFilled && dateFieldsFilled;

    setButtons((prev) => ({
      ...prev,
      submitButton: { ...prev.submitButton, isDisable: !allFieldsFilled }
    }));
  };
  const isDetailModified = (): boolean => {
    return (
      editRegulationField.regulationPolicy !== regulationDetail?.averyPolicy ||
      editRegulationField.regulationProcedure !==
        regulationDetail?.averyProcedure ||
      editRegulationField.regulationSummary !== regulationDetail.summary ||
      editRegulationField?.sourceUrlLink !==
        regulationDetail.sourceDocumentLink ||
      editRegulationField?.regulatoryBody !== regulationDetail.regulatoryBody ||
      JSON.stringify(regulationObligations) !==
        JSON.stringify(regulationDetail?.tasks) ||
      dates.dateOfEnforcement !== regulationDetail?.regulationEnforcementDate ||
      dates.dateOfRegulationNotice !== regulationDetail?.regulationNoticeDate
    );
  };

  const handleOnChange = useCallback(
    (event, inputName: string) => {
      setEditRegulationField((prev) => ({
        ...prev,
        [inputName]: event.target.value
      }));
      setErrorObj((prev) => ({
        ...prev,
        [inputName]: ''
      }));
      enableSubmitButton();
    },
    [
      editRegulationField.regulationPolicy,
      editRegulationField.regulationProcedure,
      editRegulationField.regulationSummary,
      editRegulationField.regulationPolicy,
      editRegulationField.sourceUrlLink,
      editRegulationField.regulatoryBody
    ]
  );

  const handleDateChange = useCallback(
    (inputName, date) => {
      setDates((prev) => ({ ...prev, [inputName]: date }));
      setErrorObj((prev) => ({ ...prev, [inputName]: '' }));
      enableSubmitButton();
    },

    [dates.dateOfEnforcement, dates.dateOfRegulationNotice]
  );

  const handleObligationChange: handleObligationChangeType = useCallback(
    (index, text, date) => {
      setRegulationObligations((prev) =>
        prev?.map((item, itemIndex) => {
          if (itemIndex === index) {
            return { ...item, targetDate: date, title: text };
          }
          return item;
        })
      );
    },
    [regulationObligations]
  );

  const handleObligationDelete: handleObligationDeleteType = useCallback(
    (index) => {
      let updatedRegulation = regulationObligations.filter(
        (task, taskIndex) => taskIndex !== index
      );
      setRegulationObligations(updatedRegulation);
    },
    [regulationObligations]
  );

  const handleObligationAdd: handleObligationDeleteType = useCallback(() => {
    let newObligation = {
      id: '',
      targetDate: new Date().toISOString(),
      title: ''
    };

    if (regulationObligations?.length > 0) {
      const lastObligation =
        regulationObligations[regulationObligations.length - 1];
      const allFieldsFilled = Object.keys(lastObligation).every((key) => {
        return key === 'id' || lastObligation[key];
      });

      if (allFieldsFilled) {
        setRegulationObligations((prev: any) => [...prev, newObligation]);
      }
    } else {
      setRegulationObligations((prev: any) => [...prev, newObligation]);
    }
  }, [regulationObligations]);

  const handleSubmit = async (regulationDetail, isSubmit) => {
    const payloadObject = convertRegulationDetail(
      editRegulationField,
      regulationDetail,
      isSubmit
    );

    try {
      const res = await updateOrSubmitAParticularRegulation(payloadObject);
      let regBodyChange = false;
      if (
        isSubmit ||
        editRegulationField?.regulatoryBody !== regulationDetail?.regulatoryBody
      ) {
        regBodyChange = true;
        dispatch(fetchRegOrganizationListWithCount(''));
      }

      if (res.status === '200' || '201') {
        showSuccessMessage(res?.message, '', {});
        if (!isSubmit) {
          setIsRegulationUpdate({
            regulationId: res?.data?.regulationId,
            regulatoryOrganizationId: res?.data.regulatoryOrganizationId,
            organizationName: regBodyChange
              ? editRegulationField?.regulatoryBody
              : ''
          });
          setButtons((prev) => ({
            ...prev,
            onUpdate: { ...prev.onUpdate, isDisable: true }
          }));
        } else {
          setIsRegulationUpdate({
            regulationId: '',
            regulatoryOrganizationId: '',
            organizationName: ''
          });
        }
        dispatch(fetchRegulationList(''));
        handleModalChange(ModalTypes.CLOSE_EDIT);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.cause, {});
    } finally {
      handleModalChange(ModalTypes.CLOSE_SUBMIT);
    }
  };

  const convertRegulationDetail = (
    editRegulationField: editRegulationFormDetailsType,
    regulation,
    isSubmit = false
  ): updateOrSubmitAParticularRegulationType => {
    let payloadObject: updateOrSubmitAParticularRegulationType = {
      regulationId: regulation?.regulationId,
      isSubmitted: isSubmit,
      payload: {
        enforcementDate: dates?.dateOfEnforcement,
        noticeDate: dates?.dateOfRegulationNotice,
        policy: editRegulationField?.regulationPolicy,
        procedure: editRegulationField?.regulationProcedure,
        sourceLink: editRegulationField?.sourceUrlLink,
        regulatoryBodyName: editRegulationField?.regulatoryBody,
        shortSummary: editRegulationField?.regulationSummary,
        summary: editRegulationField?.regulationSummary,
        tasks: regulationObligations
      }
    };

    return payloadObject;
  };

  const handlePrev = () => {
    const { organizationIndex, regulationIndex } =
      findRegulationAndOrganizationIndex();
    if (regulationIndex === 0 && organizationIndex === 0) {
      return;
    }

    if (regulationIndex === 0 && organizationIndex > 0) {
      findNextOrPrevRegulatoryOrganization(PREV, organizationIndex);
    } else {
      dispatch(
        fetchRegulationById(
          regulationListBasedOnOrganization[regulationIndex - 1]?.id
        )
      );
    }
  };

  const handleNext = () => {
    const { organizationIndex, regulationIndex } =
      findRegulationAndOrganizationIndex();

    if (
      regulationIndex === regulationListBasedOnOrganization.length - 1 &&
      organizationIndex < regulatoryOrganization.length
    ) {
      findNextOrPrevRegulatoryOrganization(NEXT, organizationIndex);
    } else {
      dispatch(
        fetchRegulationById(
          regulationListBasedOnOrganization[regulationIndex + 1]?.id
        )
      );
    }
  };

  const findRegulationAndOrganizationIndex = () => {
    const regulationIndex = regulationListBasedOnOrganization?.findIndex(
      (item) => item.id === regulationDetail?.regulationId
    );
    const organizationIndex = regulatoryOrganization?.findIndex(
      (item: any) => item?.id === regulationDetail?.regulatoryOrganizationId
    );
    return { regulationIndex, organizationIndex };
  };

  const isReachedAtEnd = () => {
    const { organizationIndex, regulationIndex } =
      findRegulationAndOrganizationIndex();

    if (
      regulationIndex === regulationListBasedOnOrganization?.length - 1 &&
      organizationIndex === regulatoryOrganization?.length - 1
    ) {
      return true;
    }
    return false;
  };

  const isAtIntialRegulation = (): boolean => {
    const { organizationIndex, regulationIndex } =
      findRegulationAndOrganizationIndex();

    if (regulationIndex === 0 && organizationIndex === 0) {
      return true;
    }
    return false;
  };

  const findNextOrPrevRegulatoryOrganization = (
    NEXT_PREV: 'NEXT' | 'PREV',
    currentRegBodyIndex
  ) => {
    switch (NEXT_PREV) {
      case NEXT:
        changeRegulationAndUpdateAccordion(currentRegBodyIndex + 1, NEXT);
        break;
      case PREV:
        changeRegulationAndUpdateAccordion(currentRegBodyIndex - 1, PREV);
        break;
    }
  };

  const changeRegulationAndUpdateAccordion = (
    currentRegBodyIndex,
    NEXT_PREV: 'NEXT' | 'PREV'
  ) => {
    dispatch(
      evaluateRegulation({
        type: REGULATION_BODY,
        payload: regulatoryOrganization[currentRegBodyIndex].id
      })
    );
    const newRegList = regulationList?.filter(
      (item) =>
        item.organizationId === regulatoryOrganization[currentRegBodyIndex].id
    );
    let regulationIndex = NEXT_PREV === 'NEXT' ? 0 : newRegList.length - 1;

    dispatch(
      evaluateRegulation({
        type: REGULATION_LIST,
        payload: newRegList
      })
    );
    dispatch(fetchRegulationById(newRegList[regulationIndex]?.id));
  };

  const handleButtonActions: handleButtonActionsType = (
    event,
    buttonType,
    regulationDetail
  ) => {
    switch (buttonType) {
      case SUBMIT:
        handleModalChange(ModalTypes.OPEN_SUBMIT);
        break;
      case UPDATE:
        handleSubmit(regulationDetail, false);
        break;
      case PREV:
        handlePrev();
        break;
      case NEXT:
        handleNext();
        break;
    }
  };

  const handleModalChange = (modalType: ModalType) => {
    switch (modalType) {
      case ModalTypes.CLOSE_EDIT:
        setEditRegModal({
          inputName: '',
          openModal: false,
          RegulationName: '',
          RegulatoryBody: '',
          text: '',
          title: ''
        });
        break;
      case ModalTypes.OPEN_SUBMIT:
        setModals((prev) => ({ ...prev, submitModal: true }));
        break;

      case ModalTypes.CLOSE_SUBMIT:
        setModals((prev) => ({ ...prev, submitModal: false }));
        break;

      default:
        return;
    }
  };

  const handleReadMore = useCallback(
    (inputName: string, title: string, regulationDetail) => {
      if (editRegulationField) {
        setEditRegModal({
          inputName: inputName,
          openModal: true,
          RegulationName: regulationDetail.regulationName,
          RegulatoryBody: regulationDetail.regulatoryBody,
          text: editRegulationField[inputName] || '',
          title: title
        });
      }
    },
    [editRegulationField]
  );

  return {
    handleButtonActions,
    editRegulationField,
    regulationObligations,
    setRegulationObligations,
    dates,
    setDates,
    buttons,
    setButtons,
    editRegModal,
    setEditRegulationField,
    modals,
    isRegulationUpdate,
    setIsRegulationUpdate,
    handleSubmit,
    handleDateChange,
    handleOnChange,
    handleObligationChange,
    handleObligationDelete,
    handleObligationAdd,
    handleReadMore,
    handleModalChange,
    errorObj
  };
};

export default useRegulation;
