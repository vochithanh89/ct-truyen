import Header from './components/Header/Header';

function DetailsLayout({ children }) {
    return (
        <>
            <Header type="fixed" />
            <div className="flex-1 bg-background-1">{children}</div>
        </>
    );
}

export default DetailsLayout;
