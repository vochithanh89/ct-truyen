import clsx from 'clsx';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { mangaFiltersSelector } from '../../../components/redux/selectors';

function FilterItem({ data }) {
    const { filters } = useSelector(mangaFiltersSelector);

    const [searchParams, setSearchParams] = useSearchParams();
    const prevSearchParams = Object.fromEntries([...searchParams]);

    const [isShowMenu, setIsShowMenu] = useState(true);

    const handleShowMenu = () => {
        data.filtersValue.length > 8 && setIsShowMenu((pre) => !pre);
    };

    const handleFilter = (type, id) => {
        prevSearchParams[type] = id;
        setSearchParams(prevSearchParams);
    };

    return (
        <div className="lg:text-lg">
            <button onClick={handleShowMenu} className="w-full flex items-center justify-start text-primary">
                <h2 className="font-bold">{data.title}</h2>
                {data.filtersValue.length > 8 && <MdKeyboardArrowDown />}
            </button>
            <ul
                className={clsx('hidden scrollbar transition-all', {
                    '!block': isShowMenu,
                })}
            >
                {data.filtersValue.map((item, index) => {
                    return (
                        <li className="text-left mr-2" key={index}>
                            <button
                                onClick={(e) => handleFilter(data.id, item.id)}
                                className={clsx('w-full text-left text-text-1 transition-all', {
                                    '!text-text-0': item.id === filters[data.id],
                                })}
                            >
                                {item.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FilterItem;
