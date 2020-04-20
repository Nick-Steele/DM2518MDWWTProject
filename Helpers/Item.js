export default class Item {
  foodItemsList = [];
  // Add other parameters
  constructor(itemName, quantity, category, storageLocation, day, month, year) {
    this.itemName = itemName;
    this.itemQuantity = quantity;
    this.itemCategory = category;
    this.itemStorageLocation = storageLocation;
    this.itemDate = new Date(day, month, year);
  }

  addItemToItems(item) {
    this.foodItemsList.push(item);
  }

  // Retreive all food items which are kept in the list
  getListItems(list) {
    let i = 0;
    for (i; i < list.length; i++) {
      return list[i];
    }
  }
}
