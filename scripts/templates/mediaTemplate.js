import { getMediaImagePath, getMediaVideoPath } from '../utils/paths.js';

function mediaTemplate(data) {
    const { title, image, video, likes } = data;

    const mediaImagePath = getMediaImagePath(image);
    const mediaVideoPath = getMediaVideoPath(video);

    function getMediaElement(index) {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');

        if (image) {
            const link = document.createElement('a');
            link.href = '#';
            link.setAttribute("aria-label", `"${title}": voir l'image originale.`);
            link.addEventListener('click', (event) => {
                event.preventDefault();
                window.openCarousel(index);
            });

            const img = document.createElement('img');
            img.src = mediaImagePath;
            img.alt = title;
            img.loading = 'lazy';

            link.appendChild(img);
            mediaElement.appendChild(link);
        } else if (video) {
            const link = document.createElement('a');
            link.href = '#';
            link.setAttribute("aria-label", `"${title}": voir la vidéo.`);
            link.addEventListener('click', (event) => {
                event.preventDefault();
                window.openCarousel(index);
            });

            const videoElement = document.createElement('video');
            videoElement.src = mediaVideoPath;
            videoElement.controls = false;
            videoElement.setAttribute("tabindex","-1");
            link.appendChild(videoElement);
            mediaElement.appendChild(link);
        }

        const titleLikesContainer = document.createElement('div');
        titleLikesContainer.classList.add('title-likes-container');

        const mediaTitle = document.createElement('h2');
        mediaTitle.textContent = title;
        titleLikesContainer.appendChild(mediaTitle);

        const mediaLikes = document.createElement('p');
        const likesText = document.createElement('span');
        likesText.textContent = `${likes}`;
        const linkLikesIcon = document.createElement('a');
        linkLikesIcon.setAttribute("href","#");
        linkLikesIcon.setAttribute("role", "button");
        const likesIcon = document.createElement('span');
        likesIcon.classList.add('fa-solid', 'fa-heart', 'icon-like');
        likesIcon.setAttribute("aria-label", "j'aime");
        mediaLikes.appendChild(likesText);
        linkLikesIcon.appendChild(likesIcon);
        mediaLikes.appendChild(linkLikesIcon);
        titleLikesContainer.appendChild(mediaLikes);

        linkLikesIcon.addEventListener('click', (event) => {
            event.preventDefault();
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
