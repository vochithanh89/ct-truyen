import { useEffect, useState } from 'react';
import { getHistory, removeAllHistory } from '../functions/handleHistory';
import MangaCard from './MangaCard';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import setTitlePage from '../functions/setTitlePage';

function HistoryList() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        handleGetHistory();
        setTitlePage('Lịch sử');
    }, []);

    const handleGetHistory = () => {
        const history = getHistory();
        setHistory(history);
    };

    const handleRemoveAllHistory = () => {
        removeAllHistory();
        setHistory([]);
    };

    return (
        <div className="w-full lg:w-full md:w-full p-6 md:p-2 bg-background-2 rounded-xl">
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
            <div className="flex flex-wrap">
                {history.length > 0 ? (
                    history.map((item, index) => {
                        return (
                            <MangaCard
                                key={index}
                                type="history"
                                handleGetHistory={handleGetHistory}
                                mangaName={item.mangaName}
                                id={item.id}
                                posterUrl={item.posterUrl}
                                chapterName={item.currentChapter.chapterName}
                                chapterId={item.currentChapter.chapterId}
                            />
                        );
                    })
                ) : (
                    <div className="w-full mt-8 text-center text-xl">
                        <p className="text-text-1">Không có truyện nào trong lịch sử</p>
                        <Link className="text-text-0 hover:text-primary transition" to="/">
                            Đọc ngay
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HistoryList;
