import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const publicEndpoints = ['/auth/register', '/auth/login', '/services']
        const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint))

        const token = localStorage.getItem('token')

        if (token && token !== 'undefined' && token !== 'null' && token.length > 10) {
            config.headers.Authorization = `Bearer ${token}`
            console.log('Intercepteur - Header Authorization ajouté pour:', config.url)
        } else if (!isPublicEndpoint) {
            console.log('Intercepteur - Token manquant pour endpoint protégé:', config.url)
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.post('/auth/refresh-token')
}

export const servicesService = {
    getAll: () => api.get('/services'),
    getById: (id) => api.get(`/services/${id}`)
}

export const reservationsService = {
    create: (reservation) => api.post('/reservations', reservation),
    getMyReservations: () => api.get('/reservations/my'),
    getById: (id) => api.get(`/reservations/${id}`),
    cancel: (id) => api.put(`/reservations/${id}/cancel`),
    getBetween: (start, end) => api.get(`/reservations/between?start=${start}&end=${end}`)
}

export const userService = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (userData) => api.put('/users/profile', userData)
}

export default api
