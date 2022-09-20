import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../components/Redux/actions/auth";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {  TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import Home2 from "./Home2";
import Settings from '../../Settings'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Assests from "./Assests";
import Market from "./Market";
import munziicon from '../../assets/title_icon.png'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyHeader from "./MyHeader";
import Wallet from "./Wallet";
import MyHeader2 from "./MyHeader2";
import { Extend } from "../components/Redux/actions/auth";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {  Collapse } from "../components/Redux/actions/auth";
import store from "../components/Redux/Store";
const Tab = createBottomTabNavigator();

const Dashboard = ({ navigation }) => {
  let statee = useSelector((state) => state)
  const[extended, setExtended]=useState(false)
  const[state, setState]=useState(statee)
  const dispatch = useDispatch();
  //let state = store.getState()
  console.log(state)
  
  const updateState=(()=>{
    let data = store.getState()
    return setState(data)
  })
  

function changeState(){
 
  
  const data = dispatch(Extend())
  .then((response) => {
    
    console.log(response)
    const res =  response
    if (res.status == "success") {
      
      console.log(res)
      console.log('success')
      updateState()
    }
  })
  .catch((error) => {
    console.log(error)
    
    
  });
   console.log(data)
  }

  function collapseState(){
  
    
    const data = dispatch(Collapse())
  .then((response) => {
    
    console.log(response)
    const res =  response
    if (res.status == "success") {
      
      console.log(res)
      console.log('success')
     updateState()
      
    }
  })
  .catch((error) => {
    console.log(error)
    
    
  });
}


  const Header1 = (title, state)=>{
    return <MyHeader title={title} state={state} changeState={changeState} extended={extended} setExtended={setExtended} />
  
  }
  const Header2 = (title, state)=>{
    return <MyHeader2 title={title} state={state} changeState={collapseState} extended={extended} setExtended={setExtended}/>
  
  }


  
  
return (
  <>
       
      <Tab.Navigator
      shifting={false}
      barStyle={{ backgroundColor:'#131E3A',  color:'white' }} //This is where you can manipulate its look. 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size=33
            if (route.name === 'Home') {

                iconName = focused? 'ios-home-sharp': 'ios-home-sharp';
                iconName='ios-home-sharp'
            } if (route.name === 'Assets') {
              iconName = focused? 'ios-home-sharp': 'ios-home-outline';
              iconName='ios-pie-chart-sharp'
          }
          if (route.name === 'Market') {
            iconName = focused? 'ios-home-sharp': 'ios-home-outline';
            iconName='ios-bar-chart-sharp'
        }
           if (route.name === 'Account') {
                iconName = focused ? 'ios-people-sharp' : 'ios-people-outline';
                iconName='ios-people-sharp'
            }

          

            
           
            
            return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarLabel: ({focused}) => {
          let iconColor;
          
            iconColor = focused ? 'red' : 'white'
          
          return <Text style={{color: iconColor, fontSize: hp('2'), textAlign: "center", marginBottom:10}}>{route.name}</Text>
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { position: 'absolute', backgroundColor:'#000C66', height:hp('12'),  borderTopLeftRadius: 30,
        borderTopRightRadius: 30},
        headerTitleAlign: 'center'

        //Tab bar styles can be added here
      
    })}
     >
     
      <Tab.Screen name="Home" component={Home2} options={{
        header: () => (
          

            state.extended===false?Header1('Home', state):Header2('Home', state)
         
        ),
        headerShown: false
      
      } }/>
      <Tab.Screen name="Market"  component={Market}  options={{
        header: () => (
          

          state.extended===false?Header1('Home', state):Header2('Home', state)
       
      ),
      headerShown: false
      }} />
      <Tab.Screen name="Wallet" component={Wallet}  options={{
        tabBarIcon: ({ focused }) => {
            let iconName;
            iconName = 'ios-home-sharp' //for icon or image
            let iconColor;
          
            iconColor = focused ? 'red' : 'grey'
            return (
                <View>
                <Text style={{ width: wp('17'), height: hp('10'),position:'absolute',right:wp('-20'), bottom:hp('-8')}}>
                <Ionicons name={'wallet'} size={hp('5')} color={iconColor} />
                </Text>
                  </View>
            )
        },
        tabBarLabel: ({focused}) => {
          let iconColor;
          
            iconColor = focused ? 'red' : 'white'
          
          return <Text style={{width:wp('30') ,color: iconColor, fontSize: hp('2.5'), textAlign: "center", marginBottom:10, marginRight:-60}}>Wallet</Text>
        },
        header: () => (
          state.extended==false?Header1('Home', state):Header2('Home', state)
        ),
        headerShown: false
      
      }}  />

    <Tab.Screen name=" "  options={{
      tabBarIcon: ({ focused }) => {
          let iconName;
          iconName = 'ios-home-sharp' //for icon or image
          return (
              <View>
                  <Image source={munziicon} style={{ width: wp('20'), height: hp('7'),position:'absolute',right:wp('1'), bottom:hp('3')}} resizeMode="contain" />
              </View>
          )
      },
      tabBarLabel: ({focused}) => {
        let iconColor;
        
          iconColor = focused ? 'red' : 'white'
        
        return <Text style={{color: iconColor, fontSize: 1, textAlign: "center", marginBottom:10, marginRight:80}}></Text>
      },
      
  }} component={Market} listeners={{
    tabPress: e => {
      // Prevent default action
      e.preventDefault();
    }}} />

      <Tab.Screen name="Assets" component={Assests} options={{
        header: () => (
          state.extended===false?Header1('Home', state):Header2('Home', extended)
        ),
        headerShown: false
      }} />
      <Tab.Screen name="Account" component={Settings} options={{
        header: () => (
          state.extended===false?Header1('Home', state):Header2('Home', extended)
        ),
        headerShown: false,
        
      }} />
      </Tab.Navigator>
      
      </>
  );
};
export default Dashboard;


