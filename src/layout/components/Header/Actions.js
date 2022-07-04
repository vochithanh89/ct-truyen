import { Link, useLocation } from 'react-router-dom';

import { MdHistory } from 'react-icons/md';
import { BiLibrary } from 'react-icons/bi';
import FilterMenu from './FilterMenu';
import Menu from './Menu';

function Actions() {
    const { pathname } = useLocation();

    return (
        <div className="md:flex-1 flex justify-end pl-4">
            <Link
                to="/history"
                className="flex md:hidden items-center ml-2 px-4 py-[0.25rem] rounded-full bg-primary hover:bg-secondary text-white transition-all"
            >
                <MdHistory className="text-2xl" />
            </Link>
            <Link
                to="/library"
                className="flex md:hidden items-center ml-2 px-4 py-[0.25rem] rounded-full bg-primary hover:bg-secondary text-white transition-all"
            >
                <BiLibrary className="text-2xl" />
            </Link>
            {pathname === '/' && <FilterMenu />}
            <Menu />
        </div>
    );
}

export default Actions;
