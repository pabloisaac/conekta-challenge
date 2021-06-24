import React, { useReducer } from "react";
import { initialState, reducer, AppContext } from "./store/reducer";
import Router from "./components/Router";


const App = () => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      <Router />
    </AppContext.Provider>
  );
};

export default App;
