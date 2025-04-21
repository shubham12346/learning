import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllCategory } from './api/myDocApi';
import FilesContainerComponent from './component/FilesContainerComponent';
import SidePanel from './component/SidePanel';
import { MY_DOCS_CATEGORIES } from './constants/constants';
import { userActions } from './service/gapAnalysis.service';

const MyDoc = (props) => {
  const { actions } = props;
  const { t } = useTranslation('mydoc');
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [sideNavList, setSideNavList] = useState<any>([]);
  const [sideNavLoading, setSideNavLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const tour = params.get('tour');

  const updateCategoryBasedOnUrl = () => {
    if (tour === 'gapanalysis' && !selectedCategory) {
      const gapObject = sideNavList.find(
        (item) => item.name === MY_DOCS_CATEGORIES.gapAnalysisPolicies
      );
      setSelectedCategory(gapObject);
    }
  };

  useEffect(() => {
    updateCategoryBasedOnUrl();
  }, [location, sideNavList]);

  useEffect(() => {
    setSideNavLoading(true);
    fetchSideNavList();
    if (actions) {
      setUserActionsToStore(actions);
    }
  }, []);

  const handleSelectedCategory = (category: any) => {
    setSelectedCategory(category);
  };

  const fetchSideNavList = async () => {
    const resp = await getAllCategory();
    setSideNavList(resp);
    setSideNavLoading(false);
    return resp;
  };

  const callTheSideNavToUpdate = async () => {
    const res = await fetchSideNavList();
    return res;
  };

  const setUserActionsToStore = (actions) => {
    dispatch(userActions(actions));
  };

  return (
    <Container maxWidth="xl">
      <Box className="myDocWrapper">
        <Box className=" mb-28">
          <Typography variant="h3"> {t('mydoc')}</Typography>
        </Box>

        <Grid container>
          <Grid item xs={12} md={12} lg={3} xl={3}>
            <SidePanel
              handleSelectedCategory={handleSelectedCategory}
              selectedCategory={selectedCategory}
              sideNavList={sideNavList}
              sideNavLoading={sideNavLoading}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={9} xl={9}>
            <FilesContainerComponent
              selectedCategory={selectedCategory}
              callTheSideNavToUpdate={callTheSideNavToUpdate}
              handleSelectedCategory={handleSelectedCategory}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyDoc;
