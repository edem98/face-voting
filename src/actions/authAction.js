import {
  SIGN_IN,
  SIGN_UP,
  SET_USER_TYPE,
  UPDATE_USER,
  SIGNOUT,
  CHANGE_PASSWORD,
} from "./type";

const signIn = (credentials) => {
  return {
    type: SIGN_IN,
    payload: credentials,
  };
};

const logOut = () => {
  return {
    type: SIGNOUT,
    payload: { user: {}, userType: "" },
  };
};

export { signIn, logOut };
