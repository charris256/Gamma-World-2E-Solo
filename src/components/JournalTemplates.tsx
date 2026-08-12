import type { Journal } from '../types';
import { BookOpen, ClipboardList, Contact, PackageSearch, Radiation, ShieldAlert, TentTree, Truck } from 'lucide-react';

type Template={name:string;type:string;tags:string[];icon:typeof BookOpen;body:string};
const templates:Template[]=[
 {name:'Quick Scene Log',type:'Session',tags:['scene','notation'],icon:BookOpen,body:'S1 *Location, time*\n\n> Character action\nd: roll or rule => outcome\n=> Fictional consequence\n\n? Oracle question\n-> Oracle answer\n=> What it means in the story\n'},
 {name:'Expedition Log',type:'Expedition',tags:['expedition','open-thread'],icon:BookOpen,body:'OBJECTIVE:\n\nROUTE / DESTINATION:\n\nPARTY & LOADOUT:\n\nTRAVEL EVENTS:\n\nDISCOVERIES:\n\nRESOURCES SPENT:\n\nCLOCK CHANGES:\n\nRETURN STATUS / NEXT STEP:\n'},
 {name:'Contact Record',type:'NPC',tags:['contact','open-thread'],icon:Contact,body:'NAME / DESIGNATION:\n\nAPPEARANCE & MANNER:\n\nLOCATION / FACTION:\n\nREACTION & MOTIVE:\n\nWHAT THEY WANT:\n\nLEVERAGE / DEBT:\n\nLAST CONTACT / NEXT MOVE:\n'},
 {name:'Mission Record',type:'Active quest',tags:['mission','open-thread'],icon:ClipboardList,body:'MISSION:\n\nSPONSOR:\n\nOBJECTIVE:\n\nSTAKES / REWARD:\n\nKNOWN THREATS:\n\nREQUIRED RESOURCES:\n\nPROGRESS:\n\nCOMPLICATIONS:\n\nSTATUS / NEXT ACTION:\n'},
 {name:'Salvage Inventory',type:'Salvage',tags:['salvage','inventory'],icon:PackageSearch,body:'RECOVERY SITE:\n\nITEM / QUANTITY:\n\nCONDITION & TECH LEVEL:\n\nTAGS / HAZARDS:\n\nESTIMATED VALUE:\n\nINTENDED USE / BUYER:\n\nSTORAGE LOCATION:\n'},
 {name:'Contamination Log',type:'Threat',tags:['contamination','open-thread'],icon:Radiation,body:'SOURCE / LOCATION:\n\nTYPE: Radiation / Poison / Disease / Other\n\nEXPOSURE LEVEL:\n\nAFFECTED CHARACTERS / GEAR:\n\nSYMPTOMS:\n\nTREATMENT ATTEMPTED:\n\nQUARANTINE / CLEANUP NEEDS:\n\nCURRENT STATUS:\n'},
 {name:'Threat Tracker',type:'Threat',tags:['threat','open-thread'],icon:ShieldAlert,body:'THREAT:\n\nLOCATION / RANGE:\n\nSIGNS & EVIDENCE:\n\nCAPABILITY / INTENT:\n\nCURRENT CLOCK: 0 / 6\n\nTRIGGER / ESCALATION:\n\nCOUNTERMEASURES:\n\nNEXT EXPECTED MOVE:\n'},
 {name:'Shelter Record',type:'Settlement',tags:['shelter','haven'],icon:TentTree,body:'NAME / LOCATION:\n\nACCESS & SECURITY:\n\nWATER / FOOD / POWER:\n\nCAPACITY & CONDITION:\n\nRESIDENTS / OWNER:\n\nSERVICES & SUPPLIES:\n\nHAZARDS / MAINTENANCE:\n\nFACTION INTEREST:\n'},
 {name:'Vehicle Record',type:'Vehicle',tags:['vehicle','asset'],icon:Truck,body:'NAME / TYPE:\n\nCONDITION:\n\nCREW / CAPACITY:\n\nSPEED / RANGE:\n\nFUEL / CHARGE:\n\nARMOR / WEAPONS:\n\nCARGO:\n\nQUIRKS / DAMAGE:\n\nCURRENT LOCATION:\n'}
];

export function JournalTemplates({onSelect}:{onSelect:(value:Partial<Journal>)=>void}){
 return <div className="journal-templates"><div><span className="kicker">FIELD FORMS</span><b>Start from a record template</b></div><div>{templates.map(template=><button key={template.name} onClick={()=>onSelect({title:template.name+': ',type:template.type,tags:template.tags,body:template.body})}><template.icon size={17}/><span>{template.name}</span></button>)}</div></div>;
}
