import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>,
);
