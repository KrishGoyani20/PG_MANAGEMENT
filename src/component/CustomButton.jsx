import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { screenWidth } from '../utils/Metrics'
import { checkIfConfigIsValid } from 'react-native-reanimated/lib/typescript/animation/springUtils'
export default function CustomButton({
    Bg,
    img,
    text,
    fun
}) {
    return (
        <TouchableOpacity style={[styles.Btn,{backgroundColor:Bg}]} onPress={()=>fun()}>
            {
                img == 'calendar-plus' ? <FontAwesome6 name='calendar-plus' size={24} color={'white'} />
                    : img == 'pluscircle' ? <AntDesign name='pluscircle' size={24} color={'white'} /> :
            <Image
                source={img}
                style={styles.ImageStyle}
            />
            }
            
            <Text style={styles.Text}>
                {
                    text
                }
            </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Btn:{
        flex:1,
        // width:'70%',
        height:50,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        gap:10
    },
    Text:{
        color:'#ffffff',
        fontWeight:'500',
        fontSize:15
    }
})

