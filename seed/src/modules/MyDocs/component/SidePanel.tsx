import Category from './Category';
import { Box, Card, Divider } from '@mui/material';
import { TsidePanel } from '../model/myDocsTypes';

const SidePanel = (props: TsidePanel) => {
  const {
    handleSelectedCategory,
    selectedCategory,
    sideNavList,
    sideNavLoading
  } = props;

  return (
    <Card className="sidePanel mr-20">
      {sideNavLoading ? (
        <Box className="flex-basic-center mt-100  mb-100">
          <Box className="spinnerLoading mt-100"></Box>
        </Box>
      ) : (
        <Box sx={{ py: 4 }}>
          {sideNavList.length >= 1 &&
            sideNavList?.map?.((item) => (
              <Box key={item?.categoryId}>
                <Category
                  key={item?.categoryId}
                  categoryName={item.name}
                  id={item.categoryId}
                  total={item.totalRequiredDocs}
                  uploaded={item.totalDocsUploaded}
                  handleSelectedCategory={handleSelectedCategory}
                  selectedCategory={selectedCategory}
                  category={item}
                />
                <Divider className="divider" />   
              </Box>
            ))}
        </Box>
      )}
    </Card>
  );
};

export default SidePanel;
