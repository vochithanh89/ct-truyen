import { useEffect, useMemo, useState } from 'react';
import { axiosGet } from '../../utils/request';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import ReadingNav from './ReadingNav';
import { useNavigate } from 'react-router-dom';
import setTitlePage from '../functions/setTitlePage';
import { addMangaToHistory } from '../functions/handleHistory';

function ReadingPlace({ id }) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [selectedChapterId, setSelectedChapterId] = useState(id);

    const [data, setData] = useState([]);

    const [mangaId, setMangaId] = useState('');

    const [chapters, setChapters] = useState([]);
    const [mangaDetails, setMangaDetails] = useState({});

    const currentChapterId = useMemo(() => {
        return data[data.length - 1]?.chapterId;
        // eslint-disable-next-line
    }, [data]);

    const totalChapterNumber = useMemo(() => {
        return chapters ? chapters.length : 0;
        // eslint-disable-next-line
    }, [chapters]);

    const currentChapterIndex = useMemo(() => {
        let chapterIndex;
        chapters?.forEach((chapter, index) => {
            if (chapter.chapterId === currentChapterId) {
                chapterIndex = index;
            }
        });
        return Number.isInteger(chapterIndex) ? chapterIndex : -1;
        // eslint-disable-next-line
    }, [chapters, currentChapterId]);

    //handle history
    useEffect(() => {
        if (chapters.length > 0 && currentChapterIndex >= 0) {
            const { mangaName, id, posterUrl } = mangaDetails;
            const chapterSeen = chapters[currentChapterIndex];
            const historyData = {
                mangaName,
                id,
                posterUrl,
                chapterSeen,
            };
            addMangaToHistory(historyData);
        }
        // eslint-disable-next-line
    }, [chapters, currentChapterIndex]);

    useEffect(() => {
        if (selectedChapterId) {
            window.scrollTo({
                top: 0,
            });
            setIsLoading(true);
            axiosGet(`/chapter/${id}`).then((data) => {
                setMangaId(data.id);
                setData([data]);
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line
    }, [selectedChapterId]);

    useEffect(() => {
        if (mangaId) {
            axiosGet(`/details/${mangaId}`).then((data) => {
                const chapters = data.chapters.reverse();
                setChapters(chapters);
                const mangaDetails = data;
                mangaDetails.chapters = chapters;
                setMangaDetails(mangaDetails);
            });
        }
    }, [mangaId]);

    const loadMoreData = () => {
        const chapterNext = chapters.find((chapter, index, chapters) => {
            return chapters[index - 1]?.chapterId === currentChapterId;
        });
        const chapterIdNext = chapterNext?.chapterId;
        if (chapterIdNext) {
            axiosGet(`/chapter/${chapterIdNext}`).then((data) => {
                navigate(`/reading/${chapterIdNext}`);
                setData((pre) => [...pre, data]);
                setTitlePage(`${data.mangaName} ${data.chapterName}`);
                setSelectedChapterId('');
            });
        }
    };

    const renderLoading = () => {
        return (
            <div className="text-center">
                <LoadingIcon />
            </div>
        );
    };

    const renderEndMessage = () => {
        return <h2 className="py-4 bg-primary text-center text-text-0 text-xl">Chưa có Chapter mới</h2>;
    };

    const renderChapterImages = () => {
        return data.map((chapter, index) => {
            return (
                <div key={index}>
                    <h2 className="py-4 bg-primary text-center text-text-0 text-xl">{chapter.chapterName}</h2>
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
            {chapters.length > 0 && (
                <ReadingNav
                    data={chapters}
                    chapterIndex={currentChapterIndex}
                    mangaId={mangaId}
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
                    hasMore={currentChapterIndex < totalChapterNumber - 1}
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
