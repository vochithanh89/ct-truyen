export const getUpdateChapter = () => {
    const updateChapter = JSON.parse(localStorage.getItem('updateChapter'));
    return updateChapter ? updateChapter : [];
};

export const addUpdateChapter = (data) => {
    const updateChapter = getUpdateChapter();

    const replaceItem = updateChapter.find((item) => item.date === data.date);

    const myData = updateChapter.filter((item) => item.date !== data.date);
    if (replaceItem) {
        replaceItem.data.unshift(...data.data);
        myData.unshift(replaceItem);
    } else {
        myData.unshift(data);
    }
    localStorage.setItem('updateChapter', JSON.stringify(myData));
};
