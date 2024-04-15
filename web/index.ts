import { Jomini } from "jomini";

async function jominiInitialized():Promise<Jomini> {
    const wasmUrl = 'lib/jomini_js_bg.wasm';
    return new Promise((resolve,_reject) => {
        Jomini.initialize({wasm:wasmUrl}).then(resolve);
    });
}
async function GetJobLists():Promise<Array<string>> {
    const xhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhttp.addEventListener('load', function() {
            resolve(JSON.parse(this.responseText));
        });
        xhttp.open("GET", "/joblists");
        xhttp.send();
    });
}
async function GetJobData(jobListName:string):Promise<string> {
    const xhttp = new XMLHttpRequest();
    return new Promise((resolve, _reject) => {
        xhttp.addEventListener('load', function() {
            resolve(this.responseText);
        });
        xhttp.open("GET", "/stellaris_common/pop_jobs/"+jobListName);
        xhttp.send();
    });
}
function addJobDataToPage(jobData:any):void {
    const tbody = document.getElementsByTagName("tbody")[0];
    if (tbody == null) {
        throw new DOMException("tbody needs to exist");
    }
    for(const jobName of Object.keys(jobData)) {
        const newRow = document.createElement("tr");
        const thisJob = jobData[jobName];

        const jobNameD = document.createElement("td");
        jobNameD.innerText = jobName;
        newRow.appendChild(jobNameD);

        const jobCategory = document.createElement("td")
        jobCategory.innerText = thisJob["category"];
        newRow.appendChild(jobCategory);

        const jobSubCategory = document.createElement("td")
        try {
            jobSubCategory.innerText = thisJob["resources"]["category"];
        } catch {
            jobSubCategory.innerText = "undefined"
        }
        newRow.appendChild(jobSubCategory);

        const jobIcon = document.createElement("td")
        jobIcon.innerText = thisJob["building_icon"];
        newRow.appendChild(jobIcon);

        const possiblePreTriggers = document.createElement("td")
        possiblePreTriggers.innerText = JSON.stringify(thisJob["possible_pre_triggers"]);
        newRow.appendChild(possiblePreTriggers);

        const triggeredPlanetModifier = document.createElement("td")
        triggeredPlanetModifier.innerText = JSON.stringify(thisJob["triggered_planet_modifier"]);
        newRow.appendChild(triggeredPlanetModifier);

        const production = document.createElement("td")
        try {
            production.innerText = JSON.stringify(thisJob["resources"]["produces"]);
        } catch {
            production.innerText = "none"
        }
        newRow.appendChild(production);

        const upkeep = document.createElement("td")
        try {
            upkeep.innerText = JSON.stringify(thisJob["resources"]["upkeep"]);
        } catch {
            upkeep.innerText = "none"
        }
        newRow.appendChild(upkeep);

        tbody.append(newRow);
    }
}
const parser = await jominiInitialized();
const jobLists = await GetJobLists();
const x:HTMLElement|null = document.getElementById("demo");
if (x === null) {} else {
    for (const jobList of jobLists) {
        const jobDataText:string = await GetJobData(jobList);
        const jobDataJson = parser.parseText(jobDataText);
        addJobDataToPage(jobDataJson);
    }
}
