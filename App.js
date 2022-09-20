import './global';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,ScrollView, FlatList, TouchableOpacity, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { Register } from './Register';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from "react-redux";
import store from "./src/components/Redux/Store";
import NavigationProvider from './src/Dashboard/Navigation';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { NativeBaseProvider } from 'native-base';



LogBox.ignoreLogs(['Setting a timer']);
export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
 
  return (
    
    <StoreProvider store={store}>
    <NativeBaseProvider>
    <PaperProvider>
    <View style={styles.container}>
    <StatusBar hidden />
    <NavigationProvider />
    </View>
    </PaperProvider>
    </NativeBaseProvider>
        
        </StoreProvider>
  );
    }
const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
    backgroundColor: '#131E3A',
    color:'white',
    


    
  },
 content:{
padding:40,
 }
});
