import type { ReactNode } from 'react';
import { Atom, BookOpen, Landmark, LayoutDashboard, Map, Compass, PlayCircle, Radio, Settings, Skull, UserRound } from 'lucide-react';
import type { Campaign, Page } from '../types';

export const pages: { id: Page; label: string; icon: typeof Atom }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'expedition', label: 'Expedition Dashboard', icon: Compass },
  { id: 'characters', label: 'Character Builder', icon: UserRound },
  { id: 'ruins', label: 'Ruins Generator', icon: Map },
  { id: 'turn', label: 'Solo Turn Procedure', icon: PlayCircle },
  { id: 'oracle', label: 'Solo Oracle', icon: Radio },
  { id: 'encounters', label: 'Encounters & Hazards', icon: Skull },
  { id: 'artifacts', label: 'Artifacts & Salvage', icon: Atom },
  { id: 'settlements', label: 'Settlements & Factions', icon: Landmark },
  { id: 'journal', label: 'Campaign Journal', icon: BookOpen },
  { id: 'settings', label: 'Settings / Tables', icon: Settings },
];

type Props = { campaign: Campaign; page: Page; setPage: (page: Page) => void; menu: boolean; setMenu: (open: boolean) => void; saveState: 'saving' | 'saved' | 'failed'; children: ReactNode };

export function AppShell({ campaign, page, setPage, menu, setMenu, saveState, children }: Props) {
  const saveLabel = saveState === 'failed' ? 'SAVE FAILED — EXPORT A BACKUP' : saveState === 'saved' ? 'LOCALLY SAVED' : 'WRITING TO ARCHIVE';
  return <div className="app"><a className="skip-link" href="#main-content">Skip to campaign tools</a><aside className={'sidebar '+(menu?'open':'')}><div className="brand"><Atom/><div><b>GAMMA SOLO</b><span>FIELD COMPANION // v1.0</span></div></div><nav aria-label="Primary navigation">{pages.map(item=><button key={item.id} aria-current={page===item.id?'page':undefined} className={page===item.id?'active':''} onClick={()=>{setPage(item.id);setMenu(false)}}><item.icon/><span>{item.label}</span></button>)}</nav><div className="offline"><i/>LOCAL-FIRST ARCHIVE<small>Works offline after first visit.</small></div></aside><main id="main-content" tabIndex={-1}><header className="top"><button className="menu" aria-label="Open navigation" onClick={()=>setMenu(!menu)}>☰</button><div><span>CAMPAIGN</span><b>{campaign.settings.campaignName||'UNNAMED CAMPAIGN'}</b></div><div role="status" aria-live="polite" className={'top-status '+saveState}><i/>{saveLabel}</div></header><div className="content">{children}</div></main></div>;
}
