async function getPhotographers() {
    const url = './data/photographers.json';

    // Récupère les données à partir du fichier JSON
    const response = await fetch(url);
    const data = await response.json();
    
    // Retourne les photographes récupérés
    return data.photographers;
}

async function getPhotographerById(id) {
    const photographers = await getPhotographers();
    return photographers.find(photographer => photographer.id === parseInt(id));
}

// Récupère l'ID du photographe à partir des paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

console.log(photographerId);

(async () => {
    // Utilisation de la fonction pour obtenir les informations du photographe
    const photographerInfo = await getPhotographerById(photographerId);

    if (photographerInfo) {
        console.log("Nom:", photographerInfo.name);
        console.log("Ville:", photographerInfo.city);
        console.log("Pays:", photographerInfo.country);
        console.log("Slogan:", photographerInfo.tagline);
        console.log("Prix:", photographerInfo.price);
        console.log("Portrait:", photographerInfo.portrait);

        // Crée une instance de photographerTemplate avec les données du photographe
        const photographer = photographerTemplate(photographerInfo);

        // Utilise getPhotographerHead pour obtenir l'élément DOM
        const photographerHeadElement = photographer.getPhotographerHead();

        // Ajoute l'élément généré à votre page
        const photographerSection = document.querySelector('.photograph-header'); // Assurez-vous que cet élément existe
        if (photographerSection) {
            photographerSection.appendChild(photographerHeadElement);
        }
    } else {
        console.log("Photographe non trouvé");
    }
})();