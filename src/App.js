import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <GlobalStyles />
        {routing}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
