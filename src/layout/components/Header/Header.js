import clsx from 'clsx';

import Container from '../../../components/Container';
import Logo from './Logo';
import Actions from './Actions';
import SearchInput from './SearchInput';
import { useEffect, useRef } from 'react';

function Header({ type = 'sticky' }) {
    const headerRef = useRef();

    useEffect(() => {
        const handleHeaderChangeColor = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                headerRef.current.classList.add('!bg-background-1');
            } else {
                headerRef.current.classList.remove('!bg-background-1');
            }
        };

        if (type === 'fixed') {
            window.addEventListener('scroll', handleHeaderChangeColor);
        }
        return () => window.removeEventListener('scroll', handleHeaderChangeColor);
        // eslint-disable-next-line
    }, []);

    return (
        <div
            ref={headerRef}
            className={clsx('w-screen fixed bg-transparent top-0 transition-all duration-500 z-50', {
                '!sticky !bg-background-1': type === 'sticky',
                '!relative !bg-background-1': type === 'relative',
            })}
        >
            <Container>
                <div className="flex items-center p-4">
                    <Logo />
                    <SearchInput />
                    <Actions />
                </div>
            </Container>
        </div>
    );
}

export default Header;
