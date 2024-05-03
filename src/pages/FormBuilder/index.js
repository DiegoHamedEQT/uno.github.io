import relFinalPed from '../json/relFinalPed.json';
import relProjetoPed from '../json/relProjetoPed.json';
import relInteresseProjetoPed from '../json/relInteresseProjetoPed.json';
import fieldRules from '../../pages/json/fieldRules.json';
import { useState } from 'react';
import MultivalueButtons from '../../components/buttons/MultivalueButtons';
import BtnGenerateXml from '../../components/buttons/GenerateXml';
import Modal from '../../components/Modal';


export default function FormBuilder({ rel }) {

  const lista = fieldRules.multiplesList;

  let json;
  switch(rel){
    case "relatorio-final-pid":
      json = relFinalPed;
      break;
    case "relatorio-projeto-ped":
      json = relProjetoPed;
      break;
    case "relatorio-interesse-projeto-ped":
      json = relInteresseProjetoPed;
      break;
    case "saved-form":
      json = getSavedForm();
      break;
    case "uploaded-form":
      json = JSON.parse(window.localStorage.getItem("tempForm"));
      // window.localStorage.removeItem("tempForm");
    default:
      break;
  }

  return (
    <>
    <div class="columns-2 flex items-center justify-center">
      <div class="content-center mx-auto">
        <BtnGenerateXml />
      </div>
      <div class="static mx-auto">
        <Modal />
      </div>
    </div>
      <form className='mx-10 my-5' id="formulario">
        <JsonReader json={json} multiList={lista} />
      </form>
      <div>
      </div>
    </>
  )
}

function JsonReader({ json, multiList }) {
  let keys = Object.keys(json);

  const tagItems = keys.map((key) => {
    console.log(keys)
    // Verifico se temos um array de strings, assim sei que cheguei no nivel mais baixo hierárquico
    if (
      Object.prototype.toString.call(json[key]) === '[object Array]' 
      && typeof json[key][0] === 'string'
    ){
      return (
        <TagItem name={key} value={json[key][0]} />
      )
    }

    if (Object.prototype.toString.call(json[key]) === '[object Array]' && json[key].length > 1){
      let lista;
      lista = json[key].map((item, i) => {
        return (
          <>
            {multiList.includes(key.toLowerCase()) && i === 0 && <MultivalueButtons />}
              <fieldset className='p-3 flex flex-col gap-2' name={key}>
              <legend className='font-bold px-2 text-yellow'>{key}</legend>
              <hr className="flex-grow border-b border-yellow"/>
                <JsonReader key={key} json={item} multiList={multiList} />
            </fieldset>
          </>
        )
      })
      return lista
    }

    if (typeof json[key] === 'object') {
      // TODO - Melhorar lógica. Por enquanto, isso resolve o problema de aparecerem números "aleatórios".
      if (!isNaN(key)) {
        return <JsonReader key={key} json={json[key]} multiList={multiList} />
      }
      
      
      return (
        <div key={key} className="fieldset-container bg-wgray" name={key}>
          {multiList.includes(key.toLowerCase()) && <MultivalueButtons />}
          <fieldset className='p-3 flex flex-col gap-2' name={key}>
            <legend className='font-bold px-2 text-yellow'>{removeNumbers(key)}</legend>
            <hr className="flex-grow border-b border-yellow"/>
            <JsonReader key={key} json={json[key]} multiList={multiList} />
          </fieldset>
        </div>
      )
    } else {
      return (
        <TagItem key={key} name={key} value={json[key]}/>
      )
    }
  })
  return tagItems
}


function TagItem({ name, value, itemConf }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  if (value && inputValue === '') {
    setInputValue(value);
  };

  // Caso seja um campo de select
  if (name.toLowerCase() in fieldRules.optionsFields){
    return (
    <div className='flex gap-4 items-center ignore'>
      <label className='w-[15%] text-right truncate text-darkblue font-bold'>{name}</label>
      <select 
        name={name}
        className='border py-1 px-2 flex-1 bg-transparent text-darkblue rounded-lg border-gray'
        value={inputValue}
        onChange={handleChange}
      >
        <option value="" disabled selected>Selecione uma opção</option>
        {fieldRules.optionsFields[name.toLowerCase()].map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
    )
  }
  // Caso seja um input normal

  return (
    <div className='flex gap-4 items-center ignore'>
      <label className='w-[15%] text-right truncate text-darkblue font-bold'>{name}</label>
      <input
        type='text'
        className='border border-gray bg-transparent py-1 px-2 flex-1 rounded-lg focus:ring-yellow'
        name={name}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}

function getSavedForm(){
  var hash = window.location.hash;
  var partes = hash.split('?');
  var parametros = partes[1];
  var parametrosSeparados = parametros.split('&');
  let valorForm;
  for (var i = 0; i < parametrosSeparados.length; i++) {
      var parametro = parametrosSeparados[i].split('=');
      if (parametro[0] === 'form') {
          valorForm = parametro[1];
          console.log('Valor de form:', valorForm);
          break; 
      }
  }
  return loadForm(valorForm);
}

function loadForm(form){
  let f = window.localStorage.getItem(form);
  return JSON.parse(f);
}

function removeNumbers(str) {
  return str.replace(/\d/g, '');
}