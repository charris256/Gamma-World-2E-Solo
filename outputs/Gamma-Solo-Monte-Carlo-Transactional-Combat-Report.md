# Gamma Solo Monte Carlo Playability Review — Transactional Combat

Date: 2026-07-05  
Sample size: 100 deterministic simulated campaign sessions

## Method

Each session exercised character and ruin generation, six travel turns, pressure and clocks, encounter handoff, saved and stale attack presets, relative force, three recommendation tones, active-combat undo history, reconciliation commit and rollback, reused wounded opponents, morale prompts, recent-combat history, transcript batching, opponent persistence, salvage, Camp, and journal threads.

Synthetic attack targets were used. No published matrix values were reproduced. This validates procedure continuity and state transitions rather than exact rules balance, and it does not replace a human browser usability session.

## Overall results

- Completed sessions: 100/100
- Procedural dead ends: 0
- TypeScript validation: passed
- Travel turns: 600
- Pressure breaks: 62
- Ruin clock advances: 213
- HP synchronization failures: 0
- Forecast errors: 0

Gamma Solo completed the full expedition-to-aftermath loop in every run.

## Combat and resources

- Attacks resolved: 832
- Hits: 296
- Synthetic-fixture hit rate: 35.6%
- Damage applied: 1,275
- Damage forecasts checked: 575
- Ammunition spent: 575
- Proactive shortage warnings: 1
- Average ammunition spent per session: 5.75
- Average damage per session: 12.75

Forecast averages and ranges remained valid. The low warning count reflects generous randomized ammunition.

## Attack presets

- Presets initially Ready: 25
- Missing Weapon: 75
- Missing Ammunition: 0
- Successfully rebound by name/family: 50
- Repairs correctly blocked when no matching equipment existed: 25
- Presets renamed: 100
- Presets duplicated: 100

The intentionally high stale-ID rate stress-tested import and replacement behavior. Repair worked whenever compatible name/family records existed and refused to silently bind when none existed.

## Active combat undo

- Undo snapshots created: 575
- Successful active attack undos: 135
- Rollback failures: 0
- Empty-stack undo attempts safely blocked: 3
- Post-commit active undo blocked: 100/100

The five-step undo stack restored HP, ammunition, opponent HP, recent history, and transcripts without drift.

## Reconciliation transaction

- Reconciliations committed: 100
- Full Undo Reconciliation operations: 46
- Full restoration failures: 0
- Opponent roster updates: 100
- Conditions committed: 39
- Combat summaries: 100
- Every Attack sessions: 50
- Summary Only sessions: 50
- Linked child transcripts: 292

Reconciliation now functions as a real transaction boundary. Full rollback restored the pre-commit campaign and active combat state.

## Relative force and morale

- Relative-force threshold crossings: 69
- Overwhelming-force prompts: 69
- Duplicate prompts without a new crossing: 0
- Morale checks: 81
- Failed morale checks: 39

The ratio-based system eliminated the earlier always-on behavior. Every prompt corresponded to a threshold crossing.

Reused opponents exposed a separate issue:

- Reused wounded opponents: 32
- Immediate First Blood prompts: 32
- Immediate defeated-leader prompts: 2

The current First Blood and Leader Defeat logic compares current state with maximum/default state, not the opponent state at encounter start. A wounded returning rival therefore appears to suffer “first blood” before anyone acts.

## Recommendation tracking

Tone distribution:

- Gritty: 34
- Standard: 33
- Cinematic: 33

Campaign telemetry:

- Recommendations accepted: 67
- Recommendations ignored: 33

Recommended outcomes:

- Defeated: 63
- Fled: 17
- Negotiated: 20
- Surrendered: 0
- Escaped: 0

Threshold explanations and aggregate acceptance tracking worked. This synthetic run did not reach Surrendered or Escaped, showing why telemetry should be stored by tone, cause, and outcome rather than only as global accepted/ignored totals.

## Recent combat and campaign continuity

- Recent Combat events written: 575
- Last-three history overflows: 0
- Salvage recovered: 200
- Bulk warnings: 17
- Camp actions: 100
- Campaign days advanced: 12
- Threads resolved: 60
- Threads left open: 40

The tactical additions did not break campaign continuity.

## Findings

1. **Gamma Solo remains useful for sustained solo play.** Every campaign completed without a dead end.
2. **Transactional reconciliation works.** Active undo is locked at commit, while full Undo Reconciliation restored all tested state.
3. **Relative force is materially better.** Overwhelming Force now fires on threshold crossings and did not duplicate.
4. **Preset rebinding is safe.** It repairs compatible records and blocks impossible repairs.
5. **Reused wounded opponents trigger false First Blood prompts.** The trigger needs encounter-start baselines.
6. **Preset health is incomplete.** It verifies record existence but not ammunition quantity or family compatibility. An empty or mismatched stack can still display Ready until the attack-level warning appears.
7. **Recommendation telemetry is too coarse.** Accepted/ignored totals cannot reveal whether Gritty, Standard, or Cinematic advice is miscalibrated.
8. **Outcome coverage was narrow in this run.** No Surrendered or Escaped recommendations appeared under the synthetic states.
9. **Friendly strength remains abstract.** It accepts allies, pets, vehicles, and position as a number rather than linking actual campaign records.

## Recommended enhancements

### Highest priority

1. **Use encounter-start morale baselines**
   - Capture starting HP, morale, and leader status when combat loads.
   - Trigger First Blood only from new damage during this encounter.
   - Trigger Leader Defeat only when a leader moves from active to defeated.
   - Preserve visible pre-existing injuries without treating them as new triggers.

2. **Strengthen preset health**
   - Add Empty Ammunition and Incompatible Family states.
   - Show remaining compatible quantity in the preset picker.
   - Repair both record ID and family relationship.
   - Offer a test-load button after import.

3. **Track recommendation telemetry by context**
   - Store tone, suggested outcome, triggering rule, accepted/ignored, and final chosen outcome.
   - Show a small calibration summary in Settings.
   - Suggest tone adjustments only after enough real campaign decisions exist.

### Next tier

4. Link friendly strength to selected player characters, roster allies, pets, vehicles, and defensive assets while retaining manual adjustment.
5. Add an encounter-start snapshot panel for returning named opponents.
6. Let preset repair show proposed weapon/ammunition matches before committing.

### Quality of life

7. Add Empty, Low, and Ready ammunition badges to presets.
8. Show remaining active undo depth beside the reconciliation commit warning.
9. Add a recent-combat history action that opens the associated combat summary.
10. Allow recommendation telemetry export for campaign review.

## Bottom line

Gamma Solo passes the updated 100-session usefulness test with 100% completion, zero procedural dead ends, 135/135 successful active attack rollbacks, 46/46 successful full reconciliation rollbacks, zero forecast errors, and no HP synchronization failures.

The application is useful for sustained Gamma World solo play. The next work should focus on contextual accuracy rather than more mechanics: establish encounter-start baselines, make preset health quantity/family-aware, and collect recommendation telemetry by tone and cause.
