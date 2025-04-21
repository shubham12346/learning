import { Box } from '@mui/system';
import { ButtonToggle } from 'src/shared/components/index';
import { useTranslation } from 'react-i18next';

export type TabViewProps = {
  view: string;
  handleViewChange: (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => void;
  toggles: { content: string; value: string }[];
  defaultValue?: string;
};
const TabView = (props: TabViewProps) => {
  const { view, handleViewChange, toggles, defaultValue } = props;
  const { t } = useTranslation('task');

  return (
    <Box className="viewTabs" sx={{ right: '18px' }}>
      <ButtonToggle
        buttons={toggles}
        value={view}
        size="small"
        exclusive
        onChange={handleViewChange}
        defaultValue={defaultValue}
      />
    </Box>
  );
};

export default TabView;
