import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList, ScrollView,TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Wallet = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.accountBox} >
      <TouchableOpacity onPress={()=>{
        props.navigation.navigate('MyWallet')
      }}>
      <Text style={styles.text}>My Wallet</Text>
      <Icon name="chevron-right" size={hp('5')} color="white" style={{marginLeft:wp('63'), marginTop:hp('-4')}} />
      </TouchableOpacity>
      </View>
    <View style={styles.accountBox} >
    <TouchableOpacity  onPress={()=>{
      props.navigation.navigate('CreateWallet')
    }} >
      <Text style={styles.text}>Create Wallet</Text>
      <Icon name="chevron-right" size={hp('5')} color="white" style={{marginLeft:wp('65'), marginTop:hp('-4')}} />
      </TouchableOpacity>
    </View>
    <View style={styles.accountBox} >
    <TouchableOpacity  onPress={()=>{
      props.navigation.navigate('ImportWallet')
    }} >
      <Text style={styles.text}>Import Wallet</Text>
      <Icon name="chevron-right" size={hp('5')} color="white" style={{marginLeft:wp('65'), marginTop:hp('-4')}} />
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Wallet
const styles = StyleSheet.create({
    container:{
      display:'flex',
      backgroundColor:'#131E3A',
      height:hp('500'),
      width:wp('100'),
      

    },
    text:{
        color:'white',
        fontSize:hp('2.3'),
        fontWeight:'bold',
        fontFamily:'sans-serif',
        fontStyle:'italic',
        marginLeft:wp('20')
       
    },
    accountBox:{
        borderWidth:5,
        paddingTop:hp('2'),
        borderRadius:20,
        borderColor:'#131E3A',
        height:hp('9'),
        marginLeft:40,
        marginRight:40,
        marginTop:80,
        backgroundColor:'#000C66',
        textAlign:'center',
        display:'flex',
        alignItems:'center'
    }
})