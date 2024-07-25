import photographerTemplate from '../templates/photographerTemplate.js';
import mediaTemplate from '../templates/mediaTemplate.js';
import { setupModal } from '../utils/contactForm.js';

document.addEventListener('DOMContentLoaded', () => {
    displayPhotographerHeader();
    displayPhotographerMedia();
    displayPhotographerDetails();
    setupDropdown();
    setupModal();
    setupCarousel(); // Initialiser le carrousel
});

async function getData() {
    const url = './data/photographers.json';
    const response = await fetch(url);
    const data = await response.json();
    
    return {
        photographers: data.photographers,
        media: data.media
    };
}

function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function getPhotographerById(id) {
    const { photographers } = await getData();
    return photographers.find(photographer => photographer.id === parseInt(id));
}

async function getMediaByPhotographerId(id) {
    const { media } = await getData();
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

    const sortedMediaItems = sortMedia(mediaItems, sortBy);

    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = '';

    sortedMediaItems.forEach((media, index) => {
        const mediaModel = mediaTemplate(media);
        const mediaElement = mediaModel.getMediaElement(index); // Passe l'index ici
        mediaContainer.appendChild(mediaElement);
    });

    // Stocker les médias pour le carrousel
    window.mediaItems = sortedMediaItems;
}

async function displayPhotographerDetails() {
    const photographerId = getPhotographerIdFromURL();
    const photographerInfo = await getPhotographerById(photographerId);
    const mediaItems = await getMediaByPhotographerId(photographerId);

    const totalLikes = mediaItems.reduce((sum, media) => sum + media.likes, 0);

    const photographerDetails = document.createElement('p');
    photographerDetails.classList.add('photographer-details');
    const photographerLikes = document.createElement('div');
    const totalLikesElement = document.createElement('span');
    totalLikesElement.textContent = totalLikes;
    const likesIcon = document.createElement('i');
    likesIcon.classList.add('fa-solid', 'fa-heart','icon-like');
    likesIcon.setAttribute("aria-label", "j'aime");
    photographerLikes.appendChild(totalLikesElement);
    photographerLikes.appendChild(likesIcon);
    photographerDetails.appendChild(photographerLikes);

    const photographerPriceElement = document.createElement('span');
    photographerPriceElement.textContent = `${photographerInfo.price}€ / jour`;
    photographerDetails.appendChild(photographerPriceElement);

    const mediaContainer = document.getElementById('main');
    mediaContainer.appendChild(photographerDetails);
}


function sortMedia(mediaItems, sortOption) {
    return [...mediaItems].sort((a, b) => {
        switch (sortOption) {
            case 'popularity':
                return b.likes - a.likes;
            case 'date':
                return new Date(b.date) - new Date(a.date);
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });
}

function setupDropdown() {
    const dropdownButton = document.querySelector('.dropbtn');
    const selectedOption = document.querySelector('#selected-option');
    const dropdownContent = document.querySelector('.dropdown-content');
    const chevronDown = dropdownButton.querySelector('.fa-chevron-down');
    const chevronUp = dropdownButton.querySelector('.fa-chevron-up');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    let focusedIndex = 0;

    dropdownButton.addEventListener('click', () => {
        const isOpen = dropdownContent.classList.contains('show');
        dropdownContent.classList.toggle('show');
        chevronDown.classList.toggle('hidden', !isOpen);
        chevronUp.classList.toggle('hidden', isOpen);
        dropdownButton.classList.add('hidden-option');
    });

    dropdownLinks.forEach((link) => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const sortBy = link.getAttribute('data-value');

            switch (sortBy) {
                case 'popularity':
                    selectedOption.textContent = 'Popularité';
                    break;
                case 'date':
                    selectedOption.textContent = 'Date';
                    break;
                case 'title':
                    selectedOption.textContent = 'Titre';
                    break;
                default:
                    selectedOption.textContent = 'Popularité';
            }

            await displayPhotographerMedia(sortBy);
            dropdownContent.classList.remove('show');
            dropdownButton.classList.remove('hidden-option');
        });

        link.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    focusedIndex = (focusedIndex + 1) % dropdownLinks.length;
                    updateFocus();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    focusedIndex = (focusedIndex - 1 + dropdownLinks.length) % dropdownLinks.length;
                    updateFocus();
                    break;
                case 'Enter':
                    event.preventDefault();
                    dropdownLinks[focusedIndex].click();
                    break;
            }
        });
    });

    function updateFocus() {
        dropdownLinks.forEach((link, index) => {
            if (index === focusedIndex) {
                link.focus();
                link.setAttribute('aria-selected', 'true');
            } else {
                link.setAttribute('aria-selected', 'false');
            }
        });
    }

    function handleDropdownKeyboard(event) {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                focusedIndex = 0;
                dropdownLinks[focusedIndex].focus();
                break;
            case 'ArrowUp':
                event.preventDefault();
                focusedIndex = dropdownLinks.length - 1;
                dropdownLinks[focusedIndex].focus();
                break;
        }
    }
    
    dropdownButton.addEventListener('keydown', handleDropdownKeyboard);
    
}

function setupCarousel() {
    const modal = document.getElementById('carousel-modal');
    const closeBtn = document.querySelector('.close-carousel');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const mediaContainer = document.querySelector('.carousel-media');

    let currentIndex = 0;

    function openCarousel(index) {
        currentIndex = index;
        modal.style.display = 'block';
        displayMedia(currentIndex);
    }

    function closeCarousel() {
        modal.style.display = 'none';
    }

    function displayMedia(index) {
        mediaContainer.innerHTML = '';
        const media = window.mediaItems[index];
        let mediaElement;

        if (media.image) {
            mediaElement = document.createElement('img');
            mediaElement.src = `./assets/photographers/Media/${media.image}`;
        } else if (media.video) {
            mediaElement = document.createElement('video');
            mediaElement.src = `./assets/photographers/Media/${media.video}`;
            mediaElement.controls = true;
        }

        mediaContainer.appendChild(mediaElement);
    }

    function showNextMedia() {
        currentIndex = (currentIndex + 1) % window.mediaItems.length;
        displayMedia(currentIndex);
    }

    function showPrevMedia() {
        currentIndex = (currentIndex - 1 + window.mediaItems.length) % window.mediaItems.length;
        displayMedia(currentIndex);
    }

    closeBtn.addEventListener('click', closeCarousel);
    nextBtn.addEventListener('click', showNextMedia);
    prevBtn.addEventListener('click', showPrevMedia);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            showNextMedia();
        } else if (e.key === 'ArrowLeft') {
            showPrevMedia();
        } else if (e.key === 'Escape') {
            closeCarousel();
        }
    });

    window.openCarousel = openCarousel; // Rendre la fonction accessible globalement
}

