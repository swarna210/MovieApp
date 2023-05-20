import React,{useEffect,useState} from 'react'
import {getPoster} from '../services/MovieServices'
import  colors from '../constants/colors'
import fonts from '../constants/fonts'
import {
      Text,
      ScrollView, 
      StyleSheet, 
      StatusBar, 
      Image,
      View, 
      Dimensions,
      TouchableOpacity,
      Linking
    } from 'react-native'
import IMAGES from '../constants/images'

    const CastCard = ({OriginalName,image,CharacterName}) =>{
        return(
            <View style={styles.container}>
                <Image source={image ?{ uri:getPoster(image)}:IMAGES.NO_IMAGE} resizeMode={image?'cover':'contain'} style={styles.image}/>
                <Text style={styles.OriginalName}  numberOfLines={2}>{OriginalName}</Text>
                <Text style={styles.CharacterName} numberOfLines={2}>{CharacterName}</Text>
            </View>
        )
    }
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        height:120,
        width:80,
        borderRadius:10,
    },
    OriginalName:{
        width:80,
        color:colors.BLACK,
        fontFamily:fonts.Bold,
        fontSize:12
    },
    CharacterName:{
        width:80,
        color:colors.LIGHT_GRAY,
        fontFamily:fonts.Bold,
        fontSize:10
    }
})
    export default CastCard;