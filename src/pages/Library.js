import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import ScrollTop from '../components/ScrollTop';
import LibraryList from '../components/Body/LibraryList';

function Library() {
    return (
        <>
            <Header />
            <Body>
                <LibraryList />
                <ScrollTop />
            </Body>
        </>
    );
}

export default Library;
