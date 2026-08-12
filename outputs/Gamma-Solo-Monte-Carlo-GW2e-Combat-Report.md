# Gamma Solo Monte Carlo Review - Gamma World 2e Combat

Date: 2026-07-01  
Sample size: 100 seeded solo campaign sessions

## Test scope

Each run tested:

1. Character and ruin generation.
2. Equipped weapon Damage, Weapon Class, To-Hit Modifier, Range, and ammunition.
3. Equipped armor and calculated character Armor Class.
4. Ammunition Damage/Effect and Damage Modifier.
5. A generated encounter with full creature or NPC combat statistics.
6. A danger- and rank-scaled Combat Tracker opponent.
7. Player HP changes, opponent HP, resources, outcomes, and combat journaling.
8. Quick Combat or Standard Combat.
9. Salvage, Camp, thread status, and dashboard continuity.

The test validates generated data and state transitions. It does not reproduce the copyrighted Gamma World 2e Physical Attack Matrix. Where an attack target was needed for simulation pacing, a neutral placeholder threshold was used; those simulated hit outcomes are not a rules-accuracy test.

## Results

### Overall playability

- Complete sessions: 100/100
- Procedural dead ends: 0
- Characters generated: 100/100
- Ruins generated: 100/100
- Salvage cycles: 100/100
- Camp cycles: 100/100
- Thread-status cycles: 100/100
- Dashboard metric sets: 100/100

### Equipment combat data

- Weapons with Damage, Weapon Class, To-Hit Modifier, and Range: 100/100
- Armor records with valid Armor Class 1-10: 100/100
- Characters whose calculated Armor Class matched equipped armor: 100/100
- Ammunition with Damage/Effect and Damage Modifier: 100/100
- Ammunition linked to a compatible weapon family: 0/100

Weapon Class distribution:

- WC 1-5: 31
- WC 6-11: 43
- WC 12+: 26

Character Armor Class distribution covered AC 2 through AC 10 without invalid values.

### Encounters and combatants

- Encounters with every required combat field: 100/100
- Valid scaled combatants: 100/100
- Quick Combat sessions: 47
- Standard Combat sessions: 53
- Average simulated combat length: 4.25 rounds
- Player HP updates: 207
- Combat outcomes recorded: 100/100
- Combat journals created: 100/100
- Resource-expenditure records: 100/100

Encounter completeness required:

- Number Appearing
- Armor Class
- Hit Dice and Hit Points
- Weapon Class and To-Hit Modifier
- Attacks and Damage
- Movement and Morale
- Attack Routine
- Special Attack and Special Defense

### Physical Attack Matrix dependency

- Records containing the inputs needed for a matrix lookup: 100/100
- Records containing a calculated 2e target number: 0/100
- Sessions still requiring a rulebook or manually entered target: 100/100

The app now captures the correct categories of 2e combat data, but it does not yet resolve Weapon Class or Hit Dice against Armor Class.

## Findings

1. **Gamma Solo remains useful for sustained solo play.** All 100 sessions completed without a procedural dead end.
2. **Equipment and encounters are substantially more useful.** Weapons, armor, ammunition, creatures, and NPC combatants no longer produce blank combat profiles.
3. **Armor Class migration works.** Existing armor can be converted from the older defense bonus, and generated characters correctly use AC 10 when unarmored.
4. **Combat pacing improved.** The mix of Quick and Standard Combat averaged 4.25 rounds, down from the previous 7.56-round test.
5. **Combat is not yet self-contained.** A player must consult the owned 2e Physical Attack Matrix or manually determine the target number.
6. **Ammunition compatibility is incomplete.** Weapon records name ammunition, but ammunition records do not identify compatible weapon families, so automatic matching and expenditure cannot be trusted.
7. **Physical Strength damage adjustment remains manual.** The 2e rules indicate Physical Strength modifies physical damage, but the tracker does not calculate that adjustment.
8. **Shield behavior needs a separate modifier.** In 2e, shields modify the attack roll against the wearer rather than simply behaving as ordinary armor.
9. **Long-range damage is not automated.** The 2e weapon rules reduce damage beyond effective range; the current range field is descriptive only.
10. **Mental combat remains outside the tracker.** Mental Strength attacks and Mental Armor/defenses will still need manual resolution.

## Recommended enhancements

### Highest value

1. **Physical Attack Resolver**
   - Let the user enter or import their owned Physical Attack Matrix as JSON.
   - Select attacker Weapon Class or creature Hit Dice and defender Armor Class.
   - Display the required d20 target.
   - Apply Dexterity and equipment To-Hit modifiers.
   - Roll and journal the attack without reproducing protected rulebook tables by default.

2. **Ammunition compatibility**
   - Add weapon-family IDs to weapons and ammunition.
   - Filter ammunition choices to compatible records.
   - Automatically decrement the correct ammunition stack.
   - Apply ammunition Damage Modifier or special effect to the attack journal.

3. **2e damage calculation**
   - Roll weapon damage.
   - Apply Physical Strength adjustment.
   - Apply ammunition modifier.
   - Handle multiple attacks and special attacks.
   - Apply half damage at extended range.

### Next tier

4. **Shield modifier**
   - Add a Shield tag and attack-roll penalty field.
   - Show it separately from Armor Class in Character Play Card and Combat Tracker.

5. **Reusable bestiary and NPC roster**
   - Save generated creatures and combatant NPCs.
   - Reuse named opponents across encounters.
   - Track injuries, morale changes, faction, and last known location.

6. **Mental Combat panel**
   - Mental Strength, mental attack type, target defense, range, and effect.
   - Link mental mutations directly to the combat procedure.

7. **Encounter groups**
   - Use Number Appearing to add a group, swarm, or multiple individual combatants in one click.
   - Offer shared HP for mobs and individual HP for important opponents.

## Bottom line

Gamma Solo passes the latest 100-session usefulness test with 100% session completion and no procedural dead ends.

It now records the Gamma World 2e combat statistics needed at the table, but combat still depends on an external Physical Attack Matrix lookup. The largest next improvement is a user-importable attack resolver, followed by ammunition-family matching and automatic 2e damage calculation.
