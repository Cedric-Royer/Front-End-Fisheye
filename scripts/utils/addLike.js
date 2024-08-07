export function addLike(likesText, mediaElement) {
    if (!mediaElement.hasAttribute('data-liked')) {
        let currentLikes = parseInt(likesText.textContent, 10);
        currentLikes++;
        likesText.textContent = `${currentLikes}`;
        mediaElement.setAttribute('data-liked', 'true');
    }
}