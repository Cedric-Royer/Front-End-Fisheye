import photographerTemplate from '../templates/photographerTemplate.js';
import mediaTemplate from '../templates/mediaTemplate.js';
import { setupModal } from '../utils/contactForm.js';

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
    const response = await fetch(url);
    const data = await response.json();
    return data.media;
}

async function getPhotographerById(id) {
    const photographers = await getPhotographers();
    return photographers.find(photographer => photographer.id === parseInt(id));
}

async function getMediaByPhotographerId(id) {
    const media = await getMedia();
    return media.filter(mediaItem => mediaItem.photographerId === parseInt(id));
}

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function displayPhotographerHeader() {
    const photographerInfo = await getPhotographerById(photographerId);
    const photographer = photographerTemplate(photographerInfo);

    const photographerHeader = document.querySelector('.photograph-header');
    photographer.getPhotographerHeader(photographerHeader);
}

async function displayPhotographerMedia() {
    const mediaItems = await getMediaByPhotographerId(photographerId);

    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = ''; // Clear existing content

    mediaItems.forEach(media => {
        const mediaModel = mediaTemplate(media);
        const mediaElement = mediaModel.getMediaElement();
        mediaContainer.appendChild(mediaElement);
    });
}

displayPhotographerHeader();
displayPhotographerMedia();
