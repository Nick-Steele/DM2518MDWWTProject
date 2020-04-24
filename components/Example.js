import {View, FlatList } from "react-native";
import React from "react";
import Listitem from './Listitem'

const TestData = {
    food:[
        {'title':'Cabbage', 'category':'vegetable','location':'Pantry', 'amount':1, 'date':'2020-04-17'},
        {'title':'Cabbage', 'category':'vegetable','location':'Pantry', 'amount':2, 'date':'2020-04-17'},
        {'title':'Cabbage', 'category':'vegetable','location':'Pantry', 'amount':3, 'date':'2020-04-17'},
        {'title':'Cabbage', 'category':'vegetable','location':'Pantry', 'amount':4, 'date':'2020-04-17'},
    ]
}

const ShowList = ()=>{
    return(
    <View style={{marginTop:30}}>
        <FlatList
            data={TestData.food}
            renderItem = {({item})=>{
                return Listitem(item)
            }}
        />
    </View>
    )
}

export default ShowList