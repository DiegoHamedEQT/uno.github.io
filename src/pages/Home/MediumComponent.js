import { useState } from "react";
import Modal from "../../components/Modal"
import { LuArrowDownToLine } from "react-icons/lu";
import './Home.css'
import xml2js from 'xml2js';

export default function MediumComponent() {

    return (
        <div className="columns-3 bg-[#efa214] flex">
            <div className="w-1/3 pl-10 pt-8">
                <h1 className="font-extrabold text-white text-5xl">Comece {' '}
                <span className="font-extrabold text-5xl text-[#bc10a8]">agora </span>
                    com apenas um clique
                </h1>
            </div>
            <div className="w-1/3 p-4 pt-8">
                <div className="bg-transparent flex-col rounded-xl">
                    <BtnNewForm name={"PDI"} text={"Pesquisa, Desenvolvimento e Inovação"} image={"Character.png"}/>
                <div class="pb-10 bg-yellow">
                </div>
                    <BtnNewForm name={"PEE"} text={"Programa de Eficiência Energética"} image={"lightbulb.png"} path=""/>
                </div>
            </div>
            <div className="w-1/3 p-4 pt-8">
                <h1 className="font-extrabold text-white text-2xl text-center">Ou abra um XML salvo</h1>
                <div class="flex flex-col justify-center items-center p-5">
                    <Modal />
                </div>
                <div class="flex flex-col justify-center items-center">
                    <FileHandler />
                </div>
            </div>
        </div>
    )
}

const BtnNewForm = ({ name, text, image }) => {
    return(
        <button className="flex justify-end bg-white rounded-xl">
            <div class="w-1/2 flex-col justify-center content-center">
                <h1 class="font-extrabold text-purple text-5xl text-center">
                    {name}
                </h1>
                <div class="flex items-center">
                    <span class="font-bold text-yellow text-center">{text}</span>
                </div>
            </div>
            <div class="w-1/2 flex-col justify-center content-center">
                <figure class="bg-transparent rounded-xl">
                    <img src={image}/>
                </figure>
            </div>
        </button>
    )
}

function FileHandler() {

    async function handleDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        parseXml(await parse(file));
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function parse(file) {
        return new Promise((resolve, reject) => {
            let content = '';
            const reader = new FileReader();
            reader.onloadend = function(e){
                content = e.target.result;
                resolve(content);
            };
            reader.onerror = function(e){
                reject(e);
            }
            reader.readAsText(file)
        })
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <div class="p-2 bg-white rounded-2xl">
                <div class="square-container">
                    <div class="flex items-center justify-center bg-purple rounded-full w-10 h-10">
                        <LuArrowDownToLine style={{"color": "white"}}/>
                    </div>
                    <div class="text-center font-bold text-purple">
                        <span>Importe aqui um arquivo .xml</span>
                    </div>
                    <div class="text-center font-semibold text-sm text-yellow">
                        <span>Segure, arraste e solte aqui</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function parseXml(xml) {
    xml2js.parseString(xml, (err, result) => {
        if (err){
            console.error(err);
            return;
        }
        // verifica que tipo de relatório está sendo redigido
        window.localStorage.setItem("tempForm", JSON.stringify(result));
        window.location.href = window.location.href +"uploaded-form";
    })
}