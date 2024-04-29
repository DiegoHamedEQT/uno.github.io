import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Pdi() {
    
    let html = GetPdiHtml();
    console.log(html);

    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(html, 'text/html');
    // console.log(htmlDocument);
    let lista = GetMultivaluedList();
    console.log(lista);
    // console.log(lista);

    // let parsedHtml = addButtons(htmlDocument);
    // console.log(parsedHtml);


    return (<>
        
    </>
    )
}

// function modifyHtml(html){
//     const parser = new DOMParser();
//     const htmlDocument = parser.parseFromString(html, 'text/html');
//     const body = htmlDocument.body;
//     const children = Array.from(body.childNodes);
//     console.log(children);
//     const fieldsetElements = children.filter(node => node.nodeName.toLowerCase() === 'fieldset');
//     console.log(fieldsetElements);

//     return children;
//   }


function addButtons(formElement) {

    let formHtml = formElement.getElementById("formulario");
    console.log(formHtml);
    console.log(formHtml.childNodes);
    let requestObj = {}
    let fieldsList = [];

    // for (let i = 0; i < form.childNodes.length; i++) {
    //     let item = form.childNodes.item(i);
    //     // console.log(item);
    //     if (item.tagName == "FIELDSET" || item.tagName == "INPUT"){
    //         // fieldsList.push(getNestedFieldsets(item));
    //     }
    // }

    // requestObj['data'] = fieldsList;
    // let multivaluedFields = GetMultivaluedList();
    // console.log(multivaluedFields);
    // let multivaluedFieldsList = (multivaluedFields.data.toString()).split(",");
    // let allFieldsets = document.querySelectorAll('fieldset');

    // allFieldsets.each(function(index, fieldset){
    //     if(multivaluedFieldsList.includes(fieldset.name.toLowerCase())){
    //         console.log('ENCONTREI AQUI')
    //     }
    // })
}


function getNestedFieldsets(fieldsetItem){
    let tempList = [];
    for (let i = 0; i < fieldsetItem.childNodes.length; i++) {
        let item = fieldsetItem.childNodes.item(i);
        if (item.tagName == "FIELDSET") {
            let obj = {};
            obj[item.name] = getNestedFieldsets(item)
            tempList.push(obj);
        }
        if (item.tagName == "INPUT") {
            tempList.push(item.name);
        }
    }
    return tempList;
}

function GetMultivaluedList() {
    const [list, setList] = useState([]);
    useEffect(() =>{
        axios.post('http://localhost:5000/api/multiples-list', {headers: {'Content-Type': 'application/json'}})
        .then(response => {
             setList(response.data);
        }).catch(error => {
            console.log(error);
        })

    }, [])

    return list;
}

function GetPdiHtml() {
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
