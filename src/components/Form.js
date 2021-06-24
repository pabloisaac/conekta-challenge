import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../store/reducer";
import { setModalVisible, updateListItems } from "../store/actions";
import { getInfoByCp } from "../services/ApiCopomex";
import { postRecord, putRecord, getListRecords } from "../services/ApiConekta";
import Select from "react-select";
import Swal from "sweetalert2";
import _ from "lodash";
import './index.css';
import formLogo from '../images/Login-02.svg';


const Forms = ({ mode }) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (mode === 'edit') {
      setStreet(state.item.street)
      setNumExt(state.item.numExt)
      setNumInt(state.item.numInt)
      setCp(state.item.cp)
      setSuburb(state.item.suburb)
      setDelegation(state.item.delegation)
      setCity(state.item.city)
      setStatus(state.item.status)
      setCountry(state.item.country)
    }
  }, []);

  const [street, setStreet] = useState("");
  const [numExt, setNumExt] = useState("");
  const [numInt, setNumInt] = useState("");

  const [cp, setCp] = useState("");

  const [suburb, setSuburb] = useState("");
  const [suburbOptions, setSuburbOptions] = useState([]);

  const [delegation, setDelegation] = useState("");
  const [delegationOptions, setDelegationOptions] = useState([]);

  const [city, setCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const [status, setStatus] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const [country, setCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);

  const handleSubmit = async () => {
    const data = {
      street,
      numExt,
      numInt,
      cp: cp,
      suburb: suburb.value,
      delegation: delegation.value,
      city: city.value,
      status: status.value,
      country: country.value
    }
    let respPost = await postRecord(data, sessionStorage.getItem('token'));
    if (_.has(respPost, "status") && respPost.status === 200) {
      Swal.fire(
        "Registro Insertado!",
        `Se creo el registro con #${respPost.data.ops[0]._id}`,
        "success"
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al guardar",
        footer: "Hubo un error al guardar el registro, por favor reintente!"
      });
    }
    cleanInputs()
  }

  const handleEdit = async () => {
    const data = {
      _id: state.item._id,
      street,
      numExt,
      numInt,
      cp: cp,
      suburb: suburb.value,
      delegation: delegation.value,
      city: city.value,
      status: status.value,
      country: country.value
    }
    let respPut = await putRecord(data, sessionStorage.getItem('token'));
    if (_.has(respPut, "status") && respPut.status === 200) {
      await updateList()
      Swal.fire(
        "Registro Actualizado!",
        `Se actualizo el registro con #${data._id}`,
        "success"
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al actualizar",
        footer: "Hubo un error al actualizo el registro, por favor reintente!"
      });
    }
    cleanInputs()
  };

  const cleanInputs = () => {
    setSuburb("")
    setSuburbOptions([])
    setDelegation("")
    setDelegationOptions([])
    setCity("")
    setCityOptions([])
    setStatus("")
    setStatusOptions([])
    setCountry("")
    setCountryOptions([])
    setCp("")
    setStreet("")
    setNumExt("")
    setNumInt("")
  }

  const updateList = async () => {
    const response = await getListRecords(sessionStorage.getItem('token'));
    if (_.has(response, "status") && response.status === 200) {
      dispatch(updateListItems(response.data))
    }
    dispatch(setModalVisible(false))
}

  const handleChange = (e) => {
    if (e.target.name !== undefined && e.target.name === "street")
      setStreet(e.target.value);
    if (e.target.name !== undefined && e.target.name === "numExt")
      setNumExt(e.target.value);
    if (e.target.name !== undefined && e.target.name === "numInt")
      setNumInt(e.target.value);
    if (e.target.name !== undefined && e.target.name === "cp")
      autoCompletDropdowns(e.target.value);
  };

  const autoCompletDropdowns = async (value) => {
    setSuburb("")
    setSuburbOptions([])
    setDelegation("")
    setDelegationOptions([])
    setCity("")
    setCityOptions([])
    setStatus("")
    setStatusOptions([])
    setCountry("")
    setCountryOptions([])
    setCp(value);
    await getInfoCp(value);
  };

  const getInfoCp = async (cp) => {
    let statusOptionsAux = []
    let delegationOptionsAux = []
    let suburbOptionsAux = []
    let cityOptionsAux = []
    let countryOptionsAux = []

    let respGet = cp.length === 5 ? await getInfoByCp(cp) : undefined;
    respGet !== undefined && !respGet.error && respGet.forEach((item) => {
      if (_.find(statusOptionsAux, ["value", item.response.estado]) === undefined)
        statusOptionsAux.push({ value: item.response.estado, label: item.response.estado })

      if (_.find(delegationOptionsAux, ["value", item.response.municipio]) === undefined)
        delegationOptionsAux.push({ value: item.response.municipio, label: item.response.municipio })

      if (_.find(suburbOptionsAux, ["value", item.response.asentamiento]) === undefined)
        suburbOptionsAux.push({ value: item.response.asentamiento, label: item.response.asentamiento })

      if (_.find(cityOptionsAux, ["value", item.response.ciudad]) === undefined)
        cityOptionsAux.push({ value: item.response.ciudad, label: item.response.ciudad })

      if (_.find(countryOptionsAux, ["value", item.response.pais]) === undefined)
        countryOptionsAux.push({ value: item.response.pais, label: item.response.pais })
    });

    setStatusOptions(statusOptionsAux)
    setDelegationOptions(delegationOptionsAux)
    setSuburbOptions(suburbOptionsAux)
    setCityOptions(cityOptionsAux)
    setCountryOptions(countryOptionsAux)
  };

  return (
    <div className="container-divs">
      <div className="container-logo">
        <img src={formLogo} alt="form logo" />
      </div>
      <div className="container form">
        <div className="form-group">
          <label>Calle:</label>
          <input
            className="form-control"
            placeholder="Ingrese Calle"
            type="text"
            name="street"
            value={street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Número exterior:</label>
          <input
            className="form-control"
            placeholder="Ingrese Número exterior"
            type="text"
            name="numExt"
            value={numExt}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Número interior:</label>
          <input
            className="form-control"
            placeholder="Ingrese Número interior"
            type="text"
            name="numInt"
            value={numInt}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Código postal</label>
          <input
            className="form-control"
            placeholder="Ingrese CP a buscar.."
            type="text"
            name="cp"
            value={cp}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Colonia:</label>
          <Select
            options={suburbOptions}
            onChange={(option) => setSuburb(option)}
            defaultValue={suburb}
            value={suburb}
            isSearchable
          />
        </div>
        <div className="form-group">
          <label>Municipio / Delegación:</label>
          <Select
            options={delegationOptions}
            onChange={(option) => setDelegation(option)}
            defaultValue={delegation}
            value={delegation}
            isSearchable
          />
        </div>
        <div className="form-group">
          <label>Ciudad:</label>
          <Select
            options={cityOptions}
            onChange={(option) => setCity(option)}
            defaultValue={city}
            value={city}
            isSearchable
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <Select
            options={statusOptions}
            onChange={(option) => setStatus(option)}
            defaultValue={status}
            value={status}
            isSearchable
          />
        </div>
        <div className="form-group">
          <label>País:</label>
          <Select
            options={countryOptions}
            onChange={(option) => setCountry(option)}
            defaultValue={country}
            value={country}
            isSearchable
          />
        </div>
        <div className="btn-group">
          <button
            type="submit"
            disabled={!state.login}
            className="btn btn-color"
            onClick= {(mode === "edit" && handleEdit) || (mode === undefined && handleSubmit)}
          >
            {(mode === "edit" && 'Editar') || (mode === undefined && 'Guardar')}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Forms;
