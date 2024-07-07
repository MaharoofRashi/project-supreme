export const login = (data)=>{
    return axios.post('/login')
}
export const getRefreshToken = (refreshToken: string | null) => {
    return axios.post('/user/refreshToken', {refreshToken: refreshToken})
  }