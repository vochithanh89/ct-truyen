import { useNavigate, useParams } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import { getMangaDetails } from '../utils/api';
import MangaDetails from '../components/Details/MangaDetails';
import { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { detailsSlogan, siteName, title } from '../components/constants/constants';

function Details() {
    const { '*': id } = useParams();

    const navigate = useNavigate();
    const { data, isError, isSuccess } = useGetData(id, getMangaDetails, id);

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
            {isSuccess && (
                <Helmet>
                    <title>{`${data.mangaName} - ${title}`}</title>
                    <meta name="description" content={`Đọc truyện ${data.mangaName} ${detailsSlogan}`} />
                    <meta property="og:title" content={`Đọc truyện ${data.mangaName} tại ${siteName}`} />
                    <meta property="og:image" content={`http:${data.posterUrl}`} />
                    <meta property="og:site_name" content={siteName} />
                    <meta property="og:url" content={window.location.href} />
                    <meta property="og:description" content={`Đọc truyện ${data.mangaName} ${detailsSlogan}`} />
                </Helmet>
            )}
            <MangaDetails data={data} />
        </>
    );
}

export default Details;
