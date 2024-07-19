async function getPhotographers() {

    const url = './data/photographers.json';

    // Récupère les données à partir du fichier JSON
    const response = await fetch(url);
    const data = await response.json();
    
    // Retourne les photographes récupérés
    return { photographers: data.photographers };
}

async function displayPhotographersCards(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayPhotographersCards(photographers);
}

init();