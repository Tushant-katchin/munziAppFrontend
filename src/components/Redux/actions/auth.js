import { LOGIN_SUCCESS, LOGOUT, WALLET_SUCCESS , IMPORT_SUCCESS, BALANCE_SUCCESS, EXTENDED, CONFIRMOTP,COLLAPSE, IMPORTALLWALLETS, SETCURRENTWALLET} from "./type";
import AuthService from "../services/authService";
export const login = (user) => (dispatch) => {
  return AuthService.logIn(user).then(
    (response) => {
      console.log('this')
      console.log(response)
      if (response.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response.user },
        });
Promise.resolve();
        return response;
      }
      if(response.status==='verifyotp'){
        return response;
      }
      if(response.status==='invalid'){
        return response;
      }

    },
    (error) => {
      const message = error.toString();
Promise.reject();
      return message;
    }
  );
};

export const confirmOtp = (user) => (dispatch) => {
  return AuthService.confirmOtp(user).then(
    (response) => {
      console.log('this')
      console.log(response)
      if (response.status === "success") {
        dispatch({
          type: CONFIRMOTP,
          payload: { OTP: response.OTP },
        });
Promise.resolve();
        return response;
      }
    },
    (error) => {
      const message = error.toString();
Promise.reject();
      return message;
    }
  );
};
export const logout = () => (dispatch) => {
  return AuthService.logOut().then((response) => {
    if (response.status === "success") {
      dispatch({
        type: LOGOUT,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const Extend = () => (dispatch) => {
  
  return AuthService.Extend().then((response) => {
    if (response.status === "success") {
      dispatch({
        type: EXTENDED,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const Collapse = () => (dispatch) => {
  
  return AuthService.Collapse().then((response) => {
    if (response.status === "success") {
      dispatch({
        type: COLLAPSE,
      });
      Promise.resolve();
      return response;
    }
  });
};




export const Generate_Wallet  = () => (dispatch) => {
  return AuthService.Generate_Wallet().then((response) => {
    if (response.status === "success") {
      dispatch({
        type: WALLET_SUCCESS,
        payload: { wallet: response.wallet },
      });
      Promise.resolve();
      console.log(response)
      return response;
    }
  });
};

export const Import_Wallet  = (privateKey) => (dispatch) => {
  return AuthService.ImportWallet(privateKey).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: IMPORT_SUCCESS,
        payload: { wallet: response.wallet },
      });
      Promise.resolve();
      console.log(response)
      return response;
    }
  });
};

export const importAllWallets  = (accounts) => (dispatch) => {
  return AuthService.importAllWallets(accounts).then((response) => {
    if (response) {
      dispatch({
        type: IMPORTALLWALLETS,
        payload: { wallets: response.wallets },
      });
      Promise.resolve();
      console.log(response)
      return response;
      
    }
  });
};

export const setCurrentWallet = (privateKey, name) => (dispatch) => {
  return AuthService.setCurrentWallet(privateKey, name).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: SETCURRENTWALLET,
        payload: { wallet: response.wallet },
      });
      Promise.resolve();
      console.log(response)
      return response;
    }
  });
};

export const getBalance =  (user) => (dispatch) => {
  return AuthService.getBalance(user).then(
   (response) => {
      console.log(response)
      let res =  response
      if (res.status === "success") {
        dispatch({
          type: BALANCE_SUCCESS,
          payload: { walletBalance: response.walletBalance },
        });
      Promise.resolve();
        return response;
      }
    },
    (error) => {
      const message = error.toString();
Promise.reject();
      return message;
    }
  );
};