import { memo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../Container';
import { FaHome, FaListUl } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Select, { createFilter } from 'react-select';
import { customStylesReactSelect } from '../constants/customStylesReactSelect';
import clsx from 'clsx';

function ReadingNav({ chapters, mangaId, currentChapter, prevChapterId, nextChapterId, setSelectedChapterId }) {
    const readingNavRef = useRef();
    const containerRef = useRef();

    const navigate = useNavigate();

    const options = chapters.map((chapter) => {
        return {
            value: chapter.chapterId,
            label: chapter.chapterName,
        };
    });

    const currentOption = {
        value: currentChapter.chapterId,
        label: currentChapter.chapterName,
    };

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

    const handleChange = (options) => {
        setSelectedChapterId(options.value);
        navigate(`/reading/${options.value}`);
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
                <Container>
                    <div className="flex p-[0.25rem] items-center justify-center text-text-0">
                        <Link
                            to="/"
                            className="p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg bg-background-3 text-xl lg:text-2xl"
                        >
                            <FaHome />
                        </Link>
                        <button
                            onClick={handlePreviousChapter}
                            to={`/details/${mangaId}`}
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

                        <Select
                            styles={customStylesReactSelect}
                            value={currentOption}
                            options={options}
                            isSearchable={false}
                            className="text-sm"
                            onChange={handleChange}
                            filterOption={createFilter({ ignoreAccents: false })} //fix lag
                        />

                        <button
                            onClick={handleNextChapter}
                            to={`/details/${mangaId}`}
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
                            <FaListUl />
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default memo(ReadingNav);
