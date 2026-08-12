import type { Campaign, Character, Condition, EquipmentItem, Mutation, OpponentRecord, Result } from '../types';
import { equipmentTagsFor } from './generators';

// Legacy storage key retained so existing campaigns survive the Gamma Solo rename.
const KEY = 'mutant-ruins-v1';
const BACKUP_KEY = 'mutant-ruins-v1-backup';

export const empty = (): Campaign => ({
  expedition: { id: crypto.randomUUID(), active: false, objective: '', stakes: '', destination: '', pace: 'Steady', pressure: 0, supply: 6, charge: 3, filters: 1, repairKits: 1, medPatches: 1, tradeOddments: 1, scrapPoints: 0, travelTurns: 0, startedAt: '', lastTurn: '', notes: '', characterId: '', ruinId: '' },
  characters: [],
  ruins: [],
  journal: [],
  results: [],
  customTables: {},
  equipmentCatalog: [],
  shelterStash: [],
  opponentRoster: [],
  settings: { campaignName: '', calendarDay: 1, lastHavenBulk: 0, partialRecoveryByCharacter: {}, physicalAttackMatrix: {}, mentalCombatMode: 'Lightweight', mentalAttackMatrix: {}, mentalFormula: { base: 11, attackerDivisor: 3, defenderDivisor: 3 }, combatJournalMode: 'Summary Only', transcriptHideThreshold: 30, attackPresets: [], quickCombatTone: 'Standard', quickRecommendationStats: { accepted: 0, ignored: 0 }, quickRecommendationHistory: [], overwhelmingThresholds: { Gritty: 1.5, Standard: 2, Cinematic: 2.5 } },
});

