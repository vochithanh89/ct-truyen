import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import { axiosGet } from '../../utils/request';
import { mangaFiltersSelector } from '../redux/selectors';
import MangaCard from './MangaCard';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import setTitlePage from '../functions/setTitlePage';

import SkeletonLoading from '../SkeletonLoading';

function MangaList() {
    const { filters } = useSelector(mangaFiltersSelector);

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const [title, setTitle] = useState('');

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        setIsLoading(true);
        axiosGet('/list?', {
            params: {
                ...filters,
            },
        }).then((data) => {
            setData(data.data);
            setIsLoading(false);
            setCurrentPage(data.pagination.currentPage);
            setTotalPage(data.pagination.totalPage);
        });

        axiosGet('/filter').then((data) => {
            const category = data.find((item) => {
                return item.id === 'category';
            });
            const { name } = category.filtersValue.find((item) => {
                return item.id === filters.category;
            });
            setTitle(name);
            setTitlePage(name);
        });
        // eslint-disable-next-line
    }, [filters]);

    const loadMoreData = () => {
        axiosGet('/list?', {
            params: {
                ...filters,
                page: currentPage + 1,
            },
        }).then((data) => {
            setData((pre) => [...pre, ...data.data]);
            setCurrentPage(data.pagination.currentPage);
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
        return (
            <div className="text-center">
                <LoadingIcon />
            </div>
        );
    };

    return (
        <div className="w-10/12 lg:w-full md:w-full p-6 md:p-2 bg-background-2 rounded-xl">
            <h1 className="my-4 px-2 text-primary text-2xl md:text-xl font-bold">
                {title || <SkeletonLoading width="12rem" height="2rem" />}
            </h1>

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
