import Container from '../components/Container';
import Header from './components/Header/Header';

import ScrollTop from '../components/ScrollTop';

function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-background-1">
            <Header type="sticky" />
            <div className="flex-1">
                <Container>
                    <div className="flex flex-warp">
                        {children}
                        <ScrollTop />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default MainLayout;
