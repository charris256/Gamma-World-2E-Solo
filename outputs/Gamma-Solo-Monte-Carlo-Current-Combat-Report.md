# Gamma Solo Monte Carlo Playability Review — Current Combat Build

Date: 2026-07-02  
Sample size: 100 deterministic simulated campaign sessions

## Method

Each session exercised a complete solo-play loop: character and ruin creation; six travel turns; an encounter with 1–8 individual or shared-HP opponents; three rounds of physical combat in both directions; synthetic WC/HD-versus-AC matrix lookups; Dexterity, shield, equipment, Physical Strength, ammunition, special-damage, and extended-range adjustments; compatible ammunition spending; optional mental combat; opponent save/reuse; salvage; Camp recovery; clocks; threads; and journaling.

The synthetic matrix contains test targets only and does not reproduce a published rules table. This validates procedure continuity and state transitions; it does not replace human browser usability testing.

## Results

### Overall continuity

- Completed sessions: 100/100
- Procedural dead ends: 0
- Quick combats reaching an outcome decision: 100/100
- Player HP synchronization failures: 0
- Journal records created: 683
- Average journal records per session: 6.83

### Physical combat

- Matrix lookups completed: 870/870
- Player attacks: 449
- Enemy attacks: 421
- Hits: 322
- Misses: 548
- Combined hit rate: 37.0%
- Damage applied: 1,139
- Extended-range attacks: 32
- Special-damage attacks: 30
- Opponents reduced to zero HP during three-round Quick Combat: 10

The hit rate is not a balance verdict because the test used synthetic targets. It confirms that modifiers, lookups, damage, and HP transitions remain valid over repeated use.

### Ammunition

- Ranged loadouts tested: 59
- Correct weapon-family matches: 59/59
- Family mismatches: 0
- Ammunition spent: 278
- Average ammunition spent per session: 2.78
- Incorrect ammunition blocks: 0
- Legacy weapon-counter dependency: none

Ammunition stacks now behave as the authoritative count. Physical attacks and manual Combat Tracker spending consume compatible stack quantities.

### Mental combat

- Mental attacks attempted: 73
- Successful mental attacks: 29
- Success rate: 39.7%

Mental mutations connect to the panel and produce journaled effects. The current procedure uses a lightweight d20-versus-defense model rather than an owner-imported mental attack matrix.

### Groups and persistent opponents

- Encounter groups created: 100
- Average group size: 4.6
- Shared-HP mobs: 41
- Individually tracked groups: 59
- Opponents saved: 100
- Saved opponents reused: 61

Both group modes remained valid. Persistent HP, injuries, morale, faction, and location survive when the opponent is explicitly saved.

### Campaign continuity

- Pressure breaks: 64
- Ruin clock advances: 176
- Salvage recovered: 192 items
- Bulk warnings: 14
- Camp recoveries: 65
- Campaign days advanced: 28
- Threads resolved: 60
- Threads left open: 40

## Findings

1. **Gamma Solo supports sustained solo play.** All 100 sessions reached aftermath without a dead end.
2. **The corrected physical resolver is stable.** Matrix lookup, modifiers, damage, special damage, extended range, HP synchronization, and journaling stayed valid.
3. **Ammunition compatibility works as intended.** Every ranged loadout matched and consumed the correct inventory stack.
4. **Quick Combat is a decision aid, not an automatic engine.** Only 10 opponents reached zero HP within three rounds; most encounters still need a fast-outcome choice.
5. **Matrix onboarding remains technical.** There is validation, but no downloadable blank template, visual editor, or completeness report.
6. **Number Appearing is manually transferred.** Generated encounter results do not automatically populate the group control.
7. **Opponent persistence requires Save opponent.** Changes can be lost if the player leaves without saving the roster record.
8. **Mental combat is intentionally lightweight.** It is not yet parallel to the owner-supplied physical matrix workflow.
9. **Journal volume is substantial.** Nearly seven records per session makes filters and thread status important.

## Recommended enhancements

### Highest value

1. **Attack matrix onboarding assistant**
   - Downloadable blank WC/HD-by-AC JSON template.
   - Missing-row and missing-cell report.
   - Small visual row editor.

2. **Automatic encounter handoff**
   - Transfer Number Appearing, name, HD, AC, attacks, damage, morale, and special attacks into Combat Tracker.
   - Ask whether to use individual or shared mob HP.

3. **Automatic roster persistence**
   - Update saved opponents when combat is journaled.
   - Warn about unsaved opponent changes before leaving.

### Next tier

4. Allow an owner-supplied mental attack matrix or configurable formula while retaining the lightweight default.
5. At Quick Combat round three, recommend—but never force—an outcome using HP percentage, morale, leverage, escape route, and relative numbers.
6. Show total compatible ammunition beside weapons and warn before a multiple-attack routine exceeds the selected stack.

### Quality of life

7. Show effective target, estimated hit chance, expected damage, and ammunition cost before rolling.
8. Add Repeat previous attack.
9. Add a compact combat-transcript journal filter.

## Bottom line

Gamma Solo passes the current 100-session usefulness test with 100% completion, no procedural dead ends, no ammunition-family failures, and no player-HP synchronization failures.

The application is useful for sustained Gamma World solo play. The next gains are workflow improvements: simplify matrix setup, automatically transfer encounter statistics, and persist named opponents without relying on an extra Save click.
