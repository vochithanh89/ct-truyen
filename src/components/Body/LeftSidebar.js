import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { axiosGet } from '../../utils/request';
import FilterItem from './FilterItem';

function LeftSidebar({ className, onClick }) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        axiosGet('/filter').then((data) => {
            setResult(data.sort((first, second) => first.filtersValue.length - second.filtersValue.length));
        });
    }, []);

    return (
        <div
            onClick={onClick}
            style={{
                height: 'calc(100vh - 72px)',
            }}
            className={clsx(
                'flex flex-col scrollbar-overlay w-2/12 sticky top-[72px] p-4 lg:hidden md:hidden',
                className,
            )}
        >
            {result.map((filter, index) => {
                return <FilterItem key={index} data={filter} />;
            })}
        </div>
    );
}

export default LeftSidebar;
