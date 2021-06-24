import React, { useContext, useEffect } from "react";
import { AppContext } from "../store/reducer";
import { setLogin } from "../store/actions.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { login } from "../services/ApiConekta";
import Header from "./Header";
import Form from "./Form";
import Admin from "./Admin";
import _ from "lodash";

const RouterComponent = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      if(!state.login){
        const response = await login('test', 'test');
        if (_.has(response, "status") && response.status === 200) {
          dispatch(setLogin(true))
          sessionStorage.setItem('token', response.data.token)
        } else {
          dispatch(setLogin(false))
        }
      }
    })();
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" render={() => <Form />} />
          <Route exact path="/admin" render={() => <Admin />} />
        </Switch>
      </main>
    </Router>
  );
};

export default RouterComponent;