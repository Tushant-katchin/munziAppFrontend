import { useEffect, useState } from "react";
import { Generate_Wallet } from "../components/Redux/actions/auth";
import React from 'react'
import { StyleSheet, Text, ActivityIndicator, View, Button, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import MyHeader from './MyHeader';
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import MyHeader2 from './MyHeader2'
import {saveData, saveFile} from '../utilities/utilities'
import { savePrivateKey, savePassword} from "../constants/alertConstants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



 const CreateWallet=()=>{
    const[address, setAddress]=useState('')
    const[Loading, setLoading]=useState(false)
    const state = useSelector((state) => state);
    const[extended, setExtended]=useState(false)
    const[name,setName]=useState('')
    const[password, setPassword] = useState('')
    const Load=false
    
    
    const Header = (title)=>{
      
      return state.extended==true ? <MyHeader2 title={title} setExtended={setExtended} extended={extended}/>:<MyHeader title={title} setExtended={setExtended} extended={extended}/>
    
    }
    console.log(state)

    const dispatch = useDispatch();
   
  const generate =   async () => {
    if(!name){
      setLoading(false)
      return Alert.alert('Please select an account name to proceed')
    }
    if(!password){
      setLoading(false)
      return Alert.alert('You must select a password to proceed furthur')
    }
    
   
    
     await dispatch(Generate_Wallet())
        .then((response) => {
          console.log(response)
          const res =  response
          if (res.status == "success") {
           
           console.log(res)
           setAddress(res.wallet.address)
           setLoading(false)
           

           savePrivateKey(saveFile, name,res.wallet.privateKey,password, state.user)
           console.log('success')
          

         
           
          }
        })
        .catch((error) => {
          console.log(error)
          
          
        })
    
      }
      




    
return(
    <View style={styles.container}>
    <View style={styles.accountBox} >
  <TouchableOpacity onPress={()=>{
    setLoading(!Loading)
    setTimeout(() => {
      
        generate()
      
    }, 1);
  }}>
    <Text style={styles.text}>{Loading?<ActivityIndicator size="large" color="green" />:'Generate Wallet'}</Text>
    <Icon name="chevron-right" size={30} color="white" style={{marginLeft:260, marginTop:-30}} />
    </TouchableOpacity>
  </View>
  <View style={{marginLeft:wp('14')}}>
  <Text style={{color:'white'}}>
  Set Account name 
  </Text>
  <TextInput
  style={styles.input}
  theme={{colors: {text: 'white' }}}
  value={name}
  placeholder={"Please set an account name"}
  onChangeText={(text) => setName(text)}
  autoCapitalize={"none"}
  placeholderTextColor="#FFF"
/>
  </View>
  <View style={{marginLeft:wp('14')}}>
 <Text style={{color:'white'}}>
 Set encryption password
 </Text>
  <TextInput
  style={styles.input}
  theme={{colors: {text: 'white' }}}
  value={password}
  placeholder={"Please set a password"}
  onChangeText={(text) => setPassword(text)}
  autoCapitalize={"none"}
  placeholderTextColor="#FFF"
/>
  </View>
  <View style={styles.accountBox2} >
  
    <Text style={styles.text}>New Wallet Address</Text>
    <Text style={styles.text}>{Loading==true?<View ><Text style={{marginTop:40, color:'grey', fontWeight:'bold'}}>Generating Wallet Please Wait!</Text><ActivityIndicator size="large" color="green" /></View>:address}</Text>
    
  </View>
  </View>

)

 }
 export default CreateWallet
 const styles = StyleSheet.create({
  input: {
    height: hp('5%'),
    marginBottom: hp('2'),
    marginLeft: wp('2'),
    color:'#fff',
    marginTop:hp('2'),
    width:wp('70'),
    paddingLeft: wp('7'),
    paddingRight:wp('7'),
    backgroundColor:'#000C66',
    borderRadius:wp('20')
   
  },
    container:{
        height:800,
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
        height:hp('30'),
        marginLeft:40,
        marginRight:40,
        marginTop:hp('5'),
        backgroundColor:'#000C66',
        textAlign:'center',
        display:'flex',
        alignItems:'center'
    }

})
