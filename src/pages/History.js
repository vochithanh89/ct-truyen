import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import HistoryList from '../components/Body/HistoryList';
import ScrollTop from '../components/ScrollTop';
import Container from '../components/Container';

function Hisroty() {
    return (
        <>
            <Header />
            <Body>
                <Container>
                    <div style={{ minHeight: 'calc(100vh - 80px)' }} className="flex flex-warp">
                        <HistoryList />
                        <ScrollTop />
                    </div>
                </Container>
            </Body>
        </>
    );
}

export default Hisroty;
