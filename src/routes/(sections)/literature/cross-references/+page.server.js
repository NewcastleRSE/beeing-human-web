export async function load({ fetch }) {
    const res = await fetch('https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/data-analysis/data-analysis/cross-refs.csv');
    if (res.ok) {
        const data = await res.text();
        return { xreferences: data };
    } else {
        return { error: 'Failed to load content' };
    }
}