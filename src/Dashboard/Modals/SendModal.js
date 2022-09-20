import React,{useEffect, useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, ActivityIndicator, KeyboardAvoidingView,View, Button, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getBalance } from "../../components/Redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Dialog from "react-native-dialog";
import { VerifyTransaction } from '../../utilities/utilities';
import { Dropdown } from 'react-native-element-dropdown';
import{ DropdownComponent} from '../Dropdown';
import DialogInput from 'react-native-dialog-input';
import { getTx } from '../../utilities/utilities';
import "react-native-get-random-values"
import "@ethersproject/shims"
import {  utils } from "ethers"
var ethers = require('ethers');
const SendModal = ({modalVisible,setModalVisible}) => {
    const[Loading, setLoading]=useState(false)
    const[balance, setBalance]=useState()
    const [recieverAddress, setAddress]= useState('')
    const[amount, setAmount]=useState(0)
    const[visible, setVisible]= useState(false)
    const[visible2, setVisible2]= useState(false)
    const[password, setPassword]= useState('')
    const[accountName, setAccountName]= useState('')
    const[privateKey, setPrivateKey]= useState('')
    const[IsValid, setValid]= useState()
    const state = useSelector((state) => state);
   
    const dispatch = useDispatch();
    //console.log(state.walletBalance)
    //console.log(state.wallet)
    const SendMoney = async (recieverAddress, amount, decrypt, balance, setLoading) => {
        setLoading(true)

        if(!recieverAddress&&!amount){
          setLoading(false)
          return alert('no place can be left blank')
        }
        if(amount>balance){
          setLoading(false)
          return alert('You dont have enough balance to make this transaction')
        }
        const privateKey=decrypt?decrypt:alert('no wallets connected')
       console.log(privateKey)
       const addressTo = recieverAddress//"0x0E52088b2d5a59ee7706DaAabC880Aaf5A1d9974"//address;
     
       
     const addressFrom = state.wallet.address?state.wallet.address:alert('please choose a wallet first');
     const  walletPrivateKey = new ethers.Wallet(privateKey)
         //const provider =  new ethers.providers.StaticJsonRpcProvider('https://bsc.getblock.io/testnet/?api_key=a011daa0-3099-4f55-b22c-c3a3d55898d0'); // TESTNET
         const provider =  new ethers.providers.JsonRpcProvider('https://bsc.getblock.io/testnet/?api_key=a011daa0-3099-4f55-b22c-c3a3d55898d0'); // TESTNET
         
           console.log(await provider.getGasPrice(addressFrom))
           const wallet = walletPrivateKey.connect(provider)
          var transaction = {
             gasLimit: 1000000,
             gasPrice: await provider.getGasPrice(addressFrom),
             nonce:provider.getTransactionCount(addressFrom),
             to: addressTo,
             data: "0x",
             value: ethers.utils.parseEther(amount),
           };
       
           //console.log(wallet)
           const signer = await wallet.signTransaction(transaction)
           console.log(signer)
           const txx = await provider.sendTransaction(signer)
           console.log(txx)
           if(txx.hash){
            alert(`Transaction success :https://testnet.bscscan.com/tx/${txx.hash}`)
            setLoading(false)
           }
           
        
      };
    const Balance = async () => {
       
      if(state.wallet.address){
        console.log(state.wallet.address)
      const response =  await dispatch(getBalance(state.wallet.address))
        .then(async (response) => {
                
          console.log(response)
          const res = await response
          if (res.status == "success") {
            
            console.log(res)
            setBalance(res.walletBalance)
            console.log('success')
            
          }
        })
        .catch((error) => {
          console.log(error)
          alert(error)
          
        });
        
        
      }
      };
      useEffect(async() => {
      await Balance()
   // console.log(result)
      }, [state.wallet.address])
      

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
      height: '80%',
      marginTop: 'auto',
      marginBottom: 80,
      backgroundColor:'#ddd',
      borderRadius:20
     
    }}>
    <View style={styles.footer}>
      <Text style={styles.headerText}>Enter Address below</Text>
      <View elevation={5}>
      <TextInput style={styles.textInput} 
      onChangeText={(text) => {
       setAddress(text)
    }}
      />
      </View>
      
        <DropdownComponent/>
      
      <View style={styles.Amount}>
      <Text style={styles.headerText}>Available Balance:{balance}</Text>
      {Loading? <View style={{marginBottom:hp('-4')}}><ActivityIndicator size="small" color="white" /></View>:<Text> </Text>}
      <Text style={styles.headerText}>Enter Amount</Text>
      <View elevation={5}>
      <TextInput style={styles.textInput2} 
      onChangeText={(text) => {
       setAmount(text)
    }}
      />
      </View>
      </View>
    </View>
    <TouchableOpacity
    style={styles.addButton2}
    onPress={() => {
      setVisible(true)
       //SendMoney(recieverAddress, amount)
        }}>
    <Text style={styles.addButtonText}>Send</Text>
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
<Dialog.Container visible={visible}>
      <Dialog.Title>Enter Password</Dialog.Title>
      <Dialog.Description>
        please enter your wallet account password
      </Dialog.Description>
      <Dialog.Input onChangeText={(e)=>{
        console.log(e)
        setPassword(e)
        }}></Dialog.Input>
      <Dialog.Button label="Cancel" onPress={()=>{
        setVisible(false)}}/>
      <Dialog.Button label="Verify" onPress={ async(e)=>{
       
       //const data = await getTx('0.01')
     
       if(!password){
        return alert('you must input a password to continue')
       }
       else{

         const Validate =  await VerifyTransaction(state.user,state.wallet.name,password, SendMoney, balance, amount, recieverAddress, setLoading, setVisible, setVisible2, visible2)
       }
     /* const Validate =  await VerifyTransaction(state.user,state.wallet.name,password, setValid, IsValid)
      console.log(Validate[0].privateKey)
      if(Validate[0].valid===true){
        SendMoney(recieverAddress, amount)
        setVisible(false)
      }
      else{
        alert('invalid')
      }*/
     
       
      }}/>
    </Dialog.Container>
    <DialogInput 
                isDialogVisible={visible2}
                title={"Private key"}
                message={"Do you want to enter private key manually?"}
                hintInput ={"Enter Private Key here"}
                submitInput={ async (inputText) => {
                 await SendMoney(recieverAddress, amount, inputText, balance, setLoading),
                  setVisible2(false),
                  setVisible(false)
                }}
                closeDialog={() => setVisible2(false)}>
            </DialogInput>
</View>
  )
}

export default SendModal

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
        fontSize: hp('3'),
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
       width:wp('95'),
       margin:10,
       borderRadius:10,
       shadowColor: "#000",
       height:hp('5'),
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
        width:wp('40'),
        margin:10,
        borderRadius:10,
        shadowColor: "#000",
        height:hp('7'),
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
