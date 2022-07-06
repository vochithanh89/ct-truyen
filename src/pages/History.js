import { useEffect, useState } from 'react';
import { getHistory, removeAllHistory } from '../components/functions/handleHistory';
import MangaList from '../components/MangaList';
import clsx from 'clsx';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { homeSlogan, siteName, title } from '../components/constants/constants';
import homeImg from '../assets/image/SEO/home.jpg';

function History() {
    const [history, setHistory] = useState(() => getHistory());

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const handleChangeList = () => {
        const newHistory = getHistory();
        setHistory(newHistory);
    };

    const handleRemoveAllHistory = () => {
        removeAllHistory();
        handleChangeList();
    };

    return (
        <>
            <Helmet>
                <title>{`Lịch sử - ${title}`}</title>
                <meta name="description" content={homeSlogan} />
                <meta property="og:title" content={`Lịch sử - ${title}`} />
                <meta property="og:image" content={homeImg} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={homeSlogan} />
            </Helmet>
            <div style={{ minHeight: 'calc(100vh - 80px)' }} className="w-full p-6 md:p-2 bg-background-2 rounded-xl">
                <h1 className="my-4 px-2 text-primary text-2xl md:text-xl font-bold">Lịch sử</h1>
                <div className="flex justify-end">
                    <button
                        onClick={handleRemoveAllHistory}
                        className={clsx('flex items-center text-primary hover:text-secondary text-lg transition', {
                            '!text-text-1': history.length === 0,
                        })}
                        disabled={history.length === 0}
                    >
                        <MdDeleteOutline className="mr-2 text-xl" />
                        Xoá tất cả
                    </button>
                </div>
                {history.length > 0 ? (
                    <MangaList data={history} type="history" handleChangeList={handleChangeList} />
                ) : (
                    <div className="w-full mt-8 text-center text-xl">
                        <p className="text-text-1">Không có truyện nào trong lịch sử</p>
                        <Link className="text-text-0 hover:text-primary transition" to="/">
                            Đọc ngay
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default History;
