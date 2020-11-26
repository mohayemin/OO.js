import { uniq, without } from "lodash";
import { Cluster } from "./Cluster";


export class FlatCluster extends Cluster {
    
    private neighbourhood: string[];
    constructor(
        id: string,
        neighbourIds: string[]
    ) {
        super(id);
        this.neighbourhood = uniq([id, ...neighbourIds]);
    }

    getNeighbourhood() {
        return this.neighbourhood;
    }

    mergeWith(other: Cluster): void {
        const oldId = this.id;
        this.id += "$" + other.id;
        this.neighbourhood = uniq(this.neighbourhood.concat(other.getNeighbourhood()));
        this.neighbourhood = without(this.getNeighbourhood(), oldId, other.id);
        this.neighbourhood.push(this.id);
    }

    updateNeighbours(mergedId: string, firstOldId: string, secondOldId: string): void {
        const oldCount = this.neighbourhood.length;
        this.neighbourhood = without(this.neighbourhood, firstOldId, secondOldId);
        if(oldCount > this.neighbourhood.length) { // had old ids
            this.neighbourhood.push(mergedId);
        }
    }
}
