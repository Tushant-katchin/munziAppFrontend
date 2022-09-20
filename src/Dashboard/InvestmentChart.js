import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar,  Card, Title, Paragraph, CardItem, WebView } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LineChart } from 'react-native-svg-charts';


 function InvestmentChart({name, item}) {
  const[trades, setTrades]=useState([])
  const[loading, setLoading]=useState(true)
  const[percent, setPercent]=useState()
  const[price, setPrice]=useState()
  const[error, setError]=useState()
    

  

 function fetchKline(name) {
    
    if(name=='USDT'){
        name='USD'
    }
    if(name=='WETH'){
        name='ETH'
    }
    fetch(`https://api.binance.com/api/v1/klines?symbol=${name}USDT&interval=1m&limit=50`, {
      method: 'GET'
    })
    .then(resp => resp.json())
    .then(resp => {
      const trades = resp.map(interval => parseFloat(interval[1]));

      const firstTrade = trades[0];
      const lastTrade = trades.slice(-1)[0];
      const percent = (((lastTrade - firstTrade) / firstTrade) * 100).toFixed(2);

      
      setLoading(false)
      setTrades(trades)
      setPercent(percent)
      setPrice(lastTrade)
    })
    .catch(err => {
      console.log(err);

   
    });
  }

  function chooseStyle() {
    

    if (parseFloat(percent) < 0) {
      return styles.priceDown;
    }

    return styles.priceUp;
  }

 

    const style = chooseStyle();
useEffect(() => {
 //fetchKline(name)
}, [])

let LeftContent = props => <Avatar.Image {...props} source={{ uri: item.logo }} />
    
    return (
        <View key={item.symbol} style={{display:'flex', flexDirection:'column', marginTop:5}}>
        <Card style={{width:wp(95), height:hp(15), backgroundColor:'#000C66', borderRadius:10, marginLeft:5}}>
<Card.Title titleStyle={{ color: "#fff" }}  title={item.name}  left={LeftContent}  />
<Card.Content style={{display:'flex',flexDirection:'row',color:'#fff'}}>
<Title style={{color:'#fff'}}></Title>
<Paragraph style={{color:'#fff', marginLeft:wp('10'),marginBottom:hp('10'), fontWeight:'bold'}}>{percent}%</Paragraph>
<Paragraph style={{color:'#fff', marginLeft:wp('50'), fontWeight:'bold'}}> +$100(+5%)</Paragraph>



</Card.Content>


</Card>

        </View>

    );
  }


export default InvestmentChart;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: 75,
  },
  chart: {
    height: 75,
  },
  priceUp: {
    color: 'rgb(0,153,51)',
  },
  priceDown: {
    color: 'rgb(204,51,51)',
  },
});