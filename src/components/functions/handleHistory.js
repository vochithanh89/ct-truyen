export const getHistory = () => {
    const history = JSON.parse(localStorage.getItem('history'));
    return history ? history : [];
};

export const addMangaToHistory = (data) => {
    const history = JSON.parse(localStorage.getItem('history'));
    if (history) {
        const myData = history.filter((item) => {
            return item.id !== data.id;
        });
        myData.unshift(data);
        localStorage.setItem('history', JSON.stringify(myData));
    } else {
        localStorage.setItem('history', JSON.stringify([data]));
    }
};

export const removeMangaHistory = (id) => {
    const history = JSON.parse(localStorage.getItem('history'));
    const myData = history.filter((item) => {
        return item.id !== id;
    });
    localStorage.setItem('history', JSON.stringify(myData));
};

export const removeAllHistory = () => {
    localStorage.removeItem('history');
};
