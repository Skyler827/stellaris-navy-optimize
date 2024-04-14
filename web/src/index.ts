import { Jomini } from 'https://cdn.jsdelivr.net/npm/jomini@0.8.0/dist/es-slim/index_slim.min.js';

const wasmUrl = 'https://cdn.jsdelivr.net/npm/jomini@0.8.0/dist/jomini.wasm';
Jomini.initialize({ wasm: wasmUrl }).then((parser) => {
    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', function() {
        document.getElementById("demo").innerHTML = this.responseText;
    });
    xhttp.open("GET", "tsconfig.json");
    xhttp.send();
    const out = parser.parseText();
    console.log(out);
});