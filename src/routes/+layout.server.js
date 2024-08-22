export async function load({fetch}) {
    // Fetches metadata about articles and other sections
    let response = await fetch('/api/articles');
    let articleData = await response.json();

    return articleData
}