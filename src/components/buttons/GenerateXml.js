import fieldRules from '../../pages/json/fieldRules.json'

export default function BtnGenerateXml(){
    return (
        <button class="bg-[#bc10a8] hover:bg-[#800f72] focus:ring rounded-full font-semibold text-white px-5 py-2" onClick={() => htmlToXml()}>Gerar XML</button>
    )
}

/**
 * Faz a conversão do form para XML
 * @return {string} - Faz o download do arquivo.
 */
function htmlToXml() {
    let form = document.getElementById("formulario");
    // para cada fieldset, verificar se há algum fieldset dentro
    let xml = ['<?xml version="1.0" encoding="UTF-8"?>'];

    // Para cada item dentro do form
    for (let i = 0; i < form.childNodes.length; i++) {
        let item = form.childNodes.item(i);
        if (item.tagName === "FIELDSET" || item.className.includes('fieldset-container')) {
            xml.push(insertNewChildElement(item));
        }

        if (item.tagName === "INPUT") {
            // se encontrou input, adiciona nova tag nessa hierarquia
            xml.push(xmlCreateNewElement(item));
        }
    }
    // xml = limparTagsVazias(xml.join("\n"));
    console.log("XML atualizado: " + xml.join("\n"));
    // downloadXML(xml)
    downloadXML(xml.join("\n"));
}

/**
 * Função recursiva caso exista um fieldset aninhado dentro de outro.
 * @param {HTML Object} fieldsetItem - O objeto HTML do item a ser analisado.
 * @return {string} - Retorna o o fieldsetItem formatado como XML.
 */
function insertNewChildElement(fieldsetItem) {
    let tempXml = [];

    if (fieldsetItem.className.includes('btnField')) {
        // Se for div dos botões, pula ela e adiciona cada elemento aninhado dentro do fieldset
        let fieldset = fieldsetItem.closest('.fieldset-container')
        for (let item = 1; item < fieldset.childNodes.length; item++){
            tempXml.push(insertNewChildElement(fieldset.childNodes[item]))
        }
    }

    if (fieldsetItem.className.includes('fieldset-container')) {
        tempXml.push(insertNewChildElement(fieldsetItem.childNodes[0]))
    }

    // se for fieldset-container, iterar sobre os campos aninhados dentro dele

    if(!fieldsetItem.className.includes('fieldset-container')){
        if(fieldsetItem.name){
            tempXml.push("<" + fieldsetItem.childNodes[0].innerHTML + ">");
        }

        for (let i = 0; i < fieldsetItem.childNodes.length; i++) {
            let item = fieldsetItem.childNodes.item(i);

            if (item.className.includes('fieldset-container')){
                /**
                 * Verifico se todos os campos dentro estão vazios para a configuração conforme ANEEL.
                 * Assim, mantenho apenas os elementos parents.
                 */
                if (fieldRules.possibleEmptyFields.includes(item.getAttribute('name').toLowerCase())){
                    if (isEverythingEmpty(item)){
                        tempXml.push("<" + item.getAttribute('name') + ">");
                        tempXml.push("</" + item.getAttribute('name') + ">");
                        continue;
                    }
                }
                tempXml.push(insertNewChildElement(item));
            }
            if (item.tagName === "FIELDSET") {
                // função recursiva - se for fieldset, cria já os campos de dentro dele e procura novo fieldset
                tempXml.push(insertNewChildElement(item));
            }
            if (item.className.includes('ignore')){
                if (item.childNodes[1].tagName === "INPUT") {
                    // se encontrou input, adiciona nova tag nessa hierarquia
                    tempXml.push(xmlCreateNewElement(item.childNodes[1]));
                }
            }
        }
        if(fieldsetItem.name){
            tempXml.push("</" + fieldsetItem.childNodes[0].innerHTML + ">");
        }
    }
    return tempXml.join("\n");
}

function xmlCreateNewElement(input) {
    let element = "<" + input.name + ">" + escapeXml(input.value) + "</" + input.name + ">";
    return element;
}

function downloadXML(xml){
    // xml = limparTagsVazias(xml);
    // console.log(xml);
    let blob = new Blob([xml], { type: "text/xml;charset=utf-8"});
    saveAs(blob, "documento.xml");
}

function saveAs(blob, filename) {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

function limparTagsVazias(xml){
    let regex = /<([^\/\s>]+)[^>]*>[\s]*<\/\1>/g;
    return xml.replace(regex, '');
}

function isEverythingEmpty(node) {
    let isEmpty = true;

    node.childNodes.forEach(child => {

        if (child.tagName === "DIV" && !child.className.includes("btnField")) {
            if (!isEverythingEmpty(child)) {
                isEmpty = false;
            }
        }
        if (child.tagName === "FIELDSET"){
            if (!isEverythingEmpty(child)) {
                isEmpty = false;
            }
        }
        if (child.tagName === "INPUT" && child.value.trim() !== "") {
            isEmpty = false;
        }
    });

    return isEmpty;
}

function escapeXml(text) {
    return text.replace(/[<>&'"]/g, function(char) {
        switch (char) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}