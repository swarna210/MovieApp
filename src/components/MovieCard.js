import React ,{useState} from "react";
import {Text,ScrollView, StyleSheet,View,FlatList ,Dimensions,
    TouchableOpacity, ImageBackground, Image, TouchableNativeFeedback ,ActivityIndicator} from 'react-native'
import colors from "../constants/colors";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import fonts from "../constants/fonts";
import images from "../constants/images";
import {getPoster,getLanguage} from '../services/MovieServices'

const MovieCard =({
                title,
                language,
                voteAverage,
                voteCount,
                poster,
                size,
                heartless,
                onPress     
                })=>{
    const [liked,setLiked] = useState(false)
    const[voteCountValue,setVoteCountValue] = useState(voteCount)
    const [loading, setLoading] = useState(true);
    return(
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
             {/* {loading ?
             <ActivityIndicator size={'large'}/>:
          (<> */}
       <ImageBackground
                style={{... styles.container,width : 230 *size ,height:340*size}}
                imageStyle={{ borderRadius: 12 }}
                source={{ uri: getPoster(poster) }}
            >

                <View style={{ ... styles.imdbContainer ,paddingVertical:3 * size}}>
                    <Image source={images.IMDB} resizeMode="cover" 
                            style={{ ... styles.imdbImage,height:20 * size,width:50 * size }}/>
                    <Text style={{ ...styles.imdbRating,marginRight:50 * size,fontSize:14* size }}>{voteAverage}</Text>
                    </View>
                    {!heartless ?
                    <TouchableNativeFeedback
                    onPress={() => {
                      setLiked(!liked);
                      setVoteCountValue(
                        liked ? voteCountValue - 1 : voteCountValue + 1
                      );
                    }}
                  >
                    <FontAwesome
                                 name={liked ? 'heart' :'heart-o'}
                                  size={25 * size} color={liked ? colors.HEART : colors.WHITE} 
                                  style={{position:'absolute',bottom:10,left:10}}/>
                    </TouchableNativeFeedback>
                    : null}
            </ImageBackground>
            <View>
                <Text style={{ ...styles.movieTitle ,width:230*size}} numberOfLines={3}>
                    {title}
                </Text>
            <View style={styles.movieSubTitleContainer}>
                    <Text style={styles.movieSubTitle}>
                        {getLanguage(language).english_name}
                    </Text>
                    <View style={styles.rowAndCenter}>
                        <FontAwesome
                        name="heart"
                        size={17 * size}
                        color={colors.HEART}
                        style={{ marginRight: 5 }}
                        />
                        <Text style={styles.movieSubTitle}>{voteCountValue}</Text>
                        
                    </View>
                    </View>
            </View> 
            {/* </> )} */}
        </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
   
        container: {
            height: 340,
            width: 230,
            borderRadius: 12,
            elevation: 5,
            marginVertical: 2,
          },
    
    movieSubTitleContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    movieTitle:{
        fontFamily:fonts.ExtraBold,
        color:colors.GRAY,
        paddingVertical:2,
        marginTop:5,
    },
    movieSubTitle:{
        fontSize:12,
        fontFamily:fonts.Regular
    },
    rowAndCenter:{
        flexDirection:'row',
        alignItems:'center',
    },
    imdbContainer:{
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'flex-end',
        backgroundColor:colors.YELLOW,
        borderBottomLeftRadius:5,
        borderTopRightRadius:5,
        paddingVertical:3
    },
    imdbImage:{
        height:20,
        width:50,
        borderBottomLeftRadius:5,

    },
    imdbRating:{
        marginRight:5,
        color:colors.HEART,
        fontSize:14,
        fontFamily:fonts.ExtraBold
    }
})

MovieCard.defaultProps ={
    size : 1,
    heartless:true
}
export default MovieCard;