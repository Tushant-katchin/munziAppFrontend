import React,{useEffect, useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, ActivityIndicator, KeyboardAvoidingView,View, Button, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import "@ethersproject/shims"
import { ethers } from "ethers"
import { getBalance } from "../../components/Redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const RecieveModal = ({modalVisible,setModalVisible}) => {
    const[Loading, setLoading]=useState(false)
    const[balance, setBalance]=useState('')
    const [recieverAddress, setAddress]= useState('')
    const[amount, setAmount]=useState(0)
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const SendMoney = async (recieverAddress, amount) => {
      

        const privateKey=state.wallet.privateKey?state.wallet.privateKey:alert('no wallets connected')
       console.log(privateKey)
        const response = await fetch('http://192.168.207.84:2000/user/sendTransaction', {
          method: 'POST',
          headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json'
          },
         body: JSON.stringify({
                   recieverAddress: recieverAddress,
                   amount: amount,
                   privateKey:privateKey
                
                })
         }).then((response) => response.json())
         .then((responseJson) => {
          console.log(responseJson.responseData.transactionHash)
          if (responseJson.responseCode===200) {
            alert(`Transaction successful, Your transaction Hash is:${responseJson.responseData.transactionHash} `)
            return {
              status: "success",
              message: "Transfer Successfull",
            };
          }
        
        });
       
      
        
      };
    const Balance = async () => {
       
      if(state.wallet.address){

        await dispatch(getBalance(state.wallet.address))
        .then((response) => {
                
          console.log(response)
          const res =  response
          if (res.status == "success") {
            
            console.log(res)
            setBalance(res.walletBalance)
            console.log('success')
            
          }
        })
        .catch((error) => {
          console.log(error)
          
          
        });
        
        
      }
      };
      useEffect(() => {
       Balance()
      }, [])
      

  return (
    <View >
    <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  statusBarTranslucent={true}
  onRequestClose={() => {
    // this.closeButtonFunction()
  }}>
  
  <View
    style={{
      height: '60%',
      marginTop: 'auto',
      marginBottom: 80,
      backgroundColor:'#ddd',
      borderRadius:20
     
    }}>
    <View style={styles.footer}>
      <Text style={styles.headerText}>Recieve Token</Text>
      <View style={styles.Amount}>
      <Text style={styles.headerText}>Available Balance:{balance}</Text>
      <Text style={styles.headerText}>Your Wallet Address</Text>
      <Text style={styles.headerText}>{state.wallet.address?state.wallet.address:'no wallets connected'}</Text>
      </View>
    </View>
    <TouchableOpacity
    style={styles.addButton2}
    onPress={() => {
       console.log('worked')
        }}>
    <Text style={styles.addButtonText}>Copy</Text>
  </TouchableOpacity>
   
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => {
        setModalVisible(!modalVisible);
      }}>
      <Text style={styles.addButtonText}>Close</Text>
    </TouchableOpacity>
  </View>
</Modal>
</View>
  )
}

export default RecieveModal

const styles = StyleSheet.create({
    
      Amount:{
      display:'flex',
      alignItems:'center',
      textAlign:'center',
      justifyContent:'center'
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerText: {
        color: 'black',
        fontSize: 18,
        padding: 26,
      },
      noteHeader: {
        backgroundColor: '#42f5aa',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      },
      footer: {
        flex: 1,
        backgroundColor: '#ddd',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        borderRadius:20
      },
      textInput: {
       borderWidth:1,
       borderColor:'grey',
       width:390,
       margin:10,
       borderRadius:10,
       shadowColor: "#000",
       height:40,
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
      },
    
      textInput2: {
        borderWidth:1,
        borderColor:'grey',
        width:200,
        margin:10,
        borderRadius:10,
        shadowColor: "#000",
        height:50,
 shadowOffset: {
     width: 0,
     height: 12,
 },
 shadowOpacity: 0.58,
 shadowRadius: 16.00,
 
 elevation: 24,
       },
     
      addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 40,
        backgroundColor: 'red',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
      },
      addButton2: {
        position: 'absolute',
        zIndex: 11,
        left: 20,
        bottom: 40,
        backgroundColor: 'green',
        width: 80,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
      },
      addButtonText: {
        color: '#fff',
        fontSize: 18,
      }
    

})
