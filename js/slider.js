"use strict"

const getData = () => {
    let data;
    const xhttp = new XMLHttpRequest();
    const slider = document.querySelector('.watches_slider');
    xhttp.open("GET", "./js/data.xml", true);
    xhttp.send();
    xhttp.onload = function() {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(this.responseText, "application/xml");
        let image = xmlDoc.getElementsByTagName('image');
        let titles = xmlDoc.getElementsByTagName('name');
        let prices = xmlDoc.getElementsByTagName('price');

        let slides = "";
        for (let i = 0; i < image.length; i++) {
            slides += `
                <div class="swiper-slide">
                        <img src="${image[i].innerHTML}" class="image">
                        <h1 class="title">${titles[i].innerHTML}</h1>
                        <p class="price">${prices[i].innerHTML} $</p>
                </div>
            `
        }
        slider.innerHTML += `
            <div class="swiper">
                <div class="swiper-wrapper">
                    ${slides}
                </div>
            </div>`;
        const swiper = new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 2000
            },
            breakpoints: {
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 20
                }
            },
            loop: true,
        });

    }
}
getData()