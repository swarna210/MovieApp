import React,{useEffect,useState} from 'react'

import {Text,ScrollView, StyleSheet, StatusBar, Image,View, Dimensions} from 'react-native'
import colors from '../constants/colors'
import  {getMovieById} from '../services/MovieServices'
const {height,width} = Dimensions.get("screen")
const setHeight = (h)=> (height/100) *h
const setWidth = (w) => (width/100) *w


const MovieScreen = ({route,navigation}) => {
  const {movieId} =route.params
  const [movie,setMovie] = useState({})
  useEffect(() => {
      getMovieById(movieId).then((response) => setMovie(response.data))
  },[])
 
  return(
    <ScrollView  >
      <StatusBar style="auto" />
      <View style={styles.moviePosterImageContainer}>
        {/* <Image source={} style={styles.moviePosterImage} resizeMode='cover'/> */}
        <Text>{movie.title}</Text>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.BASIC_BACKGROUND
  },
  moviePosterImageContainer:{
      height:setHeight(35),
      width:setWidth(145)
  },
  moviePosterImage:{
    borderBottomRightRadius:300,
    borderBottomLeftRadius:300,
    width:setWidth(145),
    height:setHeight(35)
  }
})
export default MovieScreen ;