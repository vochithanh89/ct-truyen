import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import SearchList from '../components/Body/SearchList';
import { useSearchParams } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';
import SearchInput from '../components/Header/SearchInput';
import Container from '../components/Container';

function Search() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q')?.trim();

    return (
        <>
            <Header />
            <Body>
                <ScrollTop />

                <Container>
                    <div style={{ minHeight: 'calc(100vh - 80px)' }} className="flex flex-warp">
                        {q ? (
                            <SearchList q={q} />
                        ) : (
                            <div className="w-full text-center">
                                <SearchInput className="hidden md:!block !w-full text-center" />
                            </div>
                        )}
                    </div>
                </Container>
            </Body>
        </>
    );
}

export default Search;
