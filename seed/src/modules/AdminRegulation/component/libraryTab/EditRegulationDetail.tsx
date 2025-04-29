import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import RegulationTitleHeader from '../RegulationTitleHeader';
import { editRegulationType } from '../../model';
import RegulationBottomActions from '../RegulationBottomActions';
import RegulationCalendar from '../RegulationCalendar';
import TextAreaWithReadMore from '../TextAreaWithReadMore';
import RegulationObligationList from '../RegulationObligationList';
import { memo, useEffect, useState } from 'react';
import ReadMore from 'src/shared/components/read-more/ReadMore';
import Typography from 'src/shared/components/typography/Typography';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';

const EditRegulationDetail = (props: editRegulationType) => {
  const {
    regulationDetail,
    selectRegulationOrg,
    editRegulationField,
    errorObj,
    handleDateChange,
    handleOnChange,
    handleButtonActions,
    handleReadMore,
    handleObligation,
    buttons,
    dates,
    regulationObligations,
    tabType = 'evaluateRegulation'
  } = props;

  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('lg'));
  const { t } = useTranslation('adminRegulation');
  const { regulationDetailLoading } = useSelector(
    (state: RootState) => state.adminRegulationReviewed
  );
  const [isFieldsEditable, setIsFieldsEditable] = useState<boolean>(
    tabType === 'evaluateRegulation'
  );

  useEffect(() => {
    setIsFieldsEditable(false);
  }, [regulationDetail]);

  const handleEditFields = () => {
    setIsFieldsEditable(!isFieldsEditable);
  };

  const readMoreComponent = (title: string, text: string) => {
    return (
      <Box sx={{ pb: '24px' }} className="textAreaWithReadMore">
        <Typography variant="h4" className="mb-14">
          {t(`${title}`)}
        </Typography>
        <Box>
          <ReadMore text={text} />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ pl: smallDevice ? '' : 5 }} className="regulationsSummary">
      <Box>
        <Card>
          <CardHeader
            sx={{ py: 4, px: 6 }}
            title={
              regulationDetail && (
                <Box>
                  <RegulationTitleHeader
                    regulationName={regulationDetail?.regulationName}
                    key={regulationDetail?.regulationId}
                    regulationType={
                      regulationDetail?.regulationType || 'library'
                    }
                    regulatoryBodyName={regulationDetail?.regulatoryBody}
                    selectRegulation={selectRegulationOrg}
                    inputName="regulatoryBody"
                    tabType={tabType}
                    handleEditFields={handleEditFields}
                    isFieldEditable={isFieldsEditable}
                  />
                </Box>
              )
            }
          />
          <Divider className="divider" />
          {regulationDetailLoading ? (
            <Box className="flex-basic-center mt-100  mb-100">
              <Box
                className="spinnerLoading mt-100 mb-300"
                sx={{ mb: '700px' }}
              ></Box>
            </Box>
          ) : (
            <CardContent sx={{ p: 0 }} className="summaryCard">
              <RegulationCalendar
                errorObj={errorObj}
                dates={dates}
                sourceUrlLink={editRegulationField?.sourceUrlLink || ''}
                handleDateChange={handleDateChange}
                handleOnChange={handleOnChange}
                isFieldEditable={isFieldsEditable}
              />
              <Divider className="divider" />
              <Box className="regulationCalendarPadding">
                {isFieldsEditable ? (
                  <TextAreaWithReadMore
                    limit={70}
                    value={editRegulationField?.regulationSummary}
                    text={regulationDetail?.summary || ''}
                    handleOnChange={handleOnChange}
                    handleReadMore={handleReadMore}
                    title={t('regulationSummary')}
                    inputName={'regulationSummary'}
                    regulationDetail={regulationDetail}
                    placeholder={t('enterRegulationSummary')}
                    errorText={errorObj?.regulationSummary}
                  />
                ) : (
                  readMoreComponent(
                    'regulationSummary',
                    regulationDetail?.summary
                  )
                )}

                <Box className="regulationObligation mb-24">
                  <RegulationObligationList
                    inputName={'regulationObligations'}
                    regulationsData={regulationObligations || []}
                    buttonText={t('addObligation')}
                    heading={t('regulationObligation')}
                    handleObligationAdd={handleObligation?.handleObligationAdd}
                    handleObligationChange={
                      handleObligation?.handleObligationChange
                    }
                    handleObligationDelete={
                      handleObligation?.handleObligationDelete
                    }
                    isEditable={isFieldsEditable}
                  />
                </Box>
                {isFieldsEditable ? (
                  <TextAreaWithReadMore
                    limit={70}
                    value={editRegulationField?.regulationPolicy}
                    text={regulationDetail?.averyPolicy || ''}
                    handleOnChange={handleOnChange}
                    handleReadMore={handleReadMore}
                    title={t('regulationPolicies')}
                    inputName={'regulationPolicy'}
                    regulationDetail={regulationDetail}
                    placeholder={t('enterRegulationPolicy')}
                    errorText={errorObj?.regulationPolicy}
                  />
                ) : (
                  readMoreComponent(
                    'regulationPolicies',
                    editRegulationField?.regulationPolicy
                  )
                )}

                {editRegulationField && isFieldsEditable ? (
                  <TextAreaWithReadMore
                    limit={70}
                    value={editRegulationField?.regulationProcedure || ''}
                    text={regulationDetail?.averyProcedure || ''}
                    handleOnChange={handleOnChange}
                    handleReadMore={handleReadMore}
                    title={t('regulationProcedures')}
                    inputName={'regulationProcedure'}
                    regulationDetail={regulationDetail}
                    placeholder={t('enterRegulationProcedure')}
                    errorText={errorObj?.regulationProcedure}
                  />
                ) : (
                  readMoreComponent(
                    'regulationProcedures',
                    editRegulationField?.regulationProcedure
                  )
                )}
              </Box>
            </CardContent>
          )}
          <CardActions className="cardFooter">
            <RegulationBottomActions
              handleButtonActions={handleButtonActions}
              editRegulationField={editRegulationField}
              buttons={buttons}
              regulationDetail={regulationDetail}
            />
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default memo(EditRegulationDetail);
