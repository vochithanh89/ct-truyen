import { IoMdClose } from 'react-icons/io';
import { AiOutlineLoading3Quarters, AiOutlineSearch } from 'react-icons/ai';
import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

import { axiosGet } from '../../../utils/request';
import SearchResult from './SearchResult';
import { useNavigate } from 'react-router-dom';

function SearchInput({ disableBlur, className }) {
    const inputRef = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const [isShowSearchResult, setIsShowSearchResult] = useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    const navigate = useNavigate();

    const handleSearchValueChange = (e) => {
        const value = e.target.value;
        !value.startsWith(' ') && setSearchValue(value);
        if (value.trim()) {
            setIsShowSearchResult(true);
        } else {
            setIsShowSearchResult(false);
        }
    };

    const handleClearSearchValue = () => {
        setSearchValue('');
        inputRef.current.focus();
        setIsShowSearchResult(false);
    };

    const focusHandle = (e) => {
        const value = e.target.value;
        value.trim() && setIsShowSearchResult(true);
    };

    const blurHandle = () => {
        !disableBlur && setIsShowSearchResult(false);
    };

    const handleNavigateSearch = () => {
        if (searchValue.trim()) {
            setSearchValue('');
            inputRef.current.blur();
            navigate(`/search?q=${searchValue}`);
        }
    };

    const handleGoToDetails = () => {
        setSearchValue('');
        inputRef.current.blur();
    };

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
        } else {
            setIsLoading(true);
            axiosGet('/search', {
                params: {
                    q: debounceValue.trim(),
                },
            }).then((data) => {
                const result = data.data.length > 6 ? data.data.slice(0, 8) : data.data;
                setSearchResult(result);
                setIsLoading(false);
            });
        }
    }, [debounceValue]);

    return (
        <div className={clsx('flex-1 flex justify-center md:hidden', className)}>
            <div className="relative flex m-auto w-[24rem] md:w-[90%]">
                <button
                    to={`/search?q=${searchValue}`}
                    className="flex items-center w-[3rem] p-r-4 rounded-l-full bg-background-2"
                    onClick={handleNavigateSearch}
                >
                    <AiOutlineSearch className="m-auto text-xl text-text-0" />
                </button>
                <div className="relative flex-1">
                    <input
                        ref={inputRef}
                        className="py-2 pl-0 pr-10 w-full rounded-full rounded-l-none outline-none bg-background-2 text-text-0 placeholder:text-text-1 peer"
                        type="text"
                        placeholder="Tìm truyện..."
                        value={searchValue}
                        onChange={handleSearchValueChange}
                        onFocus={focusHandle}
                        onBlur={blurHandle}
                        onKeyDown={(e) => e.key === 'Enter' && handleNavigateSearch()}
                    />

                    <button
                        className={clsx(
                            'peer-placeholder-shown:hidden absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] p-[0.25rem] transition-all',
                            {
                                '!hidden': isLoading,
                            },
                        )}
                        onClick={handleClearSearchValue}
                    >
                        <IoMdClose className="text-lg text-text-0" />
                    </button>

                    <div
                        className={clsx(
                            'hidden absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] p-[0.25rem] transition-all',
                            {
                                '!block': isLoading,
                            },
                        )}
                    >
                        <AiOutlineLoading3Quarters className="text-lg text-text-0  animate-spin" />
                    </div>
                </div>
                {isShowSearchResult && <SearchResult result={searchResult} handleGoToDetails={handleGoToDetails} />}
            </div>
        </div>
    );
}

export default memo(SearchInput);
