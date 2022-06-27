import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import { useParams } from 'react-router-dom';
import MangaDetails from '../components/Body/MangaDetails';

function Details() {
    const { id } = useParams();

    return (
        <>
            <Header />
            <Body>
                <MangaDetails id={id} />
            </Body>
        </>
    );
}

export default Details;
