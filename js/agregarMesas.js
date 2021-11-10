window.onload = () =>{

    let data = {
        adentro: {
            mesas: [],
            full: 'off',
        },
        afuera: {
            mesas: [],
            full: 'off',
        },
    }

    const selectSector = document.querySelector('#sector');
    selectSector.addEventListener('change', (e)=>{
        const sectorValueElegido = document.querySelector('#sector option:checked').value.toLowerCase();
        const options = document.querySelectorAll('.divCombination');
        let combinationsSelect = document.querySelector('.checks');
        let combinationsSelectArr = [];
        options.forEach((option) =>{
            if(option.classList.contains(sectorValueElegido)){
                combinationsSelectArr.push(option)
                option.style.display = '';
            } else{
                option.style.display = 'none'
            }
        })
        if(combinationsSelectArr.length <= 12){
            combinationsSelect.style.height = '100px';
        }
        if(combinationsSelectArr.length > 12){
            combinationsSelect.style.height = '200px';
        }
        if(combinationsSelectArr.length > 24){
            combinationsSelect.style.height = '300px';
        }
        if(combinationsSelectArr.length > 32){
            combinationsSelect.style.height = '400px';
        }
    })

    const formAgregarMesa = document.querySelector('form.agregar-mesa');
    formAgregarMesa.addEventListener('submit', (e)=>{
        e.preventDefault();
        agregarMesa();

    })

    function agregarMesa(){
        const sectorValueElegido = document.querySelector('#sector option:checked').value.toLowerCase();
        const sectorElegido = data[`${sectorValueElegido}`];
        const name = sectorElegido.mesas ? sectorElegido.mesas.length + 1 : 1 ;
        const min = parseInt(document.querySelector('.min-range').value);
        const max = parseInt(document.querySelector('.max-range').value);
        let combinations = [];
        const combinationsHTML = document.querySelectorAll('.combinations:checked');
        combinationsHTML.forEach((combination) => {
            combinations.push(parseInt(combination.value))
        })
        const mesa = {
            name,
            min,
            max,
            combinations
        }
        sectorElegido.mesas.push(mesa);
        renderizarMesa(sectorValueElegido, mesa);
    }

    function renderizarMesa(sector, mesa){
        let mesasHTML = document.querySelector(`.${sector}-mesas`);
        mesasHTML.innerHTML += `<div class="mesa" id="${mesa.name}">
                                    <h3>${mesa.name}</h3>
                                    <p>${mesa.min}-${mesa.max}</p>
                                </div>`;
        let combinationsSelect = document.querySelector('.checks');
        combinationsSelect.innerHTML += `<div class ="divCombination ${sector}"><input class="combinations ${sector}" type="checkbox" value="${mesa.name}">
                                            ${mesa.name} (${mesa.min} - ${mesa.max})
                                        </div>`;
        combinationsSelectArr = [];
        const options = document.querySelectorAll('.divCombination');
        options.forEach((option) =>{
            if(option.classList.contains(sector)){
                combinationsSelectArr.push(option)
            }
        })
        if(combinationsSelectArr.length <= 12){
            combinationsSelect.style.height = '100px';
        }
        if(combinationsSelectArr.length > 12){
            combinationsSelect.style.height = '200px';
        }
        if(combinationsSelectArr.length > 24){
            combinationsSelect.style.height = '300px';
        }
        if(combinationsSelectArr.length > 32){
            combinationsSelect.style.height = '400px';
        }
        let cubiertosTotales = 0;
        data[`${sector}`].mesas.forEach((mesa)=>{
            cubiertosTotales += mesa.max;
        })
        let capacidad = document.querySelector(`.${sector} div .capacidad`);
        capacidad.innerText = `Capacidad: ${cubiertosTotales}`;
    }










}