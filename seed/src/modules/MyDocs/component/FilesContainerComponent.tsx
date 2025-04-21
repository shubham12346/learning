import { Card } from '@mui/material';
import EmptyFileView from './EmptyFileView';
import OtherSubCategoryComponent from './OtherSubCategoryComponent';
import AllSubCategoryComponent from './AllSubCategoryComponent';
import { MY_DOCS_CATEGORIES } from '../constants/constants';

const FilesContainerComponent = ({
  selectedCategory,
  callTheSideNavToUpdate,
  handleSelectedCategory
}) => {
  const getNumberForSidNav = (selectedCategory) => {
    if (selectedCategory?.name === MY_DOCS_CATEGORIES.other) {
      return 2;
    } else if (
      selectedCategory?.name ||
      selectedCategory?.name === MY_DOCS_CATEGORIES.gapAnalysisPolicies
    ) {
      return 1;
    }
    return 0;
  };

  const renderSubCategorySelected = (selectedCategory) => {
    const subMenuNum: number = getNumberForSidNav(selectedCategory);

    switch (subMenuNum) {
      case 0:
        return <EmptyFileView />;
      case 1:
        return (
          <AllSubCategoryComponent
            selectedCategory={selectedCategory}
            callTheSideNavToUpdate={callTheSideNavToUpdate}
            handleSelectedCategory={handleSelectedCategory}
          />
        );
      case 2:
        return (
          <OtherSubCategoryComponent
            selectedCategory={selectedCategory}
            callTheSideNavToUpdate={callTheSideNavToUpdate}
            handleSelectedCategory={handleSelectedCategory}
          />
        );
      default:
        return <EmptyFileView />;
    }
  };

  return (
    <Card className="filesContainerComponentWrapper">
      {renderSubCategorySelected(selectedCategory)}
    </Card>
  );
};

export default FilesContainerComponent;
