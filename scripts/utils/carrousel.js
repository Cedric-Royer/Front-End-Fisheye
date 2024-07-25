export function setupCarousel() {
    const modal = document.getElementById('carousel-modal');
    const closeBtn = document.querySelector('.close-carousel');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const mediaContainer = document.querySelector('.carousel-media');
    const body = document.querySelector('body'); 

    let currentIndex = 0;

    function openCarousel(index) {
        currentIndex = index;
        modal.style.display = 'block';
        displayMedia(currentIndex);
        body.classList.add('modal-open'); 
    }

    function closeCarousel() {
        modal.style.display = 'none';
        body.classList.remove('modal-open'); 
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

    window.openCarousel = openCarousel;
}