export const generateEntityPath = (basePath, eid) => {
    return eid ? `${basePath}?eid=${eid}` : basePath;
}