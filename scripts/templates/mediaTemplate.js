function mediaTemplate(data) {
    const { title, image, video, likes } = data;

    function getMediaElement(index) {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');

        // Fonction pour ouvrir le carrousel
        function openCarousel() {
            window.openCarousel(index);
        }

        // Fonction pour gérer les événements clavier
        function handleKeyDown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openCarousel();
            }
        }

        if (image) {
            const img = document.createElement('img');
            img.src = `./assets/photographers/Media/${image}`;
            img.alt = title;
            img.loading = 'lazy';
            img.tabIndex = 0; // Permet le focus
            img.setAttribute('role', 'button'); // Indique qu'il s'agit d'un élément cliquable
            img.addEventListener('click', openCarousel);
            img.addEventListener('keydown', handleKeyDown);
            mediaElement.appendChild(img);
        } else if (video) {
            const videoElement = document.createElement('video');
            videoElement.src = `./assets/photographers/Media/${video}`;
            videoElement.controls = false;
            videoElement.tabIndex = 0; // Permet le focus
            videoElement.setAttribute('role', 'button'); // Indique qu'il s'agit d'un élément cliquable
            videoElement.addEventListener('click', openCarousel);
            videoElement.addEventListener('keydown', handleKeyDown);
            mediaElement.appendChild(videoElement);
        }

        // Création du conteneur pour le titre et les likes
        const titleLikesContainer = document.createElement('div');
        titleLikesContainer.classList.add('title-likes-container');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = title;
        titleLikesContainer.appendChild(mediaTitle);

        const mediaLikes = document.createElement('p');
        const likesText = document.createElement('span');
        likesText.textContent = `${likes}`;
        const likesIcon = document.createElement('i');
        likesIcon.classList.add('fa-solid', 'fa-heart', 'icon-like');
        likesIcon.setAttribute('aria-label', 'j\'aime');
        likesIcon.setAttribute('role', 'button');
        likesIcon.tabIndex = 0; // Permet le focus
        mediaLikes.appendChild(likesText);
        mediaLikes.appendChild(likesIcon);
        titleLikesContainer.appendChild(mediaLikes);

        // Événements pour l'icône de coeur
        likesIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche l'ouverture du carrousel lors du clic sur l'icône de coeur
            let currentLikes = parseInt(likesText.textContent);
            currentLikes++;
            likesText.textContent = `${currentLikes}`;
        });

        likesIcon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                likesIcon.click();
            }
        });

        mediaElement.appendChild(titleLikesContainer);

        return mediaElement;
    }

    return { getMediaElement };
}

export default mediaTemplate;
