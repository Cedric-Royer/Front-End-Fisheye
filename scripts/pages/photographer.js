import photographerTemplate from '../templates/photographerTemplate.js';
import mediaTemplate from '../templates/mediaTemplate.js';
import { setupModal } from '../utils/contactForm.js';

document.addEventListener('DOMContentLoaded', () => {
    setupModal();
    displayPhotographerHeader();
    displayPhotographerMedia();

    // Ajouter des écouteurs d'événements pour le menu déroulant
    initializeDropdown();
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

async function displayPhotographerHeader() {
    const photographerId = getPhotographerIdFromURL();
    const photographerInfo = await getPhotographerById(photographerId);
    const photographer = photographerTemplate(photographerInfo);

    const photographerHeader = document.querySelector('.photograph-header');
    photographer.getPhotographerHeader(photographerHeader);
}

async function displayPhotographerMedia(sortBy = 'popularity') {
    const photographerId = getPhotographerIdFromURL();
    const mediaItems = await getMediaByPhotographerId(photographerId);
    
    // Trier les médias en fonction de l'option sélectionnée
    const sortedMediaItems = sortMedia(mediaItems, sortBy);

    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = ''; // Clear existing content

    sortedMediaItems.forEach(media => {
        const mediaModel = mediaTemplate(media);
        const mediaElement = mediaModel.getMediaElement();
        mediaContainer.appendChild(mediaElement);
    });
}

function sortMedia(mediaItems, sortOption) {
    return [...mediaItems].sort((a, b) => {
        switch (sortOption) {
            case 'popularity':
                return b.likes - a.likes; // Trier par nombre de likes (popularité)
            case 'date':
                return new Date(b.date) - new Date(a.date); // Trier par date (plus récente en premier)
            case 'title':
                return a.title.localeCompare(b.title); // Trier par titre (ordre alphabétique)
            default:
                return 0; // Aucun tri par défaut
        }
    });
}

function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function initializeDropdown() {
    const dropdownButton = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const chevronDown = dropdownButton.querySelector('.fa-chevron-down');
    const chevronUp = dropdownButton.querySelector('.fa-chevron-up');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');

    // Ajouter un événement au bouton du menu déroulant pour afficher/masquer les options
    dropdownButton.addEventListener('click', () => {
        const isOpen = dropdownContent.classList.contains('show');
        dropdownContent.classList.toggle('show');
        chevronDown.classList.toggle('hidden', !isOpen);
        chevronUp.classList.toggle('hidden', isOpen);
    });

    // Ajouter un événement pour chaque option du menu déroulant
    dropdownLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const sortBy = event.target.getAttribute('data-value');
            dropdownButton.querySelector('#selected-option').textContent = event.target.textContent; // Met à jour le texte du bouton
            await displayPhotographerMedia(sortBy); // Réaffiche les médias en fonction du tri sélectionné
            dropdownContent.classList.remove('show');
            chevronDown.classList.remove('hidden');
            chevronUp.classList.add('hidden');
        });
    });

    // Cacher le menu si l'utilisateur clique en dehors
    document.addEventListener('click', (event) => {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown-content a')) {
            dropdownContent.classList.remove('show');
            chevronDown.classList.remove('hidden');
            chevronUp.classList.add('hidden');
        }
    });
}
