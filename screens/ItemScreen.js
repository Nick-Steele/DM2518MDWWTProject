import * as React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity,Modal,TextInput} from "react-native";
import {reduceItem} from '../Helpers/ItemHelper'
import renderIf from "../Helpers/renderIf";

function ItemScreen({ route, navigation }) {

  const [modalVisible, setVisble] = React.useState(false)
  const [Type, setType] = React.useState()
  const [Quality, setQuality] = React.useState(0)
  const { item } = route.params;

  navigation.setOptions({
    title: "Item details",
    headerRight: () => (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.push("EditItem")}
          style={{ padding: 10 }}
        >
          <Text style={{ color: "#0a84ff", fontSize: 18 }}>Edit</Text>
        </TouchableOpacity>
      </View>
    ),
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <View style={styles.itemNameAndType}>
          <Text style={styles.itemNameText}>Name</Text>
          <Text style={styles.itemNameTextValue}>{item.name}</Text>
        </View>
        <View style={styles.itemExpiryDate}>
          <Text style={styles.expiryDateText}>Expiry</Text>
          <Text style={styles.expiryDateTextValue}>{item.date}</Text>
        </View>
        <View style={styles.itemAmount}>
          <Text style={styles.itemAmountText}>Amount</Text>
          <Text style={styles.itemAmountTextValue}>{item.quantity}</Text>
        </View>

        <View style={styles.storage}>
          <Text style={styles.storageText}>Storage</Text>
          <Text style={styles.storageTextValue}>{item.storage}</Text>
        </View>
      </View>

      <View style={styles.nestedButtons}>
        <Button
          style={styles.button}
          title="Wasted"
          color="#ff443a"
          onPress={() => {
            setVisble(true)
            setType('wasted')
          }}
        ></Button>
        <Button
          style={styles.button}
          title="Used"
          color="#30d158"
          onPress={() => {
            setVisble(true)
            setType('used')
          }}
        ></Button>
      </View>
      
      {renderIf(modalVisible)(
            <View style={styles.modalContainer}>
              <View style={styles.modalCenterView}>
                {/*POP UP MODAL CONTENT : Currently works on phone, but looks like rubbish on the computer web browser. */}
                <Modal animationType="slide" transparent={true}>
                  <View style={styles.modalContent}>
                    <Text style={styles.enterQuantityText}>Enter Quantity:</Text>
                    <TextInput
                      style={styles.enterQuantityInputText}
                      placeholder="Quantity"
                      onChangeText={(x)=>setQuality(x)}
                    />
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Exit"
                      onPress={() => setVisble(false)}
                    ></Button>
                      <Button
                      title={Type}
                      onPress={
                        () => {
                        reduceItem(item.id, parseFloat(Quality), Type)
                        parseFloat(Quality)
                        setVisble(false)
                        var string= Type+' '+Quality+' '+item.name
                        alert(string);
                      }
                      }
                    ></Button>
                  </View>
                    </View>
                      </Modal>
                      </View>
                      </View>)
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
  },
  innerView: {
    marginTop: 60,
    marginBottom: 60,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  itemNameAndType: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  itemNameText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  expiryDateText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  itemAmountText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  storageText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  itemExpiryDate: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  itemAmount: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  storage: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
    alignContent: "center",
  },
  nestedButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 40,
  },
  modalContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalCenterView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    height: "50%",
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemCategoryText: {
    fontSize: 20,
  },
  modalContentTitleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  button: {
    flex: 1,
    maxWidth: 600,
    borderRadius: 20,
    margin: 5,
    paddingVertical: 30,
    paddingHorizontal: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
});

export default ItemScreen;
