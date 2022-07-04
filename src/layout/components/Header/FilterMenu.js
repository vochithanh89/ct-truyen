import Modal from '../../../components/Modal';
import { FiFilter } from 'react-icons/fi';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import clsx from 'clsx';
import useModal from '../../../hooks/useModal';

function FilterMenu() {
    const { isOpen, toggle } = useModal();

    return (
        <>
            <button
                onClick={toggle}
                className="hidden lg:flex items-center ml-2 px-2 py-[0.25rem] text-white active:text-primary transition-all"
            >
                <FiFilter className="text-2xl" />
            </button>
            <Modal className="bg-background-0 bg-opacity-60" isOpen={isOpen} toggle={toggle}>
                <LeftSidebar
                    className={clsx(
                        '!absolute !top-0 !bottom-0 !block !h-screen !w-1/3 md:!w-2/3 bg-background-2 translate-x-[-100%] transition-all duration-500',
                        {
                            '!translate-x-0': isOpen,
                        },
                    )}
                />
            </Modal>
        </>
    );
}

export default FilterMenu;
