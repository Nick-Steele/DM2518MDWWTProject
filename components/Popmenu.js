import { MenuOptions,MenuOption} from 'react-native-popup-menu'
import React from "react";
import {Text, StyleSheet} from "react-native";
import {removeItem} from '../Helpers/ItemHelper'

export const Popmenu = (id)=> {
    return(
        <MenuOptions>
          <MenuOption onSelect={() => removeItem(id)} >
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