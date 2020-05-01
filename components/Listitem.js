import React from "react";
import {View, Text, StyleSheet, FlatList } from "react-native";
import { Icon } from 'react-native-elements'
import { Popmenu } from "./Popmenu";
import { MenuTrigger, Menu } from "react-native-popup-menu";

const Listitem = (mat)=>{
    return (
        <View style={styles.listItem}>
                <View style={styles.icon}>
                    <Text style={styles.listItemText}>{mat.title}</Text>
                    <View style={styles.icon}>
                        <Text style={styles.amount}>{mat.amount+' unit'}</Text>
                        <Menu>
                        <MenuTrigger>
                            <Icon
                                name="more-vert"
                                size={35}
                                color='brown'
                                />
                        </MenuTrigger>
                        {Popmenu()}
                        </Menu>
                    </View>
                </View>
                <View style={styles.listinfo}>
                    <Text>{mat.date}</Text>
                    <Text>{mat.category}</Text>
                    <Text>{mat.location}</Text>
                </View>

        </View>
    )
}


const styles = StyleSheet.create({
    listItem:{
        backgroundColor: '#fff',
        borderBottomWidth:5,
        borderColor:'#eee',
        height:80, 
        flex:1,
    },
    icon:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    amount:{
        marginTop:10,
        marginRight:45,
        fontSize:15,
    },

    listItemText:{
        marginTop:10,
        marginLeft:2,
        fontSize:20,
    },

    listinfo:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 20,
        marginTop:10,
        marginBottom:10,
        marginLeft:2,
    },


})

export default Listitem