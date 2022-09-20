import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button ,TextInput, FlatList, TouchableOpacity,ActivityIndicator, Alert, ScrollView  } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../components/Redux/actions/auth";
import { Avatar,  Card, Title, Paragraph, CardItem, WebView } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Chart from './Chart';
import InvestmentChart from './InvestmentChart';
import { importAllWallets } from '../components/Redux/actions/auth';
import { getWallets } from '../constants/alertConstants';
import { readData } from '../utilities/utilities';
const LeftContents = props => <Avatar.Image {...props} source={{ uri: 'https://static.alchemyapi.io/images/assets/825.png' }} />
const Home2 = ({navigation}) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const[balances, setBalances]=useState([])
    const[loading, setLoading]= useState(false)
    const[percent,setPercent]=useState(2)
    let LeftContent
    var per=percent
    
    const data = [150, 130, 140, 135, 149, 158, 125, 105,155, 153, 153,144, 150, 160, 80]

    
  const onLogout = () => {
      dispatch(logout()).then((response) => {
        if (response.status === "success") {
          navigation.replace("LoginScreen");
        }
      });
    };
    
    const getAllBalances= async ()=>{
      setLoading(true)
      const response= await fetch('http://3.19.76.40:2000/user/getAllbalances', {
        method: 'POST',
        headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
        },
       body: JSON.stringify({
        walletAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'//state.wallet.address?state.wallet.address:''

      })  
       }).then((response) => response.json())
    .then((json) => {
      setLoading(false)
      setBalances(json)
      console.log(balances);
    })
    .catch((error) => {
      console.error(error);
      alert(error)
    });
    }

   
    

    useEffect(() => {
      getWallets(state.user, readData,dispatch, importAllWallets)
      getAllBalances()
    }, [])
    
    
    


  return (
    <View style={Styles.container}>
      <View style={Styles.content}>
      <Text style={Styles.text}>Main Portfolio</Text>
      <Text style={Styles.text2}>See All +</Text>
      </View>
      <View>
      <ScrollView style={{marginTop:10, display:'flex', flexDirection:'row'}}
      horizontal={true}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={200}
    decelerationRate="fast"
    pagingEnabled
      >
      {balances?balances.slice(1, 6).map((item)=>{
        console.log(item.symbol)
         LeftContent = props => <Avatar.Image {...props} source={{ uri: item.logo }} />
               return(
                <View key={item.symbol} style={{display:'flex', flexDirection:'column'}}>
                <Card style={{width:180, height:200, backgroundColor:'#000C66', borderRadius:10, marginLeft:5}}>
    <Card.Title titleStyle={{ color: "#fff" }}  title={item.name}  left={LeftContent}  />
    <Card.Content style={{display:'flex',flexDirection:'row',color:'#fff'}}>
      <Title style={{color:'#fff'}}>{item.balance}</Title>
      <Paragraph style={{color:'#fff', marginLeft:5, fontWeight:'bold'}}> {item.symbol}</Paragraph>
      
 
      
      </Card.Content>
      <Card.Content style={{ height: 100 }}>
      <Chart
      name={item.symbol}
      setPercent={setPercent}
      percent={percent}
  />
 </Card.Content>
      
      
  </Card>
  
                </View>
               )  
      }):<View><Text>'Wow, so empty'</Text></View>}
  </ScrollView>
  {loading?<ActivityIndicator size="large" color="white" />:<View></View>}
  <View style={Styles.content}>
      <Text style={Styles.text}>Investment Portfolio</Text>
      <Text style={Styles.text2}>See All +</Text>
      </View>
      <View >
      <ScrollView style={{marginTop:10, display:'flex', flexDirection:'row'}}
      vertical={true}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={200}
    decelerationRate="fast"
    pagingEnabled
      >
      {balances?balances.slice(1, 3).map((item)=>{
        console.log(item.symbol)
      
       
         LeftContent = props => <Avatar.Image {...props} source={{ uri: item.logo }} />
               return(
                <View key={item.symbol} style={{display:'flex', flexDirection:'column'}}>
                <InvestmentChart name={item.symbol} item={item}/>
    
      
 
  
                </View>
               )  
      }):<View><Text>'Wow, so empty'</Text></View>}
      </ScrollView>
      </View>

      </View>
     </View>
  )
}

export default Home2
const Styles = StyleSheet.create({
    container: {
     display:'flex',
      backgroundColor:'#131E3A',
      height:hp('100'),
      width:wp('100'),
      
     
    },
   content:{
    display:'flex',
    flexDirection:'row',
    marginTop:5,
    color:'white',
    justifyContent:'space-evenly',
   },
   text:{
    color:'grey',
    marginRight:wp('20'),
    fontWeight:'bold'
   },
   text2:{
    color:'grey',
    marginLeft:wp('20'),
    fontWeight:'bold'
   },
   priceUp: {
   
    color: 'rgba(0,153,51,0.6)',
  },
  priceDown: {
    
    color: 'rgba(204,51,51,0.6)',
  }
  });
  /*<View style={{marginTop:10}}>
<Button title='logout'  onPress={onLogout}/>
</View> 

<Card.Content style={{ height: 100 }}>
      <Chart
      name={item.symbol}
      setPercent={setPercent}
  />
 </Card.Content>
      
*/