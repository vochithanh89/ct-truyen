import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import ReadingNav from './ReadingNav';
import { useNavigate } from 'react-router-dom';
import { addMangaToHistory } from '../functions/handleHistory';
import { updateCurrentChapterLibrary } from '../functions/handleLibrary';
import { getChapter } from '../../utils/api';
import Image from '../Image';

import { Helmet } from 'react-helmet';
import { title, detailsSlogan, siteName } from '../constants/constants';

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
        getChapter(selectedChapterId)
            .then((data) => {
                setIsLoading(false);
                setData([data]);
            })
            .catch(() => {
                navigate('/error');
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
        getChapter(nextChapterId)
            .then((data) => {
                navigate(`/reading/${nextChapterId}`, { replace: true });
                setIsLoading(false);
                setData((pre) => [...pre, data]);
            })
            .catch(() => {
                navigate('/error');
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
                                <li key={index}>
                                    <Image className="w-full" src={chapterImage.imgUrl} alt={chapterImage.title} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };

    return (
        <>
            {currentData && (
                <Helmet>
                    <title>{`${currentData.mangaName} ${currentChapter.chapterName} - ${title}`}</title>
                    <meta
                        name="description"
                        content={`Đọc truyện ${currentData.mangaName} ${currentChapter.chapterName} ${detailsSlogan}`}
                    />
                    <meta
                        property="og:title"
                        content={`Đọc truyện ${currentData.mangaName} ${currentChapter.chapterName} tại ${siteName}`}
                    />
                    <meta property="og:image" content={`http:${currentData.posterUrl}`} />
                    <meta property="og:site_name" content={siteName} />
                    <meta property="og:url" content={window.location.href} />
                    <meta
                        property="og:description"
                        content={`Đọc truyện ${currentData.mangaName} ${currentChapter.chapterName} ${detailsSlogan}`}
                    />
                </Helmet>
            )}
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
        </>
    );
}

export default ReadingPlace;
