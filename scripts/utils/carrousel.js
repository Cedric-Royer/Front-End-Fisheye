import { getMediaImagePath, getMediaVideoPath } from '../utils/paths.js';

export function setupCarousel() {
    const modal = document.getElementById('carousel-modal');
    const closeBtn = document.querySelector('.close-carousel');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const mediaContainer = document.getElementById('media-container');
    const carouselMediaContainer = document.querySelector('.carousel-media');
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
        firstFocusableElement.focus();
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
        modal.focus();
        modal.addEventListener('keydown', trapFocus);
        updateFocusableElements();
    }

    function closeCarousel() {
        modal.style.display = 'none';
        body.classList.remove('modal-open');
        modal.removeEventListener('keydown', trapFocus);
        const firstMediaLink = mediaContainer.querySelector('a');
        firstMediaLink.focus();
    }

    function displayMedia(index) {
        carouselMediaContainer.innerHTML = ''; 
        const media = window.mediaItems[index]; 
        let mediaElement;
        let mediaTitle = media.title || ''; 
    
        if (media.image) {
            mediaElement = document.createElement('img');
            mediaElement.src = getMediaImagePath(media.image);
            mediaElement.alt = mediaTitle;
            mediaElement.setAttribute("role","img");
        } else if (media.video) {
            mediaElement = document.createElement('video');
            mediaElement.src = getMediaVideoPath(media.video);
            mediaElement.controls = true;
        }
    
        carouselMediaContainer.appendChild(mediaElement);
    
        if (mediaTitle) {
            const titleElement = document.createElement('p');
            titleElement.textContent = mediaTitle;
            titleElement.classList.add('media-title'); 
            carouselMediaContainer.appendChild(titleElement);
        }
    
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
    closeBtn.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            closeCarousel();
        }
    });
    nextBtn.addEventListener('click', showNextMedia);
    prevBtn.addEventListener('click', showPrevMedia);

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                showNextMedia();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                showPrevMedia();
            } else if (e.key === 'Escape') {
                closeCarousel();
            }
        }
    });

    window.openCarousel = openCarousel;
}
