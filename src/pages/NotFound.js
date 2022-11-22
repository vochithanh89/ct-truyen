import Error from '../layout/components/Error';
import { Helmet } from 'react-helmet';
import { homeSlogan, siteName, title } from '../components/constants/constants';
import errImg from '../assets/image/SEO/404.jpg';

function NotFound() {
    return (
        <>
            <Helmet>
                <title>{`Có lỗi xảy ra - ${title}`}</title>
                <meta name="description" content={homeSlogan} />
                <meta property="og:title" content={`Có lỗi xảy ra - ${title}`} />
                <meta property="og:image" content={errImg} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={homeSlogan} />
            </Helmet>
            <Error />
        </>
    );
}

export default NotFound;
