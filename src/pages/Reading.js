import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import ReadingPlace from '../components/Body/Reading/ReadingPlace';
import { useParams } from 'react-router-dom';
import ScrollTop from '../components/ScrollTop';

function Reading() {
    const { '*': id } = useParams();

    return (
        <>
            <Header type="relative" />
            <Body>
                <ReadingPlace id={id} />
                <ScrollTop />
            </Body>
        </>
    );
}

export default Reading;
