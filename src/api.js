import axios from 'axios';
const DB_URL = 'https://nortcoders-news.herokuapp.com/api';

//Articles api request functions

export const getAllArticles = async () => axios.get(`${DB_URL}/articles`)

export const getArticlesByTopic = async (topic) => axios.get(`${DB_URL}/articles/topics/${topic}`)

export const getArticleById = async (articleId) => axios.get(`${DB_URL}/articles/${articleId}`)

export const getArticleCommentsById = async (articleId) => axios.get(`${DB_URL}/articles/${articleId}/comments`)

//Users api request functions

export const getAllUsers = async () => axios.get(`${DB_URL}/users`)

export const getUserByUsername = async (username) => axios.get(`${DB_URL}/users/${username}`)

//Topics api request functions

export const getTopics = async () => axios.get(`${DB_URL}/topics`)