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
function normalizeEquipment(value) {
    const name = typeof value === 'string' ? value : typeof value === 'object' && value && typeof value.name === 'string' ? value.name : 'Imported item';
    const saved = typeof value === 'object' && value ? value : {};
    const number = (item, fallback = 0) => typeof item === 'number' && Number.isFinite(item) ? item : fallback;
    return { id: saved.id || crypto.randomUUID(), name, category: saved.category || 'Gear', quantity: number(saved.quantity, 1), equipped: saved.equipped || false, condition: saved.condition || 'Serviceable', bulk: number(saved.bulk, 1), techLevel: saved.techLevel || 'II', damage: saved.damage || '', range: saved.range || '', hands: saved.hands || '', ammoType: saved.ammoType || '', ammoCurrent: number(saved.ammoCurrent), ammoMax: number(saved.ammoMax), defense: number(saved.defense), protection: saved.protection || '', movementPenalty: number(saved.movementPenalty), chargesCurrent: number(saved.chargesCurrent), chargesMax: number(saved.chargesMax), notes: saved.notes || '' };
}
function normalizeCondition(value) {
    const saved = typeof value === 'object' && value ? value : {};
    return { id: saved.id || crypto.randomUUID(), name: saved.name || 'Unnamed condition', severity: typeof saved.severity === 'number' ? saved.severity : 1, active: saved.active !== false, notes: saved.notes || '' };
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
        mutations: Array.isArray(saved.mutations) ? saved.mutations.map(normalizeMutation) : [], inventory: Array.isArray(saved.inventory) ? saved.inventory.map(normalizeEquipment) : [], conditions: Array.isArray(saved.conditions) ? saved.conditions.map(normalizeCondition) : [], exposure: { Radiation: 0, Poison: 0, Hunger: 0, Thirst: 0, Fatigue: 0, ...(saved.exposure || {}) }, createdAt: typeof saved.createdAt === 'string' ? saved.createdAt : new Date().toISOString()
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
