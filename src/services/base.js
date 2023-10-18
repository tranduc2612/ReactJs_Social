import axios from 'axios'
import { removeAllKeyAuthentication } from '~/utils/contactWithLocalStorage';
import { useSelector } from 'react-redux'

export const BASE_URL_MEDIA = 'http://127.0.0.1:8000/api/media-file/'

const request = axios.create({
    // baseURL: 'https://api.escuelajs.co/api/v1',
    baseURL: 'http://127.0.0.1:8000/api',
});


export const Get = async (path, options = {},token) => {
    const res = await request.get(path,{
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data
}

export const Post = async (path, options = {},token) => {
    const res = await request.post(path, options,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data   
}

export const Put = async (path, options = {},token) => {
    const res = await request.put(path, {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data
}

export const Delete = async (path, options = {},token) => {
    const res = await request.delete(path, options,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data
}