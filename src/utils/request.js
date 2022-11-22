import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_API_PATH,
});

export const axiosGet = async (path, options) => {
    try {
        const res = await request(path, options);
        return res.data;
    } catch (error) {
        throw new Error();
    }
};
