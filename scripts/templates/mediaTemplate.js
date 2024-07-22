function mediaTemplate(data) {
    const { title, image, video, likes } = data;

    function getMediaElement() {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');

        if (image) {
            const img = document.createElement('img');
            img.src = `./assets/photographers/Media/${image}`;
            img.alt = title;
            mediaElement.appendChild(img);
        } else if (video) {
            const videoElement = document.createElement('video');
            videoElement.src = `./assets/photographers/Media/${video}`;
            videoElement.controls = true;
            mediaElement.appendChild(videoElement);
        }

        // Conteneur pour le titre et les likes
        const titleLikesContainer = document.createElement('div');
        titleLikesContainer.classList.add('title-likes-container');

        // Ajout du titre
        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = title;
        titleLikesContainer.appendChild(mediaTitle);

        // Ajout des likes avec l'icône de cœur
        const mediaLikes = document.createElement('p');
        const likesText = document.createElement('span');
        likesText.textContent = `${likes}`;
        const likesIcon = document.createElement('i');
        likesIcon.classList.add('fa-solid', 'fa-heart','icon-like');
        mediaLikes.appendChild(likesText);
        mediaLikes.appendChild(likesIcon);
        titleLikesContainer.appendChild(mediaLikes);

        // Ajoute un gestionnaire de clic pour augmenter le nombre de likes
        likesIcon.addEventListener('click', () => {
            let currentLikes = parseInt(likesText.textContent);
            currentLikes++;
            likesText.textContent = `${currentLikes}`;
        });        

        mediaElement.appendChild(titleLikesContainer);

        return mediaElement;
    }

    return { getMediaElement };
}

export default mediaTemplate;
