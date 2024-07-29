import { setupContactForm } from '../utils/contactForm.js';
import { setupCarousel } from '../utils/carrousel.js';
import { setupDropdown } from '../utils/dropdown.js';
import { displayPhotographerNameInFormContact, displayPhotographerHeader, displayPhotographerMedia, displayPhotographerDetails, setFormActionWithPhotographerId } from '../utils/display.js';

document.addEventListener('DOMContentLoaded', () => {
    displayPhotographerHeader();
    displayPhotographerMedia();
    displayPhotographerDetails();
    displayPhotographerNameInFormContact();
    setupDropdown(displayPhotographerMedia); 
    setupContactForm();
    setFormActionWithPhotographerId();
    setupCarousel(); 
});