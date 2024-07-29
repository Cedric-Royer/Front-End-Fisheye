import photographerTemplate from '../templates/photographerTemplate.js';
import { getData } from '../utils/dataService.js';

document.addEventListener('DOMContentLoaded', () => {
    init();
});

async function displayPhotographersCards(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getPhotographerCard();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getData();
    displayPhotographersCards(photographers);
}
