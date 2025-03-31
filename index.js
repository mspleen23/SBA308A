async function getData() {
    try {
        const response = await fetch("https://labs.bible.org/api/?passage=random&type=json");
        const data = await response.json();
        const bibleObj = data[0];
        const bibleScriptures = document.getElementById("apiScript");

        // This will clear the conent without erasing my heading and subheading
        const verseContainer = document.getElementById("verseContainer");
        verseContainer.innerHTML = "";

        // Create and append elements with spacing
        const bookname = document.createElement("p");
        bookname.textContent = "Book: " + bibleObj.bookname;
        bookname.style.marginBottom = "5px";
        verseContainer.appendChild(bookname);

        const chapter = document.createElement("p");
        chapter.textContent = "Chapter: " + bibleObj.chapter;
        chapter.style.marginBottom = "5px";
        verseContainer.appendChild(chapter);

        const verse = document.createElement("p");
        verse.textContent = "Verse: " + bibleObj.verse;
        verse.style.marginBottom = "5px";
        verseContainer.appendChild(verse);

        const text = document.createElement("p");
        text.textContent = '"' + bibleObj.text + '"';
        text.style.fontStyle = "italic";
        text.style.marginBottom = "10px";
        verseContainer.appendChild(text);

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const bibleScriptures = document.getElementById("apiScript");

    // Create a container for verses (to clear only this part)
    const verseContainer = document.createElement("div");
    verseContainer.id = "verseContainer";
    bibleScriptures.appendChild(verseContainer);

    // Creating the button
    const button = document.createElement("button");
    button.textContent = "Get New Verse";
    button.style.display = "block";
    button.style.marginTop = "10px";
    button.style.backgroundColor= "deepPink"

 
    button.addEventListener("click", getData);
    bibleScriptures.appendChild(button);
});

///////////////////////////////////////////////////////////////

function fetchVerse() {
    const book = document.getElementById("book").value.trim().toLowerCase();
    const chapter = document.getElementById("chapter").value.trim();
    const verse = document.getElementById("verse").value.trim();
    const version = "kjv"; 

    if (!book || !chapter || !verse) {
        alert("Please enter a book, chapter, and verse.");
        return;
    }

    const apiUrl = `https://bible-api.com/verses/{keyword}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Verse not found.");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("result").innerText = `"${data.text}" - ${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${verse}`;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("result").innerText = "Verse not found. Please check your input.";
        });
}

getData();
  