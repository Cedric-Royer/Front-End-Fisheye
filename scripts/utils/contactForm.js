export function setupModal() {
    const openButton = document.querySelector(".contact_button");
    const closeButton = document.querySelector("#contact_modal .close");
    const modal = document.getElementById("contact_modal");

    function showModal() {
        modal.style.display = "flex";
    }

    function hideModal() {
        modal.style.display = "none";
    }
    
    openButton.addEventListener('click', showModal);
    closeButton.addEventListener('click', hideModal);
}
