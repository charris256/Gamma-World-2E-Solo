# Gamma Solo Monte Carlo Playability Review — Tactical Memory Layer

Date: 2026-07-05  
Sample size: 100 deterministic simulated campaign sessions

## Method

Each session exercised:

1. Character and ruin generation.
2. Six expedition travel turns with pressure and clock changes.
3. Automatic encounter handoff with 1–8 opponents.
4. Individual and shared-HP group tracking.
5. A saved attack preset containing weapon, ammunition, attack count, range, and special effects.
6. Three rounds of physical and occasional mental combat.
7. Hit-chance, average-damage, and damage-range forecasts.
8. Repeat Attack and randomized Undo Last Attack use.
9. First blood, half HP, leader defeat, and overwhelming-force morale triggers.
10. Gritty, Standard, or Cinematic Quick Combat recommendations.
11. Combat reconciliation, transcript batching, opponent persistence, salvage, Camp, clocks, and journal threads.

Published matrix values were not reproduced. The test used synthetic target values and validates state transitions rather than exact rules balance. It does not replace a human browser usability session.

## Overall results

- Complete sessions: 100/100
- Procedural dead ends: 0
- TypeScript validation: passed
- Expedition travel turns: 600
- Player HP synchronization failures: 0
- Forecast calculation errors: 0
- Preset load failures: 0
- Undo rollback failures: 0

Gamma Solo completed the entire expedition-to-aftermath loop in every run.

## Tactical combat

- Physical attacks: 813
- Hits: 252
- Synthetic-fixture hit rate: 31.0%
- Total damage applied: 1,119
- Forecast checks: 533
- Forecast errors: 0
- Repeat Previous Attack uses: 45
- Recent Combat strip updates: 533
- Mental attacks: 61

The hit rate is not a balance judgment because synthetic matrix targets were used. Average and minimum–maximum forecasts remained internally valid.

## Attack presets

- Presets saved: 100
- Presets loaded: 100
- Preset failures: 0

Presets reproduced weapon, ammunition, attack count, range, and special-effect combinations correctly while the original character inventory remained unchanged.

## Ammunition

- Ammunition spent: 351
- Proactive shortage warnings: 1
- Attacks incorrectly allowed or blocked: 0
- Average ammunition spent per session: 3.51

The small number of warnings reflects generous randomized starting ammunition, not a missing warning branch.

## Undo integrity

- Undo attempts: 128
- Successful state restorations: 128
- Failed restorations: 0
- Transcripts removed with undo: 128

Undo restored character HP, ammunition, opponent HP, recent-combat memory, and the matching transcript in every simulated use.

## Morale system

Prompts generated:

- First blood: 89
- Half HP: 17
- Leader defeated: 8
- Overwhelming force: 82
- Morale checks taken: 99
- Failed morale checks: 51

First blood and half-HP prompts occurred at useful moments. Overwhelming force appeared in 82% of sessions because the current trigger treats three or more opponents as overwhelming relative to one player and does not count allies or relative combat strength.

## Quick Combat recommendation tone

Tone distribution:

- Gritty: 34
- Standard: 33
- Cinematic: 33

Recommended outcomes:

- Defeated: 26
- Fled: 68
- Surrendered: 1
- Negotiated: 3
- Escaped: 2
- Simulated recommendations accepted: 65

All outcome paths remained reachable, but Fled dominated this test. Short three-round combats, multi-opponent groups, and the synthetic hit rate contributed to that result. Tone settings changed thresholds correctly, but further tuning with real campaign data would improve confidence.

## Groups, reconciliation, and campaign continuity

- Individual groups: 52
- Shared-HP mobs: 48
- Total opponents represented: 475
- Combat summaries reconciled: 100
- Conditions added during reconciliation: 31
- Opponent rosters updated: 100
- Saved opponents reused: 56
- Every Attack sessions: 50
- Summary Only sessions: 50
- Linked child transcripts created: 247
- Salvage recovered: 204
- Bulk warnings: 8
- Camp actions: 100
- Pressure breaks: 61
- Clock advances: 197
- Threads resolved: 59
- Threads left open: 41

The tactical additions did not break expedition, inventory, Camp, journal, or campaign-continuity systems.

## Findings

1. **Gamma Solo remains useful for sustained solo play.** Every simulated campaign completed without a dead end.
2. **Attack presets are effective during a stable campaign.** All 100 saved routines reloaded correctly.
3. **Undo is mechanically sound before reconciliation.** All 128 rollbacks restored the tested state exactly.
4. **Forecasting is reliable.** Average and range calculations produced no invalid values.
5. **Morale prompts add useful decision points, but overwhelming force is noisy.** Its 82% trigger rate makes it feel routine rather than exceptional.
6. **Quick Combat recommendations skewed toward Fled.** This may be appropriate for a harsh solo game, but the tone profiles need real-play calibration.
7. **Undo lacks a reconciliation boundary.** The resolver can retain Undo Last Attack after the final combat summary is committed. Using it afterward can make the saved summary disagree with current HP or ammunition.
8. **Presets depend on inventory record IDs.** Reimporting a character, rerolling equipment, or replacing an ammunition stack can leave a preset pointing to a missing record. The current loader does not warn or rebind.
9. **Recent Combat is useful but only remembers one event.** This is appropriately compact, though a short history could help after multi-target encounters.

## Recommended enhancements

### Highest priority

1. **Make reconciliation transactional**
   - Clear or disable Undo Last Attack after confirmation.
   - Alternatively, offer Undo Reconciliation that restores the entire combat transaction, including summary, conditions, roster, HP, and resources.
   - Clearly label reconciliation as the combat commit point.

2. **Make overwhelming force relative**
   - Compare hostile numbers and effective Hit Dice against player characters, allies, pets, vehicles, and defensive position.
   - Allow the player to enter friendly-side strength.
   - Trigger once when the ratio crosses the configured threshold rather than from raw opponent count alone.

3. **Add preset health and rebinding**
   - Mark presets Ready, Missing Weapon, or Missing Ammunition.
   - Rebind by weapon family and equipment name when record IDs change.
   - Prevent a stale preset from silently selecting an unrelated fallback.

### Next tier

4. Add a recommendation-tuning summary showing which Gritty, Standard, or Cinematic threshold caused the advice.
5. Track outcome acceptance so a campaign can reveal whether recommendations are consistently too cautious or aggressive.
6. Consider a small multi-level undo history during active combat, then collapse it at reconciliation.

### Quality of life

7. Let players duplicate and rename presets without recreating them.
8. Add a friendly-force field to Encounter Runner for morale and Quick Combat calculations.
9. Expand Recent Combat into an optional last-three-events drawer while keeping the current one-line strip.
10. Add a one-click preset repair action after character or equipment import.

## Bottom line

Gamma Solo passes the updated 100-session usefulness test with 100% completion, zero procedural dead ends, zero forecast errors, zero preset-load failures, and 128/128 successful attack rollbacks.

The application is useful for sustained Gamma World solo play. The most important next work is defensive workflow design: lock Undo at reconciliation, make overwhelming-force prompts relative rather than raw-count based, and detect stale attack presets after inventory changes.
