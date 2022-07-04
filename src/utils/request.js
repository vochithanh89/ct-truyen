import axios from 'axios';

const request = axios.create({
    baseURL: 'https://nettruyen-api.herokuapp.com',
});

export const axiosGet = async (path, options) => {
    try {
        const res = await request(path, options);
        return res.data;
    } catch (error) {
        throw new Error();
    }
};
