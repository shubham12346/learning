import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface BreadcrumbProps {
  goBackToReports?: (e, name) => void;
  parentName?: string;
  childNamePath?: string;
  subPathName?: string;
}

const Breadcrumb = ({
  goBackToReports,
  parentName,
  childNamePath,
  subPathName
}: BreadcrumbProps) => {
  //const
  const { t } = useTranslation('reports');

  return (
    <Box className="flex-basic-start w-100 breadcrumbItem">
      <Box
        onClick={() => goBackToReports(true, '')}
        className="mr-16 d-flex iconArrowBack flex-basic-center cursorPointer"
      >
        <ArrowBackIcon className="textWhiteColor" />
      </Box>
      <Typography
        variant="h4"
        className="textWeightMedium flex-basic-start text-ellipsis customWidth100 innerItem"
      >
        <Box className="item">{parentName}</Box>
        <Box className="d-flex">
          <Box
            sx={{ mx: 1 }}
            className="icon-dropdown icon-rotate-273 iconStyle"
          ></Box>
        </Box>
        <Box className="item">{childNamePath}</Box>
        {subPathName && (
          <>
            <Box className="d-flex">
              <Box
                sx={{ mx: 1 }}
                className="icon-dropdown icon-rotate-273 iconStyle"
              ></Box>
            </Box>
            <Box className="item textWeightMedium textPrimaryColor text-ellipsis w-50">
              {subPathName}
            </Box>
          </>
        )}
      </Typography>
    </Box>
  );
};

export default Breadcrumb;
