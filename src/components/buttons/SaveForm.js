export default function BtnSaveForm({ fName }){

    return (
        <button class="bg-[#bc10a8] hover:bg-[#800f72] focus:ring rounded-full font-semibold text-white px-5 py-2" onClick={() => saveForm( fName )}>Salvar Formulário</button>
    )
}

function saveForm(fName){
    console.log("Salvando Form no localStorage");
    const localStorageKeys = Object.keys(localStorage);

    if(!fName){
        return window.alert('Coloque um nome!');
    }

    if (localStorageKeys.includes(fName)){
        return window.alert('Já existe um formulário salvo com esse nome.');
    }

    let form = document.getElementById("formulario");
    let strJson = htmlToJson(form);
    window.localStorage.setItem(fName, strJson);
}

function htmlToJson(form) {
    let json = {};
    // Para cada item dentro do form
    form.childNodes.forEach(element => {
        if (element.className.includes('fieldset-container') || element.tagName === "FIELDSET"){
            json = createNewKeyValue(element);
        }
    });
    return JSON.stringify(json);
}

function createNewKeyValue(element){
    let obj = {};

    if (element.className.includes('fieldset-container')){
        element.childNodes.forEach(item =>{
            // Evita de pegar a div dos botões
            if (!item.className.includes("btnField")){
                obj[item.name] = createNewKeyValue(item);
            }
        })
    }

    if (element.tagName === "FIELDSET"){
        element.childNodes.forEach(item => {
            // Se for fieldset-container, busco o nome da chave no fieldset filho e crio objeto novo recursivamente
            if(item.className.includes('fieldset-container')){
                let objName;
                item.childNodes.forEach(field => {
                    if(field.tagName === "FIELDSET"){
                        objName = field.name;
                        obj[objName] = createNewKeyValue(field);
                    }
                })
            }
            // Se classe possuir ignore, é a div pai dos inputs e então pego o nome e valor dos inputs
            if(item.className.includes('ignore')){
                if(item.childNodes[1].tagName === 'INPUT' || item.childNodes[1].tagName === 'SELECT'){
                    objAppendNewInput(obj, item.childNodes[1]);
                }
            }
        })
    }
    return obj;
}

function objAppendNewInput(obj, inputTag){
    obj[inputTag.name] = inputTag.value;
    return obj;
}
