import parseConfigFile from "./clausewitz-parse";
import { Jomini } from "jomini";
import { readFileSync } from "fs";
enum Resource{
    Food,
    Minerals,
    Energy,
    Alloys
}
enum ModifierType{}
class EconomyUnit{
    resourceType: Resource;
    amount: number;
    constructor(resourceType:Resource, amount:number) {
        this.resourceType = resourceType;
        this.amount = amount;    
    }
}
class Modifier{
    modifierType: ModifierType;
    amount: number;
    constructor(modifierType:ModifierType, amount:number) {
        this.modifierType = modifierType;
        this.amount = amount;    
    }
}
enum Stratum {
    Ruler,
    Specialist,
    Worker,
    ComplexDrone,
    MenialDrone,
    Slave,
    Undesirable,
}
class Job {
    name: string;
    production: Array<EconomyUnit>;
    upkeep: Array<EconomyUnit>;
    stratum: Stratum;
    constructor(name:string,production:Array<EconomyUnit>,upkeep:Array<EconomyUnit>,stratum:Stratum) {
        this.name = name;
        this.production = production;
        this.upkeep = upkeep;
        this.stratum = stratum;
    }
}

export async function getJobs():Promise<string> {
    const jobsFilePath:string = "C:\\Users\\skybe\\Projects\\stellaris-navy-optimize\\stellaris_common\\pop_jobs\\01_ruler_jobs.txt";
    const data = readFileSync(jobsFilePath);
    console.log("attempting to initialize...");
    const parser = await Jomini.initialize();
    console.log("attempting to parse...");
    const out = parser.parseText(data);
    console.log("printing out:");
    console.log(out);
    console.log("done printing out");
    //parseConfigFile([""]);
    return out.toString();
}