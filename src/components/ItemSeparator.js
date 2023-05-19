import React from "react";
import {Text,ScrollView, StyleSheet,View,FlatList ,Dimensions} from 'react-native'
const ItemSeparator = ({height,width})=> {
    return(
        <View style={{ width,height }}>

        </View>
    )
}
ItemSeparator.defaultProps = {
    height:0,
    width:0
}
export default ItemSeparator;