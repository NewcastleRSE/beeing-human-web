export function findSectionNameAndType(filePath) {
    let sectionName = '';
    const endName = filePath.indexOf('.');
    const startName = filePath.lastIndexOf('/') + 1;
    sectionName = filePath.slice(startName, endName);
    const type = filePath.slice(endName+1);
    return {'section': sectionName, 'type': type}
}