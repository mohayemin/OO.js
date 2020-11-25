import { intersection, union, uniq, without } from "lodash";

export class Cluster {
    private readonly neighbourhood: string[];
    constructor(
        public readonly id: string,
        neighbourIds: string[]
    ) {
        this.neighbourhood = uniq([id, ...neighbourIds]);
    }

    closeness(other: Cluster): number {
        const inter = intersection(this.neighbourhood, other.neighbourhood);
        const union = new Set([...this.neighbourhood, ...other.neighbourhood]);
        return inter.length / union.size;
    }

    mergeWith(second: Cluster): Cluster {
        const mergedId = this.id + "$" + second.id;
        const mergedNeighbourIds = union(this.neighbourhood, second.neighbourhood);
        return new Cluster(mergedId, mergedNeighbourIds);
    }

    updateNeighbours(mergedId: string, firstOldId: string, secondOldId: string) {
        const neighbourIds = without(this.neighbourhood, firstOldId, secondOldId, mergedId);
        if (neighbourIds.length < this.neighbourhood.length) {
            neighbourIds.push(mergedId);
        }
        return new Cluster(this.id, neighbourIds);
    }
}

