export default function BtnLoadForm({ report }){

    return (
        <button onClick={() => loadForm()}>Carregar Formulário</button>
    )
}

function loadForm(){
    // let f = window.localStorage.getItem(report);
    let f = window.localStorage.getItem("form");
    // if(f) return JSON.parse(f);
    console.log(JSON.parse(f));
}
