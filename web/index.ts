import { Jomini } from "jomini";

const wasmUrl = 'lib/jomini_js_bg.wasm';
Jomini.initialize({ wasm: wasmUrl }).then((parser) => {
    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', function() {
        const x:HTMLElement|null = document.getElementById("demo");
        if (x === null) {} else {
            const out = parser.parseText(this.responseText);
            const y:HTMLElement = x;
            y.innerHTML = JSON.stringify(out);
            console.log(out);
        }
    });
    xhttp.open("GET", "stellaris_common/pop_jobs/02_specialist_jobs.txt");
    xhttp.send();
});