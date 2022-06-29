import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import SearchList from '../components/Body/SearchList';
import { useSearchParams } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';
import SearchInput from '../components/Header/SearchInput';

function Search() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q')?.trim();

    return (
        <>
            <Header />
            <Body>
                {q ? (
                    <SearchList q={q} />
                ) : (
                    <div className="w-full text-center">
                        <SearchInput className="hidden md:!block !w-full text-center" />
                    </div>
                )}
                <ScrollTop />
            </Body>
        </>
    );
}

export default Search;