function normalizeMutation(value: unknown): Mutation {
  const legacyName = typeof value === 'string' ? value : 'Saved mutation';
  const saved = typeof value === 'object' && value ? value as Partial<Mutation> : {};
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

export function normalizeEquipment(value:unknown):EquipmentItem{
 const name=typeof value==='string'?value:typeof value==='object'&&value&&typeof (value as Partial<EquipmentItem>).name==='string'?(value as Partial<EquipmentItem>).name!:'Imported item';
 const saved=typeof value==='object'&&value?value as Partial<EquipmentItem>:{};
 const number=(item:unknown,fallback=0)=>typeof item==='number'&&Number.isFinite(item)?item:fallback;
 return{id:saved.id||crypto.randomUUID(),name,category:saved.category||'Gear',quantity:number(saved.quantity,1),equipped:saved.equipped||false,condition:saved.condition||'Serviceable',bulk:number(saved.bulk,1),techLevel:saved.techLevel||'II',damage:saved.damage||'',damageModifier:saved.damageModifier||'',weaponClass:number(saved.weaponClass,saved.category==='Weapon'?1:0),toHitModifier:number(saved.toHitModifier),strengthDamageEligible:typeof saved.strengthDamageEligible==='boolean'?saved.strengthDamageEligible:saved.category==='Weapon'&&!saved.ammoType&&!number(saved.ammoMax)&&!(saved.tags||[]).includes('powered'),shieldPenalty:number(saved.shieldPenalty),armorClass:number(saved.armorClass,saved.category==='Armor'?Math.max(1,10-number(saved.defense)):10),range:saved.range||'',hands:saved.hands||'',ammoType:saved.ammoType||'',weaponFamily:saved.weaponFamily||String(saved.ammoType||name).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),ammoCurrent:number(saved.ammoCurrent),ammoMax:number(saved.ammoMax),defense:number(saved.defense),protection:saved.protection||'',movementPenalty:number(saved.movementPenalty),chargesCurrent:number(saved.chargesCurrent),chargesMax:number(saved.chargesMax),tags:Array.isArray(saved.tags)?saved.tags.filter(tag=>typeof tag==='string'):equipmentTagsFor(name,saved.category||'Gear'),tradeValue:number(saved.tradeValue,saved.category==='Artifact'?5:saved.category==='Weapon'||saved.category==='Armor'?2:1),notes:saved.notes||''};
}
function normalizeCondition(value:unknown):Condition{
 const saved=typeof value==='object'&&value?value as Partial<Condition>:{};
 return{id:saved.id||crypto.randomUUID(),name:saved.name||'Unnamed condition',severity:typeof saved.severity==='number'?saved.severity:1,active:saved.active!==false,notes:saved.notes||''};
}
export function normalizeCharacter(value:unknown):Character{
 if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Character JSON must contain one character object.');
 const saved=value as Partial<Character>;
 if(typeof saved.name!=='string'||!saved.name.trim())throw new Error('Character JSON is missing a character name.');
 const defaultAttributes=['Strength','Constitution','Dexterity','Intelligence','Willpower','Charisma'].map(name=>({name,value:10}));
 return{
  id:typeof saved.id==='string'&&saved.id?saved.id:crypto.randomUUID(),
  seed:typeof saved.seed==='string'?saved.seed:'imported-character',
  name:saved.name.trim(),player:typeof saved.player==='string'?saved.player:'',origin:typeof saved.origin==='string'?saved.origin:'',genotype:typeof saved.genotype==='string'?saved.genotype:'',lineage:typeof saved.lineage==='string'?saved.lineage:'',
  attributeMethod:typeof saved.attributeMethod==='string'?saved.attributeMethod:'4d6 drop lowest',mutationIntensity:typeof saved.mutationIntensity==='string'?saved.mutationIntensity:'Standard',defectFrequency:typeof saved.defectFrequency==='string'?saved.defectFrequency:'Occasional',
  level:typeof saved.level==='string'?saved.level:'1',statusPoints:typeof saved.statusPoints==='string'?saved.statusPoints:'0',homeland:typeof saved.homeland==='string'?saved.homeland:'',affiliation:typeof saved.affiliation==='string'?saved.affiliation:'',languages:typeof saved.languages==='string'?saved.languages:'',
  description:typeof saved.description==='string'?saved.description:'',personality:typeof saved.personality==='string'?saved.personality:'',goal:typeof saved.goal==='string'?saved.goal:'',fear:typeof saved.fear==='string'?saved.fear:'',trait:typeof saved.trait==='string'?saved.trait:'',oldObject:typeof saved.oldObject==='string'?saved.oldObject:'',notes:typeof saved.notes==='string'?saved.notes:'',
  attributes:Array.isArray(saved.attributes)&&saved.attributes.length?saved.attributes.filter(item=>item&&typeof item.name==='string'&&typeof item.value==='number'):defaultAttributes,
  derived:{'Hit Points':'10','Current Hit Points':'10','Armor Class':'10','Armor / Defense':'10','Movement':'12','Initiative':'0',...(saved.derived&&typeof saved.derived==='object'?saved.derived:{})},
  mutations:Array.isArray(saved.mutations)?saved.mutations.map(normalizeMutation):[],inventory:Array.isArray(saved.inventory)?(saved.inventory as unknown[]).map(normalizeEquipment):[],conditions:Array.isArray(saved.conditions)?(saved.conditions as unknown[]).map(normalizeCondition):[],exposure:{Radiation:0,Poison:0,Hunger:0,Thirst:0,Fatigue:0,...(saved.exposure||{})},recentCombat:saved.recentCombat&&typeof saved.recentCombat==='object'?saved.recentCombat:undefined,recentCombatHistory:Array.isArray(saved.recentCombatHistory)?saved.recentCombatHistory.slice(-3):saved.recentCombat?[saved.recentCombat]:[],createdAt:typeof saved.createdAt==='string'?saved.createdAt:new Date().toISOString()
 };
}


function normalizeOpponent(value:unknown):OpponentRecord{
 const saved=value&&typeof value==='object'?value as Partial<OpponentRecord>:{};
 return{id:saved.id||crypto.randomUUID(),name:saved.name||'Unknown opponent',kind:saved.kind||'Creature',hp:Math.max(0,Number(saved.hp)||0),maximum:Math.max(1,Number(saved.maximum)||1),armorClass:Math.max(1,Math.min(10,Number(saved.armorClass)||10)),shieldPenalty:Math.max(0,Number(saved.shieldPenalty)||0),hitDice:Math.max(1,Number(saved.hitDice)||1),mentalStrength:Math.max(1,Number(saved.mentalStrength)||10),weaponClass:Math.max(0,Number(saved.weaponClass)||0),toHitModifier:Number(saved.toHitModifier)||0,attacks:Math.max(1,Number(saved.attacks)||1),damage:saved.damage||'1d4',specialAttack:saved.specialAttack||'None',morale:saved.morale||'Steady',range:saved.range||'Medium',injuries:saved.injuries||'',faction:saved.faction||'',lastKnownLocation:saved.lastKnownLocation||'',numberAppearing:Math.max(1,Number(saved.numberAppearing)||1),leader:Boolean(saved.leader),notes:saved.notes||'',updatedAt:saved.updatedAt||new Date().toISOString()};
}

