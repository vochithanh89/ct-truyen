import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import MangaList from '../components/Body/MangaList';
import LeftSidebar from '../components/Body/LeftSidebar';
import ScrollTop from '../components/ScrollTop';

function Home() {
    return (
        <>
            <Header />
            <Body>
                <LeftSidebar />
                <MangaList />
                <ScrollTop />
            </Body>
        </>
    );
}

export default Home;
