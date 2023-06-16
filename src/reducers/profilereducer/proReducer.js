export const proReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_PROFILE": {
      return {
        ...state,
        profileData: payload,
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
