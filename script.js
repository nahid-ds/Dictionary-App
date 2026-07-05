async function searchWord(){
let w=document.getElementById('word').value.trim();
if(!w)return;
let box=document.getElementById('dictionary');
box.innerHTML='Loading...';
try{
let r=await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+w);
let d=await r.json();
let x=d[0];
box.innerHTML='<h3>'+x.word+'</h3>'
+'<p><b>Phonetic:</b> '+(x.phonetic||'N/A')+'</p>'
+'<p><b>Meaning:</b> '+x.meanings[0].definitions[0].definition+'</p>';
}catch{
box.innerHTML='Word not found.';
}
}

async function translateText() {
    let txt = document.getElementById("text").value.trim();

    if (!txt) return;

    let pair = document.getElementById("lang").value.split("|");

    // If translating English to Bangla,
    // capitalize the first letter automatically.
    if (pair[0] === "en") {
        txt = txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    }

    let url =
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(txt) +
        "&langpair=" +
        pair[0] +
        "|" +
        pair[1];

    let box = document.getElementById("translation");
    box.innerHTML = "Translating...";

    try {
        let response = await fetch(url);
        let data = await response.json();

        box.innerHTML = `
            <h3>Translation</h3>
            <p>${data.responseData.translatedText}</p>
        `;
    } catch (error) {
        box.innerHTML = "Translation failed.";
    }
}
