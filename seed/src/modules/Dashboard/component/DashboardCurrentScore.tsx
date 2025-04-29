import { Box, Card, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmptyPlaceholder from 'src/shared/components/common/EmptyPlaceholder';
import NoTaskImageUrl from 'src/assets/svg/taskEmptyView.svg';
import ComplianceScoreGraph from './ComplianceScoreGraph';
import { useState } from 'react';

interface DashboardCurrentScoreProps {
  complianceScore: any;
  getCollapseOrNot: (ele: boolean) => void;
}
const DashboardCurrentScore = ({
  complianceScore,
  getCollapseOrNot
}: DashboardCurrentScoreProps) => {
  //const
  const { t } = useTranslation('dashboard');
  const [showComplianceScore, setShowComplianceScore] = useState(true);

  //methods
  const handleIconClick = () => {
    getCollapseOrNot(showComplianceScore);
    setShowComplianceScore(!showComplianceScore);
  };

  return (
    <Card sx={{ p: 4 }}>
      <Box className="flex-basic-space-between">
        <Typography variant="h5">{t('currentScore')}</Typography>
        <Box>
          <Tooltip
            title={
              !showComplianceScore
                ? t('expandScoreView')
                : t('collapseScoreView')
            }
            arrow
          >
            <Box
              onClick={() => handleIconClick()}
              className="currentScoreCollapseBtn flex-basic-center cursorPointer"
            >
              <Box
                className={`${
                  showComplianceScore ? 'icon-expand' : 'icon-collapse'
                }  iconStyle`}
              ></Box>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      {showComplianceScore && (
        <>
          {complianceScore?.currentScore > 0 ? (
            <Box>
              <ComplianceScoreGraph complianceCurrentScore={complianceScore} />
            </Box>
          ) : (
            <Box sx={{ py: 25 }}>
              <EmptyPlaceholder
                imgWidth={'156'}
                titleText={t('calculatingScoreLater')}
                subText={t('asYouCreateTasks')}
                avatarText={'N/A'}
              />
            </Box>
          )}
        </>
      )}
    </Card>
  );
};

export default DashboardCurrentScore;
