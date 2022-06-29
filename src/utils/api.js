import { getHistory } from '../components/functions/handleHistory';
import { getLibrary } from '../components/functions/handleLibrary';
import { axiosGet } from './request';

export const getMangaList = async (page = 1, filters = {}) => {
    const mangaList = await axiosGet('/list', {
        params: {
            page,
            ...filters,
        },
    });

    const filterInfo = await axiosGet('/filter');
    const category = filterInfo.find((item) => item.id === 'category');
    const title = category.filtersValue.find((item) => item.id === filters.category).name;
    return {
        title,
        ...mangaList,
    };
};

export const getSearchResult = async (query, page) => {
    const mangaList = await axiosGet('/search', {
        params: {
            q: query.trim(),
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
