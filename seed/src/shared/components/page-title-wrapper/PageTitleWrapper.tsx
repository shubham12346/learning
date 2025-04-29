import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';

interface PageTitleWrapperProps {
  children?: ReactNode;
}

export const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return (
    <Box className="MuiPageTitle-wrapper PageTitle">
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};
