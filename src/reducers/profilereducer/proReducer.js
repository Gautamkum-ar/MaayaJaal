export const proReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_PROFILE": {
      return {
        ...state,
        profileData: payload.user,followerData:payload.follower
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
    case "FIND_SINGLE_PROFILE": {
      return {
        ...state,
        singleUserData: payload,
      };
    }
    case "GET_FOLLOWERS": {
      return {
        ...state,
        followerData: payload,
      };
    }
    default:
      return state;
  }
};
