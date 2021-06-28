export const actionTypes = {
    SET_LOGIN: "SET_LOGIN",
    SET_LOADING: "SET_LOADING",
    SET_MODAL_VISIBLE: "SET_MODAL_VISIBLE",
    SET_ITEM: "SET_ITEM",
    UPDATE_LIST_ITEMS: "UPDATE_LIST_ITEMS",
    SET_MODE: "SET_MODE",
  };
  export const setLogin = data => ({
    type: actionTypes.SET_LOGIN,
    data
  });
  
  export const setLoading = data => ({
    type: actionTypes.SET_LOADING,
    data
  });

  export const setToken = data => ({
    type: actionTypes.SET_TOKEN,
    data
  });

  export const setModalVisible = data => ({
    type: actionTypes.SET_MODAL_VISIBLE,
    data
  });

  export const setItem = data => ({
    type: actionTypes.SET_ITEM,
    data
  });

  export const updateListItems = data => ({
    type: actionTypes.UPDATE_LIST_ITEMS,
    data
  });

  export const setMode = data => ({
    type: actionTypes.SET_MODE,
    data
  });