export function setupContactForm() {
    const openButton = document.querySelector(".contact_button");
    const closeButton = document.querySelector("#contact_modal .close");
    const modal = document.getElementById("contact_modal");
    const bgModal = document.querySelector(".bg-modal");
    const main = document.querySelector("main")

    function showModal() {
        modal.style.display = "flex";
        bgModal.style.display = "flex";
        main.classList.add("reduce-opacity");
        window.scrollTo(0, 0);
        modal.setAttribute('tabindex', '0');
        modal.focus();
    }

    function hideModal() {
        modal.style.display = "none";
        bgModal.style.display = "none";
        modal.removeAttribute('tabindex', '0');
        main.classList.remove("reduce-opacity");
    }
    
    openButton.addEventListener('click', showModal);
    closeButton.addEventListener('click', hideModal);
    
}
