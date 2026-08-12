export function download(name, data, type = 'application/json') { const body = typeof data === 'string' ? data : JSON.stringify(data, null, 2), a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type })); a.download = name; a.click(); URL.revokeObjectURL(a.href); }
export const readJSON = (f) => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => { try {
    ok(JSON.parse(String(r.result)));
}
catch (e) {
    no(e);
} }; r.onerror = no; r.readAsText(f); });
