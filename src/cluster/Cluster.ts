import { intersection, union, uniq, without } from "lodash";

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

    mergeWith(second: Cluster): Cluster {
        const mergedId = this.id + "$" + second.id;
        const mergedNeighbourIds = union(this.getNeighbourhood(), second.getNeighbourhood());
        return new Cluster(mergedId, mergedNeighbourIds);
    }

    updateNeighbours(mergedId: string, firstOldId: string, secondOldId: string) {
        const neighbourIds = without(this.getNeighbourhood(), firstOldId, secondOldId, mergedId);
        if (neighbourIds.length < this.getNeighbourhood().length) {
            neighbourIds.push(mergedId);
        }
        return new Cluster(this.id, neighbourIds);
    }
}

