import photographerTemplate from '../templates/photographerTemplate.js';

async function getPhotographers() {

    const url = './data/photographers.json';
    const response = await fetch(url);
    const data = await response.json();

    return { photographers: data.photographers };
}

async function displayPhotographersCards(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getPhotographerCard();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayPhotographersCards(photographers);
}

init();