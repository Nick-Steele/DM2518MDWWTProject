export default class Item {
  items = [];
  // Add other parameters
  constructor(itemName, quantity, category, storageLocation, date) {
    this.itemName = itemName;
    this.itemQuantity = quantity;
    this.itemCategory = category;
    this.itemStorageLocation = storageLocation;
    this.itemDate = date;
  }

  addItemToItems(item) {
    this.items.push(item);
  }

  toString() {
    console.log(
      this.item +
        " " +
        this.quantity +
        this.category +
        this.storageLocation +
        this.date
    );
  }

  getListItems(list) {
    let i = 0;
    for (i; i < list.length; i++) {
      console.log(list[i]);
    }
  }
}
