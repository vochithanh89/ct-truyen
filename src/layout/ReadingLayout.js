import Header from './components/Header/Header';
import ScrollTop from '../components/ScrollTop';

function ReadingLayout({ children }) {
    return (
        <>
            <Header type="relative" />
            <div className="flex-1 bg-background-1">
                <div style={{ minHeight: 'calc(100vh - 80px)' }} className="flex flex-warp">
                    {children}
                    <ScrollTop />
                </div>
            </div>
        </>
    );
}

export default ReadingLayout;
