export const proReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_PROFILE": {
      return {
        ...state,
        profileData: payload,
      };
    }

    case "GET_ALL_USERS": {
      return {
        ...state,
        allusers: payload,
      };
    }
    case "UPDATE_PROFILE": {
      return {
        ...state,
        profileData: payload,
      };
    }
    default:
      return state;
  }
};
