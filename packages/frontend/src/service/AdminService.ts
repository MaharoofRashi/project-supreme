import axios from '../constants/axios'

export const login = (data)=>{    
    return axios.post('/api/users/login', data)
}
export const getRefreshToken = (refreshToken: string | null) => {
    return axios.post('/refresh', {refreshToken: refreshToken})
  }