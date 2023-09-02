import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
    const { data } = await $host.post(
        'api/user/registration',
        { email, password, role: 'USER' }
    );
    localStorage.setItem('token', data.accessToken);
    return jwt_decode(data.refreshToken);
};

export const login = async (email, password) => {
    const { data } = await $host.post(
        'api/user/login',
        { email, password }
    );
    localStorage.setItem('token', data.accessToken);
    return jwt_decode(data.refreshToken);
};

export const check = async () => {
    try {
        const { data } = await $authHost.get('api/user/refresh');
        localStorage.setItem('token', data.accessToken);
        return { user: jwt_decode(data.refreshToken), basket: data.basket };
    } catch (e) {
        console.log('[http/userApi/check]:', e.response.data?.message);
    }
};

export const logout = async () => {
    const res = await $authHost.post('api/user/logout');
    localStorage.removeItem('token');
    return res;
};
