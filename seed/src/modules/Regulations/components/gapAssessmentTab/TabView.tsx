import { Box } from '@mui/system';
import { ButtonToggle } from 'src/shared/components/index';
import { useTranslation } from 'react-i18next';

type toogleButtonsListType = {
    content: 'string',
    value: 'string'
  }
interface TabViewProps {
  view : 'activity' | 'list';
  handleViewChange:()=>void;
  toogleButtonsList:toogleButtonsListType[];
}

const TabView = (props:TabViewProps) => {
  const { view, handleViewChange,toogleButtonsList } = props;
  const { t } = useTranslation('regulations');

  return (
    <Box className="viewTabs" sx={{ right: '18px' }}>
      <ButtonToggle
        buttons={toogleButtonsList}
        value={view}
        size="large"
        exclusive
        onChange={()=>{}} // Add handleViewChange function to enable toogle functionality
      />
    </Box>
  );
};

export default TabView;
