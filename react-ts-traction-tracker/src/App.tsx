import React, { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from 'react-query-devtools'
import { ThemeProvider, CssBaseline } from '@mui/material';

import { customTheme } from './theme/customTheme';
import { Dashboard } from './pages/dashboard/dashboard';
import ComposeContext from './context/Compose.context';
import { rootContext } from './context/root.context';

// * Create a query client
const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* Context is available in all these children components nested inside ComposeContext. */}
            <ComposeContext components={rootContext}>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline />
                    {/* <h1>Hello Composer/Pianist/Programmer Jeric</h1> */}
                    <Dashboard />
                </ThemeProvider>
            </ComposeContext>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
