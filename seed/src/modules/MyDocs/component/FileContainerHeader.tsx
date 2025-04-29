import { Box, Tooltip, Typography } from '@mui/material';
import { TFileContainerHeader } from '../model/myDocsTypes';
import { Button } from 'src/shared/components/button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';

const FileContainerHeader = (props: TFileContainerHeader) => {
  const {
    title = 'Other',
    isCreateNewButoon = false,
    handleCreateNewName,
    isRunGapAnalysisButton = false,
    handleRunGapAnalysis,
    isViewGapAssessmentButton = false,
    handleViewGapAssessment,
    isRunGapAnalysisButtonDisabled = true,
    createNewCategoryButtonDisable = false
  } = props;
  const { t } = useTranslation('mydoc');
  const { actions } = useSelector((state: RootState) => state.myDocs);

  const checkIfToDisplayRunGapAnalysis = () => {
    if (isRunGapAnalysisButton && actions.includes('run-gap-analysis')) {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{ px: 4, py: isCreateNewButoon ? 3 : 5 }}
      className="d-flex flex-basic-space-between"
    >
      <Box>
        <Typography className="fileHeadTextFont">{title}</Typography>
      </Box>
      <Box>
        {isCreateNewButoon && (
          <Button
            className="btnFont"
            variant="outlined"
            type="submit"
            size={'small'}
            btnText={t('createNewName')}
            startIcon={
              <Box sx={{ color: 'black' }} className="icon-plus iconStyle" />
            }
            onClick={handleCreateNewName}
            sx={{ py: '10px', px: '24px' }}
            disabled={createNewCategoryButtonDisable}
          />
        )}
        <Box className="d-flex">
          <Tooltip
            title={
              isRunGapAnalysisButtonDisabled
                ? `${t('runGapAnalysisButtonDisabledTooltip')}`
                : ''
            }
          >
            <Box>
              {checkIfToDisplayRunGapAnalysis() && (
                <Button
                  className="btnFont cursorDisabled"
                  variant="contained"
                  type="submit"
                  size={'small'}
                  btnText={t('runGapAnalysis')}
                  onClick={() => {
                    handleRunGapAnalysis(true);
                  }}
                  disabled={isRunGapAnalysisButtonDisabled}
                  sx={{ py: '11px', px: '24px', marginRight: '20px' }}
                />
              )}
            </Box>
          </Tooltip>
          <Box>
            {isViewGapAssessmentButton && (
              <Button
                className="btnFont"
                variant="outlined"
                type="submit"
                size={'small'}
                btnText={t('viewGapAssessment')}
                onClick={handleViewGapAssessment}
                sx={{ py: '10px', px: '24px' }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FileContainerHeader;
