import { views } from "./data";

export function load() {
    return {
        summaries: views.map((view) => ({
            slug: view.slug,
            title: view.title
        }))
    };
}