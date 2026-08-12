const KEY = 'mutant-ruins-v1';
export const empty = () => ({ characters: [], ruins: [], journal: [], results: [], customTables: {}, settings: { campaignName: 'Ashfall Chronicle' } });
export function load() { try {
    return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) || '{}') };
}
catch {
    return empty();
} }
export const save = (c) => localStorage.setItem(KEY, JSON.stringify(c));
