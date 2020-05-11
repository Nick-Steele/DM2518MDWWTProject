import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
} from "react-native";
import renderIf from "../Helpers/renderIf";
export default class RemoveItem extends React.Component {

    constructor(props){
        super()
        this.state={
            modalVisible:false
        }
    }

    render(){
        return(
        <View style={styles.container}>
        <TextInput
            style={styles.itemQuantityInput}
            placeholder="Item Quatity "
            required
            keyboardType="default"
            maxLength={30}
            onChangeText={(itemNameValue) =>
            this.setState({ 
                itemName: itemNameValue, 
                modalVisible:true
            })
            }
        ></TextInput>

        {renderIf(this.state.modalVisible)(
            <View style={styles.modalContainer}>
              <View style={styles.modalCenterView}>
                {/*POP UP MODAL CONTENT : Currently works on phone, but looks like rubbish on the computer web browser. */}
                <Modal animationType="slide" transparent={true}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalContentTitleText}>
                      Enter the following
                    </Text>
                    <Text style={styles.enterQuantityText}>Enter Quantity:</Text>
                    <TextInput
                      style={styles.enterQuantityInputText}
                      placeholder="Quantity"
                      onChangeText={(quantityValue) => {
                        this.setState({ quantityInput: quantityValue });
                      }}
                    />
                    </View>
                      </Modal>
                      </View>
                      </View>)
        }
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    itemQuantityInput: {
        marginTop: 15,
        height: 40,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC",
      },})