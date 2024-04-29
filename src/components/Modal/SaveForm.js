import { useState } from "react";
import BtnSaveForm from "../buttons/SaveForm";

export default function ModalSaveForm() {

    const [formName, setFormName] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    const handleFormName = (event) => {
        const { value } = event.target;
        console.log(value)
        setFormName(value);
    }
    return (
        <>
        <div class="flex flex-col h-[50%] items-center justify-center">
            {!isSaved && (
            <>
            <div>
                <label class="font-semibold text-black bg-transaparent p-2 flex items-center justify-center">
                    Salvar o formulário
                </label>
                <input class="border py-1 px-2 flex-1" name="save-name" placeholder="Insira aqui o nome" onChange={handleFormName}></input>  
            </div>
                <div class="flex justify-center pt-5">
                    <BtnSaveForm fName={formName}/>
                </div>
            </>
            )
            }
        </div>
        </>
    )
}