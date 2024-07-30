import { getMediaImagePath, getMediaVideoPath } from '../utils/paths.js';

export function setupCarousel() {
    const modal = document.getElementById('carousel-modal');
    const closeBtn = document.querySelector('.close-carousel');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const mediaContainer = document.querySelector('.carousel-media');
    const body = document.querySelector('body'); 

    let currentIndex = 0;
    let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;

    function updateFocusableElements() {
        focusableElements = modal.querySelectorAll(focusableElementsString);
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    }

    function trapFocus(event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    }

    function openCarousel(index) {
        currentIndex = index;
        modal.style.display = 'block';
        displayMedia(currentIndex);
        body.classList.add('modal-open'); 

        // Mise à jour des éléments focusables après l'ouverture de la modale
        updateFocusableElements();
        modal.setAttribute('tabindex', '-1');
        modal.focus();
        modal.addEventListener('keydown', trapFocus);
    }

    function closeCarousel() {
        modal.style.display = 'none';
        body.classList.remove('modal-open');
        modal.removeEventListener('keydown', trapFocus);
    }

    function displayMedia(index) {
        mediaContainer.innerHTML = '';
        const media = window.mediaItems[index];
        let mediaElement;

        if (media.image) {
            mediaElement = document.createElement('img');
            mediaElement.src = getMediaImagePath(media.image);
        } else if (media.video) {
            mediaElement = document.createElement('video');
            mediaElement.src = getMediaVideoPath(media.video);
            mediaElement.controls = true;
        }

        mediaContainer.appendChild(mediaElement);

        // Mettre à jour les éléments focusables après l'ajout de contenu
        updateFocusableElements();
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
        if (modal.style.display === 'block') { // Vérifier si la modale est ouverte
            if (e.key === 'ArrowRight') {
                showNextMedia();
            } else if (e.key === 'ArrowLeft') {
                showPrevMedia();
            } else if (e.key === 'Escape') {
                closeCarousel();
            }
        }
    });

    window.openCarousel = openCarousel;
}
