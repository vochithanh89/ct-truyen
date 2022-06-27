import Container from '../Container';

function Body({ children }) {
    return (
        <div className="bg-background-1">
            <Container>
                <div style={{ minHeight: 'calc(100vh - 72px)' }} className="flex flex-warp">
                    {children}
                </div>
            </Container>
        </div>
    );
}

export default Body;
