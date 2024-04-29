import React, { useState } from 'react';

export default function ModalLoadForm(){
    const localStorageKeys = Object.keys(localStorage);

    const [selectedVariable, setSelectedVariable] = useState('');

    const handleSelectChange = (event) => {
        setSelectedVariable(event.target.value);
    };
    return (
        <div class="flex flex-col h-[50%] items-center justify-center">
        <div class="max-w mx-auto justify-center flex flex-col">
            <label class="font-semibold text-black bg-transaparent p-2 flex items-center justify-center">Abrir XML salvo</label>
                <select 
                    value={selectedVariable} 
                    onChange={handleSelectChange}
                    className="bg-white border border-gray block py-2.5 px-0 rounded-lg focus:ring-white w-full">
                    <option value="">Selecione um XML</option>
                    {localStorageKeys.map((key) => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
        </div>
                {/* {selectedVariable && (
                    <div>
                    <p>XML selecionado: {selectedVariable}</p>
                    </div>
                )} */}
                <div class="flex justify-center pt-5">
                    <button 
                        className="bg-[#bc10a8] hover:bg-[#800f72] focus:ring rounded-full font-semibold text-white px-5 py-2" 
                        onClick={() => redirectToForm(selectedVariable)}>Confirmar</button>
                </div>
        </div>
    )
}

function redirectToForm(form){
    if(!form){
        alert("Selecione um formulário!");
        return;
    }
    window.location.href = window.location.href+"saved-form?form="+form;
}