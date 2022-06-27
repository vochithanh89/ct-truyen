import { Link, NavLink, useLocation } from 'react-router-dom';

import { MdHistory } from 'react-icons/md';
import { BiLibrary, BiSearch } from 'react-icons/bi';
import { FiFilter, FiMenu } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';

import Modal from '../Modal';
import LeftSidebar from '../Body/LeftSidebar';
import { useState } from 'react';
import clsx from 'clsx';

function Actions() {
    const [isShowFilter, setIsShowFilter] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);

    const { pathname } = useLocation();

    const handleOpenFilter = () => {
        setIsShowFilter(true);
    };

    const handleCloseFilter = () => {
        setIsShowFilter(false);
    };

    const handleOpenMenu = () => {
        setIsShowMenu(true);
    };

    const handleCloseMenu = () => {
        setIsShowMenu(false);
    };

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
            {pathname === '/' && (
                <button
                    onClick={handleOpenFilter}
                    className="hidden lg:flex items-center ml-2 px-2 py-[0.25rem] text-white active:text-primary transition-all"
                >
                    <FiFilter className="text-2xl" />
                </button>
            )}
            <button
                onClick={handleOpenMenu}
                className="hidden md:flex items-center ml-2 px-2 py-[0.25rem] text-white active:text-primary transition-all"
            >
                <FiMenu className="text-2xl" />
            </button>
            <>
                {/* Modal Filter */}
                <Modal onClick={handleCloseFilter} className="bg-background-0 bg-opacity-60" isOpen={isShowFilter}>
                    <LeftSidebar
                        onClick={(e) => e.stopPropagation()}
                        className={clsx(
                            '!block !static !h-screen !w-1/3 md:!w-1/2 bg-background-2 translate-x-[-100%] transition-all duration-500',
                            {
                                '!translate-x-0': isShowFilter,
                            },
                        )}
                    />
                </Modal>
                {/* Modal Menu */}
                <Modal onClick={handleCloseMenu} className="bg-background-0 bg-opacity-60" isOpen={isShowMenu}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={clsx(
                            'flex flex-col h-screen w-1/3 px-4 py-24 md:w-1/2 bg-background-2 text-text-0 translate-x-[-100%] transition-all duration-500',
                            {
                                '!translate-x-0': isShowMenu,
                            },
                        )}
                    >
                        <NavLink
                            className={(nav) =>
                                clsx('flex items-center py-2 text-md active:text-primary', {
                                    'text-primary': nav.isActive,
                                })
                            }
                            to="/"
                        >
                            <FaHome className="text-2xl mr-2" />
                            Trang chủ
                        </NavLink>
                        <NavLink
                            className={(nav) =>
                                clsx('flex items-center py-2 text-md active:text-primary', {
                                    'text-primary': nav.isActive,
                                })
                            }
                            to="/history"
                        >
                            <MdHistory className="text-2xl mr-2" />
                            Lịch sử
                        </NavLink>
                        <NavLink
                            className={(nav) =>
                                clsx('flex items-center py-2 text-md active:text-primary', {
                                    'text-primary': nav.isActive,
                                })
                            }
                            to="/library"
                        >
                            <BiLibrary className="text-2xl mr-2" />
                            Thư viện
                        </NavLink>
                        <NavLink
                            className={(nav) =>
                                clsx('flex items-center py-2 text-md active:text-primary', {
                                    'text-primary': nav.isActive,
                                })
                            }
                            to="/search"
                        >
                            <BiSearch className="text-2xl mr-2" />
                            Tìm kiếm
                        </NavLink>
                    </div>
                </Modal>
            </>
        </div>
    );
}

export default Actions;
