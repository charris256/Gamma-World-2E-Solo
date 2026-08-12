# Gamma Solo Monte Carlo Playability Review — Mental Rules and Combat Guidance

Date: 2026-07-03  
Sample size: 100 deterministic simulated campaign sessions

## Method

Every simulated session exercised character and ruin generation, six travel turns, pressure and clocks, automatic encounter handoff, individual or shared-HP groups, three rounds of physical combat, owner-supplied physical matrix lookup, ammunition matching, attack forecasting, optional repeat attacks, one of the three mental-combat modes, Quick Combat recommendations, persistent opponents, salvage, Camp recovery, journal threads, and combat-transcript filtering.

Published rulebook tables were not reproduced. Matrix tests used synthetic target values. This is a procedural and state-transition stress test; it does not replace a human browser usability session.

## Overall results

- Completed sessions: 100/100
- Procedural dead ends: 0
- TypeScript validation: passed
- Player HP synchronization failures: 0
- Attack forecast calculation errors: 0
- Physical matrix lookups: 821/821
- Incorrect ammunition blocks: 0
- Opponent roster auto-updates: 100/100

Gamma Solo completed every tested play loop from expedition through combat aftermath.

## Physical combat and ammunition

- Total physical attacks: 821
- Hits: 319
- Synthetic-fixture hit rate: 38.9%
- Total damage applied: 1,525
- Compatible ranged loadouts: 67/67
- Ammunition spent: 375
- Proactive insufficient-ammunition warnings: 5
- Attacks incorrectly allowed or blocked after warnings: 0
- Repeat Previous Attack uses: 36
- Average ammunition spent per session: 3.75

The hit rate is not a balance verdict because synthetic matrix targets were used. Effective target, hit chance, expected damage, and ammunition cost remained numerically valid in all runs.

## Mental combat

Modes were distributed across the 100 sessions:

- Lightweight: 34 sessions; 26 attacks; 11 successes
- Owner-supplied Matrix: 33 sessions; 28 attacks; 11 successes
- Configurable Formula: 33 sessions; 19 attacks; 7 successes
- Missing Matrix cells safely routed to lightweight fallback: 6

All three modes produced valid required targets, resolutions, effects, and journal records. Missing owner-supplied cells did not stop play.

## Quick Combat guidance

Round-three recommendations:

- Defeated: 49
- Fled: 33
- Surrendered: 4
- Negotiated: 8
- Escaped: 6
- Simulated recommendations accepted: 74/100

Every outcome branch appeared. Recommendations remained optional and included an explanation based on HP, morale, leverage, escape route, or relative numbers.

## Encounter groups and persistent opponents

- Individually tracked groups: 50
- Shared-HP mobs: 50
- Total opponents represented: 392
- Average Number Appearing: 3.92
- Opponents initially saved: 100
- Opponents automatically updated when combat was journaled: 100
- Saved opponents reused: 47
- Unsaved-change warnings exercised: 27

Automatic handoff and roster persistence completed without losing HP, injuries, morale, faction, location, or special attacks.

## Expedition and campaign continuity

- Pressure breaks: 58
- Ruin clock advances: 186
- Salvage items recovered: 201
- Bulk warnings: 15
- Camp actions: 100
- Campaign days advanced: 16
- Threads resolved: 59
- Threads left open: 41

The non-combat campaign loop remained intact after the combat additions.

## Journal volume

- Narrative journal records: 554
- Attack transcripts: 894
- Combined records: 1,448
- Average records per session: 14.48
- Transcript filter checks: 100/100

The new filter successfully separates attack rolls from campaign narrative. However, nearly nine attack transcripts per session can still make a long campaign archive feel busy when “All entries” is selected.

## Findings

1. **Gamma Solo remains useful for sustained solo play.** All 100 sessions completed without a dead end.
2. **The three mental-combat options are resilient.** Players can choose speed, owned-table fidelity, or a configurable calculation without losing the lightweight fallback.
3. **Predictive physical combat is working.** Target, chance, expected damage, ammunition cost, warning, and repeat-attack paths produced no invalid state.
4. **Quick Combat recommendations are varied and non-coercive.** All five outcomes appeared and the player retains final authority.
5. **Automatic encounter and roster handoffs materially reduce bookkeeping.** Generated statistics and persistent opponent changes carried forward correctly.
6. **Combat transcript volume is now the largest usability pressure.** The filter solves retrieval, but the default All Entries view still mixes detailed attack records with narrative records.
7. **Mental Matrix onboarding trails Physical Matrix onboarding.** It has import and template support but lacks the physical assistant’s missing-row report and visual row editor.
8. **Expected damage is an estimate, not a rules guarantee.** It uses average dice and current modifiers; unusual narrative effects are shown but cannot be assigned a numerical expectation.
9. **Quick Combat guidance is intentionally heuristic.** It does not yet account for armor quality, mutation strength, cover, allies, or remaining ammunition.

## Recommended enhancements

### Highest value

1. **Batch combat transcripts**
   - Group attack records beneath one collapsible combat summary.
   - Offer “journal every attack” and “summary only” preferences.
   - Default the Journal to hide attack rolls after a campaign exceeds a configurable threshold.

2. **Bring Mental Matrix onboarding to parity**
   - Add missing-row and missing-cell reporting.
   - Add a visual MS-versus-defense row editor.
   - Show matrix coverage for the currently selected attacker and target before combat.

3. **End-of-combat reconciliation**
   - Present one confirmation screen for final HP, ammunition, charges, conditions, opponent status, loot, and roster updates.
   - Save a single linked combat summary after confirmation.

### Next tier

4. Add saved attack presets for frequently used weapon, ammunition, attack count, range, and special-effect combinations.
5. Allow Quick Combat recommendation weighting to be adjusted for gritty, standard, or cinematic campaigns.
6. Add morale-check prompts when first blood, half HP, leader defeat, or overwhelming force conditions occur.

### Quality of life

7. Let expected damage show a range as well as an average.
8. Add an Undo Last Attack action that restores HP and ammunition while marking or removing its transcript.
9. Show a compact “recent combat” strip in the Character Play Card with last target, damage, ammunition spent, and current HP.

## Bottom line

Gamma Solo passes the updated 100-session usefulness test with 100% completion, zero procedural dead ends, zero ammunition-state failures, zero forecast errors, and successful coverage of all mental and Quick Combat modes.

The tool is useful for sustained Gamma World solo play. The next largest improvement is not another resolver—it is consolidating combat records so the richer mechanics remain fast and readable over a long campaign.
