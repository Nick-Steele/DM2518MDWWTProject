import Firebase from "../config/Firebase";
import { Alert } from "react-native";


export function getItems() {
  var userid = Firebase.auth().currentUser.uid;
  console.log(userid); // THIS GIVES UNDEFINED FOR SOME REASON.
  var first = Firebase.firestore()
    .collection("Fridgecollection")
    .doc(userid) // userid should be used. But this is ok for testing.
    .collection("mat");

  return first
    .get()
    .then((collectionSnapshot) => {
      var foodlist = [];
      var docs = collectionSnapshot.docs;
      docs.map((x) => {
        var obj = x.data();
        obj["id"] = x.id;
        foodlist.push(obj);
      });
      return foodlist;
    })
    .catch((error) => console.log(error));
}

export function getItemsFoodCollection() {
  var foodCollectionList = [];
  var first = Firebase.firestore().collection("Foodcollection");

  return first
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        foodCollectionList.push(doc.data());
      });
      return foodCollectionList;
    })
    .catch((error) => console.log(error));
}

export function addItem(item) {
  // get current user id
  var userid = Firebase.auth().currentUser.uid;
 // var userid = Firebase.auth().currentUser.uid;
  //compare with the food collection at first
  var fooddb = Firebase.firestore().collection("Foodcollection");
  var addfooddb = searchItem(item.name)
    .then((fitem) => {
      if (!fitem) {
        var adddb = fooddb
          .add({
            // if not exist in our fooddb, add it in(only keep 2 attributes)
            name: item.name,
            category: item.category,
          })
          .then((docRef) => {
            console.log(docRef.id);
            fitem = {
              name: item.name,
              category: item.category,
              id: docRef.id,
            };
            return fitem;
          });
        return Promise.resolve(adddb);
      }
      return fitem;
    })
    .then((fitem) => {
      // compare with user's stroage
      var getcurrent = getItems(userid).then((currentfood) => {
        var inlist = false;
        currentfood.map((food) => {
          if (compareItems(food, item)) {
            // This case is repeated add(every info is the same)
            inlist = true;
            Alert.alert("You already have this item");
            console.log(
              "Give user a hint that this item is already exist! Use the edit method if needed."
            );
          }
        });
        if (!inlist) {
          item["fid"] = fitem.id;
          item["name"] = fitem.name;
          (item["category"] = fitem.category),
            Firebase.firestore()
              .collection("Fridgecollection")
              .doc(userid)
              .collection("mat")
              .add(item); // add to user's stroage db
          currentfood.push(item); // add to the user's food list
        }
        return currentfood;
      });
      return Promise.resolve(getcurrent);
    })
    .catch((error) => console.log(error));
  return addfooddb;
}

export function removeItem(rmid) {
  var userid = Firebase.auth().currentUser.uid;
  // assume the food is already in fooddb
  return getItems()
    .then((currentfood) => {
      var rmlist = [];
      currentfood.map((food) => {
        if (food.id === rmid) {
          // for output use, not necessary for db interaction
          Firebase.firestore()
            .collection("Fridgecollection")
            .doc(userid)
            .collection("mat")
            .doc(rmid)
            .delete(); // delete from database
          return;
        }
        rmlist.push(food);
      }); // return the result list
      return rmlist;
    })
    .catch((error) => console.log(error));
}

// waste or use function, amount is an input amout from a user
// type should be a string either 'wasted' or 'used'
export function reduceItem(wtid, amount, type){  
  var userid = Firebase.auth().currentUser.uid;
  return getItems()
      .then((currentfood) => {
        var rmlist = [];
        currentfood.map((food) => {
          if (food.id === wtid) {
            if(food.quantity<amount){
              alert("The number should be smaller than the number alreay exist.")
              return 
            }
            else if(food.quantity===amount){
            // for output use, not necessary for db interaction
              Firebase.firestore()
                .collection("Fridgecollection")
                .doc(userid)
                .collection("mat")
                .doc(wtid)
                .delete(); // delete from database if waste all of them
            }
            else{
              var newquantity = food.quantity-amount
              Firebase.firestore()
              .collection("Fridgecollection")
              .doc(userid)
              .collection("mat")
              .doc(wtid)
              .update({
                quantity: newquantity
            })
            // add to the waste collection
            var wasteFood = food
            wasteFood.quantity = amount
            wasteFood.type = type

            Firebase.firestore()
            .collection("Wastecollection")
            .doc(userid)
            .collection("mat")
            .add(wasteFood)
            }
            return;
          }
        }); // return the result list
      })
      .catch((error) => console.log(error));
}

export function editItem(item, editid) {
  var userid = Firebase.auth().currentUser.uid;
  // edit item
  var editfood = getItems(userid).then((items) => {
    var editlist = [];
    items.map((x) => {
      if (x.id === editid) {
        // for output use, not necessary for db interaction
        item["fid"] = x.fid;
        Firebase.firestore()
          .collection("Fridgecollection")
          .doc(userid)
          .collection("mat")
          .doc(editid)
          .set(item);
        editlist.push(item);
        return;
      }
      editlist.push(x);
    });
    return editlist;
  });
  return editfood;
}

export function searchItem(name) {
  var userid = Firebase.auth().currentUser.uid;
  // search in fooddb
  var fooddb = Firebase.firestore().collection("Foodcollection");
  var searchfooddb = fooddb
    .get()
    .then(
      // read the list in foodb
      (collectionSnapshot) => {
        var foodlist = [];
        var docs = collectionSnapshot.docs;
        docs.map((x) => {
          var obj = x.data();
          obj["id"] = x.id;
          foodlist.push(obj);
        });
        // console.log(foodlist);
        return foodlist;
      }
    )
    .then(
      // return the match
      (foodlist) => {
        var item;
        var inlist = false;
        foodlist.map((food) => {
          if (food.name === name) {
            inlist = true;
            item = food;
            return;
          }
        });
        console.log(item);
        return item;
      }
    );
  return searchfooddb;
}

function compareItems(item1, item2) {
  return (
    item1.name === item2.name &&
    item1.location === item2.location &&
    item1.expiredate === item2.expiredate
  );
}
