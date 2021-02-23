const initialState = {
  user: {},
  baseUrl: 'http://64.227.11.112/'
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.payload.userType,
      };
    case "SIGN_IN":
      return {
        ...state,
        user: {
          ...state.user,
          elector_id: action.payload.elector_id,
          date_of_expire: action.payload.date_of_expire,
          date_of_issuance: action.payload.date_of_issuance,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          sexe: action.payload.sexe,
          front_picture: action.payload.front_picture,
        },
      };
    case "SIGN_UP":
      return {
        ...state,
        user: {
          ...state.user,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          phone: action.payload.phone,
          token: action.payload.token,
          email: action.payload.email,
          profile_pic: action.payload.profile_pic,
          password: action.payload.password,
        },
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          phone: action.payload.phone,
          email: action.payload.email,
          profile_pic: action.payload.profile_pic,
        },
      };

    case "SIGNOUT":
      return {
        ...state,
        user: action.payload.user,
        userType: "",
      };
    default:
      return state;
  }
}
