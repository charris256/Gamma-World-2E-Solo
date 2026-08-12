import { BookOpen, ChevronDown, ChevronUp, Compass, Play, PlayCircle, RefreshCw, ShieldAlert } from 'lucide-react';
import type { Campaign, ExpeditionState } from '../types';

type Props={campaign:Campaign;update:(campaign:Campaign)=>void;sendToSoloTurn:()=>void};

const clamp=(value:number,min=0,max=99)=>Math.max(min,Math.min(max,value));
const fresh=():ExpeditionState=>({id:crypto.randomUUID(),active:false,objective:'',stakes:'',destination:'',pace:'Steady',pressure:0,supply:6,charge:3,filters:1,repairKits:1,medPatches:1,tradeOddments:1,scrapPoints:0,travelTurns:0,startedAt:'',lastTurn:'',notes:'',characterId:'',ruinId:''});

export function ExpeditionDashboard({campaign,update,sendToSoloTurn}:Props){
 const expedition=campaign.expedition;
 const patch=(changes:Partial<ExpeditionState>)=>update({...campaign,expedition:{...expedition,...changes}});
 const resource=(key:keyof Pick<ExpeditionState,'supply'|'charge'|'filters'|'repairKits'|'medPatches'|'tradeOddments'|'scrapPoints'>,delta:number)=>patch({[key]:clamp(expedition[key]+delta)} as Partial<ExpeditionState>);
 const pressure=(delta:number)=>patch({pressure:clamp(expedition.pressure+delta,0,6)});
 const start=()=>patch({active:true,startedAt:expedition.startedAt||new Date().toISOString()});
 const reset=()=>{if(confirm('End this expedition and clear its dashboard?'))update({...campaign,expedition:fresh()})};
 const travelTurn=()=>{
  const turn=expedition.travelTurns+1;
  const roll=()=>1+Math.floor(Math.random()*6);
  const hazardRoll=roll(),signRoll=roll(),encounterRoll=roll();
  const hazardBand=expedition.pace==='Cautious'?1:expedition.pace==='Steady'?2:3;
  const hazard=hazardRoll<=hazardBand,sign=signRoll>=(expedition.pace==='Cautious'?4:5),encounter=encounterRoll<=(expedition.pressure>=4?2:1);
  const strain=turn%2===0?1:0;
  const pressureGain=expedition.pace==='Hard'?1:0;
  const summary='Turn '+turn+' · '+expedition.pace+' pace · Hazard '+hazardRoll+(hazard?' (triggered)':' (clear)')+' · Sign '+signRoll+(sign?' (found)':' (none)')+' · Encounter '+encounterRoll+(encounter?' (contact)':' (quiet)')+(strain?' · Supply -1':'')+(pressureGain?' · Pressure +1':'');
  patch({active:true,startedAt:expedition.startedAt||new Date().toISOString(),travelTurns:turn,supply:clamp(expedition.supply-strain),pressure:clamp(expedition.pressure+pressureGain,0,6),lastTurn:summary});
 };
 const journal=()=>{
  const body=['Expedition: '+(expedition.objective||'Unnamed objective'),'Destination: '+(expedition.destination||'Unknown'),'Stakes: '+(expedition.stakes||'Not recorded'),'Pace: '+expedition.pace,'Pressure: '+expedition.pressure+'/6','Resources: Supply '+expedition.supply+', Charge '+expedition.charge+', Filters '+expedition.filters+', Repair kits '+expedition.repairKits+', Med patches '+expedition.medPatches+', Scrap points '+expedition.scrapPoints,expedition.lastTurn,expedition.notes].filter(Boolean).join('\n');
  update({...campaign,journal:[...campaign.journal,{id:crypto.randomUUID(),title:'Expedition — '+(expedition.objective||expedition.destination||'Field report'),createdAt:new Date().toISOString(),worldDate:'',tags:['expedition'],body,type:'Expedition',links:{character:expedition.characterId,ruin:expedition.ruinId,faction:'',artifact:''}}]});
 };
 const breakPressure=(cost:string)=>{
  const changes:Partial<ExpeditionState>={pressure:3,lastTurn:'Pressure break — '+cost};
  if(cost==='Lose 1 Supply')changes.supply=clamp(expedition.supply-1);
  patch(changes);
 };
 return <div className="expedition-page">
  <header className="expedition-hero"><div><span>FIELD OPERATION</span><h1>Expedition Dashboard</h1><p>Set the aim, manage field pressure, spend resources, and keep the journey moving.</p></div><div className={'expedition-status '+(expedition.active?'active':'')}><i/>{expedition.active?'EXPEDITION ACTIVE':'IN HAVEN'}</div></header>
  <section className="expedition-command panel"><header><div><span className="kicker">MISSION BRIEF</span><h2>Objective and stakes</h2></div><div className="actions">{!expedition.active&&<button className="btn primary" onClick={start}><Play size={16}/>Begin expedition</button>}<button className="btn ghost" onClick={journal}><BookOpen size={16}/>Journal report</button><button className="btn ghost" onClick={reset}><RefreshCw size={16}/>End / reset</button></div></header><div className="expedition-fields"><label><span>Objective</span><input value={expedition.objective} onChange={e=>patch({objective:e.target.value})} placeholder="Recover medicine from the sealed clinic"/></label><label><span>Destination</span><input value={expedition.destination} onChange={e=>patch({destination:e.target.value})} placeholder="Open ruin, hot zone, unknown signal…"/></label><label className="wide"><span>Why it matters / cost of failure</span><textarea spellCheck lang="en" value={expedition.stakes} onChange={e=>patch({stakes:e.target.value})} placeholder="What counts as success, and what happens if you return empty-handed?"/></label><label><span>Lead survivor</span><select value={expedition.characterId} onChange={e=>patch({characterId:e.target.value})}><option value="">Unassigned</option>{campaign.characters.map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</select></label><label><span>Target ruin</span><select value={expedition.ruinId} onChange={e=>patch({ruinId:e.target.value})}><option value="">Unassigned</option>{campaign.ruins.map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</select></label></div></section>
  <div className="expedition-grid">
   <section className="panel pressure-panel"><header><div><span className="kicker">SHARED STRESS</span><h2>Pressure</h2></div><strong>{expedition.pressure} / 6</strong></header><div className="pressure-track">{[1,2,3,4,5,6].map(value=><button aria-label={'Set Pressure to '+value} onClick={()=>patch({pressure:value})} className={value<=expedition.pressure?'filled':''} key={value}>{value}</button>)}</div><div className="pressure-label"><span>0–1 Quiet</span><span>2–3 Worn</span><span>4–5 Hunted</span><span>6 Break</span></div><div className="stepper"><button onClick={()=>pressure(-1)}>−</button><span>Adjust Pressure</span><button onClick={()=>pressure(1)}>+</button></div>{expedition.pressure>=6&&<div className="pressure-break"><ShieldAlert/><div><b>Pressure break</b><p>Choose a cost, then reset Pressure to 3.</p></div>{['Lose 1 Supply','Damage gear','Suffer a condition','Trigger encounter','Abandon position'].map(cost=><button key={cost} onClick={()=>breakPressure(cost)}>{cost}</button>)}</div>}</section>
   <section className="panel resource-panel"><header><div><span className="kicker">FIELD STORES</span><h2>Resources</h2></div></header><div className="resource-grid">{([['supply','Supply'],['charge','Charge'],['filters','Filters'],['repairKits','Repair kits'],['medPatches','Med patches'],['tradeOddments','Trade oddments'],['scrapPoints','Scrap points']] as const).map(([key,label])=><div key={key}><span>{label}</span><button onClick={()=>resource(key,-1)}><ChevronDown/></button><b>{expedition[key]}</b><button onClick={()=>resource(key,1)}><ChevronUp/></button></div>)}</div></section>
  </div>
  <section className="panel travel-panel"><header><div><span className="kicker">OVERLAND CYCLE</span><h2>Travel turn</h2></div><b>TURN {expedition.travelTurns}</b></header><div className="pace-picker">{(['Cautious','Steady','Hard'] as const).map(pace=><button className={expedition.pace===pace?'active':''} onClick={()=>patch({pace})} key={pace}><b>{pace}</b><span>{pace==='Cautious'?'Short move · stronger sign checks':pace==='Steady'?'Normal movement and risk':'Long move · Pressure +1'}</span></button>)}</div><div className="travel-actions"><button className="btn primary travel-roll" onClick={travelTurn}><Compass size={18}/>Take travel turn</button><button className="btn ghost" onClick={sendToSoloTurn}><PlayCircle size={18}/>Send to Solo Turn</button></div>{expedition.lastTurn&&<div className="turn-result">{expedition.lastTurn}</div>}<p className="muted">Solo Turn carries over Travel mode, lead survivor, target ruin, Pressure, and the latest travel result.</p></section>
  <section className="panel expedition-notes"><header><div><span className="kicker">FIELD NOTES</span><h2>Route, signs, and decisions</h2></div></header><textarea spellCheck lang="en" value={expedition.notes} onChange={e=>patch({notes:e.target.value})} placeholder="Known route, risky shortcut, discoveries, camp location, clues, debts…"/></section>
 </div>;
}
