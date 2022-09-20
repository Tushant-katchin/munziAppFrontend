import { combineReducers } from 'redux'
const defaultState=0
const loginReducer = (state=defaultState, action) => {
  switch(action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        email: action.payload.email,
        loginSuccess: true,
    });
    case "LOGOUT":
      return Object.assign({}, state, {
        loginSuccess: false,
      });
      case "WALLET_SUCCESS":
      return Object.assign({}, state, {
        wallet: action.payload.wallet
    });
    case "IMPORT_SUCCESS":
      return Object.assign({}, state, {
        wallet: action.payload.wallet
    });
    case "BALANCE_SUCCESS":
      return Object.assign({}, state, {
        walletBalance: action.payload.walletBalance
    });
    case "EXTENDED":
      return Object.assign({}, state, {
        extended: true
    });
    case "COLLAPSE":
      return Object.assign({}, state, {
        extended: false
    });
    case "CONFIRMOTP":
      return Object.assign({}, state, {
        OTP:action.payload.OTP
    });
    case "IMPORTALLWALLETS":
      return Object.assign({}, state, {
        wallets:action.payload.wallets
    });
    case "SETCURRENTWALLET":
      return Object.assign({}, state, {
        wallet:action.payload.wallet
    });
    
    default:
      return state;
  }
}

export default combineReducers({ login: loginReducer})