function normalizeResultTitle(result:Result):Result{
 if(!/^[^/]+\/\/\s*\d+$/.test(result.title||''))return result;
 const fields=result.fields||{};
 const title=result.kind==='Artifact'?fields.Form:result.kind==='Hazard'?fields.Hazard:result.kind==='Encounter'?((fields.Type||'Encounter')+': '+(fields.Description||'Unknown contact').replace(' watches from broken cover.','')):result.kind==='Settlement'?fields.Type:result.kind==='Faction'?fields.Operation:result.kind+' result';
 return{...result,title:title||result.kind+' result'};
}
export function normalizeCampaign(value:unknown):Campaign {
 const saved=value&&typeof value==='object'&&!Array.isArray(value)?value as Partial<Campaign>:{};
 const base=empty(),settings:Partial<Campaign['settings']>=saved.settings&&typeof saved.settings==='object'?saved.settings:{};
 return {
  ...base,
  ...saved,
  settings:{campaignName:settings.campaignName==='Ashfall Chronicle'?'':typeof settings.campaignName==='string'?settings.campaignName:'',calendarDay:Number(settings.calendarDay)||1,lastHavenBulk:Number(settings.lastHavenBulk)||0,partialRecoveryByCharacter:settings.partialRecoveryByCharacter&&typeof settings.partialRecoveryByCharacter==='object'?settings.partialRecoveryByCharacter:{},physicalAttackMatrix:settings.physicalAttackMatrix&&typeof settings.physicalAttackMatrix==='object'?settings.physicalAttackMatrix:{},mentalCombatMode:settings.mentalCombatMode||'Lightweight',mentalAttackMatrix:settings.mentalAttackMatrix&&typeof settings.mentalAttackMatrix==='object'?settings.mentalAttackMatrix:{},mentalFormula:settings.mentalFormula||{base:11,attackerDivisor:3,defenderDivisor:3},combatJournalMode:settings.combatJournalMode||'Summary Only',transcriptHideThreshold:Number(settings.transcriptHideThreshold)||30,attackPresets:Array.isArray(settings.attackPresets)?settings.attackPresets:[],quickCombatTone:settings.quickCombatTone||'Standard',quickRecommendationStats:settings.quickRecommendationStats||{accepted:0,ignored:0},quickRecommendationHistory:Array.isArray(settings.quickRecommendationHistory)?settings.quickRecommendationHistory:[],overwhelmingThresholds:settings.overwhelmingThresholds||{Gritty:1.5,Standard:2,Cinematic:2.5}},
  expedition:{...base.expedition,...(saved.expedition&&typeof saved.expedition==='object'?saved.expedition:{})},
  customTables:saved.customTables&&typeof saved.customTables==='object'&&!Array.isArray(saved.customTables)?saved.customTables:{},
  equipmentCatalog:Array.isArray(saved.equipmentCatalog)?(saved.equipmentCatalog as unknown[]).map(normalizeEquipment):[],
  shelterStash:Array.isArray(saved.shelterStash)?(saved.shelterStash as unknown[]).map(normalizeEquipment):[],
  opponentRoster:Array.isArray(saved.opponentRoster)?(saved.opponentRoster as unknown[]).map(normalizeOpponent):[],
  results:Array.isArray(saved.results)?saved.results.filter(item=>item&&typeof item==='object').map(item=>normalizeResultTitle(item as Result)):[],
  characters:Array.isArray(saved.characters)?saved.characters.map(normalizeCharacter):[],
  ruins:Array.isArray(saved.ruins)?saved.ruins:[],
  journal:Array.isArray(saved.journal)?saved.journal:[],
 };
}

export function load():Campaign {
 for(const key of [KEY,BACKUP_KEY]){
  try{const raw=localStorage.getItem(key);if(raw)return normalizeCampaign(JSON.parse(raw))}catch{/* Try the last known-good backup. */}
 }
 return empty();
}

export function save(campaign:Campaign):boolean {
 try{
  const previous=localStorage.getItem(KEY);
  if(previous){JSON.parse(previous);localStorage.setItem(BACKUP_KEY,previous)}
  localStorage.setItem(KEY,JSON.stringify(normalizeCampaign(campaign)));
  return true;
 }catch{return false}
}

