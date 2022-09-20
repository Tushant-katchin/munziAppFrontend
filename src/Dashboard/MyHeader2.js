import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity, Alert, LayoutAnimation, Platform, UIManager  } from 'react-native';
import { Button } from 'react-native-paper';
import Icons from 'react-native-vector-icons/FontAwesome'
import Profile from '../../assets/profile.jpg'
import SendModal from './Modals/SendModal'
import RecieveModal from './Modals/RecieveModal';
import { useNavigation } from '@react-navigation/native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from "react-redux";
import { Extend, Collapse } from "../components/Redux/actions/auth";
import { Animated } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SwapModal from './Modals/SwapModal';
import { setCurrentWallet } from '../components/Redux/actions/auth';
const MyHeader2 =  ({title, changeState, state,  extended, setExtended}) => {
   state =  useSelector( (state) =>  state)
  const state2 =  useSelector(async (state) => await  state)

  const dispatch = useDispatch();
  const navigation= useNavigation()
  const[check, setCheck]=useState(false)
  const[check2, setCheck2]=useState(true)
  const[Loading, setLoading]=useState(false)
  const[modalVisible,setModalVisible]=useState(false)
  const[modalVisible2,setModalVisible2]=useState(false)
  const[modalVisible3,setModalVisible3]=useState(false)
  const[Data, setData]= useState([])
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  let wallets = []
  var WalletData=[]
  const getWallets =()=>{
  
   
   wallets.push(state.wallets)
   try{

     if(wallets){
       state.wallets.map((item)=>{
         console.log(item)
         WalletData.push({label: item.name, value: item.privateKey})
         console.log(WalletData)
         setData(WalletData)
         
        })
      }
    }catch(error){
      console.log(error)
    }
  }
 
  
  const renderLabel = () => {
    if (!value || !isFocus) {
      return (
        <Text style={[styles.label, !isFocus && { color: 'blue' }]}>
          My wallets
        </Text>
      );
    }
    
    return null;
  };


    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);}
  }
 
  
  const Logo=()=>{
    return <Icons name='bitcoin' size={20} color='white' />
  }
  const translation = useRef(
    new Animated.Value(0)
  ).current;
  
  useEffect(() => {
    Animated.timing(translation, {
      toValue: 1,
      delay: 0.1,
      useNativeDriver: true,
    }).start();
    try{

       getWallets()
    }catch(error){
      console.log(error)
      alert('no wallets found. Make sure you have the file with private keys saved in your device')
    }
   // console.log(wallet)
  }, [])
    
    
    
  
  
    const openExtended =()=>{

      changeState()
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      
      
       
      }
  return (
    <Animated.View style={{height:hp('35'),
    backgroundColor:'#131E3A',position:'relative', width:wp('100'),}} 
    
    
    >
    <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: hp('35'),
              backgroundColor:'#000C66',
              color:'#FFFFFF',
              borderBottomLeftRadius:30,
              borderBottomRightRadius:30,
              position:'relative'
              
            }}>
            
            <Button color="#fff" labelStyle={{ fontSize: 24 }} icon="sort-reverse-variant" style={{marginTop:40}} onPress={()=>openExtended()}>
              
            </Button>
              
            <Text  style={{marginTop:60, fontWeight:'bold', color:'#FFFFFF',  fontSize:22, fontFamily:'sans-serif',width:80}}>{title}</Text>
           <View style={styles.profile}>
           <Image source={Profile} style={{ width: 55, height: 55}} resizeMode="contain" />
           <Text style={styles.profileText}>$2000</Text>
           </View>
          </View>
          <View style={styles.text}>
        <Text style={styles.textDesign}>All Assets</Text>  
        <View style={{display:'flex',flexDirection:'row',marginLeft:10, marginTop:1}}>
        <Logo/>
        <Text style={styles.textDesign3}>0.1035</Text>
      </View>
          </View>
          <View style={styles.container}>
        <Text style={styles.label}>
          My Wallets
        </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? state.wallet.name ?state.wallet.name :'select Wallet'  : 'Select wallet'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={async (item) => {
            console.log(item.label)
            setValue(item.value);
            setIsFocus(false);

            try{
             await dispatch(setCurrentWallet(item.value, item.label))
            .then( (response) => {
              if(response){
             //console.log(response)
             alert(`Wallet selected :${item.label}`)
            }
            else{
              alert('failed to select wallet. please try again')
            }
              
              
            })
            .catch((error) => {
              
              console.log(error)
              alert('failed to select wallet. please try again')
              
            });
     
            }catch(e){
              alert('failed to select wallet')
            }
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'white'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
        <View style={styles.buttons}>
        <View>
          <Button color="#fff" labelStyle={{ fontSize: 24 }} icon="arrow-up" style={styles.addButton} onPress={()=>setModalVisible(true)}>
              
            </Button>
            <Text style={styles.textDesign4}>Send</Text>
            </View>
            <View>
            <Button color="#fff" labelStyle={{ fontSize: 24 }} icon="arrow-down" style={styles.addButton} onPress={()=>setModalVisible2(true)}>
              
            </Button>
            <Text style={styles.textDesign3}>Recieve</Text>
            </View>
            <View>
            <Button color="#fff" labelStyle={{ fontSize: 24 }} icon="lightning-bolt" style={styles.addButton} onPress={()=>setModalVisible3(true)}>
              
            </Button>
            <Text style={styles.textDesign3}>Convert</Text>
            </View>
            <View>
            <Button color="#fff" labelStyle={{ fontSize: 24 }} icon="currency-usd" style={styles.addButton} onPress={()=> navigation.navigate('buycrypto')}>
              
            </Button>
            <Text style={styles.textDesign2}>Buy</Text>
            </View>
            </View>
            <SendModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <RecieveModal modalVisible={modalVisible2} setModalVisible={setModalVisible2} />
            <SwapModal modalVisible={modalVisible3} setModalVisible={setModalVisible3} />
          </Animated.View>
  )
}

