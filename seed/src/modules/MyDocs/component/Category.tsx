import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Tcategory } from '../model/myDocsTypes';

const Category = (props: Tcategory) => {
  const {
    categoryName,
    total,
    uploaded,
    handleSelectedCategory,
    selectedCategory,
    category
  } = props;

  const { t } = useTranslation('mydoc');

  return (
    <Box
      sx={{ p: 5, px: 8 }}
      className={`d-flex  flex-basic-space-between mb-3 category ${
        selectedCategory?.name === categoryName ? 'selectedCategory' : ''
      } `}
      onClick={() => {
        handleSelectedCategory(category);
      }}
    >
      <Box className="flex-column-start">
        <Typography className="categoryTitle">{categoryName}</Typography>
        <Typography className="" variant="body1">
          {t('document')}
          {': '}
          <span>
            {uploaded}/{total}
          </span>
        </Typography>
      </Box>
      <Box>
        {selectedCategory?.name === categoryName && (
          <Box className="eastIconHide" sx={{ px: 1 }}>
            <Box className="eastIcon flex-basic-center ">
              <Box
                className="icon-ic_right-arrow"
                sx={{ fontSize: '24px' }}
              ></Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Category;
