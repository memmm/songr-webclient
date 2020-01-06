import { SET_MATCH, SET_MESSAGE, DELETE_MATCH } from "../types";

const initialState = {
  messages: [],
  message: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MATCH:
      return {
        ...state
      };
    case SET_MESSAGE:
      return {
        ...state
      };
    default:
      return state;
  }
}
