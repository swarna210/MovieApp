const axios = require('axios').default
import {
    TMDB_BASE_URL,
    TMDB_BASE_IMAGE_URL,
    TMDB_API_KEY , 
    END_POINTS
} from '../constants/urls'

const TMDB_HTTP_REQUEST = axios.create({
    BASE_URL :  TMDB_BASE_URL,
    parma:{
        api_key: TMDB_API_KEY
    }
})
const getNowPlayingMovies = ()=>  TMDB_HTTP_REQUEST.get(END_POINTS)

const getPoster = (path)=> `${TMDB_BASE_IMAGE_URL}/original${path}`

// }

export {getNowPlayingMovies,getPoster}


