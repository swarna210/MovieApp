import React,{useState,useEffect} from 'react'
import {Text,ScrollView, StyleSheet,View,FlatList,Dimensions,ActivityIndicator} from 'react-native'
import colors from  '../constants/colors'
import GenreCard from '../components/GenreCard'
import MovieCard from '../components/MovieCard'
import ItemSeparator from '../components/ItemSeparator'
import fonts from '../constants/fonts'
import {getNowPlayingMovies,getUpComingMovies,getAllGenres } from '../services/MovieServices'
import axios from 'axios'


const HomeScreen =({navigation})=> {
  const [activeGenre,setActiveGenre] =useState("All")

  const [nowPlayingMovies,setNowPlayingMovies] =useState({})
  const [upComingMovies,setUpComingMovies] = useState({})
  const [genres, setGenres] = useState([{ id: 10110, name: "All" }]);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    

      getNowPlayingMovies().then((movieResponse) => setNowPlayingMovies(movieResponse.data))

      
      
      setLoading(false)

      getUpComingMovies().then((movieResponse) => setUpComingMovies(movieResponse.data))
      .catch((error) => {
        console.log("error is",error)
      })
      getAllGenres().then((genreResponse) =>
      setGenres([...genres, ...genreResponse.data.genres])
    );

                    
     
      
  },[])
  return(
    <ScrollView style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Now playing</Text>
      <Text style={styles.headerSubTitle}>View All</Text>
    </View>
    <View style={styles.genreListContainer}>
      <FlatList data={ genres } 
                horizontal
                keyExtractor={(item)=>item.id.toString()} 
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={()=><ItemSeparator width={20}/>}
                ListHeaderComponent={()=> <ItemSeparator width={20}/>}
                ListFooterComponent={()=> <ItemSeparator width={20}/>}
                renderItem={({item,index}) => 
                 <GenreCard 
                 genreName={item.name}
                 active={item.name === activeGenre ? true : false}
                 onPress={setActiveGenre}
                  />
      }/>
    </View>
    <View>
      {loading ?
      ( <ActivityIndicator size="large"/>) :(
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
              onPress={()=> navigation.navigate("Movie",{movieId:item.id})}
            />
          )}
        /> 
      )}
                
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
              onPress={()=> navigation.navigate("Movie",{movieId:item.id})}
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