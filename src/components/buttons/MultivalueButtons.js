import { LuPlusCircle, LuMinusCircle } from "react-icons/lu";
import { useState } from "react";

export default function MultivalueButtons() {

  const [count, setCount] = useState(1);

  return (
    <div className="btnField text-white bg-transparent inline-flex font-extrabold text-xl rounded-lg shadow-sm" role="group">
      <button
        className="px-3 py-1 bg-green hover:brightness-110 rounded-s-lg border border-gray"
        onClick={(event) => {
          handleAddInput(event, count);
          setCount(count + 1);
        }} type="button" name="firstBtnAdd" id="btnAdd">
        <LuPlusCircle />
      </button>
      <button
        className="px-3 py-1 bg-orange hover:brightness-110 rounded-e-lg border border-gray"
        onClick={(event) => {
          handleRemoveInput(event)
          if(count > 0){
            setCount(count - 1);
          }
          }} type="button" name="firstBtnRemove" id="btnRemove">
        <LuMinusCircle />
      </button>
    </div>
  );
}

function handleAddInput(evento, count) {
  const container = evento.target.closest('.fieldset-container');
  const fieldset = container.querySelector('fieldset');
  const newFieldset = fieldset.cloneNode(true);
  // Lógica para adicionar contagem aos campos repetidos e poder salvar em JSON
  if (newFieldset.name.split("_")[1]){
    newFieldset.name = parseInt(newFieldset.name.split("_")[1]) + parseInt(count);
  }

  newFieldset.name = newFieldset.name + count;

  // Limpa os inputs do campo novo
  newFieldset.childNodes.forEach(field => {
    if(field.tagName === 'DIV'){
      field.childNodes.forEach(innerField => {
        if (innerField.tagName === 'INPUT'){
          innerField.value = "";
        }
      })
    }
  })

  const addButtons = newFieldset.querySelectorAll('#btnAdd');

  addButtons.forEach(button => {
    button.addEventListener('click', (event) => handleAddInput(event));
    button.setAttribute('data-first', false);
  })

  const removeButtons = newFieldset.querySelectorAll('#btnRemove');
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => handleRemoveInput(event));
  })
  container.append(newFieldset);

  // Lógica para ver se tem mais de um child na lista do fieldset, dai libera o botão de apagar
  if (countFieldsets(container) > 1) {
    let botaoRmv = container.querySelector('#btnRemove');
    botaoRmv.disabled = false;
    // botaoRmv.addEventListener('click',(event) => handleRemoveInput(event));
  }
}

function handleRemoveInput(event) {
  const fieldset = event.target.closest('.fieldset-container');
  // Desabilita o botão para não apagar o último campo
  if (countFieldsets(fieldset) <= 1) {
    event.target.disabled = true;
    return;
  }
  fieldset.removeChild(fieldset.lastChild)
}

function countFieldsets(element) {
  let counter = 0;
  for (const child of element.children) {
    if (child.tagName === 'FIELDSET') {
      counter++;
    }
  }
  return counter;
}
