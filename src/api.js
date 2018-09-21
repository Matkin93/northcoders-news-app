import axios from 'axios';
const DB_URL = 'https://nortcoders-news.herokuapp.com/api';

//Articles api request functions

export const getAllArticles = async () => axios.get(`${DB_URL}/articles`)

export const getArticlesByTopic = async (topic) => axios.get(`${DB_URL}/articles/topics/${topic}`)

export const getArticleById = async (articleId) => axios.get(`${DB_URL}/articles/${articleId}`).catch(err => { throw err })

export const getArticleCommentsById = async (articleId) => axios.get(`${DB_URL}/articles/${articleId}/comments`)

export const voteArticle = async (articleId, vote) => axios.patch(`${DB_URL}/articles/${articleId}?vote=${vote}`).then(console.log)

export const addComment = async (articleId, comment) => axios.post(`${DB_URL}/articles/${articleId}/comments`, {
  body: comment.body,
  belongs_to: comment.belongs_to,
  created_by: comment.created_by
})

//Users api request functions

export const getAllUsers = async () => axios.get(`${DB_URL}/users`)

export const getUserByUsername = async (username) => axios.get(`${DB_URL}/users/${username}`)

//Topics api request functions

export const getTopics = async () => axios.get(`${DB_URL}/topics`)