import React,{useState,useEffect} from 'react'
import {Text,ScrollView, StyleSheet,View,FlatList,Dimensions} from 'react-native'
import colors from  '../constants/colors'
import GenreCard from '../components/GenreCard'
import MovieCard from '../components/MovieCard'
import ItemSeparator from '../components/ItemSeparator'
import fonts from '../constants/fonts'
import {getNowPlayingMovies,getUpComingMovies,getAllGenres } from '../services/MovieServices'
import axios from 'axios'


const HomeScreen =()=> {
  const [activeGenre,setActiveGenre] =useState("All")

  const [nowPlayingMovies,setNowPlayingMovies] =useState({})
  const [upComingMovies,setUpComingMovies] = useState({})
  const [genre,setGenre] = useState([{id:10110,name:'All'}])

  
  useEffect(()=>{
    getUpComingMovies().then((movieResponse) => setUpComingMovies(movieResponse.data))
      .catch((error) => {
        console.log("error is",error)
      })

      getNowPlayingMovies().then((movieResponse) => setNowPlayingMovies(movieResponse.data))
      .catch((error) => {
        console.log("error is",error)
      })

      getAllGenres().then((genreResponse) =>
      setGenre([...genre, ...genreResponse.data.genre])
    );

                    
     
      
  },[])


    // useEffect(()=> {
    //     axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=e3c66584508cdd5eabf16194f024f501")
    //     .then(movieResponse => setNowPlayingMovies(movieResponse.data))
    //   })


  const genres =['All',"horror","romantic",'drama','sc-fi','comedy']
// console.log(nowPlayingMovies)
  return(
    <ScrollView style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Now playing</Text>
      <Text style={styles.headerSubTitle}>View All</Text>
    </View>
    <View style={styles.genreListContainer}>
      <FlatList data={genre} 
                horizontal
                keyExtractor={(item)=>item.id.toString()} 
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={()=><ItemSeparator width={20}/>}
                ListHeaderComponent={()=> <ItemSeparator width={20}/>}
                ListFooterComponent={()=> <ItemSeparator width={20}/>}
                renderItem={({item,index}) =>  <GenreCard genreName={item.name}
                active={item.name === activeGenre ?true:false}
                onPress={setActiveGenre}/>
      }/>
    </View>
    <View>
    <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
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
              heartless={false}
            />
          )}
        />
                
    </View>
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Upcoming </Text>
      <Text style={styles.headerSubTitle}>View All</Text>
    </View>
    <FlatList
          data={upComingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
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
            />
          )}
        />
    </ScrollView>
  )
}
export default HomeScreen;
const styles = StyleSheet.create({
  container:{
    FLEX:1,
    backgroundColor:colors.BASIC_BACKGROUND
  },
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:10
  },
  headerTitle:{
    fontSize:28 ,
    fontFamily:fonts.Regular
  },
  headerSubTitle:{
    fontSize:13,
    color:colors.ACTIVE,
    fontFamily:fonts.SemiBold
  },
  genreListContainer:{
    padding:10
  }
  
})