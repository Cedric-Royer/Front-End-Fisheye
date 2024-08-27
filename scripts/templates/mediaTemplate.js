import { getMediaImagePath, getMediaVideoPath } from '../utils/paths.js';
import {addLike} from '../utils/addLike.js';

function createTitleLikesContainer(title, likes, mediaElement) {
    const container = document.createElement('div');
    container.classList.add('title-likes-container');

    const mediaTitle = document.createElement('h2');
    mediaTitle.textContent = title;
    container.appendChild(mediaTitle);

    const mediaLikes = document.createElement('p');
    const likesText = document.createElement('span');
    likesText.textContent = `${likes}`;
    const likesIcon = document.createElement('button');
    likesIcon.classList.add('fa-solid', 'fa-heart', 'icon-like');
    likesIcon.setAttribute("aria-label", "j'aime");
    mediaLikes.appendChild(likesText);
    mediaLikes.appendChild(likesIcon);
    container.appendChild(mediaLikes);

    likesIcon.addEventListener('click', () => addLike(likesText, mediaElement));

    return container;
}

function createImageMediaModel(data) {
    const { title, image, likes } = data;
    const mediaImagePath = getMediaImagePath(image);

    function getMediaElement(index) {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');

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

        const titleLikesContainer = createTitleLikesContainer(title, likes, mediaElement);

        mediaElement.appendChild(titleLikesContainer);

        return mediaElement;
    }

    return { getMediaElement };
}

function createVideoMediaModel(data) {
    const { title, video, likes } = data;
    const mediaVideoPath = getMediaVideoPath(video);

    function getMediaElement(index) {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');

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

        link.appendChild(videoElement);
        mediaElement.appendChild(link);

        const titleLikesContainer = createTitleLikesContainer(title, likes, mediaElement);

        mediaElement.appendChild(titleLikesContainer);

        return mediaElement;
    }

    return { getMediaElement };
}

function mediaTemplate(data) {
    if (data.image) {
        return createImageMediaModel(data);
    } else if (data.video) {
        return createVideoMediaModel(data);
    } 
}

export default mediaTemplate;
