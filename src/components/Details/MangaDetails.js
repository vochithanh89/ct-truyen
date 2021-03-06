import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import { IoPersonOutline } from 'react-icons/io5';
import { MdSignalWifiStatusbarNull } from 'react-icons/md';
import { FaListUl } from 'react-icons/fa';
import SkeletonLoading from '../SkeletonLoading';
import { addMangaToLibrary, removeMangaToLibrary } from '../functions/handleLibrary';
import Container from '../Container';
import ChapterList from './ChapterList';

function MangaDetails({ data }) {
    const [isInLibrary, setIsInLibrary] = useState(false);

    useEffect(() => {
        data && setIsInLibrary(data.isInLibrary);
    }, [data]);

    const handleAddMangaToLibrary = (data) => {
        const { mangaName, id, posterUrl, chapters, updatedAt } = data;
        addMangaToLibrary({
            mangaName,
            id,
            posterUrl,
            chapters,
            updatedAt,
        });
        setIsInLibrary(true);
    };

    const handleRemoveMangaToLibrary = (id) => {
        removeMangaToLibrary(id);
        setIsInLibrary(false);
    };

    const renderDetails = () => {
        return (
            <div className="w-full flex items-center md:flex-col z-10">
                <div className="w-3/12 lg:w-4/12 md:w-8/12 md:mb-4 mr-12 md:mr-0 rounded-2xl overflow-hidden">
                    <div className="relative pt-[160%]">
                        <img
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            src={data.posterUrl}
                            alt={data.mangaName}
                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center text-text-0 z-[1]">
                    <h2 className="mb-6 text-2xl font-bold line-clamp-2">{data.mangaName}</h2>
                    <p className="mb-4 line-clamp-5 md:line-clamp-6">{data.description}</p>
                    <h3 className="flex items-center">
                        <IoPersonOutline className="font-bold text-lg mr-2" />
                        {`T??n t??c gi???: ${data.otherDetails.authorName}`}
                    </h3>
                    <h3 className="flex items-center">
                        <MdSignalWifiStatusbarNull className="font-bold text-lg mr-2" />
                        {`Tr???ng th??i: ${data.otherDetails.status}`}
                    </h3>
                    <h3 className="flex items-center mb-4">
                        <AiOutlineStar className="font-bold text-lg mr-2" />
                        {`X???p h???ng: ${data.otherDetails.ratingValue} (${data.otherDetails.ratingCount} b??nh ch???n)`}
                    </h3>
                    <div className="flex flex-wrap mb-4">
                        {data.categories.map((category, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={`/?category=${category.categoryId}`}
                                    className="px-[0.5rem] py-[0.25rem] mr-2 mb-2 border-2 border-solid border-white rounded-lg hover:border-primary hover:text-primary transition-all"
                                >
                                    {category.categoryName}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="flex flex-wrap">
                        {data.currentChapter && (
                            <Link
                                to={`/reading/${data.currentChapter.chapterId}`}
                                className="px-4 py-2 mr-2 mb-2 rounded-lg bg-primary hover:bg-secondary transition-all"
                                title={`?????c ti???p ${data.currentChapter.chapterName}`}
                            >
                                ?????c ti???p
                            </Link>
                        )}
                        <Link
                            to={`/reading/${data.firstChapter.chapterId}`}
                            className="px-4 py-2 mr-2 mb-2 rounded-lg bg-primary hover:bg-secondary transition-all"
                            title={data.firstChapter.chapterName}
                        >
                            ?????c t??? ?????u
                        </Link>
                        <Link
                            to={`/reading/${data.lastChapter.chapterId}`}
                            className="px-4 py-2 mr-2 mb-2 rounded-lg bg-primary hover:bg-secondary transition-all"
                            title={data.lastChapter.chapterName}
                        >
                            ?????c m???i nh???t
                        </Link>

                        {isInLibrary ? (
                            <button
                                onClick={() => handleRemoveMangaToLibrary(data.id)}
                                className="px-4 py-2 mr-2 mb-2 rounded-lg bg-primary hover:bg-secondary transition-all"
                            >
                                Xo?? kh???i th?? vi???n
                            </button>
                        ) : (
                            <button
                                onClick={() => handleAddMangaToLibrary(data)}
                                className="px-4 py-2 mr-2 mb-2 rounded-lg bg-primary hover:bg-secondary transition-all"
                            >
                                Th??m v??o th?? vi???n
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderSkeletonLoading = () => {
        return (
            <div className="w-full flex md:flex-col md:items-center">
                <div className="w-3/12 lg:w-4/12 md:w-8/12 md:mb-4 mr-12 md:mr-0 rounded-xl overflow-hidden">
                    <div className="relative pt-[160%]">
                        <SkeletonLoading className="absolute top-0 left-0" count={1} height="100%" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-6">
                        <SkeletonLoading count={1} height="1.5rem" width="60%" />
                    </div>
                    <div className="mb-4 line-clamp-5">
                        <SkeletonLoading count={4} />
                    </div>
                    <div className="flex items-center">
                        <SkeletonLoading count={1} width="15rem" />
                    </div>
                    <div className="flex items-center">
                        <SkeletonLoading count={1} width="15rem" />
                    </div>
                    <div className="flex items-center mb-4">
                        <SkeletonLoading count={1} width="15rem" />
                    </div>
                    <div className="flex flex-wrap items-center mb-4">
                        <SkeletonLoading className="mr-2 mb-2" count={1} height="1.8rem" width="8rem" />
                        <SkeletonLoading className="mr-2 mb-2" count={1} height="1.8rem" width="8rem" />
                        <SkeletonLoading className="mr-2 mb-2" count={1} height="1.8rem" width="8rem" />
                    </div>
                    <div className="flex flex-wrap">
                        <SkeletonLoading className="mr-2 mb-2" count={1} height="2rem" width="10rem" />
                        <SkeletonLoading className="mr-2 mb-2" count={1} height="2rem" width="10rem" />
                        <SkeletonLoading className="mr-2 mb-2" count={1} height="2rem" width="10rem" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            <div className="relative pt-24 pb-20">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-no-repeat bg-cover opacity-70 blur-xl before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b from-transparent to-background-1"
                        style={{ backgroundImage: `url('${data?.posterUrl}')` }}
                    ></div>
                </div>
                <Container>{data ? renderDetails() : renderSkeletonLoading()}</Container>
            </div>

            <Container>
                <h2 className="flex items-center mb-4 text-xl text-primary">
                    <FaListUl className="mr-2" />
                    Danh s??ch Chapter:
                </h2>
                {data?.chapters && <ChapterList chapters={data.chapters} />}
            </Container>
        </div>
    );
}

export default MangaDetails;
