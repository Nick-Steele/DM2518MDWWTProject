import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

const userid = "epiNTkmnMtVwKKbFuPHP";
const item1 = {
  name: "potato",
  category: "vegetable",
  amount: 2.3,
  location: "freeze",
  expiredate: "2020-03-01",
};
const item2 = {
  name: "tomato",
  category: "vegetable",
  amount: 0.3,
  location: "freeze",
  expiredate: "2020-03-02",
};
const item3 = {
  name: "carrot",
  category: "vegetable",
  amount: 0.3,
  location: "freeze",
  expiredate: "2020-03-03",
};
const editid = "IT9iLcaw7PUV4UP3cyZY";

class TestChildScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      fooddisplay: [],
    };
  }

  render() {
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
            <Text>####</Text>
          </View>
          <View style={styles.itemExpiryDate}>
            <Text style={styles.expiraryDateText}>Expiry</Text>
            <Text>####</Text>
          </View>
          <View style={styles.itemAmount}>
            <Text style={styles.itemAmountText}>Amount</Text>
            <Text>####</Text>
          </View>

          <View style={styles.storage}>
            <Text style={styles.storageText}>Storage</Text>
            <Text>####</Text>
          </View>
        </View>

        <View style={styles.nestedButtons}>
          <Button title="Edit"></Button>
          <Button title="Wasted"></Button>
          <Button title="Used"></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  innerView: {
    margin: 60,
  },
  itemNameAndType: {
    height: 60,
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
    height: 70,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  itemAmount: {
    height: 70,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  storage: {
    height: 70,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  nestedButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default TestChildScreen;
