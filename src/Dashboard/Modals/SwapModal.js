import React,{useEffect, useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, ActivityIndicator, KeyboardAvoidingView,View, Button, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import "@ethersproject/shims"
import { ethers } from "ethers"
import { getBalance } from "../../components/Redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAddressBalances } from 'eth-balance-checker/lib/web3';


const SwapModal = ({modalVisible,setModalVisible}) => {
    const[loading, setLoading]=useState(false)
    const[balance, setBalance]=useState('')
    const [recieverAddress, setAddress]= useState('')
    const[amount, setAmount]=useState(null)
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState('ETH');
    const [isFocus, setIsFocus] = useState(false);
    const state = useSelector((state) => state);

    const data = [
      { label: 'USDT', value: 'USDT' },
      { label: 'ETH', value: 'ETH' },
      { label: 'WBNB', value: 'WBNB' },
      { label: 'BUSD', value: 'BUSD' },
      { label: 'DAI', value: 'DAI' }
    ];
    const getCustomBalance = async ()=>{

  
     const response= await fetch('http://3.19.76.40:2000/user/getbalance', {
        method: 'POST',
        headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
        },
       body: JSON.stringify({
        token:value2,
        walletAddress:state.wallet.address?state.wallet.address:''

      })  
       }).then((response) => response.json())
    .then((json) => {
      console.log(json);
      setBalance(json.responseData)
    })
    .catch((error) => {
      console.error(error);
    });


};
    

    

    const renderLabel = () => {
      if (!value || !isFocus) {
        return (
          <Text style={[styles.label, !isFocus && { color: 'blue' }]}>
            Select Token
          </Text>
        );
      }
      return null;
    };
    
    const dispatch = useDispatch();

    const SwapMoney = async () => {
      setLoading(true)

      if(!amount||!value||!value2){
        setLoading(false)
        return alert('All places are mandatory')
      }

      if(balance<=0){
        setLoading(false)
        return alert('You do not have enough balance to make this transaction')
      }

      if(amount>balance){
        setLoading(false)
        return alert('You do not have enough balance to make this transaction')
      }
      if(value===value2){
        setLoading(false)
        return alert('Same tokens cannot be swaped')
      }

      //  const privateKey=state.wallet.privateKey?state.wallet.privateKey:alert('no wallets connected')
      // console.log(privateKey)
         try {
          const response= await fetch('http://3.19.76.40:2000/user/swaptokens', {
            method: 'POST',
            headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
            },
           body: JSON.stringify({
            token1:value2,
            token2:value,
            privatekey:state.wallet.privateKey?state.wallet.privateKey:'',
            amount:amount
    
          })  
           }).then((response) => response.json())
        .then((json) => {
          console.log(json.transactionHash);
          getCustomBalance()
          setLoading(false)
          alert(`Swap Successful. Transaction hash :${json.transactionHash}`)
        })
        .catch((error) => {
          setLoading(false)
          alert(error)
          console.error(error);
        });
    
    
          } catch (error) {

            setLoading(false)
            alert(error)
            console.error(error);
          }
       
      
        
      };
    const Balance = async () => {
       
      if(state.wallet.address){

        await dispatch(getBalance(state.wallet.address))
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
        
        
      }
      };
      
      useEffect(() => {
        
        getCustomBalance()
      }, [value2])
      
      useEffect(() => {
       
        Balance()
       }, [])

  return (
    <View >
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
      height: '93%',
      marginTop: 'auto',
      marginBottom: 20,
      backgroundColor:'#ddd',
      borderRadius:20
     
    }}>
    <View style={styles.footer}>
      <Text style={styles.headerText}>My tokens</Text>
      <View elevation={5}>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select token' : 'select token'}
          searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue2(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      </View>
      <Text style={styles.headerText}>Swap To</Text>
      <View elevation={5}>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select token' : 'select token'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      </View>
      <View style={styles.Amount}>
      <Text style={styles.headerText}>Available Balance</Text>
      <Text style={styles.headerText}>{balance}</Text>
      {loading? <ActivityIndicator size="large" color="white" />:<Text> </Text>}
      <Text style={styles.headerText}>Enter Amount</Text>
      <View elevation={5}>
      <TextInput style={styles.textInput2} 
      onChangeText={(text) => {
       setAmount(text)
    }}
      />
      </View>
      </View>
    </View>
    <TouchableOpacity
    style={styles.addButton2}
    onPress={() => {
       SwapMoney()
        }}>
    <Text style={styles.addButtonText}>Swap</Text>
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
  )
}

export default SwapModal

const styles = StyleSheet.create({
    
      Amount:{
      display:'flex',
      alignItems:'center',
      textAlign:'center',
      justifyContent:'center'
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
       width:390,
       margin:10,
       borderRadius:10,
       shadowColor: "#000",
       height:40,
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
      },
    
      textInput2: {
        borderWidth:1,
        borderColor:'grey',
        width:200,
        margin:10,
        borderRadius:10,
        shadowColor: "#000",
        height:50,
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
        bottom: 10,
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
        bottom: 10,
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
        backgroundColor: '#ddd',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: '#ddd',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      

})
