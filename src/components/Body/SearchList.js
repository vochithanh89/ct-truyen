import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { axiosGet } from '../../utils/request';
import MangaCard from './MangaCard';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

function SearchList({ q }) {
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const [data, setData] = useState([]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        if (q.trim()) {
            setIsLoading(true);
            axiosGet('/search?', {
                params: {
                    q: q,
                },
            }).then((data) => {
                setData(data.data);
                setIsLoading(false);
                setCurrentPage(data.pagination.currentPage);
                setTotalPage(data.pagination.totalPage);
            });
        }
        // eslint-disable-next-line
    }, [q]);

    const loadMoreData = () => {
        axiosGet('/search?', {
            params: {
                q: q,
                page: currentPage + 1,
            },
        }).then((data) => {
            setData((pre) => [...pre, ...data.data]);
            setCurrentPage(data.pagination.currentPage);
        });
    };

    const renderMangaList = () => {
        return data.length > 0 ? (
            data.map((manga, index) => {
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
            })
        ) : (
            <h2 className="w-full text-text-1 text-center">Không tìm thấy kết quả nào</h2>
        );
    };

    const renderLoading = () => {
        return (
            <div className="text-center">
                <LoadingIcon />
            </div>
        );
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
