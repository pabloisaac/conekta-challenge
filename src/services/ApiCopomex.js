import axios from "axios";

const urlBase = "https://api.copomex.com";
const token = "dc301656-6a80-464c-b645-a351c9c1746a"

export const getSearchByCp = async (cp) => {
  try {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${urlBase}/query/search_cp/${cp}?token=${token}`,
    };

    let response = await axios(options);
    return response.data.response.cp;
  } catch (error) {
    console.log(error);
  }
};

export const getInfoByCp = async (cp) => {
  try {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${urlBase}/query/info_cp/${cp}?token=${token}`,
    };

    let response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStatuses = async () => {
  try {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${urlBase}/query/get_estados?token=${token}`,
    };

    let response = await axios(options);
    return response.data.response.estado;
  } catch (error) {
    console.log(error);
  }
};

export const getDelegationByStatus = async (status) => {
  try {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${urlBase}/query/get_municipio_por_estado/${status}?token=${token}`,
    };

    let response = await axios(options);
    return response.data.response.municipios;
  } catch (error) {
    console.log(error);
  }
};


export const getSuburbByCp = async (cp) => {
  try {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${urlBase}/query/get_colonia_por_cp/${cp}?token=${token}`,
    };

    let response = await axios(options);
    return response.data.response.colonia;
  } catch (error) {
    console.log(error);
  }
};

export const getCpByStatus = async (status) => {
  try {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${urlBase}/query/get_cp_por_estado/${status}?token=${token}`,
    };

    let response = await axios(options);
    return response.data.response.cp;
  } catch (error) {
    console.log(error);
  }
};

export const getSuburbBySuburb = async (suburb) => {
  try {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${urlBase}/query/get_colonia_por_municipio/${suburb}?token=${token}`,
    };

    let response = await axios(options);
    return response.data.response.colonia;
  } catch (error) {
    console.log(error);
  }
};
