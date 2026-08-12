export function hash(s) { let h = 2166136261; for (const c of s) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
} return h >>> 0; }
export class RNG {
    state;
    constructor(s) { this.state = hash(s) || 1; }
    next() { this.state += 0x6D2B79F5; let t = this.state; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    int(a, b) { return Math.floor(this.next() * (b - a + 1)) + a; }
    pick(a) { return a[this.int(0, a.length - 1)]; }
}
export const newSeed = () => Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
