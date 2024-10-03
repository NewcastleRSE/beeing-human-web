import { writable } from 'svelte/store';

export const activeDataset = writable(0, () => {
    // when it has no more subscribers, it resets to initial value
    // i.e., when you move to another page then return
    return () => activeDataset.set(0);
})

export const activeView = writable('details')

export const variationDetail = writable('no variation')

export const editorialNotes = writable('false');