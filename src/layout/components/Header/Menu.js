import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdHistory } from 'react-icons/md';
import { BiLibrary, BiSearch } from 'react-icons/bi';
import Modal from '../../../components/Modal';
import clsx from 'clsx';
import useModal from '../../../hooks/useModal';

function Menu() {
    const { isOpen, toggle } = useModal();

    return (
        <>
            <button
                onClick={toggle}
                className="hidden md:flex items-center ml-2 px-2 py-[0.25rem] text-white active:text-primary transition-all"
            >
                <FiMenu className="text-2xl" />
            </button>
            <Modal className="bg-background-0 bg-opacity-60 lg:text-lg" isOpen={isOpen} toggle={toggle}>
                <div
                    className={clsx(
                        'absolute flex flex-col h-screen w-1/3 px-6 py-32 md:w-2/3 bg-background-2 text-text-0 translate-x-[-100%] transition-all duration-500',
                        {
                            '!translate-x-0': isOpen,
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
    );
}

export default Menu;
