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
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.page;
                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}
                        </Routes>
                    </div>
                </GlobalStyles>
            </Router>
        </Provider>
    );
}

export default App;
