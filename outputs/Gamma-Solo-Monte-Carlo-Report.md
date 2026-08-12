# Gamma Solo Monte Carlo Playability Review

Date: 2026-07-01  
Sample size: 100 simulated solo-play loops

## What was simulated

Each run created a character, generated a ruin, ran six expedition travel turns, generated one encounter, hazard, artifact, settlement, and faction result, and checked whether a Solo Turn Procedure entry had enough information to save into the journal.

## Results snapshot

- Characters generated successfully: 100/100
- Ruins generated successfully: 100/100
- Generator cards produced without blank fields: 500/500
- Solo turns that could be journaled: 100/100
- Average mutations per character: 3.7
- Average defects per character: 0.6
- Average starting ruin clock value: 1.52 / 5
- Expedition runs with at least one hazard: 87/100
- Expedition runs with at least one sign/discovery lead: 94/100
- Expedition runs with at least one encounter trigger: 73/100
- Expedition pressure breaks across all runs: 63
- Duplicate generated card titles: 323/500

## Distribution checks

Genotypes:

- Humanoid: 29
- Pure Strain Human: 28
- Mutant Plant: 21
- Mutant Animal: 22

Ruin danger:

- Severe: 27
- Guarded: 26
- Low: 23
- Extreme: 24

## Findings

1. Gamma Solo is useful for actual solo play now. The core loop works: create character -> create ruin -> start expedition -> resolve solo turn -> save to journal.
2. Expedition pressure is strong. It reliably creates danger and makes travel feel alive, especially with Hard pace.
3. Ruin clocks are much better now that they start with seeded values instead of all being empty. The average clock start of 1.52 gives sites immediate tension without making every ruin feel doomed.
4. Character generation is healthy. Genotypes were reasonably balanced, Pure Strain Humans correctly had no mutations, and mutants produced enough mutation detail to feel distinct.
5. The biggest usefulness gap is handoff. The player can generate and record things, but the app should do more to move consequences from Expedition -> Solo Turn -> clocks/resources/journal.
6. The duplicate generated card titles are not a functional bug, but they reduce flavor. Titles like Artifact // ### repeat too often because there are limited title patterns.
7. Encounters are playable but still need table-facing details: distance, awareness, reaction, morale, first move, and escape route.
8. Equipment exists, but most items are not yet mechanically connected to survival, travel, salvage, repair, camp, or combat decisions.
9. Journal entry types should become more specialized. The uploaded Gamma Solo journal suggests stronger templates for expedition logs, contact records, missions, contamination, salvage, shelters, vehicles, and threats.

## Recommended enhancements

Priority 1:

- Add a Character Play Card at the top of Character Builder: HP, defense, movement, equipped weapon, armor, mutations, conditions, exposure, and current objective.
- Add a Send to Solo Turn button from Expedition Dashboard that preloads mode, character, ruin, current pressure, and last travel result.
- Add automatic consequence buttons after a Solo Turn: advance ruin clock, spend supply, spend charge/filter/med patch, add condition, add faction move, or create discovery.

Priority 2:

- Add an Encounter Runner panel with distance, awareness, reaction, morale, first action, negotiation leverage, and escape route.
- Add a Scavenge/Salvage procedure: quick search, careful search, full extraction; each with time, risk, loot, and clock cost.
- Add a Camp/Haven procedure: recover, repair, treat exposure, trade, ask rumors, faction move, and calendar advance.

Priority 3:

- Add richer journal templates from the uploaded journal: Expedition Log, Contact Record, Mission Record, Salvage Inventory, Contamination Log, Threat Tracker, Shelter Record, Vehicle Record.
- Add equipment tags such as quiet, loud, fragile, bulky, powered, radioactive, medical, trade-good, and survival. These can drive prompts automatically.
- Add a What now? button that suggests the next best play action based on current mode, pressure, supply, clocks, and unresolved journal threads.

## Bottom line

Gamma Solo passes the 100-run usefulness test. It can support actual solo play now. The next big win is not more random tables; it is tighter procedure glue so the app carries consequences forward with fewer manual steps.
