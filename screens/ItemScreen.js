import * as React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

function ItemScreen({route, navigation}) {
  const {item} = route.params;
  navigation.setOptions({
    title: "Item details",
    headerRight: () => (
      <View style={{marginRight:10}}>
        <TouchableOpacity 
        onPress={() => navigation.push("EditItem")}
        style={{padding: 10}}
        >
          <Text style={{color: '#0a84ff', fontSize: 18}}>Edit</Text>
        </TouchableOpacity>
      </View>
    ),
  });
    // test function
    // var foodlist = this.props.getItemFromItems(userid)
    // foodlist.then(x=>console.log("current food list:",x))
    // var searchitem = this.props.searchItemFromItems("potato")
    // searchitem.then(x=>console.log("search result:",x))
    // var newaddlist = this.props.addItemToItems(userid,item3)
    // newaddlist.then(x=>console.log("new add list:",x))
    // var newaddlist = this.props.addItemToItems(userid,item3)
    // newaddlist.then(x=>console.log("new add list:",x))
    // var newrmlist = this.props.removeItemFromItems(userid,editid)
    // newrmlist.then(x=>console.log("new remove list:",x))
    // var editlist = this.props.editItemInItems(userid,item3, editid)
    // editlist.then(x=>console.log("new edit list:",x))
    return (
      <View style={styles.container}>
        <View style={styles.innerView}>
          <View style={styles.itemNameAndType}>
            <Text style={styles.itemNameText}>NAME</Text>
            <Text style={styles.expiraryDateText}>{item.name}</Text>
          </View>
          <View style={styles.itemExpiryDate}>
            <Text style={styles.expiraryDateText}>Expiry</Text>
            <Text style={styles.expiraryDateText}>{item.expirydate}</Text>
          </View>
          <View style={styles.itemAmount}>
            <Text style={styles.itemAmountText}>Amount</Text>
            <Text style={styles.expiraryDateText}>{item.quantity}</Text>
          </View>

          <View style={styles.storage}>
            <Text style={styles.storageText}>Storage</Text>
            <Text style={styles.expiraryDateText}>{item.storage}</Text>
          </View>
        </View>

        <View style={styles.nestedButtons}>
          <Button style={styles.button} title="Wasted" color="#ff443a" onPress={() => {alert("Mark item as wasted")}}></Button>
          <Button style={styles.button} title="Used" color="#30d158" onPress={() => {alert("Mark item as used")}}></Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: 'center'
  },
  innerView: {
    marginTop: 60,
    marginBottom: 60,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  itemNameAndType: {
    padding:20,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  itemNameText: {
    fontSize: 20,
  },
  expiraryDateText: {
    fontSize: 20,
  },
  itemAmountText: {
    fontSize: 20,
  },
  storageText: {
    fontSize: 20,
  },
  itemExpiryDate: {
    padding:20,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  itemAmount: {
    padding:20,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  storage: {
    padding:20,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
    alignContent: 'center'
  },
  nestedButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 40
  }
});

export default ItemScreen;