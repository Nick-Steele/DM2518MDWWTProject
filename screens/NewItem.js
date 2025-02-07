import React from "react";
import { View, KeyboardAvoidingView, ScrollView, Text, StyleSheet, TextInput, Button, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import * as Item from "../Helpers/ItemHelper";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from 'react-native-datepicker'

const getTodaysDate = () => {
  return new Date().toISOString().slice(0,10).replace(/-/g,"");
}
import ExpireCalendar from "../components/calendar";

class NewItem extends React.Component {
  constructor({ navigation }){
    super()
    this.navigation = navigation;
    this.state = {
      itemName: "",
      itemQuantity: "",
      itemCategory: "fruit",
      itemStorage: "fridge",
      day: "",
      month: "",
      year: "",
      date: ""
    };

  }
  
  
  fetchDate = (date)=>{
    this.setState({selected:date})
  }

  render() {
    
    var itemCategoryProperties = [
      { label: "Fruit", value: "fruit" },
      { label: "Veg", value: "veg" },
      { label: "Meat", value: "meat" },
    ];

    var itemStorageProperties = [
      { label: "Fridge", value: "fridge" },
      { label: "Freezer", value: "freezer" },
      { label: "Pantry", value: "pantry" },
    ];

    return (
      <KeyboardAvoidingView 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.formWrapper}>
          {/* Item Name Input */}
          <TextInput
            style={styles.itemNameInput}
            placeholder="Item Name "
            required
            keyboardType="default"
            maxLength={30}
            onChangeText={(itemNameValue) =>
              this.setState({ itemName: itemNameValue })
            }
          ></TextInput>

          {/* Item Quantity Input */}
          <TextInput
            style={styles.itemQuantityInput}
            ref={this.state.quantity}
            placeholder="Item Quantity"
            keyboardType="number-pad"
            maxLength={30}
            onChangeText={(itemQuantityValue) =>
              this.setState({ itemQuantity: itemQuantityValue })
            }
          ></TextInput>

          {/* Item Category Input */}
          <Text style={styles.selectItemCategoryText}>Category:</Text>
          <RadioForm
            radio_props={itemCategoryProperties}
            formHorizontal={true}
            labelHorizontal={false}
            onPress={(categoryValue) => {
              this.setState({ itemCategory: categoryValue });
            }}
            radioStyle={{paddingRight: 20, paddingTop: 20}}
          />

          {/* Items Storage Location */}
          <Text style={styles.selectStorageLocationText}>
            Storage Location:
          </Text>
          <RadioForm
            radio_props={itemStorageProperties}
            formHorizontal={true}
            labelHorizontal={false}
            onPress={(storageValue) => {
              this.setState({ itemStorage: storageValue });
            }}
            radioStyle={{paddingRight: 20, paddingTop: 20}}
          />

          <Text style={styles.expiraryDateText}>Expirary Date:</Text>
          
            {Platform.OS == 'web' ? (
              <View style={styles.nestedDateInputContainer}>
                <TextInput
                  placeholder="dd"
                  style={styles.dayInput}
                  onChangeText={(dayValue) => this.setState({ day: dayValue })}
                ></TextInput>
                <TextInput
                  placeholder="mm"
                  style={styles.monthInput}
                  onChangeText={(monthValue) =>
                    this.setState({ month: monthValue })
                  }
                ></TextInput>
                <TextInput
                  placeholder="yyyy"
                  style={styles.yearInput}
                  onChangeText={(yearValue) => this.setState({ year: yearValue })}
                ></TextInput>
              </View>
              /*<View>
              <ExpireCalendar 
              fetchDate={(date)=>this.fetchDate(date)}/>
              </View>*/
            ) : (
              <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={getTodaysDate()}
              maxDate="2100-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({year: date.substring(0,4), month: date.substring(5, 7), day: date.substring(8, 10)})
              }}
            />
            )}
            
          
        </ScrollView>
        </TouchableWithoutFeedback>
        <Button
          title="Add Item"
          onPress={() => {
            validateForm(
              this.state.itemName,
              this.state.itemQuantity,
              this.state.itemCategory,
              this.state.itemStorage,
              this.state.day,
              this.state.month,
              this.state.year
            ).then(success => {
              if(success == true ){
                this.navigation.pop(2);
              }
            });
          }
          }
        ></Button>
      </KeyboardAvoidingView>
    );
  }
}

// Function used to build the date in appropriate format.
function buildDate(year, month, day) {
  let current_datetime = new Date(year, month-1, parseInt(day)+1);
  let formatted_date = current_datetime.toISOString().substring(0,10);
  return formatted_date;
}
// Function creates the Item object itself and adds it to the item class where it is managed.
function parseData(name, quantity, category, storage, year, month, day, date) {
  let item = {
    name,
    quantity,
    category,
    storage,
    date: buildDate(year, month, day),
  }; // Create new item object based on form details.
  //itemObject.addItemToFoodList(itemObject);
  Item.addItem(item);
  
}

// Function checks if form elements are not empty,
// parses the data to Item class and clears the form for re-use.
export async function validateForm(
  name,
  quantity,
  category,
  storage,
  day,
  month,
  year
) {
  if (
    name != "" &&
    quantity != "" &&
    category != "" &&
    storage != "" &&
    (day != "" && month != "" && year != "")
  ) {
    parseData(name.toLocaleLowerCase(), parseFloat(quantity), category, storage, year, month, day);
    return true;
  } else {
    customAlert("Form incomplete, try again!");
    return false;
  }
}

function customAlert(string) {
  alert(string);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 20,
    padding: 40,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    width: "90%",
    flexGrow: 0.9,
  },
  nestedDateInputContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dayInput: {
    fontSize: 18,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  monthInput: {
    fontSize: 18,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  yearInput: {
    fontSize: 18,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  itemNameInput: {
    height: 40,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  itemQuantityInput: {
    marginTop: 15,
    height: 40,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  selectItemCategoryText: {
    color: "gray",
    marginTop: 20,
    height: 30,
    fontSize: 20,
  },
  selectStorageLocationText: {
    color: "gray",
    marginTop: 20,
    height: 30,
    fontSize: 20,
  },
  datePickerInput: {
    height: 30,
    marginTop: 10,
  },
  expiraryDateText: {
    color: "gray",
    marginTop: 30,
    height: 30,
    fontSize: 20,
  },
});

export default NewItem;
