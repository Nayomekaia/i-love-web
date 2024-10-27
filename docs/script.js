let currentEditIndex = null;
let entriesByDate = {};

function saveEntry() {
    const title = document.getElementById("journal-title").value.trim();
    const entry = document.getElementById("journal-entry").value.trim();
    const date = new Date().toLocaleDateString(); // Huidige datum

    if (title && entry) {
        const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        
        // Notitie opslaan
        savedEntries.push({ title, text: entry, date });
        localStorage.setItem("journalEntries", JSON.stringify(savedEntries));
        entriesByDate[date] = entriesByDate[date] || [];
        entriesByDate[date].push({ title, text: entry });
        
        displayEntries();
        document.getElementById("journal-title").value = "";
        document.getElementById("journal-entry").value = "";
    } else {
        alert("Zorg ervoor dat zowel de titel als de notitie zijn ingevuld.");
    }
}

function updateEntry() {
    if (currentEditIndex !== null) {
        const title = document.getElementById("journal-title").value.trim();
        const entry = document.getElementById("journal-entry").value.trim();
        const savedEntries = JSON.parse(localStorage.getItem("journalEntries"));
        
        // Notitie bijwerken
        savedEntries[currentEditIndex] = { title, text: entry, date: new Date().toLocaleDateString() };
        localStorage.setItem("journalEntries", JSON.stringify(savedEntries));
        displayEntries();
        
        document.getElementById("journal-title").value = "";
        document.getElementById("journal-entry").value = "";
        currentEditIndex = null;
        document.getElementById("edit-button").disabled = true;
    }
}

function editEntry(index) {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries"));
    document.getElementById("journal-title").value = savedEntries[index].title;
    document.getElementById("journal-entry").value = savedEntries[index].text;
    currentEditIndex = index;
    document.getElementById("edit-button").disabled = false;
}

function deleteEntry(index) {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries"));
    const date = savedEntries[index].date;

    savedEntries.splice(index, 1);
    localStorage.setItem("journalEntries", JSON.stringify(savedEntries));
    
    // Verwijder de notitie uit de datumstructuur
    entriesByDate[date] = entriesByDate[date].filter(entry => entry.title !== savedEntries[index].title);
    
    displayEntries();
}

function displayEntries() {
    const entriesList = document.getElementById("entries-list");
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entriesList.innerHTML = "";
    
    savedEntries.forEach((entry, index) => {
        const listItem = document.createElement("li");
        const entryText = document.createElement("span");
        entryText.textContent = entry.title;
        
        const editBtn = document.createElement("button");
        editBtn.textContent = "Bewerken";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = () => editEntry(index);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Verwijderen";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteEntry(index);
        
        listItem.appendChild(entryText);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        entriesList.appendChild(listItem);
    });
}

function toggleCalendar() {
    const calendar = document.getElementById("calendar");
    const journalContent = document.getElementById("journal-content");
    
    if (calendar.style.display === "none") {
        calendar.style.display = "block";
        journalContent.style.display = "none";
        displayCalendar();
    } else {
        calendar.style.display = "none";
        journalContent.style.display = "flex";
    }
}

// Functie om het overzicht weer te geven
document.getElementById("overview-button").onclick = showOverview;

function showOverview() {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const overviewContent = document.getElementById("overview-content");
    overviewContent.innerHTML = ""; // Maak eerdere inhoud leeg

    if (savedEntries.length === 0) {
        overviewContent.textContent = "Geen notities beschikbaar.";
    } else {
        savedEntries.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.innerHTML = `<strong>${entry.title}</strong> <br> ${entry.text} <br> <em>${entry.date}</em><hr>`;
            overviewContent.appendChild(entryDiv);
        });
    }

    document.getElementById("overview-modal").style.display = "block"; // Toon modaal venster
}

// Sluit het modale venster
document.getElementById("close-modal").onclick = function() {
    document.getElementById("overview-modal").style.display = "none";
};
