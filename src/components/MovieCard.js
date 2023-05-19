import React ,{useState} from "react";
import {Text,ScrollView, StyleSheet,View,FlatList ,Dimensions,TouchableOpacity, ImageBackground, Image, TouchableNativeFeedback} from 'react-native'
import colors from "../constants/colors";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import fonts from "../constants/fonts";
import images from "../constants/images";
const MovieCard =({title,language,poster,vote_count,vote_average})=>{
    const [liked,setLiked] = useState(false)
    return(
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.imdbContainer}>
                    <Image source={images.IMDB} resizeMode="cover" style={styles.imdbImage}/>
                    <Text style={styles.imdbRating}>{vote_average}</Text>
                    </View>
                    <TouchableNativeFeedback onPress={()=> setLiked(!liked)}>
                        <FontAwesome
                                 name={liked ? 'heart' :'heart-o'}
                                  size={25} color={liked ? colors.HEART : colors.WHITE} 
                                  style={{position:'absolute',bottom:10,left:10}}/>
                    </TouchableNativeFeedback>
            </View>
            <View>
                <Text style={styles.movieTitle} numberOfLines={3}>
                    URI - Surgical Strike 
                </Text>
                <View style={styles.movieSubTitleContainer}>
                    <Text style={styles.movieTitle}>Hindi | (u/a)</Text>
                    <View style={styles.rowAndCenter}>
                        <FontAwesome name='heart' size={17} color={colors.HEART} style={{ marginRight:5 }}/>
                        <Text>90%</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.ACTIVE,
        height:340,
        width:230,
        borderRadius:12,
        elevation:5,
        marginVertical:2
    },
    movieSubTitleContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    movieTitle:{
        fontFamily:fonts.ExtraBold,
        color:colors.GRAY,
        paddingVertical:2,
        marginTop:5,
        width:230
    },
    movieSubTitle:{
        fontSize:12,
        fontFamily:fonts.Regular
    },
    rowAndCenter:{
        flexDirection:'row',
        alignItems:'center'
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
export default MovieCard;