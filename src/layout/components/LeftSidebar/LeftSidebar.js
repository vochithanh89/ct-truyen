import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import useGetData from '../../../hooks/useGetData';
import { getFilter } from '../../../utils/api';
import FilterItem from './FilterItem';

function LeftSidebar({ className, onClick }) {
    const { data, isError, isSuccess } = useGetData('filter', getFilter);
    const navigate = useNavigate();

    if (isError) {
        navigate('/error');
    }

    return (
        <div
            onClick={onClick}
            style={{
                height: 'calc(100vh - 72px)',
            }}
            className={clsx(
                'w-2/12 flex flex-col scrollbar-overlay sticky top-[72px] p-4 lg:hidden md:hidden',
                className,
            )}
        >
            {isSuccess &&
                data.map((filter, index) => {
                    return <FilterItem key={index} data={filter} />;
                })}
        </div>
    );
}

export default LeftSidebar;
