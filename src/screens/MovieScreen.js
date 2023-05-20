import React,{useEffect,useState} from 'react'

import {
      Text,
      ScrollView, 
      StyleSheet, 
      StatusBar, 
      Image,
      View, 
      Dimensions,
      TouchableOpacity,
      Linking,
      Share
    } from 'react-native'
import colors from '../constants/colors'
import  {getMovieById, getPoster,getVideo,getLanguage} from '../services/MovieServices'
import ItemSeparator from '../components/ItemSeparator'
import LinearGradient from 'react-native-linear-gradient';
import Feather   from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import fonts from  '../constants/fonts'
import CastCard from '../components/CastCard'
import MovieCard from '../components/MovieCard'
import {APPEND_TO_RESPONSE as AR} from '../constants/urls'
import { FlatList } from 'react-native-gesture-handler'
const {height,width} = Dimensions.get("screen")
const setHeight = (h)=> (height/100) *h
const setWidth = (w) => (width/100) *w


const MovieScreen = ({route,navigation}) => {
  const {movieId} =route.params
  const [movie,setMovie] = useState({})
  const [isCastSelected,setIsCastSelected] = useState(true)
  useEffect(() => {
      getMovieById(movieId,`${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR. SIMILAR}`).then((response) => setMovie(response.data))
  },[])
 
  return(
    <ScrollView  >
      <StatusBar style="light" />
      <LinearGradient  colors={["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]}
                startPoint={[0,0.3]}
                style={styles.linearGradient}/>
      <View style={styles.moviePosterImageContainer}>
        <Image 
            style={styles.moviePosterImage}
            source={{ uri: getPoster(movie.backdrop_path) }} 
            resizeMode='cover'/>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.goBack()}>
          <Feather name='chevron-left' size={35} color={colors.WHITE}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>Share.share({message:  `${movie?.title}\n\n${movie?.homepage}`})}>
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.playButton}  onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
      >
          <Ionicons name='play-circle-outline' size={70} color={colors.WHITE}/>
      </TouchableOpacity>
      <ItemSeparator height={setHeight(1)}/>
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}> {movie?.original_title}</Text>
        <View style={styles.row}>
          <FontAwesome name='heart' size={22} color={colors.HEART}/>
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map((genre) =>genre?.name)?.join(",")}|
        {movie?.runtime} Min
        </Text>
      <Text style={styles.genreText}>{getLanguage(movie?.original_language)?.english_name}</Text>
      <View style={styles.overViewContainer}>
        <Text style={styles.overviewTitle}>OverView</Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>setIsCastSelected(true)}>
              <Text style={{... styles.castSubMenu ,color: isCastSelected ? colors.BLACK:colors.LIGHT_GRAY}}>
                Cast</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>setIsCastSelected(false)}>
              <Text style={{... styles.castSubMenu ,color: isCastSelected ? colors.LIGHT_GRAY:colors.BLACK}}>Crew</Text>
          </TouchableOpacity>
        </View>
        <FlatList style={{ marginVertical:5 }}
              data={isCastSelected ? movie?.credits?.cast:  movie?.credits?.crew }
              keyExtractor={(item)=>item?.credit_id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={()=> <ItemSeparator width={20}/>}
              ItemSeparatorComponent={<ItemSeparator width={20}/>}
              ListFooterComponent={<ItemSeparator width={20}/>}
              renderItem={({item}) =>
              <CastCard 
                OriginalName={item?.name} 
                CharacterName={isCastSelected ?  item?.character :  item?.job}
                image={item?.profile_path}/>}/>
      </View>
      <Text style={styles.extraListTitle}>Recommented Movies</Text>
      <FlatList
              data={movie?.recommendations?.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item?.id?.toString()}
              ItemSeparatorComponent={() => <ItemSeparator width={20} />}
              ListHeaderComponent={() => <ItemSeparator width={20} />}
              ListFooterComponent={() => <ItemSeparator width={20} />}
              renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={()=> navigation.navigate("Movie",{movieId:item.id})}
            />
          )}
        />
          <Text style={styles.extraListTitle}>Similar Movies</Text>
          <FlatList
              data={movie?.similar?.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item?.id?.toString()}
              ItemSeparatorComponent={() => <ItemSeparator width={20} />}
              ListHeaderComponent={() => <ItemSeparator width={20} />}
              ListFooterComponent={() => <ItemSeparator width={20} />}
              renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={()=> navigation.navigate("Movie",{movieId:item.id})}
            />
          )}
        />
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
    height:setHeight(35),
    alignItems:'center',
    position:'absolute',
    left:setWidth((100-145)/2),
    top:0,
    borderBottomRightRadius:300,
    borderBottomLeftRadius:300,
    // elevation:8
  },
  linearGradient:{
    width:setWidth(100),
    height:setHeight(6),
    position:'absolute',
    top:0,
    elevation:9
  },
  headerContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,
    position:'absolute',
    right:0,
    left:0,
    top:50,
    elevation:20
  },
  headerText:{
    color:colors.WHITE,
    fontFamily:fonts.Bold,

  },
  playButton:{
    position:'absolute',
    top:110,
    left:setWidth(50) -70/2 ,
    elevation:10

  },
  movieTitleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,

  },
  movieTitle:{
    color:colors.BLACK,
    fontFamily:fonts.ExtraBold,
    fontSize:18,
    width:setWidth(60)
  },
  ratingText:{
    marginLeft:5,
    color:colors.BLACK,
    fontFamily:fonts.ExtraBold,
    fontSize:15
  },
  row:{
    flexDirection:'row',
    alignItems:'center'
  },
  genreText:{
    color:colors.LIGHT_GRAY,
    paddingHorizontal:20,
    paddingTop:5,
    fontFamily:fonts.Bold,
    fontSize:13
  },
  overViewContainer:{
    paddingHorizontal:20,
    paddingVertical:10,
    marginVertical:10,
    backgroundColor:colors.EXTRA_LIGHT_GRAY,
  },
  overviewTitle:{
    color:colors.BLACK,
    fontFamily:fonts.Bold,
    fontSize:18,

  },
  overviewText:{
    color:colors.GRAY,
    paddingVertical:5,
    fontFamily:fonts.Bold,
    fontSize:13,
    textAlign:'justify'
  },
  castTitle:{
    marginLeft:20,
    color:colors.BLACK,
    fontFamily:fonts.Bold,
    fontSize:18
  },
  castSubMenuContainer:{
    marginLeft:20,
    flexDirection:'row',
    marginVertical:5
  },
  castSubMenu:{
    marginRight:10,
    color:colors.BLACK,
    fontFamily:fonts.Bold,
    fontSize:13

  },
  extraListTitle:{
    marginLeft:20,
    color:colors.BLACK,
    fontFamily:fonts.Bold,
    fontSize:18,
    marginVertical:8
  },
  
})
export default MovieScreen ;