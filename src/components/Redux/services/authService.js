import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers"
import { decryptFile } from "../../../utilities/utilities";

const logIn = async (user) => {
  console.log("user info", user)
  let response
  const { username, password } = user;
  try{

  
  response = await fetch('http://3.19.76.40:2000/user/login', {
    method: 'POST',
    headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
    },
   body: JSON.stringify({
             emailId: username,
             password: password})
   }).then((response) => response.json())
   .then(async (responseJson) => {
    console.log(responseJson)
   
    if (responseJson.responseCode===200) {
      AsyncStorage.setItem("user", JSON.stringify(user));
      return {
        status: "success",
        message: "You are redirecting to home page",
        user: username,
      };
    }
   else{
    if (responseJson.responseCode===401) {
      return {
        status: "verifyotp",
        message: "please verify your account first ",
        user: null
      };
    }
    if (responseJson.responseCode===400) {
      return {
        status: "invalid",
        message: "please provide valid credentials ",
        user: null
      };
    }
   }
    
  
  }).catch((error)=>{
    alert(error)
  })
}catch(e){
  console.log(e)
  alert(e)
}
  console.log(response)
  return response

  
};

const confirmOtp = async (user) => {
  console.log("user info", user);
  const { emailId,OTP } = user;
  const response = await fetch('http://3.19.76.40:2000/user/confirmotp', {
    method: 'POST',
    headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
    },
   body: JSON.stringify({
    emailId:emailId,       
    otp:OTP})  
   }).then((response) => response.json())
   .then((responseJson) => {
    console.log(responseJson)
    if (responseJson.responseCode===200) {
      AsyncStorage.setItem("otp", JSON.stringify(OTP));
      return {
        status: "success",
        message: "otp confirmed",
        OTP: OTP,
      };
      
    }
    if (responseJson.responseCode===500) {
      return {
        status: "invalid",
        message: "otp failed"
      };
    }
  
  });
  console.log(response)
  return response

  
};

const logOut = async () => {
  AsyncStorage.clear();
  return {
    status: "success",
    message: "You are logged out",
  };
};

const Extend = async () => {

 

  return {
    status: "success",
    message: "Topbar Extended",
    extended:true
  };
};

const Collapse = async () => {

 

  return {
    status: "success",
    message: "Topbar Collapsed",
    extended:false
  };
};



const getBalance = async (address) => {
  console.log(address)
  /*try{

    if(address) {
      const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545'); 
      const balancee=await provider.getBalance(address).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance)
        console.log(`balance: ${balanceInEth} ETH`)
        return balance
       })
      const balanceInEth = ethers.utils.formatEther(balancee);
      console.log(balanceInEth)
      // AsyncStorage.setItem('balance', balance);
      
      AsyncStorage.setItem('balance', balanceInEth);
      return {
        status: "success",
        message: "Balance fetched",
        walletBalance: balanceInEth
      };
    }
    else{
      return{
        status:"error",
        message:'failed to fetch balance',
        walletBalance:0
        
      }
    }
  }catch(e)
{
  console.log(e)
}  */



  const response = await fetch('http://172.20.10.6:2000/user/Balance', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address:address})
    }).then((response) => response.json())
    .then( (responseJson) => {
      console.log(responseJson)
      
if(responseJson.walletBalance){

  AsyncStorage.setItem('balance', responseJson.walletBalance);
  
  return {
    status: "success",
    message: "Balance fetched",
    walletBalance: responseJson.walletBalance
  };
}
else
{
  return {
    status: "success",
    message: "Balance fetched",
    walletBalance: 0
  }; 
}
     
      
      
     
      
    }).catch((e)=>{
      console.log(e)
      //alert('unable to update balance')
    })
    
 


  return response

  
  
 
  
  };
  

const Generate_Wallet = async () => {
  console.log('starting')
  const wallet = ethers.Wallet.createRandom();

console.log("address:", wallet.address);
console.log("mnemonic:", wallet.mnemonic.phrase);
console.log("privateKey:", wallet.privateKey);


//const accountFromMnemonic = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase);
const Wallet={
  address:wallet.address,
  
}
//console.log("accountFromMnemonic", accountFromMnemonic.address);
//return wallet.mnemonic.phrase
console.log(wallet)

  if (wallet) {
    AsyncStorage.setItem("Wallet", JSON.stringify(wallet))
    AsyncStorage.setItem("Wallet address", JSON.stringify(wallet.address));

  /*  const resp= fetch('http://192.168.203.84:2000/user/savewallet', {
      method: 'POST',
      headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
      },
     body: JSON.stringify({
      walletAddress:wallet.address})  
     }).then((response) => response.json())
     .then((responseJson) => {
      console.log(responseJson)
      if (responseJson.responseCode===200) {
        
        console.log(responseJson)
      }
    
    });*/

    return {
      status: "success",
      message: "Wallet generation successful",
      wallet: Wallet,
    };
  }

};

async function ImportWallet(privatekey){
  const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545'); 
  let privateKey = privatekey;
  //"0x8bf620dcb1b55ebddbc16f347c642438cad00d2b647cd6d272bed27bf5d75067";
  let walletWithProvider = new ethers.Wallet(privateKey, provider);
  let wallet={
    privateKey:privateKey,
    address:walletWithProvider.address,
    wallet:walletWithProvider

  }

  console.log(walletWithProvider)
  console.log(wallet)
  AsyncStorage.setItem("Wallet", JSON.stringify(wallet))
  return{
    status:'success',
    message: "Wallet generation successful",
    wallet: wallet,
  }
}

async function setCurrentWallet(privatekey, name){
  const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545'); 
  let privateKey = privatekey;
  let Name = name
  console.log(Name)
  //"0x8bf620dcb1b55ebddbc16f347c642438cad00d2b647cd6d272bed27bf5d75067";
  let walletWithProvider = new ethers.Wallet(privateKey, provider);
  let wallet={
    privateKey:privateKey,
    address:walletWithProvider.address,
    name:Name
  }
  AsyncStorage.setItem("Wallet", JSON.stringify(wallet))
  return{
    status:'success',
    message: "Wallet import successful",
    wallet: wallet,
  }
}


async function importAllWallets(accounts){
  const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545'); 
  
  let allWallets=[]
  console.log(accounts)
  accounts.map(async (element )=> {
    console.log(element)
        
    let walletWithProvider =  new ethers.Wallet(element.privateKey, provider);
  let wallet={
    name:element.name,
    privateKey:element.privateKey,
    address:walletWithProvider.address,

  }

allWallets.push(wallet)
  //console.log(walletWithProvider)
  console.log(wallet)
  console.log(allWallets)
  
   
    
    
    

});
AsyncStorage.setItem("wallets", JSON.stringify(allWallets))
return{
  status:'success',
  message: "Wallet import successful",
  wallets: allWallets,
}
}


export default {
  logIn,

  logOut,

 Generate_Wallet,

 ImportWallet,

 getBalance,

 Extend,

 Collapse,

 confirmOtp,

 importAllWallets,

 setCurrentWallet

};