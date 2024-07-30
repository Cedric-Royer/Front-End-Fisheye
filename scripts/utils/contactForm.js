export function setupContactForm() {
    const openButton = document.querySelector(".contact_button");
    const closeButton = document.querySelector("#contact_modal .close");
    const modal = document.getElementById("contact_modal");
    const bgModal = document.querySelector(".bg-modal");
    const main = document.querySelector("main");
    const focusableElementsString = 'input:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;

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

        if (event.key === 'Escape') {
            hideModal();
    }
    }

    function showModal() {
        modal.style.display = "flex";
        bgModal.style.display = "flex";
        main.classList.add("reduce-opacity");
        window.scrollTo(0, 0);
        modal.setAttribute('tabindex', '0');
        modal.focus();
        focusableElements = modal.querySelectorAll(focusableElementsString);
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
        modal.addEventListener('keydown', trapFocus);
    }

    function hideModal() {
        modal.style.display = "none";
        bgModal.style.display = "none";
        modal.removeAttribute('tabindex', '0');
        main.classList.remove("reduce-opacity");
        modal.removeEventListener('keydown', trapFocus);
        openButton.focus();
    }

    closeButton.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            hideModal();
        }
    });
    
    
    openButton.addEventListener('click', showModal);
    closeButton.addEventListener('click', hideModal);
}
