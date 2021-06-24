import React, { useContext, useEffect } from "react";
import { AppContext } from "../store/reducer";
import { setLoading, updateListItems } from "../store/actions";
import { getListRecords } from "../services/ApiConekta";
import Table from './Table';
import ModalEdit from './ModalEdit';
import _ from "lodash";

const Admin = () => {
  const { dispatch } = useContext(AppContext);

  const loadData = async () => {
    dispatch(setLoading(true))
    const response = await getListRecords(sessionStorage.getItem('token'));
    if (_.has(response, "status") && response.status === 200) {
      dispatch(updateListItems(response.data))
    } else {
      dispatch(updateListItems([]))
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
      loadData()
  }, []);


  return (
    <>
      <Table />
      <ModalEdit/>
    </>
  );
};

export default Admin;
