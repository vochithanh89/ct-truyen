import { useEffect, useState } from 'react';
import MangaCard from '../MangaCard';
import { Link } from 'react-router-dom';
import { getLibrary } from '../../functions/handleLibrary';
import setTitlePage from '../../functions/setTitlePage';

function LibraryList() {
    const [library, setLibrary] = useState([]);

    useEffect(() => {
        handleGetLibrary();
        setTitlePage('Thư viện');
    }, []);

    const handleGetLibrary = () => {
        const library = getLibrary();
        setLibrary(library);
    };

    return (
        <div className="flex flex-wrap">
            {library.length > 0 ? (
                library.map((item, index) => {
                    return (
                        <MangaCard
                            key={index}
                            type="library"
                            handleGetLibrary={handleGetLibrary}
                            className="w-1/6"
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
                    <p className="text-text-1">Không có truyện nào trong thư viện</p>
                    <Link className="text-text-0 hover:text-primary transition" to="/">
                        Đọc ngay
                    </Link>
                </div>
            )}
        </div>
    );
}

export default LibraryList;
