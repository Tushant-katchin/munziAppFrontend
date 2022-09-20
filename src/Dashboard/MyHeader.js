import React, { useEffect } from 'react'
import { StyleSheet, Text, View,  TextInput, FlatList, TouchableOpacity, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { Extend } from "../components/Redux/actions/auth";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MyHeader = ({title, changeState, state, extended, setExtended}) => {
   state = useSelector((state) => state)
  const dispatch = useDispatch();

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);}
}

/*function changeState(){
  
  
  const data = dispatch(Extend())
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
    
    
  });
   console.log(data)
  }
  */


  const openExtended =()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
    changeState()
    
  }
  return (
    <View style={{    backgroundColor:'#131E3A', height:hp('15')}}>
    <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: hp('15'),
              backgroundColor:'#000C66',
              color:'#FFFFFF',
              borderBottomLeftRadius:30,
              borderBottomRightRadius:30
            }}>
            
            <Button color="#fff" labelStyle={{ fontSize: 24 }} icon="sort-reverse-variant" style={{marginTop:40}}  onPress={()=>openExtended()} >
              
            </Button>
              
            <Text  style={{marginTop:60, fontWeight:'bold', color:'#FFFFFF', marginRight:170, fontSize:22, fontFamily:'sans-serif'}}>{title}</Text>
           
          </View>
          </View>
  )
}

export default MyHeader