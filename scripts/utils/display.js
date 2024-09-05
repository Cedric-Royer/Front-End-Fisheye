import photographerTemplate from '../templates/photographerTemplate.js';
import mediaTemplate from '../templates/mediaTemplate.js';
import { getPhotographerById, getMediaByPhotographerId, getPhotographerIdFromURL } from './dataService.js';

export async function displayPhotographerNameInFormContact() {
    const photographerId = getPhotographerIdFromURL();
    const photographerInfo = await getPhotographerById(photographerId);
    
    const formTitle = document.getElementById('contact-head-text');
    formTitle.textContent = `Contactez-moi ${photographerInfo.name}`;
}

export async function displayPhotographerHeader() {
    const photographerId = getPhotographerIdFromURL();
    const photographerInfo = await getPhotographerById(photographerId);
    const photographer = photographerTemplate(photographerInfo);

    const photographerHeader = document.querySelector('.photograph-header');
    photographer.getPhotographerHeader(photographerHeader);
}

export async function displayPhotographerMedia(sortBy = 'popularity') {
    const photographerId = getPhotographerIdFromURL();
    const mediaItems = await getMediaByPhotographerId(photographerId);

    const sortedMediaItems = sortMedia(mediaItems, sortBy);

    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = '';

    sortedMediaItems.forEach((media, index) => {
        const mediaModel = mediaTemplate(media);
        const mediaElement = mediaModel.getMediaElement(index);
        mediaContainer.appendChild(mediaElement);
    });

    window.mediaItems = sortedMediaItems;
}

export async function displayPhotographerDetails() {
    const photographerId = getPhotographerIdFromURL();
    const photographerInfo = await getPhotographerById(photographerId);
    const mediaItems = await getMediaByPhotographerId(photographerId);

    const totalLikes = mediaItems.reduce((sum, media) => sum + media.likes, 0);

    const photographerDetails = document.createElement('div');
    photographerDetails.classList.add('photographer-details');
    const photographerLikes = document.createElement('div');
    const totalLikesElement = document.createElement('span');
    totalLikesElement.setAttribute('id', 'total-likes');
    totalLikesElement.textContent = totalLikes;
    const likesIcon = document.createElement('i');
    likesIcon.classList.add('fa-solid', 'fa-heart', 'icon-like');
    photographerLikes.appendChild(totalLikesElement);
    photographerLikes.appendChild(likesIcon);
    photographerDetails.appendChild(photographerLikes);

    const photographerPriceElement = document.createElement('span');
    photographerPriceElement.textContent = `${photographerInfo.price}€ / jour`;
    photographerDetails.appendChild(photographerPriceElement);

    const mediaContainer = document.getElementById('main');
    mediaContainer.appendChild(photographerDetails);
}

export async function setFormActionWithPhotographerId() {
    const photographerId = getPhotographerIdFromURL();
    const hiddenInput = document.getElementById('photographer-id');
    if (hiddenInput) {
        hiddenInput.value = photographerId;
    }
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
