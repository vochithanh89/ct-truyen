import { memo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import clsx from 'clsx';
import MangaListModal from './MangaListModal';

function ReadingNav({ chapters, mangaId, currentChapter, prevChapterId, nextChapterId, setSelectedChapterId }) {
    const readingNavRef = useRef();
    const containerRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = window.scrollY || document.documentElement.scrollTop;
            const readingNavHeight = readingNavRef.current.clientHeight;

            if (scrollHeight > 72) {
                readingNavRef.current.classList.add('!fixed', '!bg-background-2');
                containerRef.current.style = `height: ${readingNavHeight}px;`;
            } else {
                readingNavRef.current.classList.remove('!fixed', '!bg-background-2');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleChange = (chapter) => {
        setSelectedChapterId(chapter.chapterId);
        navigate(`/reading/${chapter.chapterId}`);
    };

    const handleNextChapter = () => {
        setSelectedChapterId(nextChapterId);
        navigate(`/reading/${nextChapterId}`);
    };

    const handlePreviousChapter = () => {
        setSelectedChapterId(prevChapterId);
        navigate(`/reading/${prevChapterId}`);
    };

    return (
        <div ref={containerRef}>
            <div ref={readingNavRef} className=" top-0 left-0 right-0 mb-2 bg-transparent">
                <div className="flex p-[0.5rem] items-center justify-center text-text-0">
                    <Link
                        to="/"
                        className="p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg bg-background-3 text-xl lg:text-2xl"
                    >
                        <FaHome />
                    </Link>
                    <button
                        onClick={handlePreviousChapter}
                        className={clsx(
                            'p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg text-text-1 bg-background-3 text-xl lg:text-2xl',
                            {
                                '!text-text-0': prevChapterId,
                            },
                        )}
                        disabled={!prevChapterId}
                    >
                        <IoIosArrowBack />
                    </button>

                    <MangaListModal
                        chapters={chapters}
                        currentChapter={currentChapter}
                        onSelectedChange={handleChange}
                    />

                    <button
                        onClick={handleNextChapter}
                        className={clsx(
                            'p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg text-text-1 bg-background-3 text-xl lg:text-2xl',
                            {
                                '!text-text-0': nextChapterId,
                            },
                        )}
                        disabled={!nextChapterId}
                    >
                        <IoIosArrowForward />
                    </button>

                    <Link
                        to={`/details/${mangaId}`}
                        className="p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg bg-background-3 text-xl lg:text-2xl"
                    >
                        <BiMenuAltLeft />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default memo(ReadingNav);
