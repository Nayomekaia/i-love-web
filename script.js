// Toggle de notities en speel de shake-animatie af
function toggleNotes(folderElement) {
    const notesContainer = folderElement.nextElementSibling;
    
    // Shake-effect
    folderElement.style.animation = 'shake 0.5s';
    
    // Na het shake-effect de notities tonen
    setTimeout(() => {
        folderElement.style.animation = '';
        notesContainer.classList.toggle('hidden');
    }, 500); // Wacht tot de shake-animatie voltooid is (0.5s)
}

// Flip animatie voor notities
function flipCard(element) {
    element.classList.toggle('flipped');

}
