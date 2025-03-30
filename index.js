async function getData() {
    try {
        const response = await fetch("https://labs.bible.org/api/?passage=random&type=json");
        const data = await response.json();
        const bibleObj = data[0];
        const bibleScriptures = document.getElementById("apiScript");

    
        // Create and append elements with space
        const bookname = document.createElement('p');
        bookname.textContent = `Book: ${bibleObj.bookname}`;
        bookname.style.marginBottom = "5px";
        bibleScriptures.append(bookname);

        const chapter = document.createElement('p');
        chapter.textContent = `Chapter: ${bibleObj.chapter}`;
        chapter.style.marginBottom = "5px";
        bibleScriptures.append(chapter);

        const verse = document.createElement('p');
        verse.textContent = `Verse: ${bibleObj.verse}`;
        verse.style.marginBottom = "5px";
        bibleScriptures.append(verse);

        const text = document.createElement('p');
        text.textContent = `"${bibleObj.text}"`;
        text.style.fontStyle = "italic";
        text.style.marginBottom = "10px";
        bibleScriptures.append(text);

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementByClass("button");
    button.textContent = "Get New Verse";
    button.style.display = "block";
    button.style.marginTop = "10px";
    button.addEventListener("click", getData);

    document.body.append(button);
    getData(); // Load an initial verse
});



getData()
