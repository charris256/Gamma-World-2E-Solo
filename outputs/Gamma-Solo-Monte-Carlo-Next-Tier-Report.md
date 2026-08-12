# Gamma Solo Monte Carlo Review - Next-Tier Campaign Systems

Date: 2026-07-01  
Sample size: 100 seeded campaign sessions  
Additional treatment stress test: 100 randomized resource states

## What was tested

Each simulated session exercised:

1. Character and ruin generation.
2. A multi-round combat using the Encounter Runner and Combat Tracker fields.
3. Ammunition, Charge, and Med Patch expenditure.
4. Three journal threads moving through Open, Resolved, and Archived states.
5. One salvage procedure followed by shelter, trade, scrap, or abandon decisions when overloaded.
6. Partial or full Camp recovery, repairs, exposure treatment, and calendar costs.
7. Long-campaign dashboard calculations for bulk, storage, threats, missions, days, and faction moves.
8. Multi-tag equipment consequences.

This is a deterministic procedure and state-transition simulation. It does not replace human browser usability testing.

## Results

### Overall continuity

- Complete campaign sessions: 100/100
- Procedural dead ends: 0
- Dashboard metric sets completed: 100/100
- Characters with compound equipment tags: 100/100

Gamma Solo still completes the full solo-play loop after the new campaign-management features.

### Combat Tracker

- Complete combat records: 100/100
- Combat outcomes recorded: 100/100
- Average combat length: 7.56 rounds
- Ammunition spent: 274
- Expedition Charge spent: 217
- Med Patches spent during combat: 34
- Combats blocked by unavailable tracked resources: 0

The tracker supplies enough information to run and journal an encounter. Seven to eight rounds is slightly long for a lightweight solo procedure.

### Journal threads

Across 100 sessions:

- Open threads remaining: 100
- Threads resolved from play: 100
- Threads archived: 100
- Resolve Thread consequence successes: 100/100
- Secondary What now? reminders shown: 100/100

Status changes correctly affected reminders and dashboard counts.

### Salvage and shelter

- Salvage records recovered: 219
- Average salvage per session: 2.19
- Bulk warnings triggered: 34
- Items moved to shelter: 28
- Items traded: 33
- Items scrapped: 20
- Items abandoned: 26
- Sessions still overloaded after the simulated disposition pass: 1

The bulk warning and disposition loop work. The remaining overloaded case was still actionable through additional manual disposition and was not a dead end.

### Camp and campaign time

- Partial recoveries: 52
- Full recoveries: 48
- Supply spent on full recovery: 48
- Repairs completed: 30
- Repair Kits spent: 30
- Exposure treatments: 77
- Filters spent: 77
- Campaign days advanced: 78
- Average days advanced per session: 0.78

The new Camp costs preserve expedition attrition much better than the earlier free-recovery version.

### Treatment fallback stress test

Randomized states confirmed every treatment branch is reachable:

- Filter used: 46
- Med Patch used: 32
- Tagged medical/survival item used: 13
- Treatment correctly blocked with no valid resource: 9

In the normal simulation a Filter was always available first, so the automatic priority consumed it before other options.

### Long-campaign dashboard

- Complete metric calculations: 100/100
- Faction moves after the latest haven: 94 total
- Bulk trend, stash bulk, thread counts, days elapsed, and faction activity all produced valid values.

## Findings

1. **The next-tier systems are useful and connected.** Combat, thread resolution, salvage disposition, Camp costs, and dashboard metrics completed without breaking the play loop.
2. **Journal status is now mechanically meaningful.** Resolved and Archived entries stop appearing as unresolved reminders and no longer inflate open-threat or mission counts.
3. **Combat tracking is usable but still asymmetric.** Opponent HP is tracked, while damage to the player character remains manual. Average combat length was 7.56 rounds.
4. **Camp attrition is substantially better.** Full recovery, repair, and exposure treatment now spend meaningful resources or time.
5. **Free partial recovery can be repeated.** All 100 damaged test characters could eventually reach full HP through repeated free Partial Recovery clicks. The action needs a once-per-day or once-per-Camp limit.
6. **Scrapping has a value exploit.** Ten low-bulk items in the simulation could become a full Repair Kit despite being minor salvage.
7. **Trading stacks has a larger value exploit.** A generated ammunition stack could produce as many as 20 Trade Oddments because trading currently uses item quantity directly.
8. **Automatic treatment priority is rigid.** Filters are always consumed first for Radiation or Poison. Players may want to preserve a rare Filter and choose a Med Patch or tagged item instead.
9. **Dashboard metrics are valuable but should be clickable.** Open threats, missions, and faction moves would be more useful if each metric opened the matching filtered journal records.

## Recommended enhancements

### High priority balance fixes

1. **Limit Partial Recovery**
   - Allow it once per character per campaign day or once per Camp phase.
   - Alternatively, each additional use should spend Supply or add Fatigue.

2. **Use a salvage-value economy**
   - Trade value should use an item value rating instead of raw quantity.
   - Ammunition stacks should trade as one lot or use a capped value.
   - Scrapping should generate Scrap Points; require several points to create one Repair Kit.

3. **Let the player choose exposure treatment**
   - Present Filter, Med Patch, and eligible tagged items as separate buttons.
   - Show the remaining quantity before committing the treatment.

### Combat usability

4. Add player HP beside opponent HP with Take Damage and Heal controls.
5. Add fast outcome buttons: Defeated, Fled, Surrendered, Negotiated, Escaped.
6. Scale opponent HP and defense using ruin danger or character rank.
7. Add an optional three-round Quick Combat mode for minor encounters.

### Campaign navigation

8. Make dashboard threat, mission, and faction metrics open a filtered Journal view.
9. Add a compact campaign timeline showing haven visits, faction moves, and mission resolutions.
10. Add a warning when an Archived thread is referenced by a new entry.

## Bottom line

Gamma Solo passes the updated 100-session usefulness test with 100% completion and no procedural dead ends. It is capable of supporting sustained solo Gamma World play.

The most important next work is economic guardrails: limit repeat Partial Recovery, replace quantity-based trading, and make scrapping proportional to item value. After that, connecting player HP directly to the Combat Tracker would provide the largest usability gain.
Add This Image Improvement Prompt Block

Use this after uploading your miniature renders.docx