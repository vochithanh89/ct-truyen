import clsx from 'clsx';

import Container from '../Container';
import Logo from './Logo';
import Actions from './Actions';
import SearchInput from './SearchInput';

function Header({ isSticky = true }) {
    return (
        <div
            className={clsx('w-screen bg-background-1 sticky top-0 transition-all duration-[500] z-50', {
                '!relative': !isSticky,
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
