import axios from 'axios';
const DB_URL = 'https://nortcoders-news.herokuapp.com/api';

//Articles api request functions

export const getAllArticles = () => axios.get(`${DB_URL}/articles`)

export const getArticlesByTopic = (topic) => axios.get(`${DB_URL}/articles/topics/${topic}`)

export const getArticleById = (articleId) => axios.get(`${DB_URL}/articles/${articleId}`)

export const getArticleCommentsById = (articleId) => axios.get(`${DB_URL}/articles/${articleId}/comments`)

export const voteArticle = (articleId, vote) => axios.patch(`${DB_URL}/articles/${articleId}?vote=${vote}`)

export const postArticle = (topic, article) => axios.post(`${DB_URL}/${topic}/articles`, article)

//Users api request functions

export const getAllUsers = () => axios.get(`${DB_URL}/users`)

export const getUserByUsername = (username) => axios.get(`${DB_URL}/users/${username}`)


//Topics api request functions

export const getTopics = () => axios.get(`${DB_URL}/topics`)

//Comment api request functions

export const addComment = (articleId, comment) => axios.post(`${DB_URL}/articles/${articleId}/comments`, comment)
  .catch(err => console.dir(err))

export const deleteComment = (commentId) => axios.delete(`${DB_URL}/comments/${commentId}`)