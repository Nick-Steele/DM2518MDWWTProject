import React,{Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'


const userid = "epiNTkmnMtVwKKbFuPHP"
const item1 = {"name":"potato","category":"vegetable", "amount":2.3,"location":"freeze", "expiredate":"2020-03-01"}
const item2 = {"name":"tomato","category":"vegetable","amount":0.3,"location":"freeze", "expiredate":"2020-03-02"}
const item3 = {"name":"carrot","category":"vegetable","amount":0.3,"location":"freeze", "expiredate":"2020-03-03"}
const editid = "IT9iLcaw7PUV4UP3cyZY"

class TestChildScreen extends Component {
	
	constructor(props){
		super()
		this.state={
			"fooddisplay":[],
		}
	}

	render(){
	// test function
	// var foodlist = this.props.getItemFromItems(userid)
	// foodlist.then(x=>console.log("current food list:",x))
	// var searchitem = this.props.searchItemFromItems("potato")
	// searchitem.then(x=>console.log("search result:",x))
	var newaddlist = this.props.addItemToItems(userid,item3)
	newaddlist.then(x=>console.log("new add list:",x))
	// var newaddlist = this.props.addItemToItems(userid,item3)
	// newaddlist.then(x=>console.log("new add list:",x))
	// var newrmlist = this.props.removeItemFromItems(userid,editid)
	// newrmlist.then(x=>console.log("new remove list:",x))
	// var editlist = this.props.editItemInItems(userid,item3, editid)
	// editlist.then(x=>console.log("new edit list:",x))

	return (
		<View>
			<Text>TestChildScreen</Text>
		</View>
	)
}
}

export default TestChildScreen