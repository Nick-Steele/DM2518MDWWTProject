import React,{useState, useEffect} from "react";
import { View, Text, TouchableHighlight } from "react-native";
import {getItemFromItems} from "../Helpers/Item";
import Listitem from "../components/Listitem"
import { MenuTrigger, Menu, MenuProvider} from "react-native-popup-menu";


export default function StorageScreen({ navigation}) {
  const userid = "Qxnf4RiS1RwIXDQ0Ae1N"
  const [mat, setMat] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
      getItemFromItems(userid).then(x=>setMat(x))
      setTimeout(()=>{
        setLoading(false)
      },500)
  },[])

  console.log(mat)
  if(loading){
    console.log("loading true",mat)
    return(
      <View>
      <Text>StorageScreen</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.push("TestChildScreen");
        }}
      >
        {/* {mat.map(m=>Listitem(m))} */}
        <Text style={{ color: "#007AFF" }}>Yai</Text>
      </TouchableHighlight>
    </View>
    )
  }
  else{
  console.log("loading false",mat)
  return (
    <MenuProvider>
    <View>
      <Text>StorageScreen</Text>
      {mat.map(m=>Listitem(m))}
      <TouchableHighlight
        onPress={() => {
          navigation.push("TestChildScreen");
        }}
      >
      <Text style={{ color: "#007AFF" }}>Yai</Text>
      </TouchableHighlight>
    </View>
    </MenuProvider>
  );
  }
}
