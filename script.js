const input = document.querySelector("input");
const btn = document.querySelector("button");
const dictionary = document.querySelector(".dictionary-app");


async function dictionaryFn(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok) {
            throw new Error("Word not found");
        }
        const data = await res.json();
        return data[0]; 
    } catch (err) {
        console.error(err);
        return null;
    }
}


async function fetchandCreateCard() {
    const word = input.value.trim();
    if (!word) {
        dictionary.innerHTML = `<p style="color:red;">⚠️ Please enter a word</p>`;
        return;
    }

    const data = await dictionaryFn(word);

    if (!data) {
        dictionary.innerHTML = `<p style="color:red;"> Word not found</p>`;
        return;
    }

  
    const wordText = data.word;
    const phonetics = data.phonetics[0]?.text || "Not available";
    const audio = data.phonetics[0]?.audio || "";
    const definition = data.meanings[0]?.definitions[0]?.definition || "No definition found.";
    const example = data.meanings[0]?.definitions[0]?.example || "No example available.";
    const partOfSpeech = data.meanings[0]?.partOfSpeech || "N/A";


    dictionary.innerHTML = `
        <div class="card">
            <div class="property">
              <span>Word:</span> 
              <span>${wordText}</span></div>
            <div class="property">
              <span>Phonetics:</span> 
              <span>${phonetics}</span></div>
            <div class="property">
              <span>Audio:</span> 
                ${audio ? `<audio controls src="${audio}"></audio>` : "No audio"}
            </div>
            <div class="property">
              <span>Definition:</span> 
              <span>${definition}</span></div>
            <div class="property">
              <span>Example:</span> 
              <span class="example">${example}</span></div>
            <div class="property">
              <span>Part of speech:</span> 
              <span class="part-of-speech">${partOfSpeech}</span></div>
        </div>
    `;
}


btn.addEventListener('click', fetchandCreateCard);


input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchandCreateCard();
    }
});
