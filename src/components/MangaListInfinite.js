import InfiniteScroll from 'react-infinite-scroll-component';

import MangaCard from '../components/MangaCard';
import LoadingIcon from './LoadingIcon/LoadingIcon';

function MangaListInfinite({ data, hasMore, fetchMore }) {
    const renderMangaList = () => {
        return data.map((item, index) => {
            return item.data.map((manga, index) => {
                return (
                    <MangaCard
                        key={index}
                        className="w-1/5"
                        mangaName={manga.mangaName}
                        id={manga.id}
                        posterUrl={manga.posterUrl}
                        chapterName={manga.newestChapter.chapterName}
                        chapterId={manga.newestChapter.chapterId}
                        updatedAt={manga.newestChapter.updatedAt}
                    />
                );
            });
        });
    };

    const renderLoading = () => {
        return <LoadingIcon />;
    };

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={renderLoading()}
            scrollThreshold={0.98}
        >
            <div className="flex flex-wrap">{renderMangaList()}</div>
        </InfiniteScroll>
    );
}

export default MangaListInfinite;
