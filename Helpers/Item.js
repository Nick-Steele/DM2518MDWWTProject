import { Alert } from "react-native";

export default class Item {
  items = [];
  // Add other parameters
  constructor(itemName, quantity) {
    this.itemName = itemName;
    this.itemQuantity = quantity;
    // this.category = category;
    // this.storageLocation = storageLocation;
    // this.date = date;
  }

  addItemToItems(item) {
    this.items.push(item);
  }

  toString() {
    console.log(this.item + " " + this.quantity);
  }

  getListItems(list) {
    let i = 0;
    for (i; i < list.length; i++) {
      console.log(list[i]);
    }
  }
}
