import { getJobs } from "./jobs";

export const basic_resources = [
    "food",
    "minerals",
    "energy",
];
export const advanced_resources = [
    "consumer_goods",
    "alloys",
];
export const strategic_resources = [
    "rare_crystals",
    "exotic_gas",
    "volatile_motes",
];
export const special_resources = [
    "minor_artefacts",
    "dark_matter",
    "zro",
    "living_metal",
    "nanites"
];
export const abstract_resources = [
    "unity",
    "research_physics",
    "research_society",
    "research_engineering",
    "influence"
];
export const modifiers = [
    "amenities",
    "trade_value",
    "naval_cap"
];
export const all_resources = basic_resources.concat(
    advanced_resources,
    strategic_resources,
    special_resources,
    abstract_resources,
    modifiers
);