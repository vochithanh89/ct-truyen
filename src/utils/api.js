import getDate from '../components/functions/getDate';
import { getHistory } from '../components/functions/handleHistory';
import { getLibrary, updateNewLibrary } from '../components/functions/handleLibrary';
import { addUpdateChapter } from '../components/functions/handleUpdateChapter';
import { axiosGet } from './request';

export const getMangaList = async (page = 1, filters = {}) => {
    const mangaList = await axiosGet('/list', {
        params: {
            page,
            ...filters,
        },
    });

    return mangaList;
};

export const getSearchResult = async (page = 1, keyword) => {
    const mangaList = await axiosGet('/search', {
        params: {
            q: keyword?.trim(),
            page,
        },
    });

    return {
        title: 'Tìm truyện tranh',
        ...mangaList,
    };
};

export const getMangaDetails = async (mangaId) => {
    const chapterDetails = await axiosGet(`/details/${mangaId}`);
    const firstChapter = chapterDetails.chapters[chapterDetails.chapters.length - 1];
    const lastChapter = chapterDetails.chapters[0];
    const history = getHistory();
    const library = getLibrary();
    const isInLibrary = library.some((item) => item.id === mangaId);
    const currentChapter =
        history.find((item) => item.id === mangaId)?.currentChapter ||
        library.find((item) => item.id === mangaId)?.currentChapter;
    return {
        title: chapterDetails.mangaName,
        ...chapterDetails,
        currentChapter: currentChapter ? currentChapter : null,
        isInLibrary,
        firstChapter,
        lastChapter,
    };
};

export const getChapter = async (chapterId) => {
    const chapter = await axiosGet(`/chapter/${chapterId}`);
    const mangaDetails = await axiosGet(`/details/${chapter.id}`);
    const chapters = mangaDetails.chapters.reverse();
    const prevChapter = chapters.find((item, index, chapters) => chapters[index + 1]?.chapterId === chapterId);
    const nextChapter = chapters.find((item, index, chapters) => chapters[index - 1]?.chapterId === chapterId);
    const { mangaName, posterUrl } = mangaDetails;
    return {
        title: `${mangaName} ${chapter.currentChapter.chapterName}`,
        ...chapter,
        chapters,
        prevChapter: prevChapter ? prevChapter : null,
        nextChapter: nextChapter ? nextChapter : null,
        posterUrl,
    };
};

export const getLibraryUpdate = async () => {
    const library = getLibrary();
    if (library.length > 0) {
        const requestChapterDetailsList = library.map((item) => axiosGet(`/details/${item.id}`));
        let updateLibrary = await Promise.all(requestChapterDetailsList);
        const newUpdate = [];
        updateLibrary.forEach((item, index) => {
            const updateLibraryChapters = item.chapters;
            const libraryChapters = library[index].chapters.reverse();
            if (updateLibraryChapters.length > libraryChapters.length) {
                updateLibraryChapters.forEach((chapter, index) => {
                    const isIncludes = libraryChapters.some((item) => item.chapterId === chapter.chapterId);
                    !isIncludes &&
                        newUpdate.push({
                            mangaName: item.mangaName,
                            id: item.id,
                            posterUrl: item.posterUrl,
                            chapterName: chapter.chapterName,
                            chapterId: chapter.chapterId,
                            updatedAt: chapter.updatedAt,
                            viewCount: chapter.viewCount,
                        });
                });
                library[index].chapters = updateLibraryChapters;
            }
        });
        if (newUpdate.length > 0) {
            addUpdateChapter({ date: getDate(), data: newUpdate });
            updateNewLibrary(library);
        }
    }
};

export const getFilter = async () => {
    const filter = await axiosGet('/filter');
    return filter;
};
