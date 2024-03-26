import React, { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from 'react-query-devtools'
import { ThemeProvider, CssBaseline } from '@mui/material';

import { customTheme } from './theme/customTheme';
import { Dashboard } from './pages/dashboard/dashboard';

// * Create a query client
const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={customTheme}>
                <CssBaseline />
                {/* <h1>Hello Composer/Pianist/Programmer Jeric</h1> */}
                <Dashboard />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
