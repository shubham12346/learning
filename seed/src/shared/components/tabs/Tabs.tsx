import { Tabs as MuiTabs, Tab } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export const TabView = ({ tabindex, tablist, onChange }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <MuiTabs
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
        value={tabindex}
        onChange={onChange}
        aria-label="basic tabs example"
      >
        {tablist.map((tab) => {
          return <Tab key={'TabView' + tab} label={tab} {...a11yProps(0)} />;
        })}
      </MuiTabs>
    </Box>
  );
};

export default TabView;
