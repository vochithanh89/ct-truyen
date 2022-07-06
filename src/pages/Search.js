import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MangaListInfinite from '../components/MangaListInfinite';
import useGetListInfinite from '../hooks/useGetListInfinite';
import SearchInput from '../layout/components/Header/SearchInput';
import Loading from '../layout/components/Loading';
import { getSearchResult } from '../utils/api';

function Search() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q')?.trim();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [q]);

    const { isLoading, isError, result, hasNextPage, fetchNextPage } = useGetListInfinite(
        'searchList',
        getSearchResult,
        q,
    );

    if (isLoading) {
        return <Loading />;
    } else if (isError) {
        navigate('/error');
    }

    return q ? (
        <div className="w-full p-6 md:p-2 bg-background-2 rounded-xl">
            <h1 className="my-4 px-2 text-primary text-2xl md:text-xl font-bold">{`Tìm kiếm cho "${q}"`}</h1>
            <MangaListInfinite data={result} hasMore={hasNextPage} fetchMore={fetchNextPage} />
        </div>
    ) : (
        <div className="w-full">
            <SearchInput disableBlur className="!hidden md:!flex"></SearchInput>
        </div>
    );
}

export default Search;
