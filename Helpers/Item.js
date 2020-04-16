import { Alert } from "react-native";

export default class Item {
  // Add other parameters
  constructor(item, quantity) {
    this.item = item;
    this.quantity = quantity;
    // this.category = category;
    // this.storageLocation = storageLocation;
    // this.date = date;
  }

  addItemToItems(item) {
    console.log("add this to the item list...");
  }

  toString() {
    console.log(this.item + " " + this.quantity);
  }
}
