import clsx from 'clsx';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { mangaFiltersSelector } from '../redux/selectors';
import { mangaFiltersSlice } from '../redux/mangaFiltersSlice';

function FilterItem({ data }) {
    const dispatch = useDispatch();

    const { filters } = useSelector(mangaFiltersSelector);

    const [isShowMenu, setIsShowMenu] = useState(true);

    const handleShowMenu = () => {
        setIsShowMenu((pre) => !pre);
    };

    const handleFilter = (type, value) => {
        const action = `${type}Change`;
        dispatch(mangaFiltersSlice.actions[action](value));
    };

    return (
        <div className="select-none">
            <button onClick={handleShowMenu} className="w-full flex items-center justify-start text-primary">
                <h2 className="font-bold">{data.title}</h2>
                <MdKeyboardArrowDown />
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
                                onClick={() => handleFilter(data.id, item.id)}
                                className={clsx('text-left text-text-1 transition-all', {
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
