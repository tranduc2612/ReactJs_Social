import axios from 'axios'

const request = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1',
});


export const get = async (path, options = {}) => {
    const res = await request.get(path, options);
    return res.data
}

export const post = async (path, options = {}) => {
    console.log(options)
    const res = await request.post(path, options);
    return res.data
}