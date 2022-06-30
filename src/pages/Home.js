import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import MangaList from '../components/Body/MangaList';
import LeftSidebar from '../components/Body/LeftSidebar/LeftSidebar';
import ScrollTop from '../components/ScrollTop';
import Container from '../components/Container';

function Home() {
    return (
        <>
            <Header />
            <Body>
                <Container>
                    <div style={{ minHeight: 'calc(100vh - 80px)' }} className="flex flex-warp">
                        <LeftSidebar />
                        <MangaList />
                        <ScrollTop />
                    </div>
                </Container>
            </Body>
        </>
    );
}

export default Home;
