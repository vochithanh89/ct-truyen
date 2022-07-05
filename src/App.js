import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import GlobalStyles from './GlobalStyles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Router>
                    <GlobalStyles>
                        <div className="App">
                            <div className="flex flex-col min-h-screen">
                                <Routes>
                                    {publicRoutes.map((route, index) => {
                                        const Page = route.page;
                                        const Layout = route.layout;
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={
                                                    <Layout>
                                                        <Page />
                                                    </Layout>
                                                }
                                            />
                                        );
                                    })}
                                </Routes>
                            </div>
                        </div>
                    </GlobalStyles>
                </Router>
            </Provider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}

export default App;
