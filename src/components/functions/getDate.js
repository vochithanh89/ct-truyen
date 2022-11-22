function getDate() {
    const today = new Date();

    const day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
    const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
    const year = today.getFullYear();

    const date = `${day}/${month}/${year}`;
    return date;
}

export default getDate;
