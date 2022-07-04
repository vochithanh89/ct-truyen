import MangaCard from './MangaCard';

function MangaList({ data, type, handleChangeList }) {
    const renderMangaList = () => {
        return data.map((manga, index) => {
            return (
                <MangaCard
                    key={index}
                    type={type}
                    handleChangeList={handleChangeList}
                    className="w-1/6"
                    mangaName={manga.mangaName}
                    id={manga.id}
                    posterUrl={manga.posterUrl}
                    chapterName={`Đọc tiếp ${manga.currentChapter.chapterName}`}
                    chapterId={manga.currentChapter.chapterId}
                />
            );
        });
    };

    return <div className="flex flex-wrap">{renderMangaList()}</div>;
}

export default MangaList;
