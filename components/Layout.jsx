import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, useMediaQuery } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../utils/themeAtom';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
  const mode = useAtomValue(themeAtom);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Omeru Digital
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      
      <Container 
        component="main" 
        maxWidth="lg" 
        sx={{ 
          flexGrow: 1, 
          py: 4,
          px: isMobile ? 2 : 3,
        }}
      >
        {children}
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Omeru Digital. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout; 