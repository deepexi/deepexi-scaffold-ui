import axios from './axios'

export const getScaffoldsList = () => axios.get('/scaffolds')
export const updateScaffolds = id => axios.put(`/scaffolds/${id}`)
export const deleteScaffolds = id => axios.delete(`/scaffolds/${id}`)
export const installScaffolds = id => axios.post(`/scaffolds`, { data: { id } })
export const getScaffolds = id => axios.get(`/scaffolds/${id}`)
export const generateScaffolds = ({ id, data }) => axios.post(`/scaffolds/${id}/generate`, { data })
export const login = data => axios.post(`/scaffolds/user/login`, { data })
export const loginOut = data => axios.delete(`/scaffolds/user/logout`, { data })
