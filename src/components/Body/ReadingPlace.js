import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import ReadingNav from './ReadingNav';
import { useNavigate } from 'react-router-dom';
import setTitlePage from '../functions/setTitlePage';
import { addMangaToHistory } from '../functions/handleHistory';
import { updateCurrentChapterLibrary } from '../functions/handleLibrary';
import { getChapter } from '../../utils/api';

function ReadingPlace({ id }) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [selectedChapterId, setSelectedChapterId] = useState(id);

    const [data, setData] = useState([]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        setIsLoading(true);
        getChapter(selectedChapterId).then((data) => {
            setIsLoading(false);
            setTitlePage(data.title);
            setData([data]);
        });
        // eslint-disable-next-line
    }, [selectedChapterId]);

    const currentData = useMemo(() => {
        return data.length > 0 ? data[data.length - 1] : null;
    }, [data]);

    const chapters = useMemo(() => {
        return currentData ? currentData.chapters : null;
    }, [currentData]);

    const currentChapter = useMemo(() => {
        return currentData ? currentData.currentChapter : null;
    }, [currentData]);

    const nextChapterId = useMemo(() => {
        return currentData && currentData.nextChapter ? currentData.nextChapter.chapterId : null;
    }, [currentData]);

    const prevChapterId = useMemo(() => {
        return currentData && currentData.prevChapter ? currentData.prevChapter.chapterId : null;
    }, [currentData]);

    const mangaId = useMemo(() => {
        return currentData ? currentData.id : null;
    }, [currentData]);
    //handle history
    useEffect(() => {
        if (currentData) {
            const { mangaName, id, posterUrl, currentChapter } = currentData;
            addMangaToHistory({
                mangaName,
                posterUrl,
                id,
                currentChapter,
            });
            updateCurrentChapterLibrary(id, currentChapter);
        }
    }, [currentData]);

    const loadMoreData = () => {
        getChapter(nextChapterId).then((data) => {
            navigate(`/reading/${nextChapterId}`);
            setIsLoading(false);
            setTitlePage(data.title);
            setData((pre) => [...pre, data]);
        });
    };

    const renderLoading = () => {
        return <LoadingIcon />;
    };

    const renderEndMessage = () => {
        return <h2 className="py-[0.75rem] bg-primary text-center text-text-0">Chưa có Chapter mới</h2>;
    };

    const renderChapterImages = () => {
        return data.map((chapter, index) => {
            return (
                <div key={index}>
                    <h2 className="py-[0.75rem] bg-primary text-center text-text-0">
                        {chapter.currentChapter.chapterName}
                    </h2>
                    <ul>
                        {chapter.chapterImages.map((chapterImage, index) => {
                            return (
                                <li className="min-h-[10rem]" key={index}>
                                    <img className="w-full block" src={chapterImage.imgUrl} alt={chapterImage.title} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };

    return (
        <div className="w-full">
            {data.length > 0 && (
                <ReadingNav
                    chapters={chapters}
                    mangaId={mangaId}
                    currentChapter={currentChapter}
                    prevChapterId={prevChapterId}
                    nextChapterId={nextChapterId}
                    setSelectedChapterId={setSelectedChapterId}
                />
            )}

            {isLoading ? (
                renderLoading()
            ) : (
                <InfiniteScroll
                    className="flex flex-col max-w-3xl m-auto"
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={nextChapterId}
                    loader={renderLoading()}
                    endMessage={renderEndMessage()}
                    scrollThreshold={1}
                >
                    {renderChapterImages()}
                </InfiniteScroll>
            )}
        </div>
    );
}

export default ReadingPlace;
