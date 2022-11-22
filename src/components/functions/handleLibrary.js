import { getHistory } from './handleHistory';

export const getLibrary = () => {
    const library = JSON.parse(localStorage.getItem('library'));
    return library ? library : [];
};

export const addMangaToLibrary = (data) => {
    const library = getLibrary();
    const history = getHistory();
    const currentChapter =
        history.find((item) => item.id === data.id)?.currentChapter || data.chapters[data.chapters.length - 1];

    const myData = library.filter((item) => {
        return item.id !== data.id;
    });
    myData.unshift({ ...data, currentChapter });
    localStorage.setItem('library', JSON.stringify(myData));
};

export const updateCurrentChapterLibrary = (id, currentChapter) => {
    const library = getLibrary();
    const manga = library.find((item) => item.id === id || item.id + '0' === id);
    if (manga) {
        manga.currentChapter = currentChapter;
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

export const updateNewLibrary = (newLibrary) => {
    localStorage.setItem('library', JSON.stringify(newLibrary));
};
