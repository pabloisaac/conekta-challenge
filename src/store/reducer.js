import { actionTypes } from "./actions";
import { createContext } from "react";

export const AppContext = createContext({});

export const initialState = {
  login: false,
  loading: false,
  modalVisible: false,
  item: {},
  listItems: []
};

export const reducer = (state = {}, action) => {
  let response;
  switch (action.type) {
    case actionTypes.SET_LOGIN:
      response = Object.assign({}, state, {
        login: action.data
      });
      return response;

    case actionTypes.SET_LOADING:
      response = Object.assign({}, state, {
        loading: action.data
      });
      return response;

    case actionTypes.SET_MODAL_VISIBLE:
      response = Object.assign({}, state, {
        modalVisible: action.data
      });
      return response;

    case actionTypes.SET_ITEM:
      response = Object.assign({}, state, {
        item: action.data
      });
      return response;

    case actionTypes.UPDATE_LIST_ITEMS:
      response = Object.assign({}, state, {
        listItems: action.data
      });
      return response;

    default:
      return;
  }
};