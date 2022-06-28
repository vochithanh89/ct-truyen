import { memo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../Container';
import { FaHome, FaListUl } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Select, { createFilter } from 'react-select';
import { customStylesReactSelect } from '../constants/customStylesReactSelect';
import clsx from 'clsx';

function ReadingNav({ data, chapterIndex, mangaId, setSelectedChapterId }) {
    const readingNavRef = useRef();
    const containerRef = useRef();

    const navigate = useNavigate();

    const options = data.map((chapter) => {
        return {
            value: chapter.chapterId,
            label: chapter.chapterName,
        };
    });

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

    const handleNextChapter = (options, chapterIndex) => {
        setSelectedChapterId(options[chapterIndex + 1]);
        navigate(`/reading/${options[chapterIndex + 1].value}`);
    };

    const handlePreviousChapter = (options, chapterIndex) => {
        setSelectedChapterId(options[chapterIndex - 1]);
        navigate(`/reading/${options[chapterIndex - 1].value}`);
    };

    return (
        <div ref={containerRef}>
            <div ref={readingNavRef} className=" top-0 left-0 right-0 mb-2 bg-transparent">
                <Container>
                    <div className="flex p-[0.25rem] items-center justify-center text-text-0">
                        <Link to="/" className="p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg bg-background-3 text-xl">
                            <FaHome />
                        </Link>
                        <button
                            onClick={() => handlePreviousChapter(options, chapterIndex)}
                            to={`/details/${mangaId}`}
                            className={clsx('p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg bg-background-3 text-xl', {
                                '!text-text-1': chapterIndex === 0,
                            })}
                            disabled={chapterIndex === 0}
                        >
                            <IoIosArrowBack />
                        </button>

                        <Select
                            styles={customStylesReactSelect}
                            value={options[chapterIndex]}
                            options={options}
                            isSearchable={false}
                            className="text-sm"
                            onChange={handleChange}
                            filterOption={createFilter({ ignoreAccents: false })} //fix lag
                        />

                        <button
                            onClick={() => handleNextChapter(options, chapterIndex)}
                            to={`/details/${mangaId}`}
                            className={clsx('p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg bg-background-3 text-xl', {
                                '!text-text-1': chapterIndex === data.length - 1,
                            })}
                            disabled={chapterIndex === data.length - 1}
                        >
                            <IoIosArrowForward />
                        </button>
                        <Link
                            to={`/details/${mangaId}`}
                            className="p-3 md:p-2 mx-2 xs:mx-[0.125rem] rounded-lg bg-background-3 text-xl"
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
