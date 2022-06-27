import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import HistoryList from '../components/Body/HistoryList';
import ScrollTop from '../components/ScrollTop';

function Hisroty() {
    return (
        <>
            <Header />
            <Body>
                <HistoryList />
                <ScrollTop />
            </Body>
        </>
    );
}

export default Hisroty;
