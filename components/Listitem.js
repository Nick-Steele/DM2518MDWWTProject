import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements'
import { Popmenu } from "./Popmenu";
import { MenuTrigger, Menu } from "react-native-popup-menu";
const Listitem = (item, navigation)=>{

    return (
        <View style={styles.listItem}>            
            <View style={{width:'90%'}}>
                <TouchableOpacity
                onPress={() => {navigation.push("ItemScreen", {item: item})}}
                >
                    <View>
                        <View style={styles.icon}>
                            <View style={styles.itemAndAmount}>
                                <Text style={styles.listItemText}>{item.name}</Text>
                                <Text style={styles.amount}>{item.quantity}</Text>
                            </View>  
                        </View>
                        <View style={styles.listinfo}>
                            <Text>{item.date}</Text>
                            <Text>{item.category}</Text>
                            <Text>{item.storage}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.icon} style={{justifyContent: 'center'}}>
                <Menu>
                    <MenuTrigger style={{padding: 10, marginRight: -20}}>
                        <Icon
                        name="more-vert"
                        size={40}
                        color='#0a84ff'
                        />
                    </MenuTrigger>
                    {Popmenu(item.id)}
                </Menu>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem:{
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderColor:'#eee',
        height:80, 
        flex:1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    amount:{
        marginTop:13,
        //marginRight:45,
        marginLeft: 30,
        fontSize:15,
    },
    itemAndAmount: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
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