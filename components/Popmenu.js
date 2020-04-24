import { MenuOptions,MenuOption} from 'react-native-popup-menu'
import React from "react";
import {Text, StyleSheet} from "react-native";


export const Popmenu = ()=> {
    return(
        <MenuOptions>
          <MenuOption onSelect={() => alert(`details`)}>
          <Text style={styles.option}>Details</Text> 
          </MenuOption>
          <MenuOption onSelect={() => console.log("removes")} >
            <Text style={styles.option} >Remove</Text>
          </MenuOption>
        </MenuOptions>
  )};

  const styles = StyleSheet.create({
      option:{
        marginTop:10, 
        fontSize:20
      }
  })