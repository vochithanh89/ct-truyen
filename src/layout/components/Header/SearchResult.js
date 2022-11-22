import { memo } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';

function SearchResults({ result, handleGoToDetails }) {
    const preventInputFocus = (e) => {
        e.preventDefault();
    };

    const renderResultList = () => {
        return result.map((manga, index) => {
            return (
                <li className="p-[0.25rem]" key={index}>
                    <Link
                        to={`/details/${manga.id}`}
                        onClick={handleGoToDetails}
                        className="block p-4 rounded-lg bg-background-1"
                        title={manga.mangaName}
                    >
                        <div className="flex">
                            <Image className="w-1/5" src={manga.posterUrl} alt={manga.mangaName} />
                            <div className="w-4/5 flex flex-col pl-4 text-left">
                                <h3 className="text-text-0 truncate">{manga.mangaName}</h3>
                                <p className="text-text-1 text-sm">{manga.newestChapter.chapterName}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            );
        });
    };

    return (
        <div className="absolute left-0 right-0 top-full mt-2" onMouseDown={preventInputFocus}>
            <ul className="max-h-[40vh] md:max-h-[70vh] p-2 rounded-xl text-text-0 text-center bg-background-2 shadow-2xl scrollbar-overlay">
                {result.length > 0 ? renderResultList() : 'Không tìm thấy truyện nào...'}
            </ul>
        </div>
    );
}

export default memo(SearchResults);
