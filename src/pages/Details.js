import { useNavigate, useParams } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import { getMangaDetails } from '../utils/api';
import MangaDetails from '../components/Details/MangaDetails';
import { useEffect } from 'react';

function Details() {
    const { id } = useParams();

    const navigate = useNavigate();
    const { data, isError } = useGetData(id, getMangaDetails, id);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [id]);

    if (isError) {
        navigate('/error');
    }

    return (
        <>
            <MangaDetails data={data} />
        </>
    );
}

export default Details;
