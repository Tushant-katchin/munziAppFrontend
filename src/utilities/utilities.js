import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Alert } from 'react-native';
import "react-native-get-random-values"
import "@ethersproject/shims"
import {  utils } from "ethers"
var ethers = require('ethers');

var CryptoJS = require("crypto-js");

export async function getTx (value){
  console.log(value)
  //const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  //0xb95d6b10ac0a25bd273b02c4a218a73421131c58f93ded639a464664913ecaa5
  //const amount=web3.utils.toWei(String(valuee), 'ether');
 // console.log(web3)
 
  const privKey = "0x8f9bf6100069b8a670bc26bf517fea21ce6eae3280f949f98a7d05d57d6314e4"//decrypt;
  const addressTo = "0x0E52088b2d5a59ee7706DaAabC880Aaf5A1d9974"//address;

  
const addressFrom = '0x4c817a1aba8069B12859e3249276844feCAE5051';
const  walletPrivateKey = new ethers.Wallet(privKey)
    //const provider =  new ethers.providers.StaticJsonRpcProvider('https://bsc.getblock.io/testnet/?api_key=a011daa0-3099-4f55-b22c-c3a3d55898d0'); // TESTNET
    const provider =  new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET
    const tx = {
        to: addressTo,
        value: ethers.utils.parseEther("0.0001")
       
        
      }
      console.log(await provider.getGasPrice(addressFrom))
      const wallet = walletPrivateKey.connect(provider)
     var transaction = {
        gasLimit: 1000000,
        gasPrice: await provider.getGasPrice(addressFrom),
        nonce:provider.getTransactionCount(addressFrom),
        to: addressTo,
        data: "0x",
        value: ethers.utils.parseEther("0.000666"),
      };
  
      //console.log(wallet)
      const signer = await wallet.signTransaction(transaction)
      console.log(signer)
      const txx = await provider.sendTransaction(signer)
      console.log(txx)
//const txxx =await wallet.sendTransaction(signer)
//console.log(txxx)
}
export const encryptFile = async (privateKey, password) =>{

  var ciphertext = CryptoJS.AES.encrypt(privateKey, password);
  console.log("encrypted text", ciphertext.toString());
  return ciphertext.toString()
 
}
export const decryptFile= async (privateKey, password) =>{
  var bytes  = CryptoJS.AES.decrypt(privateKey.toString(), password);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  //console.log("decrypted text", plaintext);
  return plaintext
}
export const saveWallet = async (emailId,path, password, name)=>{
  const response= await fetch('http://3.19.76.40:2000/user/savewallet', {
    method: 'POST',
    headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
    },
   body: JSON.stringify({
    emailId:emailId,
    name:name,
    path: path,
    password:password

  })  
   }).then((response) => response.json())
.then((json) => {
 
  console.log(json);
})
.catch((error) => {
  console.error(error);
});
}

export const saveFile = async (name,privateKey, password, emailId) => {
  
  const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (permission.granted) {
    
    let directoryUri = permission.directoryUri;
    let data =`${privateKey}`
    // Create file and pass it's SAF URI
    const key = await encryptFile(data, password)
    console.log(key)
    console.log(password)
    await StorageAccessFramework.createFileAsync(directoryUri, `${name}.txt`, "application/text").then(async(fileUri) => {
      // Save data to newly created file
      await FileSystem.writeAsStringAsync(fileUri, key, { encoding: FileSystem.EncodingType.UTF8 });
       console.log(fileUri)
       saveWallet(emailId,fileUri, password, name)
       alert("File Saved")
    })
    .catch((e) => {
      console.log(e);
    });
  
  }
  else {
    alert("You must allow permission to save.")
  }
}

