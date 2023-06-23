export const postReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_POST": {
      return {
        ...state,
        postData: payload,
      };
    }

    case "EDIT_POST": {
      return {
        ...state,
        editpost: state.postData.find((post) => post._id === payload),
      };
    }
    case "CREATE__POST": {
      return {
        ...state,
        postData: [payload, ...state.postData],
      };
    }

    case "DELETE_POST": {
      return {
        ...state,
        postData: payload,
      };
    }
    case "LIKE_POST": {
      return {
        ...state,
        postData: payload.data,
        likePostData: payload.allLikes,
      };
    }
    case "GET_COMMENT":{
      return{
        ...state,commentData:payload
      }
    }

    case 'POST_COMMENT':{
      return{
        ...state,commentData:payload
      }
    }
    case 'DELETE_COMMENT':{
      return{
        ...state,commentData:payload
      }
    }
  }
};
