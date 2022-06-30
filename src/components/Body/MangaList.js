import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { mangaFiltersSelector } from '../redux/selectors';
import MangaCard from './MangaCard';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import setTitlePage from '../functions/setTitlePage';

import { getMangaList } from '../../utils/api';

function MangaList() {
    const { filters } = useSelector(mangaFiltersSelector);

    const [isLoading, setIsLoading] = useState(false);

    const [result, setResult] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        setIsLoading(true);
        getMangaList(1, filters).then((res) => {
            const { title, pagination, data } = res;
            setResult({ title, pagination });
            setData(data);
            setTitlePage(title);
            setIsLoading(false);
        });
        // eslint-disable-next-line
    }, [filters]);

    const currentPage = useMemo(() => {
        return result ? result.pagination.currentPage : -1;
    }, [result]);

    const totalPage = useMemo(() => {
        return result ? result.pagination.totalPage : 0;
    }, [result]);

    const loadMoreData = () => {
        getMangaList(currentPage + 1, filters).then((res) => {
            const { title, pagination, data } = res;
            setData((pre) => [...pre, ...data]);
            setResult({ title, pagination });
        });
    };

    const renderMangaList = () => {
        return data.map((manga, index) => {
            return (
                <MangaCard
                    key={index}
                    mangaName={manga.mangaName}
                    id={manga.id}
                    posterUrl={manga.posterUrl}
                    chapterName={manga.newestChapter.chapterName}
                    chapterId={manga.newestChapter.chapterId}
                    updatedAt={manga.newestChapter.updatedAt}
                />
            );
        });
    };

    const renderLoading = () => {
        return <LoadingIcon />;
    };

    return (
        <div className="w-10/12 lg:w-full md:w-full p-6 md:p-2 bg-background-2 rounded-xl">
            <h1 className="my-4 px-2 text-primary text-2xl md:text-xl font-bold">{result?.title}</h1>

            {isLoading ? (
                renderLoading()
            ) : (
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={currentPage < totalPage}
                    loader={renderLoading()}
                    scrollThreshold={0.98}
                >
                    <div className="flex flex-wrap">{renderMangaList()}</div>
                </InfiniteScroll>
            )}
        </div>
    );
}

export default MangaList;
