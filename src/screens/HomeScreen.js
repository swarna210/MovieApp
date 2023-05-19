import React,{useState,useEffect} from 'react'
import {Text,ScrollView, StyleSheet,View,FlatList,Dimensions} from 'react-native'
import colors from  '../constants/colors'
import GenreCard from '../components/GenreCard'
import MovieCard from '../components/MovieCard'
import ItemSeparator from '../components/ItemSeparator'
import fonts from '../constants/fonts'
import {getNowPlayingMovies} from '../services/MovieServices'



const HomeScreen =()=> {
  const [activeGenre,setActiveGenre] =useState("All")
  const [nowPlayingMovies,setNowPlayingMovies] =useState({})
  useEffect(()=>{
    getNowPlayingMovies().then((movieResponse=> setNowPlayingMovies(movieResponse.data)))
  },[])
  const genres =['All',"horror","romantic",'drama','sc-fi','comedy']
  
  return(
    <ScrollView style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Now playing</Text>
      <Text style={styles.headerSubTitle}>View All</Text>
    </View>
    <View style={styles.genreListContainer}>
      <FlatList data={genres} 
                horizontal
                keyExtractor={(item)=>item} 
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={()=><ItemSeparator width={20}/>}
                ListHeaderComponent={()=> <ItemSeparator width={20}/>}
                ListFooterComponent={()=> <ItemSeparator width={20}/>}
                renderItem={({item,index}) =>  <GenreCard genreName={item}
                active={item === activeGenre ?true:false}
                onPress={setActiveGenre}/>
      }/>
    </View>
    <View>
      <FlatList data={nowPlayingMovies.results} 
                horizontal
                keyExtractor={(item)=>item.id.toString()} 
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={()=><ItemSeparator width={20}/>}
                ListHeaderComponent={()=> <ItemSeparator width={20}/>}
                ListFooterComponent={()=> <ItemSeparator width={20}/>}
                renderItem={({item})=> <MovieCard 
                                              title={item.title} 
                                              language={item.original_langauge} 
                                              voteAverage={item.vote_average} 
                                              voteCount={item.vote_count} 
                                              poster={item.poster_path}
                                              />}
                />
                
    </View>
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
    fontFamily:fonts.Bold 
  },
  genreListContainer:{
    padding:10
  }
  
})