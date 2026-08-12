# Gamma Solo Monte Carlo Playability Review — Priority 1–3

Date: 2026-07-01  
Sample size: 100 seeded simulated solo sessions  
Additional guidance stress test: 100 randomized campaign states

## Test scope

Each simulated session:

1. Generated a character and ruin.
2. Ran six expedition travel turns with a randomly selected pace.
3. Generated a complete Encounter Runner situation.
4. Resolved one quick, careful, or full salvage search.
5. Applied clock, risk, loot, exposure, inventory, and journal consequences.
6. Ran a Camp/Haven phase.
7. Created six representative journal records.
8. Requested What now? guidance in all six play modes.
9. Checked equipment-tag coverage and tag-aware recommendations.

This is a procedural/state simulation. It validates generation, state transitions, coverage, and play-loop continuity; it does not replace a human usability session or browser interaction test.

## Results

### Complete play loop

- Complete sessions: 100/100
- Dead ends: 0
- Characters generated: 100/100
- Ruins generated: 100/100
- Encounter Runner records with all seven fields: 100/100
- Salvage procedures resolved: 100/100
- Camp/Haven phases resolved: 100/100
- Journal records created: 600 total, 6 per session
- What now? suggestions returned: 600/600
- Context-sensitive suggestions: 600/600

### Expedition pressure and events

- Travel hazards or salvage dangers: 232
- Travel signs/discovery leads: 242
- Travel encounters: 110
- Pressure breaks: 32
- Ruin clocks saturated by salvage: 0

The travel loop generated regular events without forcing every ruin clock to six. Pressure breaks occurred often enough to matter but did not stop play.

### Salvage

- Quick searches: 38
- Careful searches: 31
- Full extractions: 31
- Loot items recovered: 193
- Average loot per session: 1.93
- Duplicate loot within one search: 0

The three methods produced a useful risk/reward choice. Full extraction did not immediately overwhelm clocks, but repeated expeditions will grow character inventories quickly.

### Equipment tags

Characters beginning with at least one tag: 100/100

- quiet: 11
- loud: 89
- fragile: 0
- bulky: 84
- powered: 0
- radioactive: 33
- medical: 8
- trade-good: 100
- survival: 51

Tag-aware What now? prompts: 284/600 (47.3%).

Tags are mechanically useful, but automatic starting coverage is uneven. Loud, bulky, and trade-good dominate; fragile and powered never appeared in starting loadouts.

### What now? stress test

One hundred additional randomized states tested the recommendation priority rules:

- High Pressure recommendation: 38
- High exposure recommendation: 19
- Urgent clock recommendation: 20
- Low Supply recommendation: 6
- Mode-specific recommendation: 15
- Unresolved-thread primary recommendation: 2
- Generic fallback: 0
- Unresolved thread referenced during Camp/Downtime: 16

All urgent-state branches were reachable. Open threads usually appear as a secondary Camp/Downtime prompt because pressure, exposure, clocks, supply, and selected mode correctly take priority.

### Distribution sanity check

Genotypes:

- Pure Strain Human: 23
- Humanoid: 27
- Mutant Animal: 17
- Mutant Plant: 33

Ruin danger:

- Low: 26
- Guarded: 21
- Severe: 31
- Extreme: 22

No invalid genotype or danger result appeared.

## Findings

1. **Gamma Solo now supports an end-to-end solo session.** The connected loop—character, expedition, encounter, salvage, camp, journal, and next-action guidance—completed in all 100 runs.
2. **The procedure glue works.** Encounter and salvage results move into journal and campaign state instead of remaining isolated generators.
3. **What now? successfully prevents blank-page paralysis.** Every tested state produced an actionable recommendation, and urgent pressure, exposure, supply, and clock states overrode routine mode advice.
4. **Camp recovery is too generous for sustained play.** Recover currently restores full HP without a Supply or time cost, and exposure treatment does not consume a Filter or Med Patch. This can erase expedition attrition too easily.
5. **Inventory growth will become a usability issue.** At 1.93 recovered items per expedition, a ten-expedition character could gain roughly nineteen salvage records. A shelter stash and sell/scrap controls would keep the character sheet usable.
6. **Automatic tag assignment needs a curated pass.** Fragile and powered did not appear naturally, while 89% of starting characters carried loud gear. The heuristic is functional but not yet a balanced equipment taxonomy.
7. **Journal volume is now high enough to need thread management.** Six records per short session is useful, but unresolved threads need explicit Open, Resolved, and Archived states rather than relying only on entry type and tags.
8. **The Encounter Runner frames a fight but does not run combat.** Distance, awareness, reaction, morale, first action, leverage, and escape are present; opponent HP, defense, damage, and round tracking remain manual.

## Recommended enhancements

### Highest value

1. **Balanced Camp costs**
   - Recover partial HP for free or full HP for 1 Supply and one day.
   - Treat exposure with a Filter, Med Patch, or appropriate tagged item.
   - Make repair consume both a Repair Kit and time.

2. **Shelter stash and salvage disposition**
   - Move equipment between carried inventory and a shelter stash.
   - Add Keep, Equip, Trade, Scrap, and Abandon actions.
   - Warn when bulk exceeds capacity after salvage.

3. **Curated equipment-tag audit**
   - Assign tags directly across the 100 weapons, armor, gear, and ammunition records.
   - Add prompt effects for each tag.
   - Allow multiple tags to combine into one consequence.

### Next tier

4. **Thread status**
   - Add Open, Resolved, and Archived status to journal records.
   - Show one secondary unresolved-thread reminder beside the primary What now? recommendation.
   - Add Resolve thread from a Solo Turn consequence.

5. **Lightweight combat tracker**
   - Opponent HP, defense, damage, morale state, range band, and round count.
   - Use Encounter Runner output to prefill the tracker.
   - Journal the outcome and resource expenditure.

6. **Long-campaign dashboard metrics**
   - Inventory/bulk trend.
   - Open threats and missions.
   - Days elapsed.
   - Faction moves since last haven.

## Bottom line

Gamma Solo passes the updated 100-session usefulness test with 100% loop completion and no procedural dead ends. It is now a practical solo-play companion rather than only a content generator.

The next improvements should focus on campaign longevity: balanced recovery costs, inventory/stash management, curated equipment tags, and explicit journal-thread resolution.
