import { Box } from '@mui/system';
import { ButtonToggle } from 'src/shared/components/index';
import { tabViewProps } from '../model/taskModel';
import { useTranslation } from 'react-i18next';

const TabView = (props: tabViewProps) => {
  const { view, handleViewChange } = props;
  const { t } = useTranslation('task');
  return (
    <Box className="viewTabs" sx={{ right: '18px' }}>
      <ButtonToggle
        buttons={[
          {
            content: t('listTab'),
            value: 'List'
          },
          {
            content: t('CalenderTab'),
            value: 'Calender'
          }
        ]}
        value={view}
        size="large"
        exclusive
        onChange={handleViewChange}
      />
    </Box>
  );
};

export default TabView;
