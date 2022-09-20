import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Modal, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import MyHeader from './MyHeader';
import MyHeader2 from './MyHeader2'
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { readData, saveFile, encryptFile, saveWallet } from '../utilities/utilities';
import { importAllWallets } from '../components/Redux/actions/auth';
import { DropdownComponent } from './MyWalletDropdown';
import { getWallets } from '../constants/alertConstants';

const { StorageAccessFramework } = FileSystem;




const MyWallet = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const[modalVisible,setModalVisible]=useState(false)
    const[extended, setExtended]=useState(false)
    const emailId='tushant029@gmail.com'
    const name='max'
    const password='pass'
    const fileUri='uri'

    const Header = (title)=>{
      
      return state.extended==true ? <MyHeader2 title={title} setExtended={setExtended} extended={extended}/>:<MyHeader title={title} setExtended={setExtended} extended={extended}/>
    
    }

// write the file
async function save(){
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  // Check if permission granted
  if (permissions.granted) {
    // Get the directory uri that was approved
    let directoryUri = permissions.directoryUri;
    let data = state.privateKey?state.privateKey:"nothing to write";
    // Create file and pass it's SAF URI
    await StorageAccessFramework.createFileAsync(directoryUri, "privateKey2", "application/pdf").then(async(fileUri) => {
      // Save data to newly created file
     await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 })
     
    
  
    })
    .catch((e) => {
      console.log(e);
    });
  } else {
    alert("You must allow permission to save.")
  }
}



  return (
    <View style={styles.container}>
      
    <View style={styles.content}>
    <DropdownComponent/>
    <Text style={styles.text}>Hi,{state.user}</Text>
    <View style={styles.content2}>
    <Text style={styles.text3}> Wallet Address</Text>
    <Text style={styles.text2}>{state.wallet.address?state.wallet.address:'You dont have any wallet yet'}</Text>
    </View>
    <View style={styles.btn}>
    <Button title='Reveal private key' color={'red'} style={{borderRadius:20}} onPress={async ()=>{
     setModalVisible(true)
    //saveWallet(emailId,fileUri, password, name)
    //const resp = await readData(state.user, dispatch, importAllWallets)
    //console.log(resp)
    
    }} ></Button>
   
    </View>

    <View style={styles.btn}>
    <Button title='Import My Wallets' color={'green'} style={{borderRadius:20}} onPress={async ()=>{
     getWallets(state.user, readData,dispatch, importAllWallets)
    //saveWallet(emailId,fileUri, password, name)
    //const resp = await readData(state.user, dispatch, importAllWallets)
    //console.log(resp)
    
    }} ></Button>
   
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
      height: hp('50'),
      marginTop: 'auto',
      backgroundColor:'#ddd',
      borderTopLeftRadius:20,
      borderTopRightRadius:20
    }}>
    <View style={styles.footer}>
      <Text style={styles.headerText}>Private Key</Text>
      <Text style={styles.headerText}>{state.wallet.privateKey?state.wallet.privateKey:'No wallets connected'}</Text>

    </View>
    <TouchableOpacity
    style={styles.addButton2}
    onPress={() => {
      save()
    }}>
    <Text style={styles.addButtonText}>Download</Text>
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
    <View>
    
    
    </View>
    </View>
  )
}

export default MyWallet
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#131E3A',
      height:hp('10'),
      color:'white',
      
     
      
    },
    text:{
        color:'white',
        fontSize:hp('3'),
        fontWeight:'bold',
        fontFamily:'sans-serif',
        fontStyle:'italic',
        marginLeft:hp('7'),
        marginTop:hp('12')
       
    },
    text3:{
      color:'white',
      fontSize:hp('3'),
      fontWeight:'bold',
      fontFamily:'sans-serif',
      fontStyle:'italic',
     
  },
  text2:{
    color:'white',
    fontSize:hp('2'),
    fontWeight:'bold',
    fontFamily:'sans-serif',
    fontStyle:'italic',
   
},
   content:{
    borderWidth:5,
    borderColor:'#131E3A',
    height:hp('80'),
    margin:hp('5'),
    borderRadius:30,
    backgroundColor:'#000C66',
    textAlign:'center'
   },
   content2:{
    display:'flex',
    borderWidth:wp('1'),
    borderColor:'#131E3A',
    margin:hp('2'),
    marginTop:hp('7'),
    padding:15,
    backgroundColor:'black',
    borderRadius:30,
    textAlign:'center',
    alignItems:'center'
   },
   btn:{
    borderWidth:1,
    borderRadius:20,
    borderColor:'#131E3A',
    width:wp('30'),
    marginLeft:wp('25'),
    marginTop:hp('5')
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
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  textInput: {
    alignSelf: 'stretch',
    color: 'black',
    padding: 20,
    backgroundColor: '#ddd',
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  },

  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: wp('10'),
    bottom: hp('14'),
    backgroundColor: 'red',
    width: wp('20'),
    height: hp('10'),
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButton2: {
    position: 'absolute',
    zIndex: 11,
    left: 20,
    bottom: hp('14'),
    backgroundColor: 'green',
    width: wp('20'),
    height: hp('10'),
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: hp('2'),
  }

  });
  