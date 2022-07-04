import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLibraryUpdate } from '../utils/api';
import { getUpdateChapter } from './functions/handleUpdateChapter';
import Image from './Image';
import LoadingIcon from './LoadingIcon/LoadingIcon';

function UpdateList() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const updateChapter = getUpdateChapter();
        setData(updateChapter);
        setIsLoading(true);
        getLibraryUpdate()
            .then(() => {
                const updateChapter = getUpdateChapter();
                setIsLoading(false);
                setData(updateChapter);
            })
            .catch(() => {
                navigate('/error');
            });
        // eslint-disable-next-line
    }, []);

    const renderChapter = () => {
        return data.map((item, index) => {
            return (
                <div key={index}>
                    <h2 className="my-2">{item.date}</h2>
                    <ul>
                        {item.data.map((chapter, index) => {
                            return (
                                <li className="flex items-center my-2 px-2 py-2 bg-background-2 rounded-xl" key={index}>
                                    <div className="w-16 h-16 rounded-full overflow-hidden">
                                        <Link to={`/details/${chapter.id}`}>
                                            <Image
                                                className="w-full !h-auto"
                                                src={chapter.posterUrl}
                                                alt={chapter.mangaName}
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <Link to={`/reading/${chapter.chapterId}`}>
                                            <h2 className="line-clamp-1">{chapter.mangaName}</h2>
                                            <p className="text-sm text-text-1">{chapter.chapterName}</p>
                                            <p className="text-sm text-text-1 italic">{chapter.updatedAt}</p>
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };

    const renderLoading = () => {
        return <LoadingIcon />;
    };

    return (
        <div className="flex flex-col max-w-3xl m-auto px-4 py-2 text-text-0 bg-background-3 rounded-lg">
            {isLoading && renderLoading()}
            {data.length > 0 ? (
                renderChapter()
            ) : (
                <div>
                    <h2 className="text-text-1 text-center text-lg">Không có truyện nào được cập nhật</h2>
                </div>
            )}
        </div>
    );
}

export default UpdateList;
