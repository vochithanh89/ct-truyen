import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { memo } from 'react';

function Modal({ children, className, isOpen = false, onClick }) {
    return ReactDOM.createPortal(
        <div
            onClick={onClick}
            className={clsx(
                'flex opacity-0 fixed invisible top-0 bottom-0 left-0 right-0 transition-all duration-300 z-50',
                className,
                {
                    '!opacity-100 !visible': isOpen,
                },
            )}
        >
            {children}
        </div>,
        document.querySelector('body'),
    );
}

export default memo(Modal);
