import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import ScrollTop from '../components/ScrollTop';
import LibraryWrap from '../components/Body/Library/LibraryWrap';
import Container from '../components/Container';

function Library() {
    return (
        <>
            <Header />
            <Body>
                <Container>
                    <div style={{ minHeight: 'calc(100vh - 80px)' }} className="flex flex-warp">
                        <LibraryWrap />
                        <ScrollTop />
                    </div>
                </Container>
            </Body>
        </>
    );
}

export default Library;
