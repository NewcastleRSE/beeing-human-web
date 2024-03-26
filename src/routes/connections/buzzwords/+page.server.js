
export async function load({parent}) {
    const data = await parent();
    let newData = []
    
    for (const buzz of data.buzzwords) {
        const content = buzz.content;
        const regexp = /<Portal(.*)>(.*)<\/Portal>/g
        const tags = content.matchAll(regexp)
        for (const tag of tags) {
            if (tag[0]) {
                newData.push(tag[0]);
            }
        }
    }

    return {links: newData}
}