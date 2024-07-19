async function getPhotographers() {
    const url = './data/photographers.json';

    // Récupère les données à partir du fichier JSON
    const response = await fetch(url);
    const data = await response.json();
    
    // Retourne les photographes récupérés
    return data.photographers;
}

async function getMedia() {
    const url = './data/photographers.json';

    // Récupère les données à partir du fichier JSON
    const response = await fetch(url);
    const data = await response.json();
    
    // Retourne les média récupérés
    return data.media;
}

async function getPhotographerById(id) {
    const photographers = await getPhotographers();
    return photographers.find(photographer => photographer.id === parseInt(id));
}

async function getMediaByPhotographerId(id) {
    const media = await getMedia();
    return media.find(media => media.photographerId === parseInt(id));
    
}

// Récupère l'ID du photographe à partir des paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function displayPhotographerHeader() {
    // Utilisation de la fonction pour obtenir les informations du photographe
    const photographerInfo = await getPhotographerById(photographerId);
    // Crée une instance de photographerTemplate avec les données du photographe
    const photographer = photographerTemplate(photographerInfo);

    // Utilise getPhotographerHead pour ajouter les éléments DOM directement au conteneur
    const photographerHeader = document.querySelector('.photograph-header');
    photographer.getPhotographerHead(photographerHeader);
}

displayPhotographerHeader();

async function getPhotographerMedia(photographerId) {
    try {
        const response = await fetch('./data/photographers.json');
        const data = await response.json();
        // Filter media for the specific photographer
        const mediaItems = data.media.filter(media => media.photographerId === photographerId);
        return mediaItems;
    } catch (error) {
        console.error('Error fetching media:', error);
        return []; // Return an empty array in case of error
    }
}

async function displayMedia() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

    const mediaItems = await getPhotographerMedia(photographerId);

    console.log(mediaItems); // Log the mediaItems to check its structure

    if (!Array.isArray(mediaItems)) {
        console.error('mediaItems is not an array:', mediaItems);
        return;
    }

    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = ''; // Clear any existing content

    mediaItems.forEach(media => {
        // Create a new element for each media item
        const mediaElement = document.createElement('div');
        mediaElement.className = 'media-item';

        // Check if it's a jpg image or an mp4 video
        if (media.image && media.image.endsWith('.jpg')) {
            const img = document.createElement('img');
            img.src = `./assets/photographers/Media/${media.image}`; // Adjust path to your media folder
            img.alt = media.title;
            mediaElement.appendChild(img);
        } else if (media.video && media.video.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = `./assets/photographers/Media/${media.video}`; // Adjust path to your media folder
            video.controls = true;
            mediaElement.appendChild(video);
        }

        // Add title and other details
        const title = document.createElement('h3');
        title.textContent = media.title;
        mediaElement.appendChild(title);

        const likes = document.createElement('p');
        likes.textContent = `Likes: ${media.likes}`;
        mediaElement.appendChild(likes);

        const date = document.createElement('p');
        date.textContent = `Date: ${new Date(media.date).toLocaleDateString()}`;
        mediaElement.appendChild(date);

        const price = document.createElement('p');
        price.textContent = `Price: $${media.price}`;
        mediaElement.appendChild(price);

        // Append the media element to the container
        mediaContainer.appendChild(mediaElement);
    });
}

// Call displayMedia to initiate the process
displayMedia();

