import photographerTemplate from '../templates/photographerTemplate.js';
import {setupModal} from '../utils/contactForm.js';

document.addEventListener('DOMContentLoaded', () => {
    setupModal();
});

async function getPhotographers() {
    const url = './data/photographers.json';

    const response = await fetch(url);
    const data = await response.json();
    
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

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function displayPhotographerHeader() {
    const photographerInfo = await getPhotographerById(photographerId);
    const photographer = photographerTemplate(photographerInfo);

    const photographerHeader = document.querySelector('.photograph-header');
    photographer.getPhotographerHeader(photographerHeader);
}

displayPhotographerHeader();

async function getPhotographerMedia(photographerId) {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    const mediaItems = data.media.filter(media => media.photographerId === photographerId);
    return mediaItems;
}

async function displayPhotographerMedia() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

    const mediaItems = await getPhotographerMedia(photographerId);

    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = ''; 

    mediaItems.forEach(media => {
        const mediaElement = document.createElement('div');
        mediaElement.className = 'media-item';

        if (media.image && media.image.endsWith('.jpg')) {
            const img = document.createElement('img');
            img.src = `./assets/photographers/Media/${media.image}`;
            img.alt = media.title;
            mediaElement.appendChild(img);
        } else if (media.video && media.video.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = `./assets/photographers/Media/${media.video}`;
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

        mediaContainer.appendChild(mediaElement);
    });
}

// Call displayPhotographerMedia to initiate the process
displayPhotographerMedia();

