import React,{Component} from 'react'; //req
import { View,Text,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class ExchangeScreen extends Component{
 constructor(){
     super();
     this.state ={
       userId : firebase.auth().curentUser.email,
       itemName: "",
       desc: ""
     }
 }

 createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(itemName,desc)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_item').add({
        "user_id": userId,
        "item_name":itemName,
        "desc":desc,
        "request_id"  : randomRequestId,
    })

    this.setState({
        itemName :'',
        desc : ''
    })

    return Alert.alert("Item name and description submitted successfuly")
  }

  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Exchange Item"/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Enter the Item Name"}
                onChangeText={(text)=>{
                    this.setState({
                        itemName:text
                    })
                }}
                value={this.state.itemName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Description of the item...."}
                onChangeText ={(text)=>{
                    this.setState({
                        desc:text
                    })
                }}
                value ={this.state.desc}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.itemName,this.state.desc)}}
                >
                <Text>Trade Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    keyBoardStyle: {
     flex:1,
     alignItems: 'center',
     justifyContent: 'center'
    },
    formTextInput: {
        width: "75%",
        height:35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding:10,
    },
    button: {
     width: "75%",
     height: 50,
     justifyContent:'center',
     alignItems: 'center',
     borderRadius: 10,
     backgroundColor:"red",
     shadowColor: "#000",
     shadowOffset:{
         width:0,
         height:8,
     },
     shadowOpacity: 0.44,
     shadowRadius: 10.32,
     elevation: 16,
     marginTop: 20
    },
 }

)