import { useEffect, useState } from "react";
import { Generate_Wallet, Import_Wallet , getBalance } from "../components/Redux/actions/auth";
import React from 'react'
import { StyleSheet, Text, ActivityIndicator, View, Button, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import MyHeader from './MyHeader';
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import MyHeader2 from './MyHeader2'
import authService from "../components/Redux/services/authService";
import { TextInput } from 'react-native-paper';
//https://data-seed-prebsc-1-s1.binance.org:8545

 const ImportWallet=()=>{
    const[address, setAddress]=useState('')
    const[Loading, setLoading]=useState(false)
    const[modalVisible,setModalVisible]=useState(false)
    const state = useSelector((state) => state);
    const[extended, setExtended]=useState(false)
    const[privateKey, setPrivateKey]=useState('')
    

    const Header = (title)=>{
      
      return state.extended==true ? <MyHeader2 title={title} setExtended={setExtended} extended={extended}/>:<MyHeader title={title} setExtended={setExtended} extended={extended}/>
    
    }
    console.log(state)

    const dispatch = useDispatch();


    const importWallet =(privateKey)=>{
      setLoading(true)
        dispatch(Import_Wallet(privateKey))
        .then((response) => {
          
          console.log(response)
          const res =  response
          if (res.status == "success") {
           
           console.log(res)
           setAddress(res.wallet.address)
           setLoading(false)
           console.log('success')

           alert('Wallet imported successfully')
            dispatch(getBalance(res.wallet.address))
        .then((response) => {
                
          console.log(response)
          const res =  response
          if (res.status == "success") {
            
            console.log(res)
            console.log('success')
            
          }
        })
        .catch((error) => {
          console.log(error)
          alert(error)
          
        });
           
          }
          else{
              setLoading(false)
              alert('Wallet does not exist')
          }
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)
          alert(error)
          
        });
     
      }
   




    
return(
    <View style={styles.container}>
    <View style={styles.accountBox} >
  <TouchableOpacity onPress={()=>{
    setModalVisible(true)
  }}>
    <Text style={styles.text}>{Loading?<ActivityIndicator size="large" color="green" />:'Import Wallet'}</Text>
    <Icon name="chevron-right" size={30} color="white" style={{marginLeft:260, marginTop:-30}} />
    </TouchableOpacity>
  </View>
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
      height: '50%',
      marginTop: 'auto',
      marginBottom: 80,
      backgroundColor:'#ddd',
      borderRadius:20
     
    }}>
    <View style={styles.footer}>
      <Text style={styles.headerText}>Enter Private Key Below</Text>
      <View elevation={5}>
      <TextInput style={styles.textInput} 
      onChangeText={(text) => {
        setPrivateKey(text)
        console.log(privateKey)
    }}
      />
      </View>
    </View>
    <TouchableOpacity
    style={styles.addButton2}
    onPress={() => {
        setLoading(true)
        setTimeout(() => {
        importWallet(privateKey)
        setModalVisible(!modalVisible);
      }, 1);
        }}>
    <Text style={styles.addButtonText}>Import</Text>
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
  <View style={styles.accountBox2} >
  
    <Text style={styles.text}>Imported Wallet Details</Text>
    <Text style={styles.text}>{Loading==true?<View ><Text style={{marginTop:40, color:'grey', fontWeight:'bold'}}>Generating Wallet Please Wait!</Text><ActivityIndicator size="large" color="green" /></View>:address}</Text>
    
  </View>
  </View>

)

 }
 export default ImportWallet
 const styles = StyleSheet.create({
    container:{
        height:900,
        backgroundColor:'#131E3A'
    },
    text:{
        color:'white',
        fontSize:22,
        fontWeight:'bold',
        fontFamily:'sans-serif',
        fontStyle:'italic',
       
    },
    accountBox:{
        borderWidth:5,
        paddingTop:20,
        borderRadius:20,
        borderColor:'#131E3A',
        height:80,
        marginLeft:40,
        marginRight:40,
        marginTop:100,
        backgroundColor:'#000C66',
        textAlign:'center',
        display:'flex',
        alignItems:'center'
    },
    accountBox2:{
        borderWidth:5,
        paddingTop:20,
        borderRadius:20,
        borderColor:'#131E3A',
        height:280,
        marginLeft:40,
        marginRight:40,
        marginTop:100,
        backgroundColor:'#000C66',
        textAlign:'center',
        display:'flex',
        alignItems:'center'
    },
    container2: {
        flex: 1,
        backgroundColor: '#98B3B7',
        justifyContent: 'center',
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
       width:370,
       margin:10,
       borderRadius:10,
       shadowColor: "#000",
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
        bottom: 90,
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
        bottom: 90,
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
