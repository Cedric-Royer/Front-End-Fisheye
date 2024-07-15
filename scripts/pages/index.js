    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }

    async function displayData(photographers) {
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
        displayData(photographers);
    }
    
    init();
    
// Chemin vers le fichier JSON
const url = './data/photographers.json';

// Chemin vers le dossier contenant les portraits des photographes
const portraitPath = 'assets/photographers/IDPhotos/';

// Fonction pour récupérer les données via fetch
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Récupération des photographes depuis les données JSON
        const photographers = data.photographers;

        // Affichage des photographes dans la console pour vérification
        console.log('Photographes:', photographers);

        // Construction de l'HTML à insérer dans #photographers-list
        const photographersList = document.getElementById('photographers-list');
        photographers.forEach(photographer => {
            const photographerCard = `
                <div>
                    <h2>${photographer.name}</h2>
                    <p>${photographer.city}, ${photographer.country}</p>
                    <p>${photographer.tagline}</p>
                    <p>${photographer.price}€ / jour</p>
                    <img src="${portraitPath}${photographer.portrait}" alt="${photographer.name}">
                </div>
            `;
            photographersList.innerHTML += photographerCard;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
