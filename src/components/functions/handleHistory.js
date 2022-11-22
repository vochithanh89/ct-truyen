export const getHistory = () => {
    const history = JSON.parse(localStorage.getItem('history'));
    return history ? history : [];
};

export const addMangaToHistory = (data) => {
    const history = getHistory();

    const myData = history.filter((item) => {
        return item.id !== data.id;
    });
    myData.unshift(data);
    localStorage.setItem('history', JSON.stringify(myData));
};

export const removeMangaHistory = (id) => {
    const history = getHistory();
    const myData = history.filter((item) => {
        return item.id !== id;
    });
    localStorage.setItem('history', JSON.stringify(myData));
};

export const removeAllHistory = () => {
    localStorage.setItem('history', JSON.stringify([]));
};
