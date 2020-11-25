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

    static closeness(cluster1: Cluster, cluster2: Cluster): number {
        const inter = intersection(cluster1.getNeighbourhood(), cluster2.getNeighbourhood());
        const union = new Set([...cluster1.getNeighbourhood(), ...cluster2.getNeighbourhood()]);
        return inter.length / union.size;
    }
}

