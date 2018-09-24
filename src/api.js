import axios from 'axios';
const DB_URL = 'https://nortcoders-news.herokuapp.com/api';

//Articles api request functions

export const getAllArticles = async () => axios.get(`${DB_URL}/articles`)

export const getArticlesByTopic = async (topic) => axios.get(`${DB_URL}/articles/topics/${topic}`).catch(err => { throw err })

export const getArticleById = async (articleId) => axios.get(`${DB_URL}/articles/${articleId}`).catch(err => { throw err })

export const getArticleCommentsById = async (articleId) => axios.get(`${DB_URL}/articles/${articleId}/comments`)

export const voteArticle = async (articleId, vote) => axios.patch(`${DB_URL}/articles/${articleId}?vote=${vote}`).then(console.log)

//Users api request functions

export const getAllUsers = async () => axios.get(`${DB_URL}/users`)

export const getUserByUsername = async (username) => axios.get(`${DB_URL}/users/${username}`)
  .catch(err => { throw err })

//Topics api request functions

export const getTopics = async () => axios.get(`${DB_URL}/topics`)

//Comment api request functions

export const addComment = async (articleId, comment) => axios.post(`${DB_URL}/articles/${articleId}/comments`, comment)
  .catch(err => console.dir(err))

export const deleteComment = async (commentId) => axios.delete(`${DB_URL}/comments/${commentId}`).catch(err => { throw err })