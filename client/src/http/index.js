import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(
                    process.env.REACT_APP_API_URL + '/api/user/refresh',
                    { withCredentials: true }
                );
                localStorage.setItem('token', response.data.accessToken);
                return $authHost.request(originalRequest);
            } catch (e) {
                console.log('Not authorized');
            }
        }
        throw error;
    }
);

$host.interceptors.response.use(
    function (config) {
        return config;
    },
    async function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !originalRequest._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const { data } = await $authHost.get('api/user/refresh');
                localStorage.setItem('token', data.accessToken);
                return $host.request(originalRequest);
            } catch (err) {
                console.log('Not authorized');
            }
        }
        throw error;
    }
);

export {
    $host,
    $authHost
};
