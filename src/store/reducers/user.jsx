import {
    OAUTH_SUCCESS
  } from '../../actions/user';
  
export const user = (
  state = {
    status: "初始畫面",
  },
  action
) => {
  switch (action.type) {
    case OAUTH_SUCCESS:
      console.log("action:", action);
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
};

export const selectTest = (state) => state.user.status;


  