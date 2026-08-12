import { RNG } from './rng.js';
export function rollDice(ex, r = new RNG(String(Date.now()))) { const x = ex.toLowerCase().replace(/\s/g, ''); const m = x.match(/^(\d*)d(\d+)(?:([+-])(\d+))?/); if (!m)
    return { total: 0, rolls: [], label: 'Invalid expression' }; const n = +(m[1] || 1), s = +m[2], mod = (m[3] === '-' ? -1 : 1) * +(m[4] || 0), rolls = Array.from({ length: Math.min(n, 100) }, () => r.int(1, s)), used = [...rolls]; if ((x.includes('drop') || x === '4d6dl1') && used.length > 1)
    used.splice(used.indexOf(Math.min(...used)), 1); return { total: used.reduce((a, b) => a + b, 0) + mod, rolls, label: ex + ': ' + rolls.join(', ') }; }
