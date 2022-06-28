import { getHistory } from './handleHistory';

export const getLibrary = () => {
    const library = JSON.parse(localStorage.getItem('library'));
    return library ? library : [];
};

export const addMangaToLibrary = (data) => {
    const library = getLibrary();
    const history = getHistory();
    const chapterSeen =
        history.find((item) => item.id === data.id)?.chapterSeen || data.chapters[data.chapters.length - 1];

    const myData = library.filter((item) => {
        return item.id !== data.id;
    });
    myData.unshift({ ...data, chapterSeen });
    localStorage.setItem('library', JSON.stringify(myData));
};

export const updateChapterSeenLibrary = (id, chapterSeen) => {
    const library = getLibrary();
    const manga = library.find((item) => item.id === id || item.id + '0' === id);
    if (manga) {
        manga.chapterSeen = chapterSeen;
        const myData = library.filter((item) => item.id !== id && item.id + '0' !== id);
        myData.unshift(manga);
        localStorage.setItem('library', JSON.stringify(myData));
    }
};

export const removeMangaToLibrary = (id) => {
    const library = getLibrary();
    const myData = library.filter((item) => {
        return item.id !== id;
    });
    localStorage.setItem('library', JSON.stringify(myData));
};

export const updateLibrary = async () => {
    const library = getLibrary();
    if (library.length > 0) {
    }
};
