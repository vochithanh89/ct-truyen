import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import GlobalStyles from './GlobalStyles/GlobalStyles';

function App() {
    return (
        <Provider store={store}>
            <Router store={store}>
                <GlobalStyles>
                    <div className="App">
                        <div className="flex flex-col min-h-screen">
                            <Routes>
                                {publicRoutes.map((route, index) => {
                                    const Page = route.page;
                                    return <Route key={index} path={route.path} element={<Page />} />;
                                })}
                            </Routes>
                        </div>
                    </div>
                </GlobalStyles>
            </Router>
        </Provider>
    );
}

export default App;
