// const axios = require("axios").default;
// import {
//     TMDB_BASE_URL,
//     TMDB_BASE_IMAGE_URL,
//     TMDB_API_KEY , 
//     END_POINTS
const axios = require("axios").default;
import {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
  ENDPOINTS,
  
} from "../constants/urls";
import LANGUAGES from '../constants/languages'
const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

const getNowPlayingMovies = () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES);

  const getUpComingMovies = () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES);

  const getAllGenres= () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

  const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;
  const getLanguage = (language_iso) =>
  LANGUAGES.find((language) => language.iso_639_1 === language_iso);


export {
  getNowPlayingMovies,
  getPoster,
  getLanguage,
  getUpComingMovies ,
  getAllGenres
};