//content://com.android.externalstorage.documents/tree/primary%3ADownload%2FMunzi/document/primary%3ADownload%2FMunzi%2Fprivate%20(1).pdf
export const readData = async (emailId, dispatch, importAllWallets)=>{
  let result=0
  var allWallets =[]
  let password
  try{

    const response= await fetch('http://172.20.10.6:2000/user/getallwallets', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailId:emailId,
        
        
      })  
    }).then((response) => response.json())
    .then(async (json) => {
      const accounts =json.accounts
      console.log(accounts[0].length)
      if(accounts[0].length!==0){
        
        accounts.map(async (element )=> {
          
          
          for(let i=0;i<element.length;i++ ){
            
            const uri=element[i].filePath//'content://com.android.externalstorage.documents/tree/primary%3ADownload%2FEncrypt/document/primary%3ADownload%2FEncrypt%2Fmaxy.txt'
            password=element[i].encryptionPassword
            result = await FileSystem.readAsStringAsync(uri,{ encoding: FileSystem.EncodingType.UTF8 }).then(async data => {
              
              let filedata={}
              filedata.privateKey=data
              
              console.log(element[i].accountName)
              const decrypt = await decryptFile(filedata.privateKey, password)
              
              allWallets.push({privateKey:decrypt, name :element[i].accountName}) 
              
              return  allWallets
              //console.log(allWallets)
              // are you sure you want to resolve the data and not the base64 string? 
            }).catch(err => {
              console.log("​getFile -> err", err);
              alert('error while getting the file. Please make sure the file exists or is in valid format')
            });;
          }
          
          dispatch(importAllWallets(allWallets))
          .then(async (response) => {
            if(response){
              console.log(response)
              alert('wallets import successful')
            }
            
            
          })
          .catch((error) => {
            
            console.log(error)
            alert('failed to import wallets. please try again')
            
          });
          
          
          
        });
        
      }
        else{
          console.log('no wallets found')
          alert('No wallets found. make sure you have the files with privatekey')
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
    }catch(e){
      console.log(e)
      alert('failed to import wallet')   
    }
    
    console.log(allWallets)
    return allWallets;
  }
  
export const VerifyTransaction = async (emailId,name,pass, SendMoney, balance,amount,address, setLoading, setVisible, setVisible2, visible2)=>{
  var isValid =[]
 
  var val ={}
  let result
  let resultt=0
 
  let data=[]
  let validity
console.log(name)
console.log(pass)
 const  response = await fetch('http://172.20.10.6:2000/user/getallwallets', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailId:emailId,
      
      
    })  
  }).then((response) => response.json())
  .then( async (json) => {
    const accounts =json.accounts
    console.log(accounts.length)
   // console.log(acc)
   //console.log(filteredHomes)
   let isValid1 =undefined
   console.log(json.accounts)


   //const newArray= accounts.map(element => element);
   //console.log(newArray)

   for(let i=0;i<=json.accounts.length;i++){
    await json.accounts.map((e)=>{
     // console.log(e[i])
      data.push(e[i])
     // console.log(data)
     })
    // console.log(accounts[i].accountName)
   }
   
if(data!==undefined){
data.forEach( async(element, index, accounts) => {
    console.log(element.accountName); 
    if(element.accountName===name){
        
      console.log(element)
      const uri=element.filePath//'content://com.android.externalstorage.documents/tree/primary%3ADownload%2FEncrypt/document/primary%3ADownload%2FEncrypt%2Fmaxy.txt'
     let password=pass
     result = await FileSystem.readAsStringAsync(uri,{ encoding: FileSystem.EncodingType.UTF8 })
     console.log(result)
     let filedata={}
     filedata.privateKey=result
     const decrypt = await decryptFile(filedata.privateKey, password)
     if(decrypt){
      setVisible(false)
      console.log(decrypt)
      isValid.push({privateKey:decrypt, valid:true}) 
      
      console.log(isValid)
      
     // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
      //console.log(web3)
     //const data = await getTx(amount,decrypt,address)
    // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  //0xb95d6b10ac0a25bd273b02c4a218a73421131c58f93ded639a464664913ecaa5
  
  


 let data =  await SendMoney(address, amount, decrypt, balance, setLoading)
     }
     else{
      Alert.alert(
        "Invalid Password",
        "Do you want to enter private key manually?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () =>        setVisible2(true)        }
        ]
      );
     

      
     }
       
      
    }
    
});

}
 
  }).catch(err => {
    
    console.log(err);
    
  });
  
  

  }
    




///junk section
/*
const createPDF = async (html) => {
  try {
      const { uri } = await Print.printToFileAsync({ html });
      return uri;
  } catch (err) {
      console.error(err);
  }
};

export const saveData= async (name,privateKey)=>{
console.log(privateKey)
  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 14px;
                color: rgb(255, 196, 0);
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
         <h1>Account Name:</h1>
        <h1>${name}</h1>
        <h1>Private Key:</h1>
        <h1>${privateKey}</h1>
        
    </body>
    </html>
`;

 
    const Content= await createPDF(content)
    console.log(Content)
    try {
      const fileString = await FileSystem.readAsStringAsync(Content, { encoding: FileSystem.EncodingType.Base64 });
      
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, 'private', 'application/pdf')
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
           console.log(uri)
            alert('Report Downloaded Successfully')
          })
          .catch((e) => {
          });
      } catch (e) {
        throw new Error(e);
      }

    } catch (err) {
    }
    
}

function stringToUint8Array(str) {
  const length = str.length
  const array = new Uint8Array(new ArrayBuffer(length))
  for(let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
  return array
}

*/