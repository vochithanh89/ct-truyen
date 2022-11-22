import { useEffect, useRef, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

function ScrollTop() {
    const btnRef = useRef();

    const [currentHeight, setCurrentHeight] = useState(0);

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleShowHideBtn = () => {
            const scrollHeight = window.scrollY || document.documentElement.scrollTop;
            if (scrollHeight >= currentHeight || scrollHeight < 1500) {
                btnRef.current.classList.remove('!bottom-8', '!opacity-100');
                setCurrentHeight(scrollHeight);
            } else {
                btnRef.current.classList.add('!bottom-8', '!opacity-100');
                setCurrentHeight(scrollHeight);
            }
        };

        window.addEventListener('scroll', handleShowHideBtn);

        return () => window.removeEventListener('scroll', handleShowHideBtn);
        // eslint-disable-next-line
    });

    return (
        <button
            onClick={handleScrollTop}
            ref={btnRef}
            className="fixed bottom-1 opacity-0 right-8 p-4 rounded-full shadow-xl text-white bg-primary hover:bg-secondary transition-all"
        >
            <IoIosArrowUp className="text-lg" />
        </button>
    );
}

export default ScrollTop;
