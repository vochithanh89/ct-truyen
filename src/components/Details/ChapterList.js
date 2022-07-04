import { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ChapterList({ chapters }) {
    const [data, setData] = useState(chapters);
    const handleSortChapters = () => {
        setData((pre) => [...pre].reverse());
    };

    return (
        <div className="max-h-[70vh] w-full mb-4 p-4 md:p-2 rounded-lg bg-background-3 scrollbar">
            <table className="table-auto w-full text-white">
                <thead>
                    <tr>
                        <td className="font-bold p-2 w-5/12 sm:w-7/12">
                            <button
                                onClick={handleSortChapters}
                                className="flex items-center hover:text-primary transition"
                            >
                                Chapter
                                <FaSort className="ml-[0.25rem]" />
                            </button>
                        </td>
                        <td className="font-bold p-2 w-4/12 text-center sm:w-5/12">Cập nhật</td>
                        <td className="font-bold p-2 w-3/12 text-center sm:hidden">Xem</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((chapter, index) => {
                        return (
                            <tr key={index}>
                                <td className="flex p-2">
                                    <Link
                                        className="line-clamp-2 hover:text-primary"
                                        to={`/reading/${chapter.chapterId}`}
                                    >
                                        {chapter.chapterName}
                                    </Link>
                                </td>
                                <td className="text-center text-text-1 italic p-2">{chapter.updatedAt}</td>
                                <td className="text-center text-text-1 italic p-2 sm:hidden">{chapter.viewCount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ChapterList;
