import { flatMap, uniq } from "lodash";
import { FlatCluster } from "./FlatCluster";
import { Cluster } from "./Cluster";


export class CompositeCluster extends Cluster {
    private neighbourhood: string[];
    constructor(public readonly id: string,
        public readonly components: FlatCluster[]) {
        super(id);
        this.neighbourhood = uniq(flatMap(components, c => c.getNeighbourhood()));
    }

    getNeighbourhood() {
        return this.neighbourhood;
    }
}
