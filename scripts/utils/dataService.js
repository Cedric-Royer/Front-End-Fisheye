import { getDataPath } from '../utils/paths.js';

export async function getData() {
    const url = getDataPath();
    const response = await fetch(url);
    const data = await response.json();
    
    return {
        photographers: data.photographers,
        media: data.media
    };
}

export function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

export async function getPhotographerById(id) {
    const { photographers } = await getData();
    return photographers.find(photographer => photographer.id === parseInt(id));
}

export async function getMediaByPhotographerId(id) {
    const { media } = await getData();
    return media.filter(mediaItem => mediaItem.photographerId === parseInt(id));
}
