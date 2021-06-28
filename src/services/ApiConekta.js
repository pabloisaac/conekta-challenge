import axios from "axios";

const urlBase = "https://conekta-appi.herokuapp.com";

export const login = async (username, password) => {
    let url = `${urlBase}/login`
    let headers = { "content-type": "application/json"}
    let body = {
        credentials: {
            username,
            password
        }
    }

    return await axios.post(url, body, { headers })
    .then( response => { return response })
    .catch( error => { console.log(error) })
};

export const singup = async ({ username, password}) => {
    let url = `${urlBase}/singup`
    let headers = { "content-type": "application/json"}
    let body = {
        signup: {
            username,
            password
        }
    }

    return await axios.post(url, body, { headers })
    .then( response => { return response })
    .catch( error => { console.log(error) })
};

export const getListRecords = async (token) => {
    let url = `${urlBase}/api/records/lst`
    let headers = { "content-type": "application/json", "Authorization": `Bearer ${token}`}

    return await axios.get(url, { headers })
    .then( response => { return response })
    .catch( error => { console.log(error) })
};


export const getById = async (_id, token) => {
    let url = `${urlBase}/api/records/get/${_id}`
    let headers = { "content-type": "application/json", "Authorization": `Bearer ${token}`}

    return await axios.get(url, { headers })
    .then( response => { return response })
    .catch( error => { console.log(error) })
};

export const deleteRecord = async (_id, token) => {
    let url = `${urlBase}/api/records/del/${_id}`
    let headers = { "content-type": "application/json", "Authorization": `Bearer ${token}`}

    return await axios.delete(url, { headers })
    .then( response => { return response })
    .catch( error => { console.log(error) })
};

export const putRecord = async (data, token) => {
    let url = `${urlBase}/api/records/put`
    let headers = { "content-type": "application/json", "Authorization": `Bearer ${token}`}
    let body = {
        _id: data._id,
        street: data.street,
        numExt: data.numExt,
        numInt: data.numInt,
        cp: data.cp,
        suburb: data.suburb,
        delegation: data.delegation,
        city: data.city,
        status: data.status,
        country: data.country,
    }

    return await axios.put(url, body, { headers })
    .then( response => { return response })
    .catch( error => { console.log(error) })
};

export const postRecord = async (data, token) => {
    let url = `${urlBase}/api/records/post`
    let headers = { "content-type": "application/json", "Authorization": `Bearer ${token}`}
    let body = {
        street: data.street,
        numExt: data.numExt,
        numInt: data.numInt,
        cp: data.cp,
        suburb: data.suburb,
        delegation: data.delegation,
        city: data.city,
        status: data.status,
        country: data.country,
    }

    return await axios.post(url, body, { headers })
    .then( response => { return response })
    .catch( error => { console.log(error) })
};