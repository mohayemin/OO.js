
export function LORM(actualRelations: number, componentClount: number): number {
    if (componentClount === 1)
        return 1;
    const possibleRelations = componentClount * (componentClount - 1);
    // possibleRelations not divided by 2 because relations are directed
    return actualRelations / possibleRelations;
}
