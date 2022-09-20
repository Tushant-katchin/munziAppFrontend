import React,{useState} from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "../components/Redux/Store";
import Dashboard from "./Home";
import { Register } from "../../Register";
import { LoginPage } from "../Login/Login";
import MyWallet from "./MyWallet";
import { useDispatch, useSelector } from "react-redux";
import CreateWallet from "./CreateWallet";
import ImportWallet from "./ImportWallet"
import { CardStyleInterpolators, TransitionPreset } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import MyHeader from "./MyHeader";
import MyHeader2 from "./MyHeader2";
import { Extend, Collapse } from "../components/Redux/actions/auth";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { ConfirmOtp } from "../Register/confirmOtp";
import Generate from "../../Generate"

const Stack = createNativeStackNavigator();


const AuthStack = ({Header1,Header2, state, dispatch, getHeaderTitle}) => (
  
  <NavigationContainer>
    <Stack.Navigator initialRouteName="RegisterScreen" mode='modal' 
    screenOptions={{
      animation: "slide_from_right",
      
    }} >
      <Stack.Screen
        name="LoginScreen"
        component={LoginPage}
        options={{ headerShown: false,
          
          
         }}
         
         
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{ headerShown: false,
          
        }}
      />
      <Stack.Screen
        name="confirmOtp"
        component={ConfirmOtp}
        options={{ headerShown: false,
          
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={Dashboard}
        options={{  
          headerShown: true,
          header: ({route}) => state.extended===false?Header1( getHeaderTitle(route), state):Header2(getHeaderTitle(route), state) 
        }}
      />
      <Stack.Screen
        name="MyWallet"
        component={MyWallet}
        options={{ headerShown: true,
          headerStyle:{backgroundColor:'#000C66'},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        
        }}
      />
      <Stack.Screen
        name="CreateWallet"
        component={CreateWallet}
        options={{ headerShown: true,
          headerStyle:{backgroundColor:'#000C66'},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
         }}
      />
      <Stack.Screen
        name="ImportWallet"
        component={ImportWallet}
        options={{ headerShown: true,
          headerStyle:{backgroundColor:'#000C66'},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
         }}
      />
      <Stack.Screen
        name="buycrypto"
        component={Generate}
        options={{ headerShown: true,
          
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
const NavigationProvider = () => {
  let statee = useSelector((state) => state)
  const[extended, setExtended]=useState(false)
  const[state, setState]=useState(statee)

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
    return <MyHeader title={title} state={state}  changeState={changeState} extended={extended} setExtended={setExtended} />
  
  }
  const Header2 = (title, state)=>{
    return <MyHeader2 title={title}  state={state} changeState={collapseState} extended={extended} setExtended={setExtended}/>
  
  }
  
  const dispatch = useDispatch();

  function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName)
  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Market':
      return 'Market';
    case 'Account':
      return 'Account';
    case 'Wallet':
      return 'Wallet';
      case 'Assets':
      return 'Assets';
      default:
      return "Home"
  }
  }

  return <AuthStack getHeaderTitle={getHeaderTitle}  extended={extended} state={state} Header1={Header1} Header2={Header2} dispatch={dispatch}/>;
};
export default NavigationProvider;