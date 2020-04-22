import { Alert } from "react-native";
import TestChildScreen from "../screens/TestChildScreen";
import React, { Component } from "react";
import {firestore} from '../config/Firebase'

// usage  <Item><TestChildScreen/></Item> 

class Item extends Component {
  // Add other parameters
  constructor(props) {
    super()
    // this.category = category;
    // this.storageLocation = storageLocation;
    // this.date = date;
  }

  render(){
    var childprops = 
    {
    "getItemFromItems":(userid)=>this.getItemFromItems(userid),
    "addItemToItems" : (userid, item)=>this.addItemToItems(userid, item),
    "removeItemFromItems" : (userid,rmid)=>this.removeItemFromItems(userid,rmid),
    "editItemInItems" : (userid,item, editid)=>this.editItemInItems(userid,item, editid),
    "searchItemFromItems" : (name)=>this.searchItemFromItems(name)
  }
    return React.cloneElement(this.props.children, childprops);
  }

  getItemFromItems(userid){
    var first = firestore.collection("Fridgecollection").doc(userid).collection("mat")

    return first.get().then(collectionSnapshot=>{
        var foodlist = []
        var docs = collectionSnapshot.docs
        docs.map(x=>{
          var obj = x.data()
          obj['id']=x.id
          foodlist.push(obj)})
        return foodlist
    }).catch(error=>console.log(error))
  }

  addItemToItems(userid, item) {
      //compare with the food collection at first
      var fooddb = firestore.collection("Foodcollection")
      var addfooddb = this.searchItemFromItems(item.name)
      .then(fitem=>{
          if(!fitem){
            var adddb = fooddb.add({ // if not exist in our fooddb, add it in(only keep 2 attributes)
              'name':item.name,
              'category':item.category
            }).then((docRef) =>{ 
              console.log(docRef.id)
              fitem = {
              'name':item.name,
              'category':item.category,
              'id':docRef.id}
              return fitem
            }
            )
            return Promise.resolve(adddb)
          }
          return fitem
        })
      .then(fitem=>{
          // compare with user's stroage
          var getcurrent = this.getItemFromItems(userid)
          .then(currentfood=>{
                var inlist=false
                currentfood.map(food=>{
                  if(this.compareItems(food,item)){ // This case is repeated add(every info is the same)
                    inlist=true
                    console.log("Give user a hint that this item is already exist! Use the edit method if needed.")
                  }
              })
                if(!inlist){
                  item['fid']=fitem.id
                  item['name']=fitem.name
                  item['category']=fitem.category,
                firestore.collection("Fridgecollection").doc(userid).collection("mat").add(item) // add to user's stroage db
                currentfood.push(item) // add to the user's food list
              }
            return currentfood
            }
          ) 
          return Promise.resolve(getcurrent)
      }).catch(error=>console.log(error))
      return addfooddb
  }

  removeItemFromItems(userid, rmid){ // assume the food is already in fooddb
    return this.getItemFromItems(userid)
    .then(currentfood=>{
        var rmlist = []
        currentfood.map(food=>{
        if(food.id===rmid){ // for output use, not necessary for db interaction
          firestore.collection("Fridgecollection").doc(userid).collection("mat").doc(rmid).delete() // delete from database
          return 
        }
        rmlist.push(food)
      }
    ) // return the result list
    return rmlist
  }
  ).catch(error=>console.log(error))
}    

  editItemInItems(userid, item, editid){ // edit item 
    var editfood = this.getItemFromItems(userid)
    .then(items=>{
      var editlist=[]
      items.map(x=>{
        if(x.id===editid){// for output use, not necessary for db interaction
          item['fid']=  x.fid
          firestore.collection("Fridgecollection").doc(userid).collection("mat").doc(editid).set(item)
          editlist.push(item)
          return 
        }
        editlist.push(x)
      }
    )
    return editlist
  })
  return editfood
  }

  searchItemFromItems(name){ // search in fooddb
    var fooddb = firestore.collection("Foodcollection")
    var searchfooddb = fooddb.get()
    .then( // read the list in foodb
      collectionSnapshot=>{
      var foodlist = []
      var docs = collectionSnapshot.docs
      docs.map(x=>{
        var obj = x.data()
        obj['id']=x.id
        foodlist.push(obj)})
      return foodlist
    })
    .then( // return the match
      foodlist=>{
        var item
        var inlist = false
        foodlist.map(food=>{
          if(food.name===name){
            inlist = true
            item = food
            return 
          }
        })
        return item
      }
    )

    return searchfooddb
  }

  compareItems(item1, item2){
    return ((item1.name===item2.name)&&(item1.location===item2.location)&&(item1.expiredate===item2.expiredate))
  }
}
export default Item