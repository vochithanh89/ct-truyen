import { getLibrary } from '../components/functions/handleLibrary';
import MangaList from '../components/MangaList';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import UpdateList from '../components/UpdateList';
import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';
import { homeSlogan, siteName, title } from '../components/constants/constants';
import homeImg from '../assets/image/SEO/home.jpg';

function Library() {
    const library = getLibrary();

    const [menu, setMenu] = useState('library');

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [menu]);

    const changeLibraryList = () => {
        setMenu('library');
    };
    const changeUpdateList = () => {
        setMenu('update');
    };

    return (
        <>
            <Helmet>
                <title>{`Thư viện - ${title}`}</title>
                <meta name="description" content={homeSlogan} />
                <meta property="og:title" content={`Thư viện - ${title}`} />
                <meta property="og:image" content={homeImg} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={homeSlogan} />
            </Helmet>
            <div style={{ minHeight: 'calc(100vh - 80px)' }} className="w-full p-6 md:p-2 bg-background-2 rounded-xl">
                <div className="flex text-text-0">
                    <button
                        onClick={changeLibraryList}
                        className={clsx(
                            'my-4 mx-2 px-[0.125rem text-lg md:text-base border-b-2 border-solid border-transparent font-bold transition-all',
                            {
                                '!border-primary text-primary': menu === 'library',
                            },
                        )}
                    >
                        Thư viện
                    </button>
                    <button
                        onClick={changeUpdateList}
                        className={clsx(
                            'my-4 mx-2 px-[0.125rem] text-lg md:text-base border-b-2 border-solid border-transparent font-bold transition-all',
                            {
                                '!border-primary text-primary': menu === 'update',
                            },
                        )}
                    >
                        Cập nhật
                    </button>
                </div>

                {menu === 'library' ? (
                    library.length > 0 ? (
                        <MangaList data={library} type="library" />
                    ) : (
                        <div className="w-full mt-8 text-center text-xl">
                            <p className="text-text-1">Không có truyện nào trong thư viện</p>
                            <Link className="text-text-0 hover:text-primary transition" to="/">
                                Đọc ngay
                            </Link>
                        </div>
                    )
                ) : (
                    <UpdateList />
                )}
            </div>
        </>
    );
}

export default Library;
