import { useEffect, useState, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { axiosGet } from '../../utils/request';
import MangaCard from './MangaCard';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { getSearchResult } from '../../utils/api';
import setTitlePage from '../functions/setTitlePage';
function SearchList({ q }) {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);
    const [result, setResult] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        if (q.trim()) {
            setIsLoading(true);
            getSearchResult(q, 1).then((res) => {
                const { title, data, pagination } = res;
                setResult({ title, pagination });
                setData(data);
                setIsLoading(false);
                setTitlePage(title);
            });
        }
        // eslint-disable-next-line
    }, [q]);

    const currentPage = useMemo(() => {
        return result ? result.pagination.currentPage : -1;
    }, [result]);

    const totalPage = useMemo(() => {
        return result ? result.pagination.totalPage : 0;
    }, [result]);

    const loadMoreData = () => {
        axiosGet('/search?', {
            params: {
                q: q,
                page: currentPage + 1,
            },
        }).then((res) => {
            const { title, data, pagination } = res;
            setResult({ title, pagination });
            setData((pre) => [...pre, ...data]);
        });
    };

    const renderMangaList = () => {
        return data.length > 0 ? (
            data.map((manga, index) => {
                return (
                    <MangaCard
                        key={index}
                        className="w-1/6"
                        mangaName={manga.mangaName}
                        id={manga.id}
                        posterUrl={manga.posterUrl}
                        chapterName={manga.newestChapter.chapterName}
                        chapterId={manga.newestChapter.chapterId}
                        updatedAt={manga.newestChapter.updatedAt}
                    />
                );
            })
        ) : (
            <h2 className="w-full text-text-1 text-center">Không tìm thấy kết quả nào</h2>
        );
    };

    const renderLoading = () => {
        return <LoadingIcon />;
    };
    return (
        <div className="w-full lg:w-full md:w-full p-6 md:p-2 bg-background-2 rounded-xl">
            <h1 className="my-4 px-2 text-primary text-2xl md:text-xl font-bold">{`Tìm kiếm cho: "${q}"`}</h1>

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

export default SearchList;
