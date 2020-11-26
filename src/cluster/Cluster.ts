import { intersection } from "lodash";

export abstract class Cluster {
    constructor(public id: string) {
    }

    closeness(other: Cluster): number {
        const inter = intersection(this.getNeighbourhood(), other.getNeighbourhood());
        const union = new Set([...this.getNeighbourhood(), ...other.getNeighbourhood()]);
        return inter.length / union.size;
    }

    abstract getNeighbourhood(): string[];
    abstract mergeWith(other: Cluster): void;
    abstract updateNeighbours(mergedId: string, firstOldId: string, secondOldId: string): void;
}
