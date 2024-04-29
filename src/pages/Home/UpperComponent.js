
export default function UpperComponent(){

    return (
        <div class="container sm">
            <div class="flex gap-4 justify-between">
                <div class="p-10">
                    <h1 className="font-extrabold text-[#bc10a8] text-6xl">Inove, também, no seu {' '} 
                        <span className="font-extrabold text-6xl text-[#efa214]">XML</span>
                    </h1>
                    <label className="text-[#bc10a8] text-3xl">Elabore arquivos em XML para PDI e PEE de forma simplificada e ágil em um lugar só</label>
                </div>
                <figure>
                    <img src="imagem1.png" alt="Escritório" />
                </figure>
            </div>
        </div>
    )
}