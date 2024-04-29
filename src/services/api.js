import { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function getMultivaluedList() {
  try{
    const promise = await axios.get(`${BACKEND_URL}/api/multiples-list`, {headers: {'Content-Type': 'application/json'}})
    return promise.data;
  } catch (error) {
    console.error("erro na chamada ao backend");
    return null;
  }
}

export async function getConfsList() {
  const promise = await axios.get(`${BACKEND_URL}/api/confs-list`, {headers: {'Content-Type': 'application/json'}})
  return promise.data;
}


export function GetPdiHtml() {
    const [html, setHtml] = useState('');

    useEffect(()=>{
      axios.get('http://localhost:5000/routes/pdi')
      .then(response =>{
        console.log(response);
        setHtml(response.data);
      }).catch(error =>{
        console.log("Erro ao resgatar html do backend: ", error);
      })
    }, []);
    return html;
}

export function GetReportJson(){
    const [json, setJson] = useState({});

    useEffect(()=>{
      axios.get('http://localhost:5000/api/report-json')
      .then(response =>{
        console.log(response);
        setJson(response.data);
      }).catch(error =>{
        console.log("Erro ao resgatar json do backend: ", error);
      })
    }, []);
    return json;
}