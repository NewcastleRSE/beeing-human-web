import { writable } from 'svelte/store';

export const activeDataset = writable(0)

export const activeView = writable('details')