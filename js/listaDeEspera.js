window.onload = () =>{

    const formularioListaEspera = document.querySelector('.guest-list');
    formularioListaEspera.addEventListener('submit', (e)=>{
        e.preventDefault();
        let maxLista = document.querySelector('.lista h3 span');
        maxLista.innerText = `(Max: ${parseInt(document.querySelector('.guest-list div input').value)})`;
    })


}