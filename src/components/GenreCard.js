import React  from "react";
import {Text,ScrollView, StyleSheet,View,FlatList ,Dimensions,TouchableOpacity} from 'react-native'
import colors from '../constants/colors'


const {height,width} = Dimensions.get('screen')
const setWidth = (w)=>(width/100) * w


const GenreCard = ({genreName,active,onPress}) =>{
    return(
        <TouchableOpacity 
                style={{ 
                    ...styles.container,
                    backgroundColor:active?colors.ACTIVE:colors.WHITE 
                }}
                activeOpacity={0.5}
                onPress={()=>onPress(genreName)}>
            <Text style={{ ...styles.genreText ,color:active ?colors.WHITE:colors.BLACK}}>{genreName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        color:colors.WHITE,
        paddingVertical:8,
        elevation:3,
        marginVertical:2,
        width:setWidth(25)
    },
    genreText:{
        fontSize:13,
        color:colors.ACTIVE
    }

    
})
export default GenreCard;