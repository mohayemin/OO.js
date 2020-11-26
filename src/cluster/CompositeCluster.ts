import { flatMap, uniq } from "lodash";
import { FlatCluster } from "./FlatCluster";
import { Cluster } from "./Cluster";
export class CompositeCluster extends Cluster {
    private neighbourhood: string[];
    constructor(id: string,
        private components: FlatCluster[]) {
        super(id);
        this.buildNeighbourhood();
    }

    getNeighbourhood() {
        return this.neighbourhood;
    }

    mergeWith(other: Cluster): void {
        const otherComposite = other as CompositeCluster;
        this.id += "$" + other.id;
        this.components.push(...otherComposite.components);
        this.buildNeighbourhood();
    }

    updateNeighbours(mergedId: string, firstOldId: string, secondOldId: string): void {
    }

    private buildNeighbourhood (){
        this.neighbourhood = uniq(flatMap(this.components, c => c.getNeighbourhood()));
    }
}
