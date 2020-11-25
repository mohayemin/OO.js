import { intersection, uniq } from "lodash";

export class Cluster {
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

    closeness(other: Cluster): number {
        const inter = intersection(this.getNeighbourhood(), other.getNeighbourhood());
        const union = new Set([...this.getNeighbourhood(), ...other.getNeighbourhood()]);
        return inter.length / union.size;
    }
}

