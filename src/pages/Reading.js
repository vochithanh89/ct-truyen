import { useParams } from 'react-router-dom';
import ReadingPlace from '../components/Reading/ReadingPlace';

function Reading() {
    const { '*': id } = useParams();

    return (
        <>
            <ReadingPlace id={id} />
        </>
    );
}

export default Reading;
