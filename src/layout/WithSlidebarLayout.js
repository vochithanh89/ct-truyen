import Container from '../components/Container';
import Header from './components/Header/Header';

import ScrollTop from '../components/ScrollTop';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';

function WithSlidebarLayout({ children }) {
    return (
        <div className="min-h-screen bg-background-1">
            <Header type="sticky" />
            <div className="flex-1">
                <Container>
                    <div className="flex flex-warp">
                        <LeftSidebar />
                        {children}
                        <ScrollTop />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default WithSlidebarLayout;
