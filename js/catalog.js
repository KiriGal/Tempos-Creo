"use strict"

let page = 1;
let watches;
let sort = "";


const getData = () => {
    let data;
    const xhttp = new XMLHttpRequest();
    const list = document.querySelector('.catalog_list');
    const paragraph = document.querySelector('.catalog_paragraph');
    xhttp.open("GET", "./js/data.xml", true);
    xhttp.send();
    xhttp.onload = function() {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(this.responseText, "application/xml");
        watches = Array.from(xmlDoc.getElementsByTagName('model'));

        let items = "";
        for (let i = 0 + 9 * (page - 1); i < (watches.length - watches.length % 9) + (watches.length % 9) * (page - 1); i++) {
            items += `
                <div class="catalog_list_item">
                        <img src="${watches[i].getElementsByTagName('image')[0].innerHTML}" class="catalog_image">
                        <h1 class="catalog_title">${watches[i].getElementsByTagName('name')[0].innerHTML}</h1>
                        <p class="catalog_price">${watches[i].getElementsByTagName('price')[0].innerHTML} $</p>
                </div>
            `
        }
        let buttons = "";
        for(let i = 0; i < watches.length/9; i++){
            buttons += `
                <button class="catalog_button ${i == 0?"active" : ""}">${i+1}</button>
            `
        }
        document.getElementsByClassName("catalog_block")[0].innerHTML = buttons;
        paragraph.innerHTML = 'Общее количество: ' + watches.length;
        list.innerHTML = items;
        setEventListener();
    }
}
getData()


function setEventListener(){
    let list = document.querySelectorAll('.catalog_button');
    list.forEach(item =>{ 
        item.addEventListener('click', (e) =>{
            page = parseInt(item.innerHTML);
            list.forEach(el=>{ 
                el.classList.remove('active');
            });
            item.classList.add('active')
            updateCatalog();
        })
    })
    const select = document.querySelectorAll('.catalog_select').forEach(item => {
        item.addEventListener('change', (e) =>{
            sort = e.target.value;
            page = 1;
            let buttons = "";
            for(let i = 0; i < watches.length/9; i++){
                buttons += `
                    <button class="catalog_button ${i == (page-1)?"active" : ""}">${i+1}</button>
                `
            }
            document.getElementsByClassName("catalog_block")[0].innerHTML = buttons;
            let list = document.querySelectorAll('.catalog_button');
            list.forEach(item =>{ 
                item.addEventListener('click', (e) =>{
                    page = parseInt(item.innerHTML);
                    list.forEach(el=>{ 
                        el.classList.remove('active');
                    });
                    item.classList.add('active')
                    updateCatalog();
                })
            })
            sortArray(sort);
            updateCatalog();
        })
    });
}

function updateCatalog(){
    const catalog = document.querySelector('.catalog_list');
    let items = "";
        for (let i = 0 + 9 * (page - 1); i < (watches.length - watches.length % 9) + (watches.length % 9) * (page - 1); i++) {
            items += `
                <div class="catalog_list_item">
                        <img src="${watches[i].getElementsByTagName('image')[0].innerHTML}" class="catalog_image">
                        <h1 class="catalog_title">${watches[i].getElementsByTagName('name')[0].innerHTML}</h1>
                        <p class="catalog_price">${watches[i].getElementsByTagName('price')[0].innerHTML} $</p>
                </div>
            `
        }
    catalog.innerHTML = items;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function sortArray(sort){
    for(let n = 0; n < 20; n++){
        for(let i = 0; i < watches.length-1;i++){
            if(sort === "price"){
                if(parseInt(watches[i].getElementsByTagName(sort)[0].innerHTML) < parseInt(watches[i+1].getElementsByTagName(sort)[0].innerHTML)){
                    let buffer = watches[i];
                    watches[i] = watches[i+1];
                    watches[i+1] = buffer;
                }
            }else{
                if(watches[i].getElementsByTagName(sort)[0].innerHTML < watches[i+1].getElementsByTagName(sort)[0].innerHTML){
                    let buffer = watches[i];
                    watches[i] = watches[i+1];
                    watches[i+1] = buffer;
                }
            }
            
        }
    }
}