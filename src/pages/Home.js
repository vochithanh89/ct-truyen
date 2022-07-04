import { useSelector, useDispatch } from 'react-redux';
import { mangaFiltersSelector } from '../components/redux/selectors';
import useGetListInfinite from '../hooks/useGetListInfinite';
import { getMangaList } from '../utils/api';
import MangaListInfinite from '../components/MangaListInfinite';
import Loading from '../layout/components/Loading';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { mangaFiltersSlice } from '../components/redux/mangaFiltersSlice';

function Filter() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { filters } = useSelector(mangaFiltersSelector);

    const [searchParams] = useSearchParams();
    const { sort, category, status } = Object.fromEntries([...searchParams]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        dispatch(mangaFiltersSlice.actions.sortChange(sort));
        dispatch(mangaFiltersSlice.actions.statusChange(status));
        dispatch(mangaFiltersSlice.actions.categoryChange(category));
        // eslint-disable-next-line
    }, [sort, status, category]);

    const { isLoading, isError, result, hasNextPage, fetchNextPage } = useGetListInfinite(
        'mangaList',
        getMangaList,
        filters,
    );

    if (isLoading) {
        return <Loading />;
    } else if (isError) {
        navigate('/');
        dispatch(mangaFiltersSlice.actions.resetFilters());
    }

    return (
        <div className="w-10/12 lg:w-full md:w-full p-6 md:p-2 bg-background-2 rounded-xl">
            <h1 className="my-4 px-2 text-primary text-2xl md:text-xl font-bold">{result[result.length - 1]?.title}</h1>
            <MangaListInfinite data={result} hasMore={hasNextPage} fetchMore={fetchNextPage} />
        </div>
    );
}

export default Filter;
