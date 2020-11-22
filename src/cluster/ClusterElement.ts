import { intersection, uniq } from "lodash";

export class ClusterElement {
    private readonly neighbourhood: string[];
    constructor(
        public readonly id: string,
        neighbourIds: string[]
    ) {
        this.neighbourhood = uniq([id, ...neighbourIds]);
    }

    getNeighbourhood() {
        return this.neighbourhood;
    }

    static closeness(element1: ClusterElement, element2: ClusterElement): number {
        const inter = intersection(element1.getNeighbourhood(), element2.getNeighbourhood());
        const union = new Set([...element1.getNeighbourhood(), ...element2.getNeighbourhood()]);
        return inter.length / union.size;
    }
}

