export const postReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_POST": {
      return {
        ...state,
        postData: payload.findPost,
        likePostData: payload.like,
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
        postData: payload.data.populatePost,
        likePostData: payload.data.likedata,
      };
    }
    case "GET_COMMENT": {
      return {
        ...state,
        commentData: payload,
      };
    }

    case "POST_COMMENT": {
      return {
        ...state,
        commentData: payload,
      };
    }
    case "DELETE_COMMENT": {
      return {
        ...state,
        commentData: payload,
      };
    }
    case "SORT_BY_DATE": {
      return {
        ...state,
        postData: state.postData.sort((a, b) =>
          b.createdAt
            .split("/")
            .reverse()
            .join()
            .localeCompare(a.createdAt.split("/").reverse().join())
        ),
      };
    }

    case "SORT_BY_LIKES": {
      return {
        ...state,
        postData: state.postData.sort((a, b) => b.likes - a.likes),
      };
    }
    default:
      return state;
  }
};
