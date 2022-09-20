import { LOGIN_SUCCESS, LOGOUT, WALLET_SUCCESS, IMPORT_SUCCESS, BALANCE_SUCCESS, CONFIRMOTP,EXTENDED , COLLAPSE, IMPORTALLWALLETS, SETCURRENTWALLET} from "../actions/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
const user = AsyncStorage.getItem("user");
const wallet = AsyncStorage.getItem("wallet");
const walletBalance = AsyncStorage.getItem("walletBalance");
const OTP = AsyncStorage.getItem("OTP");
const wallets= AsyncStorage.getItem("wallets");


const initialState = user
  ? { isLoggedIn: true, user, wallet, walletBalance, extended:false, otp:OTP , wallets:wallets}
  : { isLoggedIn: false, user: null , wallet:null, otp:null, wallets:null};
export default auth = (state = initialState, action) => {
  const { type, payload } = action;
switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
 case WALLET_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          wallet: payload.wallet,
        };
case IMPORT_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          wallet: payload.wallet,
        };
case BALANCE_SUCCESS:
          return {
            ...state,
            isLoggedIn: true,
            walletBalance: payload.walletBalance,
          };
case EXTENDED:
          return {
            ...state,
            isLoggedIn: true,
            extended: true,
          };
case COLLAPSE:
            return {
              ...state,
              isLoggedIn: true,
              extended: false,
            };
case CONFIRMOTP:
            return {
              ...state,
              isLoggedIn: false,
              OTP:payload.OTP
            };
case IMPORTALLWALLETS:
             return {
              ...state,
              isLoggedIn:true,
              wallets:payload.wallets
             }
  case SETCURRENTWALLET:
             return {
              ...state,
              isLoggedIn:true,
              wallet:payload.wallet
             }
    default:
      return state;
  }
};