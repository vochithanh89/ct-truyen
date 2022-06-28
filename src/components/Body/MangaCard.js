import { Link } from 'react-router-dom';
import { removeMangaHistory } from '../functions/handleHistory';
import { IoCloseSharp } from 'react-icons/io5';
import { memo } from 'react';

function MangaCard({ type, handleGetHistory, mangaName, id, posterUrl, chapterName, chapterId, updatedAt }) {
    const handleRemoveManga = (id) => {
        removeMangaHistory(id);
        handleGetHistory();
    };

    return (
        <div className="w-1/5 lg:w-1/4 md:w-1/2 p-4 md:p-2">
            <div className="relative block pt-[160%] w-full overflow-hidden peer group">
                <Link className="absolute left-0 top-0 w-full h-full" title={mangaName} to={`/details/${id}`}>
                    <img className="h-full rounded-lg object-cover" src={posterUrl} alt={mangaName} />
                </Link>
                {type === 'history' && (
                    <button
                        onClick={() => {
                            handleRemoveManga(id);
                        }}
                        className="opacity-0 lg:opacity-100 group-hover:opacity-100 absolute top-2 right-2 p-[0.25rem] bg-primary rounded-full transition-all"
                    >
                        <IoCloseSharp className="text-xl text-text-0" />
                    </button>
                )}
            </div>
            <div className="text-center text-text-0 peer-hover:text-primary">
                <Link className="group" title={mangaName} to={`/details/${id}`}>
                    <h2 className="w-full pt-2 hover:text-primary line-clamp-1 transition">{mangaName}</h2>
                </Link>
                <Link title={chapterName} to={`/reading/${chapterId}`}>
                    <p className="text-text-1 text-sm line-clamp-1">
                        {type === 'history' || type === 'library' ? `Đọc tiếp ${chapterName}` : chapterName}
                    </p>
                    <p className="text-text-1 text-sm line-clamp-1 italic">{updatedAt}</p>
                </Link>
                <div></div>
            </div>
        </div>
    );
}

export default memo(MangaCard);
