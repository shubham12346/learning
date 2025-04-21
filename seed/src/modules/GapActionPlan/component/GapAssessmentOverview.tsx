import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography
} from '@mui/material';
import { useState, memo } from 'react';
import EnforcementDetails from '../../Regulations/components/EnforcementDetails';
import { customInternationDate } from 'src/shared/utils/utils';
import { useTranslation } from 'react-i18next';

export type GapAssessmentOverviewType = {
  title: string;
  description: string;
  date: string;
};

const GapAssessmentOverview = (props: GapAssessmentOverviewType) => {
  const { date, description, title } = props;
  const { t } = useTranslation('regulations');
  const [isExpanded, setExpanded] = useState(true);

  const handleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Card>
      <CardHeader
        className="gapHeader"
        title={
          <Box className="flex-basic-space-between p-relative ">
            <EnforcementDetails
              iconClassName="icon-date iconStyle"
              enforcementLabel={t('enforcementDate')}
              enforcementValue={customInternationDate(
                date || new Date().toISOString()
              )}
            />

            <Tooltip
              title={
                !isExpanded
                  ? t(
                      'actionPlanSectionText.expandRegulationSummaryTooltipText'
                    )
                  : t(
                      'actionPlanSectionText.collapseRegulationSummaryTooltipText'
                    )
              }
              arrow
            >
              <Box
                onClick={handleExpanded}
                className="normalInputBg summaryCollapse p-4 flex-basic-center cursorPointer "
              >
                <Box
                  className={`${
                    isExpanded ? 'icon-collapse' : 'icon-expand'
                  }  iconHeight`}
                ></Box>
              </Box>
            </Tooltip>
          </Box>
        }
      />
      <CardContent sx={{ px: 6, py: 6 }}>
        {isExpanded && (
          <Box>
            <Box>
              <Typography variant="subtitle1" sx={{ pb: 4 }}>
                {title}
              </Typography>
              <Box className="gapOverviewScroll">
                <Typography className="text-font-12">{description}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(GapAssessmentOverview);
