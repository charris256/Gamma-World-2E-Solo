import { useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import type { Campaign } from '../types';

type Props={campaign:Campaign;mode:string;characterId:string;ruinId:string};
type Advice={action:string;why:string;prompt:string};

export function WhatNow({campaign,mode,characterId,ruinId}:Props){
 const[advice,setAdvice]=useState<Advice|null>(null);
 const unresolved=[...campaign.journal].reverse().find(entry=>(entry.status||'Open')==='Open'&&(['Open question','Loose thread','Active quest','Mission','Threat'].includes(entry.type)||entry.tags.includes('open-thread')));
 const suggest=()=>{
  const character=campaign.characters.find(item=>item.id===characterId),ruin=campaign.ruins.find(item=>item.id===ruinId),pressure=campaign.expedition.pressure,supply=campaign.expedition.supply;
  const clock=ruin?Object.entries(ruin.clocks).sort((a,b)=>b[1]-a[1])[0]:undefined;
  const tags=new Set(character?.inventory.filter(item=>item.equipped||['Gear','Consumable','Artifact'].includes(item.category)).flatMap(item=>item.tags||[])||[]);
  const exposure=character?Object.entries(character.exposure).sort((a,b)=>b[1]-a[1])[0]:undefined;
  let next:Advice;
  if(pressure>=5)next={action:'Break contact and make for a defensible camp.',why:'Pressure is '+pressure+'/6; another complication may force a break.',prompt:tags.has('bulky')?'What bulky item must be abandoned or cached to escape?':'What route gets you out before the opposition closes in?'};
  else if(exposure&&exposure[1]>=4)next={action:'Treat '+exposure[0]+' exposure before pressing on.',why:(character?.name||'The survivor')+' is at '+exposure[1]+'/6 exposure.',prompt:tags.has('medical')?'Your medical gear provides the needed treatment—what does it cost?':'Where can treatment or decontamination be found?'};
  else if(clock&&clock[1]>=5)next={action:'Address the '+clock[0]+' clock now.',why:(ruin?.name||'The ruin')+' is at '+clock[1]+'/6.',prompt:'Do you confront the threat, escape it, or sacrifice something to delay it?'};
  else if(supply<=1)next={action:mode==='Explore Ruin'?'Make a careful salvage search for survival supplies.':'Return to a haven or locate supplies.',why:'Only '+supply+' Supply remains.',prompt:tags.has('survival')?'Which survival-tagged item stretches the remaining supply?':'What nearby resource could keep the expedition moving?'};
  else if(mode==='Combat')next={action:'Generate the Encounter Runner, then choose fight, negotiate, or escape.',why:'Combat mode needs position, morale, and the opposition’s first action.',prompt:tags.has('loud')?'Using loud equipment will advertise this fight and may increase Pressure.':'Can a quiet approach preserve surprise?'};
  else if(mode==='Social')next={action:'Identify what the contact wants and offer leverage.',why:'Social scenes move when desire and cost become concrete.',prompt:tags.has('trade-good')?'A trade-good can become leverage—what do they offer in return?':'What debt, secret, or shared enemy can shift their reaction?'};
  else if(mode==='Explore Ruin')next={action:'Choose a search method or push toward the ruin’s objective.',why:clock?'The highest ruin clock is '+clock[0]+' at '+clock[1]+'/6.':'No ruin clock is currently driving the scene.',prompt:tags.has('radioactive')?'Radioactive gear may contaminate this site—log or contain it.':tags.has('fragile')?'What protects the fragile gear during the search?':'What sign reveals the safest valuable route?'};
  else if(mode==='Travel')next={action:'Take the next travel turn and react to its strongest result.',why:'Travel mode advances distance, supply, signs, and encounter pressure.',prompt:tags.has('survival')?'How does the survival gear improve this leg of travel?':'What landmark proves the expedition is still on course?'};
  else if(mode==='Camp'||mode==='Downtime')next={action:'Resolve one Camp/Haven action, then advance the calendar.',why:'Recovery should change resources, relationships, or world state.',prompt:unresolved?'Can you act on the open thread “'+unresolved.title+'” before leaving?':'What faction acts while the survivors recover?'};
  else if(unresolved)next={action:'Pull the latest unresolved thread back into play.',why:'“'+unresolved.title+'” is still open.',prompt:'What changes if this thread is ignored for one more day?'};
  else next={action:'State a concrete objective and ask the oracle what blocks it.',why:'There is no urgent pressure or open thread demanding attention.',prompt:'What does the survivor want right now, and what makes it risky?'};
  setAdvice(next);
 };
 return <section className="what-now"><button className="btn primary" onClick={suggest}><Compass size={17}/>What now?</button><div><span>CONTEXTUAL GUIDE</span>{advice?<><b>{advice.action}</b><small>{advice.why}</small><p><Sparkles size={14}/>{advice.prompt}</p></>:<><b>Need a direction?</b><small>Read the current mode, pressure, supplies, clocks, gear, exposure, and open threads.</small></>}</div>{unresolved&&<aside className="thread-reminder"><span>SECONDARY THREAD</span><b>{unresolved.title}</b><small>Still Open · resolve it, advance it, or let it complicate the next scene.</small></aside>}</section>;
}
