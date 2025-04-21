import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

type breadCrumbMenu = {
  title: string;
  className: string;
  children?: React.ReactChildren;
};
export type breadcrumbConfigType = {
  breadCrumbMenu: breadCrumbMenu[];
  redirect: () => void;
};

const BreadCrumbComponent = (props: breadcrumbConfigType) => {
  const { breadCrumbMenu, redirect } = props;

  return (
    <Box className="flex-basic-space-between mb-26">
      <Box className="flex-basic-start w-100">
        <Box
          onClick={redirect}
          className="mr-16 d-flex iconArrowBack flex-basic-center cursorPointer"
        >
          <ArrowBackIcon className="breadcrumbArrowIcon" />
        </Box>
        <Typography
          variant="h4"
          className="textWeightMedium flex-basic-start text-ellipsis customWidth100"
        >
          {breadCrumbMenu?.map((menu, index) => {
            if (index == 0) {
              return (
                menu?.children || (
                  <Box
                    className="text-ellipsis"
                    key={`${index}-${menu?.title}`}
                  >
                    {menu?.title}
                  </Box>
                )
              );
            }
            return (
              menu?.children || (
                <React.Fragment key={`${index}-${menu?.title}`}>
                  <Box className="d-flex">
                    <Box
                      sx={{ mx: 1 }}
                      className="icon-dropdown icon-rotate-273 iconStyle"
                    ></Box>
                  </Box>
                  <Box
                    className={`text-ellipsis ${
                      index === breadCrumbMenu?.length - 1
                        ? 'textweight textPrimaryColor'
                        : ''
                    }`}
                  >
                    {menu?.title}
                  </Box>
                </React.Fragment>
              )
            );
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreadCrumbComponent;