export default MyHeader2
const styles=StyleSheet.create({
  profile:{
   borderWidth:1,
   borderColor:'red',
   width:wp('15.1'),
   height:hp('7.7'),
   marginTop:hp('5'),
   marginRight:wp('5'),
   borderRadius:10
  },
  profileText:{
    color:'white',
    fontWeight:'bold',
    marginTop:hp('1'),
    marginLeft:wp('3')
  },
  text:{
bottom:wp('35'),
color:'white'
  },
  textDesign:{
color:'white',
fontStyle:'italic',
fontWeight:'bold',
marginLeft:wp('3')
  },
  textDesign2:{
    color:'white',
    fontWeight:'bold',
    marginLeft:wp('5')
      },
      textDesign3:{
        color:'white',
        fontWeight:'bold',
        marginLeft:wp('2')
          },
          textDesign4:{
            color:'white',
            fontWeight:'bold',
            marginLeft:wp('4')
              },
  buttons:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    bottom:hp('16')
  },
  addButton: {
    display:'flex',
    paddingLeft:wp('4'),
    opacity:0.8,
    alignItems:'center',
    textAlign:'center',
    zIndex: 11,
    backgroundColor: 'grey',
    width: wp('15'),
    height: hp('6'),
    borderRadius: 45,
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
  },
  container: {
    backgroundColor: '#000C66',
    position:'absolute',
    padding:10,
    width:wp('50'),
    marginTop:hp('15'),
    marginLeft:wp('23')
  },
  dropdown: {
    height: hp('6'),
    width:wp('50'),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop:hp('1'),
    marginRight:20
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#000C66',
    left: wp('13'),
    zIndex: -999,
    paddingHorizontal: 8,
    fontSize: 14,
    color:'white',
    height:hp('3'),
    bottom:hp('8')
  },
  placeholderStyle: {
    fontSize: 16,
    color:'white'
  },
  selectedTextStyle: {
    fontSize: 11,
    color:'white'
  },
  iconStyle: {
    width: 20,
    height: 20,
    backgroundColor:'white'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  


})
/*
 <View style={styles.buttons}>
          <TouchableOpacity
    style={styles.addButton}
    onPress={() => {
       
        }}>
    <Text style={styles.addButtonText}>Import</Text>
  </TouchableOpacity>
   
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => {
      
      }}>
      <Text style={styles.addButtonText}>Close</Text>
    </TouchableOpacity>
  
          
          </View>
*/ 