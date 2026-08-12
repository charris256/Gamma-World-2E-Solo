const KEY = 'mutant-ruins-v1';
export const empty = () => ({
    characters: [],
    ruins: [],
    journal: [],
    results: [],
    customTables: {},
    settings: { campaignName: '' },
});
function normalizeMutation(value) {
    const legacyName = typeof value === 'string' ? value : 'Saved mutation';
    const saved = typeof value === 'object' && value ? value : {};
    return {
        id: saved.id || crypto.randomUUID(),
        name: saved.name || legacyName,
        category: saved.category || 'Physical',
        quality: saved.quality || 'Beneficial',
        activation: saved.activation || 'Conscious',
        range: saved.range || 'Body',
        duration: saved.duration || 'Constant',
        targets: saved.targets || 'Self',
        uses: saved.uses || 'At will',
        damage: saved.damage || 'None',
        effect: saved.effect || 'Add an original effect for this legacy mutation.',
        exhausted: saved.exhausted || false,
        misfire: saved.misfire || false,
        notes: saved.notes || '',
    };
}
export function normalizeCharacter(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new Error('Character JSON must contain one character object.');
    const saved = value;
    if (typeof saved.name !== 'string' || !saved.name.trim())
        throw new Error('Character JSON is missing a character name.');
    const defaultAttributes = ['Strength', 'Constitution', 'Dexterity', 'Intelligence', 'Willpower', 'Charisma'].map(name => ({ name, value: 10 }));
    return {
        id: typeof saved.id === 'string' && saved.id ? saved.id : crypto.randomUUID(),
        seed: typeof saved.seed === 'string' ? saved.seed : 'imported-character',
        name: saved.name.trim(), player: typeof saved.player === 'string' ? saved.player : '', origin: typeof saved.origin === 'string' ? saved.origin : '', genotype: typeof saved.genotype === 'string' ? saved.genotype : '', lineage: typeof saved.lineage === 'string' ? saved.lineage : '',
        attributeMethod: typeof saved.attributeMethod === 'string' ? saved.attributeMethod : '4d6 drop lowest', mutationIntensity: typeof saved.mutationIntensity === 'string' ? saved.mutationIntensity : 'Standard', defectFrequency: typeof saved.defectFrequency === 'string' ? saved.defectFrequency : 'Occasional',
        level: typeof saved.level === 'string' ? saved.level : '1', statusPoints: typeof saved.statusPoints === 'string' ? saved.statusPoints : '0', homeland: typeof saved.homeland === 'string' ? saved.homeland : '', affiliation: typeof saved.affiliation === 'string' ? saved.affiliation : '', languages: typeof saved.languages === 'string' ? saved.languages : '',
        description: typeof saved.description === 'string' ? saved.description : '', personality: typeof saved.personality === 'string' ? saved.personality : '', goal: typeof saved.goal === 'string' ? saved.goal : '', fear: typeof saved.fear === 'string' ? saved.fear : '', trait: typeof saved.trait === 'string' ? saved.trait : '', oldObject: typeof saved.oldObject === 'string' ? saved.oldObject : '', notes: typeof saved.notes === 'string' ? saved.notes : '',
        attributes: Array.isArray(saved.attributes) && saved.attributes.length ? saved.attributes.filter(item => item && typeof item.name === 'string' && typeof item.value === 'number') : defaultAttributes,
        derived: saved.derived && typeof saved.derived === 'object' ? saved.derived : { 'Hit Points': '10', 'Current Hit Points': '10', 'Armor / Defense': '10', 'Movement': '12', 'Initiative': '0' },
        mutations: Array.isArray(saved.mutations) ? saved.mutations.map(normalizeMutation) : [], inventory: Array.isArray(saved.inventory) ? saved.inventory.filter(item => typeof item === 'string') : [], createdAt: typeof saved.createdAt === 'string' ? saved.createdAt : new Date().toISOString()
    };
}
export function load() {
    try {
        const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
        return {
            ...empty(),
            ...saved,
            settings: { campaignName: saved.settings?.campaignName === 'Ashfall Chronicle' ? '' : saved.settings?.campaignName || '' },
            characters: (saved.characters || []).map(normalizeCharacter),
        };
    }
    catch {
        return empty();
    }
}
export const save = (campaign) => localStorage.setItem(KEY, JSON.stringify(campaign));
