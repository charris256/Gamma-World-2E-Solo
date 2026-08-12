# Gamma Solo Monte Carlo Review — Contextual Campaign Build

Date: 2026-07-06  
Sample size: 100 deterministic simulated campaign sessions

## Scope

Each session exercised travel, pressure, ruin clocks, physical combat, forecasts, ammunition, returning wounded opponents, encounter-start baselines, all five preset-health states, repair previews, linked allies/assets, relative-force thresholds, contextual recommendation telemetry, active undo, reconciliation rollback, roster updates, recent-combat history, salvage, Camp, and journal threads.

Synthetic attack targets were used; no published matrix values were reproduced. This validates state continuity rather than exact rules balance and does not replace human usability testing.

## Results

- Completed sessions: 100/100
- Procedural dead ends: 0
- Travel turns: 600
- Pressure breaks: 53
- Clock advances: 173
- Attacks: 756
- Hits: 273
- Synthetic hit rate: 36.1%
- Damage applied: 1,096
- Forecast checks: 519
- Forecast errors: 0
- Ammunition spent: 519
- Active undos: 121
- Active undo failures: 0
- Reconciliations: 100
- Full reconciliation undos: 44
- Reconciliation failures: 0
- Combat summaries: 100
- Roster updates: 100
- Recent-combat events: 519
- Recent-history overflows: 0

## Encounter baselines

- Returning wounded opponents: 41
- False First Blood prompts: 0
- New First Blood prompts: 83
- Pre-defeated leaders: 5
- False Leader Defeat prompts: 0
- New Leader Defeat prompts: 27

Existing wounds and defeated leaders were preserved without being mistaken for new combat events.

## Preset health

All states were tested evenly:

- Ready: 20
- Missing Weapon: 20
- Missing Ammunition: 20
- Empty Ammunition: 20
- Incompatible Family: 20
- Test-load checks: 100
- Repair previews: 80
- Compatible repairs confirmed: 80

No stale or unusable preset silently loaded.

## Friendly force

- Linked character strength: 164
- Linked roster-allies: 256
- Pets: 98
- Vehicles: 53
- Defensive assets: 49
- Relative-force crossings: 43
- Overwhelming-force prompts: 43
- Duplicate prompts: 0

## Recommendation telemetry

- Contextual events: 100
- Accepted: 64
- Ignored: 36
- Decisions after a tone reached the ten-event calibration minimum: 73

Tone use:

- Gritty: 34
- Standard: 33
- Cinematic: 33

Suggested outcomes:

- Defeated: 69
- Fled: 18
- Negotiated: 13
- Escaped: 0
- Surrendered: 0

Telemetry and calibration gating worked, but recommendation diversity was narrow under this synthetic state distribution.

## Campaign continuity

- Salvage recovered: 202
- Camp actions: 100
- Threads resolved: 57
- Threads open: 43
- Average ammunition spent per session: 5.19
- Average damage per session: 10.96

## Findings

1. Gamma Solo completed every end-to-end solo loop.
2. Encounter-start baselines eliminated false returning-opponent morale triggers.
3. Preset diagnostics and previewed repairs worked across every health state.
4. Linked allies and assets changed force ratios without duplicate prompts.
5. Active and reconciliation undo remained reliable.
6. Recommendation output skewed toward Defeated; Escaped and Surrendered did not appear.
7. Linked allies still contribute abstract strength rather than receiving independent HP, morale, and resource tracking.
8. Repair previews choose a valid compatible match, but do not yet let the player compare multiple candidates.

## Recommended enhancements

### Highest value

1. Add recommendation analytics by tone, cause, suggested result, and final result; include export/reset controls.
2. Add optional full combat cards for linked allies, pets, and vehicles while preserving numeric quick mode.
3. Let preset repair display and choose among every compatible weapon/ammunition candidate.

### Next tier

4. Add recommendation diversity warnings after sufficient real campaign data.
5. Make the overwhelming-force threshold configurable per campaign tone.
6. Include encounter-baseline changes in reconciliation summaries.

### Quality of life

7. Link Recent Combat entries directly to combat summaries.
8. Filter returning named opponents by unresolved injuries.
9. Add preset folders for melee, ranged, mutation-assisted, and emergency routines.
10. Show a friendly-force contribution breakdown beside the ratio.

## Bottom line

Gamma Solo passes the 100-session usefulness test with 100% completion, zero dead ends, zero false baseline morale triggers, zero forecast errors, 121 successful active undos, and 44 successful full reconciliation rollbacks.

The next work should emphasize visibility and choice: richer recommendation analytics, optional full ally cards, and multi-candidate preset repair.
