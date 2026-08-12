import { BookOpen, ChevronDown } from 'lucide-react';

const tools=[
 {label:'Scene',hint:'Scene heading',text:'S# *Location, time*\n'},
 {label:'> Action',hint:'Character action',text:'> '},
 {label:'? Oracle',hint:'Question for the world',text:'? '},
 {label:'d: Roll',hint:'Mechanic or dice result',text:'d: '},
 {label:'-> Answer',hint:'Oracle answer',text:'-> '},
 {label:'=> Result',hint:'Fictional consequence',text:'=> '},
 {label:'NPC',hint:'Persistent contact',text:'[N:Name|status]'},
 {label:'Location',hint:'Persistent location',text:'[L:Name|status]'},
 {label:'Clock',hint:'Threat clock',text:'[Clock:Name 0/6]'},
 {label:'Thread',hint:'Story thread',text:'[Thread:Name|Open]'},
 {label:'PC',hint:'Character state',text:'[PC:Name|HP 0|Status]'},
 {label:'Note',hint:'Out-of-character note',text:'(note: )'}
];

export function NotationToolbar({value,onChange}:{value:string;onChange:(value:string)=>void}){
 const insert=(text:string)=>onChange(value+(value&&!value.endsWith('\n')?'\n':'')+text);
 return <details className="notation-tools"><summary><BookOpen size={17}/><span><b>Solo notation tools</b><small>Optional shorthand for fast, searchable play logs</small></span><ChevronDown/></summary><div className="notation-tools-body"><div className="notation-buttons">{tools.map(tool=><button type="button" title={tool.hint} onClick={()=>insert(tool.text)} key={tool.label}>{tool.label}</button>)}</div><div className="notation-legend"><span><code>&gt;</code> action</span><span><code>?</code> oracle question</span><span><code>d:</code> roll</span><span><code>-&gt;</code> oracle answer</span><span><code>=&gt;</code> consequence</span></div><p>Compatible with <i>Solo TTRPG Notation v2.0</i> by Roberto Bisceglie, licensed CC BY-SA 4.0. Use only the layers that help your play.</p></div></details>;
}
